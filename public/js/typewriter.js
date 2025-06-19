class Typewriter {
    constructor() {
        this.isTyping = false;
        this.currentQueue = [];
        this.defaultSpeed = 50; // Velocidad por defecto en ms
        this.defaultDelay = 300; // Delay entre líneas en ms
    }

    /**
     * Método principal para simular escritura en los elementos de explicación
     * @param {number} speed - Velocidad de escritura en ms (opcional)
     * @param {number} lineDelay - Delay entre líneas en ms (opcional)
     */
    async Typear(speed = this.defaultSpeed, lineDelay = this.defaultDelay) {
        // Si ya está escribiendo, cancelar la operación anterior
        if (this.isTyping) {
            this.stopTyping();
        }

        this.isTyping = true;

        // Obtener los elementos
        const line1 = document.getElementById('explanation-line-1');
        const line2 = document.getElementById('explanation-line-2');
        const line3 = document.getElementById('explanation-line-3');

        // Verificar que los elementos existan
        if (!line1 || !line2 || !line3) {
            console.warn('No se encontraron todos los elementos de explicación');
            this.isTyping = false;
            return;
        }

        // Obtener el contenido actual de cada línea
        const content1 = line1.textContent || line1.innerText || '';
        const content2 = line2.textContent || line2.innerText || '';
        const content3 = line3.textContent || line3.innerText || '';

        // Si no hay contenido, no hacer nada
        if (!content1 && !content2 && !content3) {
            this.isTyping = false;
            return;
        }

        try {
            // Limpiar los elementos y agregar clase de escritura
            this.prepareElements([line1, line2, line3]);

            // Escribir secuencialmente
            if (content1) {
                await this.typeText(line1, content1, speed);
                if (!this.isTyping) return; // Verificar si se canceló
                await this.delay(lineDelay);
            }

            if (content2) {
                await this.typeText(line2, content2, speed);
                if (!this.isTyping) return; // Verificar si se canceló
                await this.delay(lineDelay);
            }

            if (content3) {
                await this.typeText(line3, content3, speed);
            }

            // Remover clases de escritura al finalizar
            this.finishTyping([line1, line2, line3]);

        } catch (error) {
            console.error('Error durante la escritura:', error);
        } finally {
            this.isTyping = false;
        }
    }

    /**
     * Prepara los elementos para la animación de escritura
     * @param {Array} elements - Array de elementos DOM
     */
    prepareElements(elements) {
        elements.forEach(element => {
            if (element) {
                // Guardar el contenido original
                element.setAttribute('data-original-content', element.textContent || '');
                // Limpiar el contenido
                element.textContent = '';
                // Agregar clase de escritura
                element.classList.add('typing');
                // Mostrar cursor de escritura
                element.style.borderRight = '2px solid var(--author-primary, #26BAA5)';
                element.style.animation = 'blink 1s infinite';
            }
        });
    }

    /**
     * Escribe texto caracter por caracter en un elemento
     * @param {HTMLElement} element - Elemento donde escribir
     * @param {string} text - Texto a escribir
     * @param {number} speed - Velocidad de escritura
     */
    async typeText(element, text, speed) {
        return new Promise((resolve) => {
            let index = 0;
            
            const typeInterval = setInterval(() => {
                if (!this.isTyping) {
                    clearInterval(typeInterval);
                    resolve();
                    return;
                }

                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                    // Remover cursor de este elemento
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                    resolve();
                }
            }, speed);
        });
    }

    /**
     * Finaliza la animación de escritura
     * @param {Array} elements - Array de elementos DOM
     */
    finishTyping(elements) {
        elements.forEach(element => {
            if (element) {
                element.classList.remove('typing');
                element.style.borderRight = 'none';
                element.style.animation = 'none';
                element.classList.add('typing-complete');
            }
        });
    }

    /**
     * Detiene la escritura actual
     */
    stopTyping() {
        this.isTyping = false;
        
        // Restaurar contenido original si existe
        const elements = [
            document.getElementById('explanation-line-1'),
            document.getElementById('explanation-line-2'),
            document.getElementById('explanation-line-3')
        ];

        elements.forEach(element => {
            if (element) {
                const originalContent = element.getAttribute('data-original-content');
                if (originalContent !== null) {
                    element.textContent = originalContent;
                    element.removeAttribute('data-original-content');
                }
                element.classList.remove('typing');
                element.classList.add('typing-complete');
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }
        });
    }

    /**
     * Actualiza el contenido y ejecuta la animación de escritura
     * @param {string} line1Content - Contenido para línea 1
     * @param {string} line2Content - Contenido para línea 2
     * @param {string} line3Content - Contenido para línea 3
     * @param {number} speed - Velocidad de escritura (opcional)
     * @param {number} lineDelay - Delay entre líneas (opcional)
     */
    async updateAndType(line1Content = '', line2Content = '', line3Content = '', speed, lineDelay) {
        // Actualizar contenido
        const line1 = document.getElementById('explanation-line-1');
        const line2 = document.getElementById('explanation-line-2');
        const line3 = document.getElementById('explanation-line-3');

        if (line1) line1.textContent = line1Content;
        if (line2) line2.textContent = line2Content;
        if (line3) line3.textContent = line3Content;

        // Ejecutar animación
        await this.Typear(speed, lineDelay);
    }

    /**
     * Verifica si actualmente se está escribiendo
     * @returns {boolean}
     */
    isCurrentlyTyping() {
        return this.isTyping;
    }

    /**
     * Función de utilidad para crear delay
     * @param {number} ms - Milisegundos de delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Configura velocidades personalizadas
     * @param {number} speed - Nueva velocidad por defecto
     * @param {number} lineDelay - Nuevo delay entre líneas
     */
    setDefaultSpeeds(speed, lineDelay) {
        this.defaultSpeed = speed;
        this.defaultDelay = lineDelay;
    }
}

// CSS para la animación del cursor
const typewriterCSS = `
@keyframes blink {
    0%, 50% { border-color: transparent; }
    51%, 100% { border-color: var(--author-primary, #26BAA5); }
}

.typing {
    position: relative;
}

.typing-complete {
    animation: fadeInComplete 0.3s ease-in;
}

@keyframes fadeInComplete {
    from { opacity: 0.7; }
    to { opacity: 1; }
}
`;

// Inyectar CSS si no existe
if (!document.getElementById('typewriter-styles')) {
    const style = document.createElement('style');
    style.id = 'typewriter-styles';
    style.textContent = typewriterCSS;
    document.head.appendChild(style);
}

// Crear instancia global
window.typewriter = new Typewriter();

// Función global para fácil acceso
window.Typear = function(speed, lineDelay) {
    return window.typewriter.Typear(speed, lineDelay);
};

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Typewriter;
}
