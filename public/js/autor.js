// JavaScript para la sección del autor
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el título de la página
    const pageTitle = document.title || 'División Larga - Calculadora Paso a Paso';
    
    // Configurar el enlace de WhatsApp
    const whatsappBtn = document.getElementById('whatsapp-contact');
    
    if (whatsappBtn) {
        // Número de WhatsApp (reemplaza con tu número real)
        const phoneNumber = '+59171039910'; // Cambia por tu número
        
        // Mensaje personalizado
        const message = `Hola David! Vengo de "${pageTitle}" y me interesa contactarte.`;
        
        // Crear URL de WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Asignar URL al botón
        whatsappBtn.href = whatsappUrl;
        
        // Agregar evento de clic para analytics (opcional)
        whatsappBtn.addEventListener('click', function() {
            // Aquí puedes agregar código de seguimiento
            console.log('WhatsApp contact clicked from:', pageTitle);
        });
    }
    
    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const authorSection = document.querySelector('.author-section');
    if (authorSection) {
        observer.observe(authorSection);
    }
    
    // Efecto parallax suave en las decoraciones
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const decorationCircles = document.querySelectorAll('.decoration-circle');
        
        decorationCircles.forEach((circle, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            circle.style.transform = `translateY(${yPos}px)`;
        });
    });
});
