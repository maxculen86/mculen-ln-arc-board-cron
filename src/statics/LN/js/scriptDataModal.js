window.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-modal="open-modal"]');
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            window?.LN?.observable?.publish('openModal', {
                ids: button.dataset.id.split(',')
            });
        });
    });
});
