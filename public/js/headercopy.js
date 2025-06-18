class HeaderManager {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.lastScrollTop = 0;
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleActiveNavigation();
        this.initScrollEffects();
        this.initIntersectionObserver();
    }

    bindEvents() {
        // Toggle menú móvil
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
        }

        // Cerrar menú móvil al hacer clic en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.classList.contains('mobile-nav-link')) {
                    this.closeMobileMenu();
                }
                this.handleNavClick(e, link);
            });
        });

        // Cerrar menú móvil al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.mobileMenu.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Cerrar menú móvil con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Efectos de scroll
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        // Redimensionar ventana
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.isMenuOpen = true;
        this.mobileMenuToggle.classList.add('active');
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animación escalonada de los elementos del menú
        const menuItems = this.mobileMenu.querySelectorAll('.mobile-nav-item');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });

        // Anunciar cambio para lectores de pantalla
        this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        this.mobileMenu.setAttribute('aria-hidden', 'false');
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileMenuToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Anunciar cambio para lectores de pantalla
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        this.mobileMenu.setAttribute('aria-hidden', 'true');
    }

    handleNavClick(e, link) {
        const href = link.getAttribute('href');
        
        // Si es un enlace de ancla interno
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Smooth scroll al elemento
                const headerHeight = this.header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar navegación activa
                this.updateActiveNavigation(link);
            }
        }
    }

    updateActiveNavigation(activeLink) {
        // Remover clase active de todos los enlaces
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Añadir clase active al enlace clickeado
        activeLink.classList.add('active');
        
        // Si hay un enlace correspondiente en el otro menú, también activarlo
        const href = activeLink.getAttribute('href');
        const correspondingLink = document.querySelector(
            activeLink.classList.contains('mobile-nav-link') 
                ? `.nav-link[href="${href}"]`
                : `.mobile-nav-link[href="${href}"]`
        );
        
        if (correspondingLink) {
            correspondingLink.classList.add('active');
        }
    }

    handleActiveNavigation() {
        // Detectar sección activa basada en scroll
        const sections = document.querySelectorAll('section[id], div[id]');
        
        if (sections.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const correspondingLinks = document.querySelectorAll(`a[href="#${id}"]`);
                    
                    // Remover active de todos los enlaces
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Añadir active a los enlaces correspondientes
                    correspondingLinks.forEach(link => link.classList.add('active'));
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: `-${this.header.offsetHeight}px 0px -50% 0px`
        });
        
        sections.forEach(section => observer.observe(section));
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de header al hacer scroll
        if (scrollTop > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header en scroll (opcional)
        if (scrollTop > this.lastScrollTop && scrollTop > 200) {
            // Scrolling down
            this.header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            this.header.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }

    initScrollEffects() {
        // Parallax suave para el header
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (this.header) {
                this.header.style.backgroundPosition = `center ${parallax}px`;
            }
        }, 16));
    }

    initIntersectionObserver() {
        // Animaciones cuando los elementos entran en vista
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observar elementos animables
        const animatableElements = document.querySelectorAll('.brand-section, .author-info');
        animatableElements.forEach(el => observer.observe(el));
    }

    handleResize() {
        // Cerrar menú móvil si se redimensiona a desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Recalcular posiciones para navegación activa
        this.handleActiveNavigation();
    }

    // Utilidades
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Métodos públicos para interacción externa
    setActiveNavigation(sectionId) {
        const targetLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (targetLink) {
            this.updateActiveNavigation(targetLink);
        }
    }

    showNotification(message, type = 'info') {
        // Sistema de notificaciones simple
        const notification = document.createElement('div');
        notification.className = `header-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: ${this.header.offsetHeight + 20}px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.headerManager = new HeaderManager();
});

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderManager;
}
"