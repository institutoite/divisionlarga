<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="{{ asset('images/ite.ico') }}" type="image/x-icon">
    <title>itesolve</title>
    <link rel="stylesheet" href="{{  asset('css/styles.css')}}">
    <link rel="stylesheet" href="{{  asset('css/header.css')}}">
    <link rel="stylesheet" href="{{  asset('css/style.css')}}">
    <link rel="stylesheet" href="{{  asset('css/servicios.css')}}">
    <link rel="stylesheet" href="{{ asset('css/fundador.css') }}">
    <link rel="stylesheet" href="{{ asset('css/redes.css') }}">
    <link rel="stylesheet" href="{{ asset('css/unete.css') }}">
    <!-- Font Awesome para iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- CSS de Slick -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"/>
    <!-- CSS de Slick Theme -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"/>
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
                    <a href="#cursos" class="nav-link active">Cursos</a>
                </li>
                <li class="nav-item">
                    <a href="#redes" class="nav-link">Redes</a>
                </li>
                <li class="nav-item">
                    <a href="#contacto" class="nav-link">Contacto</a>
                </li>
                <li class="nav-item">
                    <a href="#unete" class="nav-link">Únete</a>
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
                    <a href="#cursos" class="mobile-nav-link">Cursos</a>
                </li>
                <li class="mobile-nav-item">
                    <a href="#calculadora" class="mobile-nav-link">Redes</a>
                </li>
                <li class="mobile-nav-item">
                    <a href="#tutorial" class="mobile-nav-link">Contacto</a>
                </li>
                <li class="mobile-nav-item">
                    <a href="#ejemplos" class="mobile-nav-link">Únete</a>
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
    

    {{-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  servicios %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% --}}
       <!-- Cursos Section -->
    <section id="cursos" class="cursos-section">
        <div class="container">
            <div class="section-header">
                <h2>Nuestros Cursos</h2>
                <p>Ofrecemos clases de apoyo escolar y cursos especializados</p>
            </div>
            
           <div class="cursos-grid">
                <!-- Curso de Computación -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <h3>Computación</h3>
                    <p>Domina lo esencial de informática y herramientas digitales</p>
                    <a href="https://wa.me/59175553338?text=¡Hola!%20Quiero%20info%20del%20curso%20COMPUTACIÓN" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                
                <!-- Curso de Robótica -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h3>Robótica</h3>
                    <p>Construye y programa robots desde cero</p>
                    <a href="https://wa.me/59175553338?text=¡Hola!%20Info%20curso%20ROBÓTICA%20por%20favor" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                
                <!-- Curso de Cubo Rubik -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-cube"></i>
                    </div>
                    <h3>Cubo Rubik</h3>
                    <p>Aprende métodos para resolver el cubo mágico</p>
                    <a href="https://wa.me/59175553338?text=Info%20curso%20CUBO%20RUBIK" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                
                <!-- Curso de Programación -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-code"></i>
                    </div>
                    <h3>Programación</h3>
                    <p>Aprende Python, JavaScript y desarrollo web</p>
                    <a href="https://wa.me/59175553338?text=Info%20curso%20PROGRAMACIÓN" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                
                <!-- Apoyo Escolar Primaria -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-child"></i>
                    </div>
                    <h3>Apoyo Escolar Primaria</h3>
                    <p>Refuerzo en matemáticas y comunicación</p>
                    <a href="https://wa.me/59175553338?text=Info%20APOYO%20PRIMARIA" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                
                <!-- Apoyo Escolar Secundaria -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                    <h3>Apoyo Escolar Secundaria</h3>
                    <p>Clases de matemáticas y ciencias</p>
                    <a href="https://wa.me/59175553338?text=Info%20APOYO%20SECUNDARIA" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                
                <!-- Cursos Preuniversitarios -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-university"></i>
                    </div>
                    <h3>Cursos Preuniversitarios</h3>
                    <p>Preparación para exámenes de admisión</p>
                    <a href="https://wa.me/59175553338?text=Info%20CURSOS%20PREUNIVERSITARIOS" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                
                <!-- Cursos Universitarios -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <h3>Cursos Universitarios</h3>
                    <p>Asesoría en cálculo y física universitaria</p>
                    <a href="https://wa.me/59175553338?text=Info%20CURSOS%20UNIVERSITARIOS" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                
                <!-- Creación de Sistemas Web -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-globe"></i>
                    </div>
                    <h3>Creación de Sistemas Web</h3>
                    <p>Aprende desarrollo web completo</p>
                    <a href="https://wa.me/59175553338?text=Info%20SISTEMAS%20WEB" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                
                <!-- Aplicaciones Móviles -->
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <h3>Aplicaciones Móviles</h3>
                    <p>Desarrollo de apps para Android e iOS</p>
                    <a href="https://wa.me/59175553338?text=Info%20APPS%20MÓVILES" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
                <div class="curso-item">
                    <div class="curso-icon">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <h3>Lectura y Escritura</h3>
                    <p>Desarrolla habilidades comunicativas esenciales</p>
                    <a href="https://wa.me/59175553338?text=Info%20curso%20LECTURA%20Y%20ESCRITURA" target="_blank" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Mas info
                    </a>
                </div>
            </div>
        </div>
    </section>
    {{-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  servicios %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% --}}


    <section id="autor" class="fundador-section">
        <div class="fundador-container">
            <div class="fundador-foto">
                <!-- Reemplaza con tu foto -->
                <div class="fundador-foto">
                    <div class="marco-foto">
                        <img src="{{ asset('images/david.png') }}" alt="David Flores - Fundador" class="foto-perfil">
                    </div>
                </div>
                
            </div>
            <div class="fundador-info">
                <h2 class="fundador-titulo">David Flores</h2>
                <p class="fundador-descripcion">
                    Creador de proyectos informáticos y apasionado por la educación tecnológica. 
                    Especialista en robótica educativa, desarrollo de software y creación de contenido 
                    digital para redes sociales.
                </p>
                <a href="https://www.tiktok.com/@davidflores.ite" target="_blank" class="tiktok">
                    <div class="social-icon">
                        <i class="fab fa-tiktok"></i>
                    </div>
                </a>
            </div>
        </div>
    </section>



    <section id="redes" class="social-banner">
        <div class="container">
            <div class="social-content">
                <h2>¡Conéctate con nuestra comunidad educativa!</h2>
                <p class="subtitle">Contenido exclusivo, tips de estudio y novedades tecnológicas</p>
                
                <div class="social-links">
                    <a href="https://www.tiktok.com/@ite_educabol" target="_blank" class="social-link tiktok">
                        <div class="social-icon">
                            <i class="fab fa-tiktok"></i>
                        </div>
                        <span>TikTok</span>
                    </a>
                    
                    <a href="https://www.facebook.com/ite.educabol" target="_blank" class="social-link facebook">
                        <div class="social-icon">
                            <i class="fab fa-facebook-f"></i>
                        </div>
                        <span>Facebook</span>
                    </a>
                    
                    <a href="https://www.youtube.com/@ite_educabol" target="_blank" class="social-link youtube">
                        <div class="social-icon">
                            <i class="fab fa-youtube"></i>
                        </div>
                        <span>YouTube</span>
                    </a>
                    
                    <a href="https://whatsapp.com/channel/0029VaAu3lwJJhzX5iSJBg44" target="_blank" class="social-link whatsapp">
                        <div class="social-icon">
                            <i class="fab fa-whatsapp"></i>
                        </div>
                        <span>WhatsApp</span>
                    </a>
                    
                    <a href="#" target="_blank" class="social-link instagram">
                        <div class="social-icon">
                            <i class="fab fa-instagram"></i>
                        </div>
                        <span>Instagram</span>
                    </a>
                    <a href="https://ite.com.bo" target="_blank" class="social-link website">
                        <div class="social-icon">
                            <i class="fas fa-globe"></i>
                        </div>
                        <span>Sitio Web</span>
                    </a>
                    
                </div>
            </div>
        </div>
    </section>



    <!-- Contacto Section -->
    <section id="contacto" class="contacto-section">
        <div class="container">
            <div class="contacto-grid">
                <div class="contacto-info">
                    <div class="section-header">
                        <h2>Contáctanos</h2>
                        <p>¿Tienes preguntas? Estamos aquí para ayudarte</p>
                    </div>
                    
                    <div class="info-items">
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Dirección</h4>
                                <p>Villa 1 de mayo, calle 16 oeste #9</p>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-phone"></i>
                            <div>
                                <h4>Teléfono</h4>
                                <p>+59160902299</p>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <h4>Email</h4>
                                <p>itesolve2@ite.com.bo</p>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <h4>Horario</h4>
                                <p>Lunes a Sábado: 7:30 am - 06:30pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="contacto-form">
                    <form onsubmit="enviarWhatsApp(event)" method="POST">
                        @csrf
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" id="nombre" name="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="telefono">Teléfono</label>
                            <input type="tel" id="telefono" name="telefono" required>
                        </div>
                        <div class="form-group">
                            <label for="mensaje">Mensaje</label>
                            <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar a WhatsApp</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section id="unete" class="cta-section">
    <div class="container">
        <div class="cta-content">
            <h2>¿Listo para unirte a nuestro equipo innovador?</h2>
            <p class="cta-subtitle">
                Buscamos colaboradores apasionados por la educación tecnológica. 
                ¡Tu experiencia es valiosa para nosotros!
            </p>
            
            <div class="cta-actions">
                <a href="https://wa.me/59160902299?text=¡Hola!%20Quiero%20ser%20parte%20de%20este%20proyecto.%20Puedo%20colaborar%20en:" 
                    class="cta-button whatsapp-btn" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <i class="fab fa-whatsapp"></i> ÚNETE AL EQUIPO
                </a>
            </div>
            
            <p class="cta-footer">
                <i class="fas fa-lightbulb"></i> ¡Juntos crearemos el futuro de la educación tecnológica!
            </p>
        </div>
    </div>
