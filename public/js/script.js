// DivisionCalculator: Simula la división larga en cuadrícula tipo cuaderno, paso a paso, con alineación exacta.
// Muestra el dividendo y divisor en la primera fila, el cociente debajo del divisor, y los residuos parciales alineados.
// La cuadrícula es dinámica y se adapta a la cantidad de dígitos, sin dejar espacios vacíos en el proceso.

class DivisionCalculator {
    constructor() {
        // Estado principal de la división
        this.dividendo = 0;
        this.divisor = 0;
        this.currentStep = 0; // Paso actual del proceso
        this.steps = [];      // Array de todos los pasos (para avanzar/retroceder)
        this.gridContainer = null;
        this.currentOperationDiv = null;
        this.maxCols = 0;     // Número de columnas de la cuadrícula
        this.maxRows = 0;     // Número de filas de la cuadrícula
        this.initializeEventListeners();
    }

    // Inicializa los listeners de los botones y entradas
    initializeEventListeners() {
        document.getElementById('iniciar-btn').addEventListener('click', () => this.iniciarDivision());
        document.getElementById('reiniciar-btn').addEventListener('click', () => this.reiniciar());
        document.getElementById('atras-btn').addEventListener('click', () => this.pasoAnterior());
        document.getElementById('siguiente-btn').addEventListener('click', () => this.pasoSiguiente());
        document.getElementById('resolver-todo-btn').addEventListener('click', () => this.resolverTodo());
        
        // Event listeners para los campos de entrada
        const dividendoInput = document.getElementById('dividendo');
        const divisorInput = document.getElementById('divisor');
        
        dividendoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.iniciarDivision();
        });
        dividendoInput.addEventListener('input', () => {
            this.limpiarAlertas();
        });
        
        divisorInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.iniciarDivision();
        });
        divisorInput.addEventListener('input', () => {
            this.limpiarAlertas();
        });
    }

    // Inicia la división: valida entradas y genera todos los pasos
    iniciarDivision() {
        const dividendoInput = document.getElementById('dividendo');
        const divisorInput = document.getElementById('divisor');
        
        // Limpiar alertas anteriores
        this.limpiarAlertas();
        
        this.dividendo = parseInt(dividendoInput.value);
        this.divisor = parseInt(divisorInput.value);
        
        let hayErrores = false;
        
        if (this.dividendo && this.divisor && this.dividendo < this.divisor) {
            this.mostrarAlerta('El dividendo debe ser mayor o igual al divisor.', 'error');
            hayErrores = true;
        }
        
        if (!this.dividendo || !this.divisor || this.divisor === 0) {
            this.mostrarAlerta('Por favor, ingresa números válidos.', 'error');
            hayErrores = true;
        }
        
        if (hayErrores) {
            return;
        }
        
        this.currentStep = 0;
        this.steps = [];
        this.calcularTodosLosPasos();
        this.mostrarInterfaz();
        this.renderizarCuadricula();
        this.actualizarBotones();
    }

    // Calcula todos los pasos de la división de una vez
    calcularTodosLosPasos() {
        const dividendoStr = this.dividendo.toString();
        const divisorStr = this.divisor.toString();
        const dividendoArr = dividendoStr.split('').map(Number);
        
        // Configurar dimensiones de la cuadrícula
        this.maxCols = dividendoStr.length + divisorStr.length + dividendoStr.length;
        this.maxRows = dividendoStr.length + 2;
        
        let cociente = '';
        let filaCociente = [];
        let filasRestosParciales = [];
        let i = 0; // Índice del dígito actual del dividendo
        
        // Procesar cada dígito del dividendo
        while (i < dividendoArr.length) {
            // Formar el dividendo parcial
            let dividendoParcial = 0;
            let startDigitIndex = i; // Índice del primer dígito del dividendo parcial
            
            if (this.steps.length === 0) {
                // Primer paso: empezar con el primer dígito
                dividendoParcial = dividendoArr[0];
            } else {
                // Pasos subsiguientes: usar el residuo del paso anterior + siguiente dígito
                const pasoAnterior = this.steps[this.steps.length - 1];
                dividendoParcial = pasoAnterior.remainderForStep * 10 + dividendoArr[i];
            }
            
            // Si el dividendo parcial es menor que el divisor, tomar más cifras
            while (dividendoParcial < this.divisor && i + 1 < dividendoArr.length) {
                i++; // Avanzar al siguiente dígito
                let nextDigit = dividendoArr[i];
                dividendoParcial = dividendoParcial * 10 + nextDigit;
            }
            
            // Ahora realizar la división
            if (dividendoParcial >= this.divisor) {
                // Realizar la división
                let mult = Math.floor(dividendoParcial / this.divisor);
                let prod = mult * this.divisor;
                let res = dividendoParcial - prod;
                
                cociente += mult.toString();
                filaCociente = cociente.split('');
                
                // Crear fila de restos para mostrar el residuo
                let filaRestosPaso = Array(this.maxCols).fill('');
                let resStr = res.toString();
                let startCol = i - resStr.length + 1;
                if (startCol < 0) startCol = 0;
                
                for (let j = 0; j < resStr.length; j++) {
                    filaRestosPaso[startCol + j] = resStr[j];
                }
                
                // Agregar dígito bajado si hay más
                if (i + 1 < dividendoArr.length) {
                    let nextDigit = dividendoArr[i + 1];
                    let colBajada = startCol + resStr.length;
                    if (colBajada < this.maxCols) {
                        filaRestosPaso[colBajada] = nextDigit.toString();
                    }
                }
                
                filasRestosParciales.push([...filaRestosPaso]);
                
                // Crear el paso
                const step = {
                    dividendo: dividendoStr,
                    divisor: divisorStr,
                    cociente: cociente,
                    filaCociente: [...filaCociente],
                    filasRestosParciales: filasRestosParciales.map(fila => [...fila]),
                    paso: this.steps.length,
                    maxCols: this.maxCols,
                    maxRows: this.maxRows,
                    initialPartialDividendForStep: dividendoParcial,
                    productForStep: prod,
                    remainderForStep: res,
                    droppedDigitCol: i,
                    cocienteDigitForStep: mult.toString(),
                    colActual: startCol + resStr.length - 1,
                    isDropStep: false
                };
                
                this.steps.push(step);
            } else {
                // No hay más dígitos para bajar, agregar 0 al cociente
                cociente += '0';
                filaCociente = cociente.split('');
                
                // Crear fila de restos para mostrar el residuo final
                let filaRestosPaso = Array(this.maxCols).fill('');
                let partialStr = dividendoParcial.toString();
                let startCol = i - partialStr.length + 1;
                if (startCol < 0) startCol = 0;
                
                for (let j = 0; j < partialStr.length; j++) {
                    filaRestosPaso[startCol + j] = partialStr[j];
                }
                
                filasRestosParciales.push([...filaRestosPaso]);
                
                // Crear el paso final
                const step = {
                    dividendo: dividendoStr,
                    divisor: divisorStr,
                    cociente: cociente,
                    filaCociente: [...filaCociente],
                    filasRestosParciales: filasRestosParciales.map(fila => [...fila]),
                    paso: this.steps.length,
                    maxCols: this.maxCols,
                    maxRows: this.maxRows,
                    initialPartialDividendForStep: dividendoParcial,
                    productForStep: 0,
                    remainderForStep: dividendoParcial,
                    droppedDigitCol: i,
                    cocienteDigitForStep: '0',
                    colActual: startCol + partialStr.length - 1,
                    isDropStep: false
                };
                
                this.steps.push(step);
                break; // Terminar la división
            }
            
            i++; // Avanzar al siguiente dígito
        }
    }

    // Muestra la interfaz principal (cuadrícula, paneles, etc.)
    mostrarInterfaz() {
        document.getElementById('division-grid').style.display = 'block';
        document.getElementById('explanation-panel').style.display = 'block';
        document.getElementById('control-panel').style.display = 'flex';
        document.getElementById('result-panel').style.display = 'none';
        this.gridContainer = document.querySelector('.grid-container');
    }

    // Renderiza la cuadrícula tipo cuaderno con la L y los números alineados
    renderizarCuadricula() {
        if (this.currentStep >= this.steps.length) return;
        const step = this.steps[this.currentStep];
        const totalFilas = step.maxRows;
        this.gridContainer.innerHTML = '';

        // --- Lógica para el resaltado y el texto de la operación ---
        let idxCociente = step.cociente.length - 1;
        let filaRestosResaltar = -1; 
        let colResiduoDesde = -1, colResiduoHasta = -1, colBajada = -1;
        let explicacionLinea1 = '', explicacionLinea2 = '', explicacionLinea3 = '';

        // Variables para la explicación
        let dividendoParcialExplicacion = step.initialPartialDividendForStep !== null ? step.initialPartialDividendForStep.toString() : '';
        let cocientePaso = step.cocienteDigitForStep || '';
        let productoExplicacion = step.productForStep !== null ? step.productForStep.toString() : '';
        let residuoExplicacion = step.remainderForStep !== null ? step.remainderForStep.toString() : '';
        let digitoBajado = ''; 

        // Determinar la fila de restos a resaltar
        filaRestosResaltar = idxCociente; 
        if (filaRestosResaltar < 0) filaRestosResaltar = 0;

        // Determinar el dígito bajado y su columna
        let esUltimoPaso = this.currentStep === this.steps.length - 1;
        
        if (step.droppedDigitCol !== -1 && !esUltimoPaso) {
            digitoBajado = step.dividendo[step.droppedDigitCol];
            colBajada = step.droppedDigitCol;
        } else {
            if (step.initialPartialDividendForStep !== null && step.paso > 0 && !esUltimoPaso) {
                let prevStep = this.steps[this.currentStep -1];
                if (prevStep && prevStep.remainderForStep !== null) {
                    let lenPrevResidue = prevStep.remainderForStep.toString().length;
                    if (step.initialPartialDividendForStep.toString().length > lenPrevResidue) {
                        colBajada = prevStep.colActual + 1;
                        if (step.dividendo[colBajada]) {
                            digitoBajado = step.dividendo[colBajada];
                        }
                    }
                }
            }
        }

        // Determinar el rango del residuo para resaltado
        let currentFilaRestosContent = step.filasRestosParciales[filaRestosResaltar] || [];
        if (currentFilaRestosContent.length > 0) {
            colResiduoDesde = currentFilaRestosContent.findIndex(x => x !== '');
            colResiduoHasta = colResiduoDesde;
            if (colResiduoDesde !== -1) {
                for (let i = colResiduoDesde + 1; i < currentFilaRestosContent.length; i++) {
                    if (currentFilaRestosContent[i] !== '') colResiduoHasta = i;
                    else break;
                }
            }
            
            if (step.cocienteDigitForStep === '0' && step.productForStep === 0) {
                if (colResiduoDesde !== -1) {
                    let dividendoParcialStr = step.initialPartialDividendForStep.toString();
                    colBajada = colResiduoDesde + dividendoParcialStr.length;
                    if (colBajada < currentFilaRestosContent.length && currentFilaRestosContent[colBajada] !== '') {
                        digitoBajado = currentFilaRestosContent[colBajada];
                    }
                }
            } else {
                if (colResiduoDesde !== -1 && step.remainderForStep !== null && !esUltimoPaso) {
                    let resStr = step.remainderForStep.toString();
                    colBajada = colResiduoDesde + resStr.length;
                    if (colBajada < currentFilaRestosContent.length && currentFilaRestosContent[colBajada] !== '') {
                        digitoBajado = currentFilaRestosContent[colBajada];
                    }
                }
            }
        }

        const spanDividendo = `<span class='resaltado-dividendo'>${dividendoParcialExplicacion}</span>`;
        const spanDivisor = `<span class='resaltado-divisor'>${step.divisor}</span>`;
        const spanCociente = `<span class='resaltado-cociente'>${cocientePaso}</span>`;
        const spanProducto = `<span class='resaltado-residuo'>${productoExplicacion}</span>`; 
        const spanResiduo = `<span class='resaltado-residuo'>${residuoExplicacion}</span>`;
        const spanBajada = digitoBajado ? `<span class='resaltado-bajada'>${digitoBajado}</span>` : '';

        explicacionLinea1 = `<strong>Paso ${this.currentStep + 1}:</strong> Buscamos un número que multiplicado por ${spanDivisor} se acerque o iguale a ${spanDividendo}`;
        
        if (step.cocienteDigitForStep === '0' && step.productForStep === 0) {
            explicacionLinea2 = `<em>El dividendo parcial ${spanDividendo} es menor que el divisor ${spanDivisor}.</em>`;
            if (digitoBajado) {
                explicacionLinea3 = `<em>Se agrega un ${spanCociente} al cociente y se baja la siguiente cifra: ${spanBajada}</em>`; 
            } else {
                explicacionLinea3 = `<em>No hay más cifras para bajar. Se agrega un ${spanCociente} al cociente y finaliza la división.</em>`;
            }
        } else if (step.isDropStep === true || (step.cocienteDigitForStep === '' && step.productForStep === 0)) {
            explicacionLinea2 = `<em>Se baja la siguiente cifra: ${spanBajada}</em>`;
            explicacionLinea3 = `<em>Nuevo dividendo parcial: ${spanDividendo}</em>`;
        } else {
            explicacionLinea2 = `<em>${spanCociente} × ${spanDivisor} = ${spanProducto}</em>`;
            explicacionLinea3 = `<em>Residuo: ${spanResiduo}</em>`;
            if (digitoBajado) {
                explicacionLinea3 += `<br><em>Se baja la siguiente cifra: ${spanBajada}</em>`; 
            } else {
                explicacionLinea3 += `<br><em>Fin de la división</em>`;
            }
        }
        
        // Actualizar las explicaciones en el DOM
        document.getElementById('explanation-line-1').innerHTML = explicacionLinea1;
        document.getElementById('explanation-line-2').innerHTML = explicacionLinea2;
        document.getElementById('explanation-line-3').innerHTML = explicacionLinea3;

        // --- Renderizado de la cuadrícula con tabla HTML ---
        const table = document.createElement('table');
        table.className = 'cuaderno-matriz';
        table.style.borderCollapse = 'collapse';

        // Fila 0: dividendo y divisor
        const tr0 = document.createElement('tr');
        for (let i = 0; i < step.dividendo.length; i++) {
            const td = document.createElement('td');
            td.className = 'cuadro-celda';
            td.textContent = step.dividendo[i];
            if (i === step.dividendo.length - 1) {
                td.style.borderRight = '4px solid black';
            }
            // Resaltar el dividendo parcial en la fila correspondiente al paso
            if (this.currentStep === step.paso && step.paso === 0) {
                const lenPartialDiv = step.initialPartialDividendForStep.toString().length;
                const startColInOriginalDiv = step.colActual - (lenPartialDiv - 1); 
                if (i >= startColInOriginalDiv && i <= step.colActual) {
                    td.classList.add('resaltado-dividendo');
                }
            }
            tr0.appendChild(td);
        }
        for (let i = 0; i < step.divisor.length; i++) {
            const td = document.createElement('td');
            td.className = 'cuadro-celda';
            td.textContent = step.divisor[i];
            td.style.borderBottom = '4px solid black';
            if (i === 0) {
                td.style.borderLeft = '4px solid black';
            }
            td.classList.add('resaltado-divisor');
            tr0.appendChild(td);
        }
        for (let i = step.dividendo.length + step.divisor.length; i < step.maxCols; i++) {
            const td = document.createElement('td');
            td.className = 'cuadro-celda';
            td.style.borderBottom = '4px solid black';
            tr0.appendChild(td);
        }
        table.appendChild(tr0);

        // Fila 1: cociente y primer resto parcial
        const tr1 = document.createElement('tr');
        let filaParaEstaFilaDeRestos = step.filasRestosParciales[0] || []; 

        for (let i = 0; i < step.dividendo.length; i++) {
            const td = document.createElement('td');
            td.className = 'cuadro-celda';
            td.textContent = (filaParaEstaFilaDeRestos[i] || '');
            if (i === step.dividendo.length - 1) {
                td.style.borderRight = '4px solid black';
            }
            // Resaltado del residuo y bajada en la fila 1
            if (filaRestosResaltar === 0) {
                if (colResiduoDesde !== -1 && i >= colResiduoDesde && i <= colResiduoHasta) {
                    td.classList.add('resaltado-residuo');
                }
                if (colBajada !== -1 && i === colBajada) {
                    td.classList.add('resaltado-bajada');
                }
            }
            // Resaltar el dividendo parcial en la fila correspondiente al paso
            if (this.currentStep === step.paso && step.paso === 1) {
                const lenPartialDiv = step.initialPartialDividendForStep.toString().length;
                const startColInRestos = step.colActual - (lenPartialDiv - 1); 
                if (i >= startColInRestos && i <= step.colActual) {
                    td.classList.add('resaltado-dividendo');
                }
            }
            tr1.appendChild(td);
        }
        
        // Mostrar el cociente horizontalmente en las columnas después del dividendo
        for (let i = 0; i < step.divisor.length; i++) {
            const td = document.createElement('td');
            td.className = 'cuadro-celda';
            // Mostrar el cociente horizontalmente en la primera fila
            if (i < step.cociente.length) {
                td.textContent = step.cociente[i];
                // Solo resaltar el dígito del cociente que se está calculando en este paso
                if (i === step.cociente.length - 1 && this.currentStep === step.paso) {
                    td.classList.add('resaltado-cociente');
                }
            }
            if (i === 0) {
                td.style.borderLeft = '4px solid black';
            }
            tr1.appendChild(td);
        }
        
        // Agregar columnas adicionales para el resto del cociente si es necesario
        for (let i = step.divisor.length; i < step.cociente.length; i++) {
            const td = document.createElement('td');
            td.className = 'cuadro-celda';
            td.textContent = step.cociente[i];
            // Solo resaltar el dígito del cociente que se está calculando en este paso
            if (i === step.cociente.length - 1 && this.currentStep === step.paso) {
                td.classList.add('resaltado-cociente');
            }
            tr1.appendChild(td);
        }
        
        // Completar las columnas restantes
        for (let i = step.dividendo.length + step.cociente.length; i < step.maxCols; i++) {
            const td = document.createElement('td');
            td.className = 'cuadro-celda';
            tr1.appendChild(td);
        }
        table.appendChild(tr1);

        // Filas restantes para los restos parciales (sin mostrar cociente)
        for (let fila = 2; fila < totalFilas; fila++) {
            const tr = document.createElement('tr');
            let filaParaEstaFilaDeRestos = step.filasRestosParciales[fila - 1] || []; 

            for (let i = 0; i < step.dividendo.length; i++) {
                const td = document.createElement('td');
                td.className = 'cuadro-celda';
                td.textContent = (filaParaEstaFilaDeRestos[i] || '');
                if (i === step.dividendo.length - 1) {
                    td.style.borderRight = '4px solid black';
                }
                // Resaltado del residuo y bajada en las filas de restos
                if (filaRestosResaltar === fila - 1) {
                    if (colResiduoDesde !== -1 && i >= colResiduoDesde && i <= colResiduoHasta) {
                        td.classList.add('resaltado-residuo');
                    }
                    if (colBajada !== -1 && i === colBajada) {
                        td.classList.add('resaltado-bajada');
                    }
                }
                // Resaltar el dividendo parcial en la fila correspondiente al paso
                if (this.currentStep === step.paso && step.paso === fila) {
                    const lenPartialDiv = step.initialPartialDividendForStep.toString().length;
                    const startColInRestos = step.colActual - (lenPartialDiv - 1); 
                    if (i >= startColInRestos && i <= step.colActual) {
                        td.classList.add('resaltado-dividendo');
                    }
                }
                tr.appendChild(td);
            }
            for (let i = 0; i < step.divisor.length; i++) {
                const td = document.createElement('td');
                td.className = 'cuadro-celda';
                // No mostrar cociente en las filas subsiguientes
                if (i === 0) {
                    td.style.borderLeft = '4px solid black';
                }
                tr.appendChild(td);
            }
            for (let i = step.dividendo.length + step.divisor.length; i < step.maxCols; i++) {
                const td = document.createElement('td');
                td.className = 'cuadro-celda';
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        
        this.gridContainer.appendChild(table);
    }

    // Actualiza el estado de los botones según el paso actual
    actualizarBotones() {
        const atrasBtn = document.getElementById('atras-btn');
        const siguienteBtn = document.getElementById('siguiente-btn');
        const resolverTodoBtn = document.getElementById('resolver-todo-btn');
        
        atrasBtn.disabled = this.currentStep <= 0;
        siguienteBtn.disabled = this.currentStep >= this.steps.length - 1;
        resolverTodoBtn.disabled = this.currentStep >= this.steps.length - 1;
        
        // Actualizar estilos de los botones
        atrasBtn.classList.toggle('disabled', this.currentStep <= 0);
        siguienteBtn.classList.toggle('disabled', this.currentStep >= this.steps.length - 1);
        resolverTodoBtn.classList.toggle('disabled', this.currentStep >= this.steps.length - 1);
    }

    // Retrocede al paso anterior
    pasoAnterior() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderizarCuadricula();
            this.actualizarBotones();
        }
    }

    // Avanza al siguiente paso
    pasoSiguiente() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.renderizarCuadricula();
            this.actualizarBotones();
        }
    }

    // Resuelve toda la división automáticamente
    async resolverTodo() {
        while (this.currentStep < this.steps.length - 1) {
            await this.delay(1000);
            this.currentStep++;
            this.renderizarCuadricula();
            this.actualizarBotones();
        }
        this.mostrarResultadoFinal();
    }

    // Muestra el resultado final
    mostrarResultadoFinal() {
        const ultimoPaso = this.steps[this.steps.length - 1];
        document.getElementById('final-cociente').textContent = ultimoPaso.cociente;
        document.getElementById('final-residuo').textContent = ultimoPaso.remainderForStep;
        document.getElementById('final-verificacion').textContent = 
            `${ultimoPaso.cociente} × ${this.divisor} + ${ultimoPaso.remainderForStep} = ${this.dividendo}`;
        
        document.getElementById('result-panel').style.display = 'block';
    }

    // Reinicia la aplicación
    reiniciar() {
        this.currentStep = 0;
        this.steps = [];
        document.getElementById('division-grid').style.display = 'none';
        document.getElementById('explanation-panel').style.display = 'none';
        document.getElementById('control-panel').style.display = 'none';
        document.getElementById('result-panel').style.display = 'none';
        document.getElementById('dividendo').value = '';
        document.getElementById('divisor').value = '';
    }

    // Función de delay para animaciones
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Muestra una alerta personalizada
    mostrarAlerta(mensaje, tipo = 'error') {
        const alertContainer = document.getElementById('alert-container');
        if (alertContainer) {
            // Crear el elemento de alerta
            const alertElement = document.createElement('div');
            alertElement.className = `alert alert-${tipo}`;
            
            // Crear el contenido de la alerta
            alertElement.innerHTML = `
                <div class="alert-content">
                    <span class="alert-icon">${tipo === 'error' ? '⚠️' : 'ℹ️'}</span>
                    <span class="alert-message">${mensaje}</span>
                    <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
            `;
            
            // Agregar al contenedor
            alertContainer.appendChild(alertElement);
            
            // Auto-remover después de 5 segundos
            setTimeout(() => {
                if (alertElement.parentNode) {
                    alertElement.remove();
                }
            }, 5000);
        }
    }

    // Limpia todas las alertas
    limpiarAlertas() {
        const alertContainer = document.getElementById('alert-container');
        if (alertContainer) {
            alertContainer.innerHTML = '';
        }
    }

    // Muestra un mensaje de error debajo del campo especificado
    mostrarError(campo, mensaje) {
        // Buscar el contenedor de error dentro del input-field
        const errorContainer = campo.parentNode.querySelector('.error-container');
        if (errorContainer) {
            // Limpiar contenido anterior
            errorContainer.innerHTML = '';
            
            // Crear el mensaje de error
            const errorMessage = document.createElement('p');
            errorMessage.className = 'error-message';
            errorMessage.textContent = mensaje;
            
            // Agregar al contenedor
            errorContainer.appendChild(errorMessage);
            
            // Agregar clase de error al campo
            campo.classList.add('error');
        }
    }

    // Limpia todos los mensajes de error
    limpiarMensajesError() {
        const errorContainers = document.querySelectorAll('.error-container');
        errorContainers.forEach(container => {
            container.innerHTML = '';
        });
        
        // Remover clases de error de los campos
        const campos = document.querySelectorAll('.input-field input');
        campos.forEach(campo => {
            campo.classList.remove('error');
        });
    }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new DivisionCalculator();
});