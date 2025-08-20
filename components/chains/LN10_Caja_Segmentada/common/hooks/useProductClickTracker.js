import { useEffect } from 'react';
import { productClickFromClient } from '../../../../private/common/utils/viewability';

const useProductClickTracker = (articles, chainId) => {
    useEffect(() => {
        if (!articles || articles.length === 0) return undefined;

        let articlesInDOM = [];
        const handleClick = event => {
            productClickFromClient(event);
        };

        const timeoutId = setTimeout(() => {
            articlesInDOM = document.querySelectorAll(`#${chainId} article`);

            articlesInDOM.forEach(article => {
                article.addEventListener('click', handleClick);
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            articlesInDOM.forEach(article => {
                article.removeEventListener('click', handleClick);
            });
        };
    }, [articles]);
};

export default useProductClickTracker;
