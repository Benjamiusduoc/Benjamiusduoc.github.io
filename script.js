(function () {
    function applyTheme(isDark) {
        const html = document.documentElement;
        const icon = document.getElementById('theme-toggle-icon');
        const text = document.getElementById('theme-toggle-text');

        if (isDark) {
            html.classList.add('dark');
            if (icon) icon.textContent = '☀️';
            if (text) text.textContent = 'Modo Claro';
        } else {
            html.classList.remove('dark');
            if (icon) icon.textContent = '🌙';
            if (text) text.textContent = 'Modo Oscuro';
        }
    }

    // Carga inicial inmediata
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    if (initialDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Configuración al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(document.documentElement.classList.contains('dark'));

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const isDarkNow = !document.documentElement.classList.contains('dark');
                applyTheme(isDarkNow);
                localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
            });
        }
    });
})();