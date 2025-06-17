<header class="main-header">
    <div class="header-container">
        <!-- Logo y Branding -->
        <div class="brand-section">
            <div class="logo-container">
                <img src="{{ asset('images/logo.png') }}" alt="Logo" class="logo">
            </div>
            <div class="brand-info">
                <h1 class="company-name">MathLearn Pro</h1>
                <p class="company-slogan">Aprende matemáticas paso a paso</p>
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
                <li class="nav-item">
                    <a href="#contacto" class="nav-link">Contacto</a>
                </li>
            </ul>
        </nav>

        <!-- Información del Autor -->
        <div class="author-section">
            <div class="author-info">
                <img src="{{ asset('images/author.jpg') }}" alt="Autor" class="author-avatar">
                <div class="author-details">
                    <span class="author-name">Creado por</span>
                    <span class="author-title">Desarrollador Educativo</span>
                </div>
            </div>
        </div>

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