</section>

    <!-- Footer -->
    <footer class="main-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <h3>Qué es ite?</h3>
                    <p>Somos una institución educativa dedicada a proporcionar recursos de calidad para estudiantes de todos los niveles.</p>
                    <div class="footer-social">
                        <a target="_blank" href="https://www.tiktok.com/@ite_educabol" class="social-icon"><i class="fab fa-tiktok"></i></a>
                        <a target="_blank" href="https://www.facebook.com/ite.educabol" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                        <a target="_blank" href="https://www.youtube.com/@ite_educabol" class="social-icon"><i class="fab fa-youtube"></i></a>
                        <a target="_blank" href="https://wa.me/59160902299" class="social-icon"><i class="fab fa-whatsapp"></i></a>
                        <a target="_blank" href="https://www.instagram.com/tu_usuario" class="social-icon"><i class="fab fa-instagram"></i></a>
                        <a target="_blank" href="https://ite.com.bo" class="social-icon"><i class="fas fa-globe"></i></a>
                    </div>
                </div>
                
                <div class="footer-links">
                    <h4>Enlaces rápidos</h4>
                    <ul>
                        <li><a target="_blank" href="https://ite.com.bo">Qué es ite?</a></li>
                        <li><a target="_blank" href="https://itesolve2.ite.com.bo">Fórmulas</a></li>
                        <li><a target="_blank" href="https://services.ite.com.bo">Cursos</a></li>
                    </ul>
                </div>
                
                <div class="footer-links">
                    <h4>Materias</h4>
                    <ul class="materias-list">
                        <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="Computación">Computación</a></li>
                        <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="Robótica">Robótica</a></li>
                        <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="Cubo Rubik">Cubo Rubik</a></li>
                        <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="Programación">Programación</a></li>
                        <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="Apoyo escolar">Apoyo escolar</a></li>
                    </ul>
                </div>
                
                <div class="footer-links">
                    <h4>Cursos</h4>
                    <ul class="materias-list">
                         <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="Matematicas">Matemáticas</a></li>
                        <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="Fisica">Física</a></li>
                        <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="Quimica">Química</a></li>
                        <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="Programacion">Programación</a></li>
                        <li><a href="https://ite.com.bo" target="_blank" class="whatsapp-link" data-msg="lenguaje">Escritura y Lectura</a></li>
                    </ul>
                </div>
                
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 ITESOLVE. Todos los derechos reservados.</p>
                <div class="footer-legal">
                    <a href="https://www.tiktok.com/@davidflores.ite" target="_blank">David Flores</a>
                    <a href="https://www.ite.com.bo" target="_blank">ite educabol</a>
                </div>
            </div>
        </div>
    </footer>
