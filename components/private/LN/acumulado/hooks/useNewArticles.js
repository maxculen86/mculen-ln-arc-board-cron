import { useState, useEffect } from 'react';

const useNewArticles = (articles = []) => {
    const [prevArticles, setPrevArticles] = useState([]);
    const [newArticles, setNewArticles] = useState(false);

    useEffect(() => {
        const totalArticles = articles.length;
        const totalPrevArticles = prevArticles.length;
        const hasEqualLengths = totalArticles === totalPrevArticles;

        if (totalArticles && !hasEqualLengths) {
            setPrevArticles(articles);
            totalPrevArticles && setNewArticles(true);
        }
    }, [articles, prevArticles]);

    return newArticles;
};

export default useNewArticles;
