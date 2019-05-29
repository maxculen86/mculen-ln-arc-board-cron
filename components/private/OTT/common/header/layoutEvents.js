export default function loadHeaderEvents() {
    const header = document.querySelector('.header');
    const menuSticky = 'sticky';
    window.addEventListener('scroll', () => {
        window.pageYOffset > 0
            ? header.classList.add(menuSticky)
            : header.classList.remove(menuSticky);
    });
}
