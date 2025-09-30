// src/App.tsx - CÓDIGO FINAL CON NUEVA IMAGEN DE PORTADA

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
    '12:00 - 12:30', '12:30 - 13:00', '13:00 - 13:30', '13:30 - 14:00',
    '14:00 - 14:30', '14:30 - 15:00', '15:00 - 15:30', '15:30 - 16:00',
    '16:00 - 16:30', '16:30 - 17:00', '17:00 - 17:30', '17:30 - 18:00',
    '18:00 - 18:30', '18:30 - 19:00', '19:00 - 19:30', '19:30 - 20:00',
    '20:00 - 20:30', '20:30 - 21:00'
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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${apiUrl}/api/book`, {
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
    <div className="bg-orange-50 font-sans">
      {/* Hero Section */}
      <div 
        id="hero" 
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900"
        style={{
          backgroundImage: "url('/portada.jpg')",
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
            className="bg-[#e86b4f] hover:bg-[#d15f45] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 inline-flex items-center shadow-lg"
          >
            <Heart className="mr-2 w-5 h-5" />
            Descubre nuestros servicios
          </button>
        </div>
      </div>

      {/* ... (El resto del archivo sigue exactamente igual) ... */}
      
    </div>
  );
}

export default App;
