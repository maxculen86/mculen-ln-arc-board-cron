import { productClickFromClient } from '../../../../components/private/common/utils/viewability';

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const articles = document.querySelectorAll('article');

        articles.forEach(art => {
            art.addEventListener('click', element => {
                productClickFromClient(element);
            });

            art.addEventListener('auxclick', element => {
                productClickFromClient(element);
            });
        });
    }, 50);
});
