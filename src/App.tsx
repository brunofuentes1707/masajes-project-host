// src/App.tsx - CÓDIGO FINAL CON NUEVA PALETA DE COLORES CÁLIDOS

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Menu, 
  X, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  CheckCircle,
  UserCheck,
  UserX,
  AlertCircle,
  Activity
} from 'lucide-react';

interface Service {
  id: number;
  name: string;
  duration: string;
  price: string;
  description: string;
  note?: string;
  image: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', service: '', date: '', time: ''
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    fetch(`${apiUrl}/api/services`)
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error("Error al cargar servicios:", error));
  }, []);

  const massageTips = [
    { text: 'Hidrátate abundantemente para eliminar toxinas liberadas durante el masaje' },
    { text: 'Permite que tus músculos descansen y asimilen el trabajo realizado' },
    { text: 'Aplica calor suave en áreas con molestias para aumentar flujo sanguíneo' },
    { text: 'Desarrolla conciencia postural en tus actividades diarias' }
  ];

  const stretchingTips = [
    { text: 'Prioriza la consistencia: 10 minutos diarios son más efectivos que sesiones largas ocasionales' },
    { text: 'Exhala lentamente al estirar para indicar a tu sistema nervioso que relaje el músculo' },
    { text: 'Mantén cada posición 20-30 segundos sin rebotar ni forzar' },
    { text: 'Enfócate en flexores de cadera, isquiotibiales y pectorales por postura encorvada' },
    { text: 'Estira hasta tensión suave, nunca hasta dolor agudo' }
  ];

  const timeSlots = [
    '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00',
    '12:00 - 12:30', '12:30 - 13:00', '14:00 - 14:30', '14:30 - 15:00',
    '15:00 - 15:30', '15:30 - 16:00', '16:00 - 16:30', '16:30 - 17:00',
    '17:00 - 17:30', '17:30 - 18:00'
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message);
      if (response.ok) {
        setFormData({ name: '', email: '', service: '', date: '', time: '' });
        setSelectedService('');
      }
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
      alert('Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    // [MODIFICADO] Fondo base cálido y claro
    <div className="bg-orange-50 font-sans">
      {/* Hero Section */}
      <div 
        id="hero" 
        // [MODIFICADO] Degradado del hero con tonos tierra oscuros para contraste
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Detente, Recarga y Avanza
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Tu espacio para el bienestar y la relajación
          </p>
          <button 
            onClick={() => scrollToSection('services')}
            // [MODIFICADO] Botón principal con el nuevo color Burnt Sienna
            className="bg-[#e86b4f] hover:bg-[#d15f45] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 inline-flex items-center shadow-lg"
          >
            <Heart className="mr-2 w-5 h-5" />
            Descubre nuestros servicios
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button onClick={() => scrollToSection('hero')} className="focus:outline-none">
              <img src="/DRA2.png" alt="Logo Detente, Recarga y Avanza" className="h-32 w-auto" />
            </button>
            
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-[#e86b4f] transition font-medium">Servicios</button>
              <button onClick={() => scrollToSection('booking')} className="text-gray-700 hover:text-[#e86b4f] transition font-medium">Reservas</button>
              <button onClick={() => scrollToSection('tips')} className="text-gray-700 hover:text-[#e86b4f] transition font-medium">Consejos</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-[#e86b4f] transition font-medium">Contacto</button>
            </div>
            
            <button className="md:hidden focus:outline-none p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-[#e86b4f] transition text-left">Servicios</button>
                <button onClick={() => scrollToSection('booking')} className="text-gray-700 hover:text-[#e86b4f] transition text-left">Reservas</button>
                <button onClick={() => scrollToSection('tips')} className="text-gray-700 hover:text-[#e86b4f] transition text-left">Consejos</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-[#e86b4f] transition text-left">Contacto</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-stone-800 mb-16">
            Nuestros Servicios de Bienestar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div key={service.id} className="bg-orange-50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                <div className="relative overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-stone-800">{service.name}</h3>
                    <span className="bg-[#f3a658] text-stone-800 font-bold px-3 py-1 rounded-full text-sm flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {service.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  {service.note && <p className="text-sm text-gray-500 mb-4 italic">({service.note})</p>}
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#f2855a]">{service.price}</span>
                    <button onClick={() => scrollToSection('booking')} className="bg-[#e86b4f] hover:bg-[#d15f45] text-white px-4 py-2 rounded-full text-sm transition transform hover:scale-105 shadow-md">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gradient-to-br from-orange-100 to-orange-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-stone-800 mb-16">
            Reserva tu Sesión
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-[#f2855a] p-10 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-4">Horarios Disponibles</h3>
                <p className="text-orange-100 mb-6">
                  Lunes a Viernes: 10:00 - 13:00<br />
                  Lunes a Viernes: 14:00 - 18:00
                </p>
                <div className="bg-white/20 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2 flex items-center">
                    <AlertCircle className="mr-2 w-5 h-5" />
                    Consejo rápido
                  </h4>
                  <p className="text-orange-100 text-sm">Reserva con 24h de anticipación para garantizar tu horario preferido.</p>
                </div>
              </div>
              <div className="md:w-1/2 p-10">
                <form className="space-y-4" onSubmit={handleBookingSubmit}>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">Nombre completo</label>
                    <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2855a] focus:border-transparent transition" placeholder="Tu nombre completo" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2855a] focus:border-transparent transition" placeholder="tu@email.com" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="service">Servicio</label>
                    <select id="service" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2855a] focus:border-transparent transition" value={formData.service} onChange={handleInputChange} required>
                      <option value="">Selecciona un servicio</option>
                      {services.map((service) => <option key={service.id} value={service.name}>{service.name} - {service.price}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="date">Fecha</label>
                      <input type="date" id="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2855a] focus:border-transparent transition" value={formData.date} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium" htmlFor="time">Hora</label>
                      <select id="time" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2855a] focus:border-transparent transition" value={formData.time} onChange={handleInputChange} required>
                        <option value="">Selecciona una hora</option>
                        {timeSlots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#e86b4f] hover:bg-[#d15f45] text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
                    Confirmar Reserva
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Tips */}
      <section id="tips" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-stone-800 mb-16">
            Consejos de Bienestar
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-[#f3a658]/20 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-[#e86b4f] rounded-full p-3 mr-4"><UserX className="text-white w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-stone-800">Si no recibes masajes</h3>
              </div>
              <ul className="space-y-4">
                {stretchingTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-[#e86b4f] mr-3 mt-0.5 w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-stone-100 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-stone-700 rounded-full p-3 mr-4"><UserCheck className="text-white w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-stone-800">Si recibes masajes</h3>
              </div>
              <ul className="space-y-4">
                {massageTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-stone-700 mr-3 mt-0.5 w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-orange-100 to-orange-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-stone-800 mb-16">
            Contáctanos
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#e86b4f] rounded-full p-3"><MapPin className="text-white w-6 h-6" /></div>
                    <div><h4 className="font-bold text-stone-800">Ubicación</h4><p className="text-gray-600">Pasaje Monte Verde 1234, Vitacura, Santiago, Chile.</p></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#e86b4f] rounded-full p-3"><Phone className="text-white w-6 h-6" /></div>
                    <div><h4 className="font-bold text-stone-800">Teléfono</h4><p className="text-gray-600">+56 9 7583 3215</p></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#e86b4f] rounded-full p-3"><Mail className="text-white w-6 h-6" /></div>
                    <div><h4 className="font-bold text-stone-800">Email</h4><p className="text-gray-600">hola@detenterecargayavanza.com</p></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#e86b4f] rounded-full p-3"><Clock className="text-white w-6 h-6" /></div>
                    <div><h4 className="font-bold text-stone-800">Horario</h4><p className="text-gray-600">Lunes a Viernes: 10:00-13:00<br />Lunes a Viernes: 14:00-18:00</p></div>
                  </div>
              </div>
              <div className="relative">
                <img src="https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg" alt="Centro de masajes" className="w-full h-64 object-cover rounded-lg shadow-md" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-300/10 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Activity className="mr-2 w-6 h-6" />Detente, Recarga y Avanza.
              </h3>
              <p className="text-stone-300">Tu espacio para el bienestar y la relajación</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-stone-300">
                <li className="flex items-center"><MapPin className="mr-2 w-4 h-4" />Pasaje Monte Verde 1234, Vitacura, Santiago, Chile.</li>
                <li className="flex items-center"><Phone className="mr-2 w-4 h-4" />+56 9 7583 3215</li>
                <li className="flex items-center"><Mail className="mr-2 w-4 h-4" />hola@detenterecargayavanza.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Horario</h4>
              <ul className="space-y-2 text-stone-300">
                <li>Lunes a Viernes: 10:00-13:00</li>
                <li>Lunes a Viernes: 14:00-18:00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#f6b83c] transition p-2 bg-stone-700 rounded-full hover:bg-stone-600"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-[#f6b83c] transition p-2 bg-stone-700 rounded-full hover:bg-stone-600"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-[#f6b83c] transition p-2 bg-stone-700 rounded-full hover:bg-stone-600"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
            <p>© 2024 Detente, Recarga y Avanza. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;