</div>
    <!-- JS de jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <!-- JS de Slick -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>

    <script src="{{ asset('js/script.js') }}"></script>
    <script src="{{ asset('js/header.js') }}"></script>
    
    <script>

        document.querySelectorAll('.whatsapp-link').forEach(link => {
            const materia = link.getAttribute('data-msg');
            console.log("materia",materia);
            let mensaje = '';
            
            // Mensajes personalizados para cada materia
            switch(materia) {
                case 'Computación':
                    mensaje = '¡Hola! Estoy interesado/a en el curso de *COMPUTACIÓN* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
                case 'Robótica':
                    mensaje = '¡Buenos días! Quisiera información sobre el curso de *ROBÓTICA.* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
                case 'Cubo Rubik':
                    mensaje = '¡Saludos! Me interesa el curso de *CUBO RUBIK.* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
                case 'Programación':
                    mensaje = '¡Hola! Busco información sobre el curso de *PROGRAMACIÓN.* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
                case 'Apoyo escolar':
                    mensaje = '¡Buenas tardes! Necesito *APOYO ESCOLAR.* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
                case 'Matematicas':
                    mensaje = '¡Hola! Estoy interesado/a en clases de *MATEMÁTICAS.* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
                case 'Fisica':
                    mensaje = '¡Buenos días! Necesito clases de *FÍSICA.* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
                case 'Quimica':
                    mensaje = '¡Saludos! Busco clases de *QUÍMICA.* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
                case 'Programacion':
                    mensaje = '¡Hola! Quiero aprender *PROGRAMACIÓN.* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
                case 'lenguaje':
                    mensaje = '¡Buenas tardes! Me interesa el curso de *Escritura y Lectura.* Mensaje enviado desde https://itesolve2.ite.com.bo';
                    break;
               
            }
            console.log("mensaje",mensaje);
            link.href = `https://wa.me/59171324941?text=${encodeURIComponent(mensaje)}`;
            link.target = '_blank';
        });

        
        // document.addEventListener('DOMContentLoaded', () => {
        //     const whatsappLinks = document.querySelectorAll('.whatsapp-link');
        //     const numeroWhatsApp = '59160902299'; // Número destino (sin +)
          
        //     whatsappLinks.forEach(link => {
        //         link.addEventListener('click', (e) => {
        //             e.preventDefault();
        //             const mensaje = encodeURIComponent(link.dataset.msg);
        //             window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
        //         });
        //     });
        // });
        
        function enviarWhatsApp(event) {
            event.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Formatea el mensaje para URL
            const texto = `*Nombre:* ${nombre}%0A*Teléfono:* ${telefono}%0A*Mensaje:* ${mensaje} Mensaje enviado desde https://itesolve2.ite.com.bo`;
            
            // Redirige a WhatsApp (cambia el número al destino)
            window.open(`https://wa.me/59160902299?text=${texto}`, '_blank');
        }

        $(document).ready(function(){
            // Menú móvil
            $('.menu-toggle').click(function() {
                $('.nav-links').toggleClass('active');
            });
            
            // Slider de profesores
            $('.slider').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true,
                dots: true,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
            
            // Slider de testimonios
            $('.testimonios-slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                arrows: true,
                dots: true
            });
        });
        

     
        
      
        // Cerrar modal al hacer clic fuera de él
     
    </script>


  

</body>
</html>
