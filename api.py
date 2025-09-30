# api.py - VERSIÓN FINAL Y COMPLETA CON TODAS LAS CORRECCIONES

import os
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_mail import Mail, Message

app = Flask(__name__)

# --- [LA CORRECCIÓN MÁS IMPORTANTE] ---
# Esta línea le da permiso explícito a tu frontend para hablar con este backend.
# Asegúrate de que no haya ningún error de tipeo en la URL.
CORS(app, resources={r"/api/*": {"origins": "https://masajes-web.onrender.com"}})

# --- CONFIGURACIÓN PARA FLASK-MAIL (CORREGIDA PARA EVITAR TIMEOUT EN RENDER) ---
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465  # Usamos el puerto SSL
app.config['MAIL_USE_SSL'] = True # Activamos SSL
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')

mail = Mail(app)

# Tus datos de servicios
services_data = [
    { "id": 1, "name": "Masaje en Camilla", "duration": "15 min", "price": "$15.000", "description": "Relajación profunda con aceites esenciales.", "note": "Dependiendo el tipo de masaje", "image": "https://images.pexels.com/photos/3997996/pexels-photo-3997996.jpeg" },
    { "id": 2, "name": "Masaje en Silla Ergonómica", "duration": "15 min", "price": "$13.000", "description": "Alivio rápido de tensiones.", "note": None, "image": "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg" },
    { "id": 3, "name": "Masaje Descontracturante", "duration": "30 min", "price": "$15.000", "description": "Técnicas para liberar contracturas.", "note": None, "image": "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg" },
    { "id": 4, "name": "Masaje Relajante", "duration": "20 min", "price": "$13.000", "description": "Movimientos suaves para calma profunda.", "note": None, "image": "https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg" },
    { "id": 5, "name": "Masaje Drenaje Linfático", "duration": "20 min", "price": "$13.000", "description": "Técnica para eliminar toxinas.", "note": None, "image": "https://images.pexels.com/photos/6663461/pexels-photo-6663461.jpeg" }
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
        sender_email = os.environ.get('EMAIL_USER')
        
        # Correo para el cliente
        html_body_customer = render_template('booking_confirmation.html', booking=full_booking_details)
        msg_customer = Message(
            subject="Confirmación de tu reserva en 'Detente, Recarga y Avanza'",
            recipients=[booking_data.get('email')],
            html=html_body_customer,
            sender=sender_email
        )
        mail.send(msg_customer)
        print(f"--- Correo de confirmación enviado a {booking_data.get('email')} ---")

        # Correo para el propietario
        owner_email = os.environ.get('EMAIL_USER')
        if owner_email:
            html_body_owner = render_template('new_booking_notification.html', booking=full_booking_details)
            msg_owner = Message(
                subject=f"¡Nueva Reserva! - {booking_data.get('name')} para {service_name}",
                recipients=[owner_email],
                html=html_body_owner,
                sender=sender_email
            )
            mail.send(msg_owner)
            print(f"--- Correo de notificación enviado a {owner_email} ---")
        
        return jsonify({"message": "Reserva recibida y correos de confirmación enviados."}), 201

    except Exception as e:
        print(f"--- ERROR AL ENVIAR CORREO: {e} ---")
        return jsonify({"message": "Reserva recibida, pero hubo un error al enviar el correo de confirmación."}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
