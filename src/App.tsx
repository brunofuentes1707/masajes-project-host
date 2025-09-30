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

  // [AJUSTADO] Nuevo horario para el dropdown
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
      {/* ... (Hero Section sin cambios) ... */}

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

      {/* ... (Services Section sin cambios) ... */}

      <section id="booking" className="py-20 bg-gradient-to-br from-orange-100 to-orange-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-stone-800 mb-16">
            Reserva tu Sesión
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-[#f2855a] p-10 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-4">Horarios Disponibles</h3>
                {/* [AJUSTADO] Nuevo texto de horario */}
                <p className="text-orange-100 mb-6">
                  Festivos y Feriados:<br />
                  12:00 - 21:00
                </p>
                <div className="bg-white/20 p-4 rounded-lg">
                  <h4 className="font-bold text-white mb-2 flex items-center">
                    <AlertCircle className="mr-2 w-5 h-5" />
                    Consejo rápido
                  </h4>
                  <p className="text-orange-100 text-sm">Reserva con anticipación para garantizar tu horario preferido.</p>
                </div>
              </div>
              <div className="md:w-1/2 p-10">
                <form className="space-y-4" onSubmit={handleBookingSubmit}>
                    {/* ... (El formulario en sí no cambia) ... */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... (Wellness Tips Section sin cambios) ... */}

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
                    <div>
                        <h4 className="font-bold text-stone-800">Ubicación</h4>
                        {/* [AJUSTADO] Nueva ubicación */}
                        <p className="text-gray-600">Punto Copec, Ruta 78</p>
                    </div>
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
                    <div>
                        <h4 className="font-bold text-stone-800">Horario</h4>
                        {/* [AJUSTADO] Nuevo horario */}
                        <p className="text-gray-600">Festivos y Feriados: 12:00 - 21:00</p>
                    </div>
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
                <li className="flex items-center">
                  <MapPin className="mr-2 w-4 h-4" />
                  {/* [AJUSTADO] Nueva ubicación en el footer */}
                  Punto Copec, Ruta 78
                </li>
                <li className="flex items-center"><Phone className="mr-2 w-4 h-4" />+56 9 7583 3215</li>
                <li className="flex items-center"><Mail className="mr-2 w-4 h-4" />hola@detenterecargayavanza.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Horario</h4>
              <ul className="space-y-2 text-stone-300">
                {/* [AJUSTADO] Nuevo horario en el footer */}
                <li>Festivos y Feriados:</li>
                <li>12:00 - 21:00</li>
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
