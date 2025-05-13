import { productClickFromClient } from '../../../../components/private/common/utils/viewability';

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const articles = document.querySelectorAll(
            'article:not([data-has-jwplayer="true"])'
        );

        articles.forEach(art => {
            art.addEventListener('click', element => {
                productClickFromClient(element);
            });

            art.addEventListener('auxclick', element => {
                productClickFromClient(element);
            });
        });
    }, 0);
});
