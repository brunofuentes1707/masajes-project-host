# api.py - VERSIÓN FINAL CON SENDGRID

import os
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
# [NUEVO] Imports para SendGrid
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}) # Dejamos CORS abierto por ahora

# --- YA NO NECESITAMOS LA CONFIGURACIÓN DE FLASK-MAIL ---

# Tus datos de servicios (sin cambios)
services_data = [
    { "id": 1, "name": "Masaje en Camilla", "duration": "15 min", "price": "$15.000", "description": "Relajación profunda con aceites esenciales.", "note": "Dependiendo el tipo de masaje", "image": "https://images.pexels.com/photos/3997996/pexels-photo-3997996.jpeg" },
    { "id": 2, "name": "Masaje en Silla Ergonómica", "duration": "15 min", "price": "$13.000", "description": "Alivio rápido de tensiones.", "note": None, "image": "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg" },
    { "id": 3, "name": "Masaje Descontracturante", "duration": "30 min", "price": "$15.000", "description": "Técnicas para liberar contracturas.", "note": None, "image": "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg" },
    { "id": 4, "name": "Masaje Relajante", "duration": "20 min", "price": "$13.000", "description": "Movimientos suaves para calma profunda.", "note": None, "image": "https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg" },
    { "id": 5, "name": "Masaje Drenaje Linfático", "duration": "25 min", "price": "$13.000", "description": "Técnica para eliminar toxinas.", "note": None, "image": "https://images.pexels.com/photos/6663461/pexels-photo-6663461.jpeg" }
]

@app.route('/api/services', methods=['GET'])
def get_services():
    return jsonify(services_data)

@app.route('/api/book', methods=['POST'])
def create_booking():
    booking_data = request.json
    print(f"--- NUEVA RESERVA RECIBIDA: {booking_data} ---")

    service_name = booking_data.get('service')
    service_details = next((s for s in services_data if s['name'] == service_name), None)

    if not service_details:
        return jsonify({"message": "El servicio seleccionado no es válido."}), 400

    full_booking_details = {**service_details, **booking_data}

    try:
        # --- [NUEVO] Lógica de envío con SendGrid ---
        from_email = 'brunofuentes1707@gmail.com' # El email que verificaste en SendGrid
        
        # Correo para el cliente
        html_body_customer = render_template('booking_confirmation.html', booking=full_booking_details)
        message_customer = Mail(
            from_email=from_email,
            to_emails=booking_data.get('email'),
            subject="Confirmación de tu reserva en 'Detente, Recarga y Avanza'",
            html_content=html_body_customer
        )
        
        # Correo para el propietario
        html_body_owner = render_template('new_booking_notification.html', booking=full_booking_details)
        message_owner = Mail(
            from_email=from_email,
            to_emails=from_email, # A tu propio correo
            subject=f"¡Nueva Reserva! - {booking_data.get('name')} para {service_name}",
            html_content=html_body_owner
        )

        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        sg.send(message_customer)
        sg.send(message_owner)
        
        print(f"--- Correos enviados exitosamente a través de SendGrid ---")
        return jsonify({"message": "Reserva recibida y correos de confirmación enviados."}), 201
        
    except Exception as e:
        print(f"--- ERROR AL ENVIAR CORREO CON SENDGRID: {e} ---")
        # Imprime el cuerpo del error si está disponible para más detalles
        if hasattr(e, 'body'):
            print(e.body)
        return jsonify({"message": "Reserva recibida, pero hubo un error al enviar el correo."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
