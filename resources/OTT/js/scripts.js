const header = document.querySelector('.header');
const menuSticky = 'sticky';
const hamburguer = document.querySelector('.header__hamburguer');
const open = 'open';

window.addEventListener('scroll', () => {
    window.pageYOffset > 0
        ? header.classList.add(menuSticky)
        : header.classList.remove(menuSticky);
});

hamburguer.addEventListener('click', () => {
    header.classList.toggle(open);
});

const article = document.querySelector('.slider .article');
const arrows = document.querySelector('.slider button');
const articleHeight = article.offsetHeight;
