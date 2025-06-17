<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>itesolve</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/header.css">
</head>
<body>
    <div class="container">
        <!-- Header con logotipo -->
        <header class="main-header">
    <div class="header-container">
        <!-- Logo y Branding -->
        <div class="brand-section">
            <div class="logo-container">
                <img src="{{ asset('images/logo.png') }}" alt="Logo" class="logo">
            </div>
            <div class="brand-info">
                <h1 class="company-name">ITESOLVE PRO</h1>
                <p class="company-slogan">Divide y vencerás, ¡paso a paso!</p>
            </div>
        </div>

        <!-- Navegación Principal -->
        <nav class="main-navigation">
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#inicio" class="nav-link active">Inicio</a>
                </li>
                <li class="nav-item">
                    <a href="#calculadora" class="nav-link">Calculadora</a>
                </li>
                <li class="nav-item">
                    <a href="#tutorial" class="nav-link">Tutorial</a>
                </li>
                <li class="nav-item">
                    <a href="#ejemplos" class="nav-link">Ejemplos</a>
                </li>
               <a href="https://wa.me/59175553338" 
                target="_blank" 
                class="whatsapp-btn"
                title="Chatea con nosotros">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                        alt="Logo WhatsApp" 
                        class="whatsapp-icon">
                
                </a>
                
            </ul>
        </nav>

    
        <!-- Botón de menú móvil -->
        <button class="mobile-menu-toggle" aria-label="Abrir menú">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>
    </div>

    <!-- Menú móvil -->
    <div class="mobile-menu">
        <div class="mobile-menu-content">
            <ul class="mobile-nav-menu">
                <li class="mobile-nav-item">
                    <a href="#inicio" class="mobile-nav-link">Inicio</a>
                </li>
                <li class="mobile-nav-item">
                    <a href="#calculadora" class="mobile-nav-link">Calculadora</a>
                </li>
                <li class="mobile-nav-item">
                    <a href="#tutorial" class="mobile-nav-link">Tutorial</a>
                </li>
                <li class="mobile-nav-item">
                    <a href="#ejemplos" class="mobile-nav-link">Ejemplos</a>
                </li>
                <li class="mobile-nav-item">
                    <a href="#contacto" class="mobile-nav-link">Contacto</a>
                </li>
            </ul>
            <div class="mobile-author-section">
                <img src="{{ asset('images/author.jpg') }}" alt="Autor" class="mobile-author-avatar">
                <div class="mobile-author-details">
                    <span class="mobile-author-name">Creado por Desarrollador</span>
                    <span class="mobile-author-title">Especialista en Educación Digital</span>
                </div>
            </div>
        </div>
    </div>
</header>


        <!-- Panel de entrada -->
        <div class="input-panel">
            <h2>División paso a paso</h2>
            <div class="input-group">
                <div class="input-field dividendo">
                    <label for="dividendo">Dividendo</label>
                    <input type="number" id="dividendo" placeholder="Ingrese dividendo" min="1">
                    <div class="error-container"></div>
                </div>
                <div class="input-field divisor">
                    <label for="divisor">Divisor</label>
                    <input type="number" id="divisor" placeholder="ingrese divisor" min="1">
                    <div class="error-container"></div>
                </div>
                <button id="iniciar-btn" class="btn-iniciar">Iniciar</button>
            </div>
            <!-- Contenedor para alertas personalizadas -->
            <div id="alert-container" class="alert-container"></div>
        </div>

       <!-- Panel de explicación (parte inferior) -->
        <div id="explanation-panel" class="explanation-panel" style="display: none;">
            <div class="explanation-content">
                <div id="explanation-line-1" class="explanation-line"></div>
                <div id="explanation-line-2" class="explanation-line"></div>
                <div id="explanation-line-3" class="explanation-line"></div>
            </div>
        </div>


        <!-- Panel de control (botones en la parte superior) -->
       

        <!-- Panel de división -->
        <div id="division-grid" class="division-grid">
            <div id="control-panel" class="control-panel" style="display: none;">
                <button id="reiniciar-btn" class="control-btn btn-reiniciar">
                    <span class="btn-text">Reiniciar</span>
                </button>
                <button id="atras-btn" class="control-btn btn-atras">
                    <span class="btn-text">Atrás</span>
                </button>
                <button id="siguiente-btn" class="control-btn btn-siguiente">
                    <span class="btn-text">Siguiente</span>
                </button>
                <button id="resolver-todo-btn" class="control-btn btn-resolver-todo">
                    <span class="btn-text">Resolver Todo</span>
                </button>
            </div>
            
            <div class="grid-container">
                <!-- La cuadrícula se generará dinámicamente aquí -->
            </div>
        </div>

       
        <!-- Panel de resultado final -->
        <div id="result-panel" class="result-panel">
            <h3>Resultado Final</h3>
            <div class="result-content">
                <div class="result-item">
                    <h4>Cociente</h4>
                    <div id="final-cociente" class="value">-</div>
                </div>
                <div class="result-item">
                    <h4>Residuo</h4>
                    <div id="final-residuo" class="value">-</div>
                </div>
                <div class="result-item">
                    <h4>Verificación</h4>
                    <div id="final-verificacion" class="value">-</div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/script.js') }}"></script>
    <script src="{{ asset('js/header.js') }}"></script>
</body>
</html>
