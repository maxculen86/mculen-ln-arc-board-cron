window.addEventListener('DOMContentLoaded', event => {
    document.querySelectorAll('.nacion-home').forEach(item => {
        item.addEventListener('click', event => {
            sessionStorage.removeItem('hp');
            sessionStorage.removeItem('lb');
        });
    });
});
