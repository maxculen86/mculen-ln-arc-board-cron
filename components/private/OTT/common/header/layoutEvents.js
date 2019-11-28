export default function loadHeaderEvents() {
    if (typeof window === 'undefined') return;

    const header = document.querySelector('.header');
    if (header) {
        const menuSticky = 'sticky';
        const classOpen = 'open';
        const hamburguer = document.querySelector('.header__hamburguer');
        window.addEventListener('scroll', () => {
            window.pageYOffset > 0
                ? header.classList.add(menuSticky)
                : header.classList.remove(menuSticky);
        });

        hamburguer.addEventListener('click', () => {
            header.classList.toggle(classOpen);
        });
    }
}
