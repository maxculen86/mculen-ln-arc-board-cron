import { useEffect, useState } from 'react';
import { extractAperturaHomeArticles } from '../../../../content/sources/utils/homeOpeningArticles/transform';

const useHomeOpeningArticlesClient = ({ isAperturaHome }) => {
    const [articlesList, setArticlesList] = useState({ content_elements: [] });

    useEffect(() => {
        if (!isAperturaHome) return () => {};

        let cancelled = false;
        const controller =
            typeof AbortController !== 'undefined'
                ? new AbortController()
                : null;

        const fetchHomeOpeningArticles = async () => {
            try {
                const requestOptions = { cache: 'no-store' };
                if (controller) requestOptions.signal = controller.signal;

                const response = await fetch(
                    '/?_website=la-nacion-ar&outputType=opening',
                    requestOptions
                );

                if (!response || !response.ok) {
                    throw new Error(
                        `HTTP ${response?.status || 'no-response'}`
                    );
                }

                const homePage = await response.json();
                const contentElements = extractAperturaHomeArticles(homePage);

                if (!cancelled) {
                    setArticlesList({ content_elements: contentElements });
                }
            } catch (error) {
                if (!cancelled && error?.name !== 'AbortError') {
                    setArticlesList({ content_elements: [] });
                }
            }
        };

        fetchHomeOpeningArticles();

        return () => {
            cancelled = true;
            if (controller) controller.abort();
        };
    }, [isAperturaHome]);

    return articlesList;
};

export default useHomeOpeningArticlesClient;
