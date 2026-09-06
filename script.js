
// Script para alternar entre el modo oscuro y claro
(function () {
    function applyTheme(isDark) {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        updateToggleButtons(isDark);
    }

    function updateToggleButtons(isDark) {
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            const icon = btn.querySelector('.theme-icon');
            const text = btn.querySelector('.theme-text');
            if (icon) icon.textContent = isDark ? '☀️' : '🌙';
            if (text) text.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
        });
    }

    // Carga e inicialización
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    if (initialDark) document.documentElement.classList.add('dark');

    document.addEventListener('DOMContentLoaded', () => {
        updateToggleButtons(document.documentElement.classList.contains('dark'));

        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const isDarkNow = !document.documentElement.classList.contains('dark');
                applyTheme(isDarkNow);
            });
        });
    });
})();