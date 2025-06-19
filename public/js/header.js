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
        //
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
        }

        
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.classList.contains('mobile-nav-link')) {
                    this.closeMobileMenu();
                }
                this.handleNavClick(e, link);
            });
        });

        
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.mobileMenu.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        
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

        
        this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        this.mobileMenu.setAttribute('aria-hidden', 'false');
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileMenuToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        this.mobileMenu.setAttribute('aria-hidden', 'true');
    }

    handleNavClick(e, link) {
        const href = link.getAttribute('href');
        
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                
                const headerHeight = this.header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                
                this.updateActiveNavigation(link);
            }
        }
    }

    updateActiveNavigation(activeLink) {
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        
        activeLink.classList.add('active');
        
        
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
        
        const sections = document.querySelectorAll('section[id], div[id]');
        
        if (sections.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const correspondingLinks = document.querySelectorAll(`a[href="#${id}"]`);
                    
                    
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    
                    
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
        
        
        if (scrollTop > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        
        if (scrollTop > this.lastScrollTop && scrollTop > 200) {
            
            this.header.style.transform = 'translateY(-100%)';
        } else {
            
            this.header.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }

    initScrollEffects() {
        
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (this.header) {
                this.header.style.backgroundPosition = `center ${parallax}px`;
            }
        }, 16));
    }

    initIntersectionObserver() {
        
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
        
        
        const animatableElements = document.querySelectorAll('.brand-section, .author-info');
        animatableElements.forEach(el => observer.observe(el));
    }

    handleResize() {
        
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        
        this.handleActiveNavigation();
    }

    
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

    
    setActiveNavigation(sectionId) {
        const targetLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (targetLink) {
            this.updateActiveNavigation(targetLink);
        }
    }

    showNotification(message, type = 'info') {
        
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
        
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    window.headerManager = new HeaderManager();
});


if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderManager;
}


