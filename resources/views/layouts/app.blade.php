<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ config('app.name', 'División Larga') }} - Aprende matemáticas paso a paso</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/header.css') }}" rel="stylesheet">
    <link href="{{ asset('css/styles.css') }}" rel="stylesheet">
    
    <!-- Meta tags para SEO -->
    <meta name="description" content="Aprende división larga paso a paso con explicaciones detalladas y ejemplos interactivos. Herramienta educativa profesional para estudiantes.">
    <meta name="keywords" content="división larga, matemáticas, educación, calculadora, paso a paso">
    <meta name="author" content="MathLearn Pro">
    
    <!-- Open Graph -->
    <meta property="og:title" content="División Larga - Aprende matemáticas paso a paso">
    <meta property="og:description" content="Herramienta educativa profesional para aprender división larga con explicaciones detalladas.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="apple-touch-icon" href="{{ asset('images/apple-touch-icon.png') }}">
</head>
<body class="font-sans antialiased">
    <!-- Header -->
    @include('partials.header')
    
    <!-- Main Content -->
    <main class="main-content">
        @yield('content')
    </main>
    
    <!-- Footer (si lo tienes) -->
    @if(View::exists('partials.footer'))
        @include('partials.footer')
    @endif
    
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/header.js') }}"></script>
    <script src="{{ asset('js/script.js') }}"></script>
    
    @stack('scripts')
</body>
</html>
