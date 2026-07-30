import { useEffect, useState } from 'react';
import { extractAperturaHomeArticles } from '../../../../content/sources/utils/homeOpeningArticles/transform';

let fetchPromise = null;
let cachedContentElements = null;

const useHomeOpeningArticlesClient = ({ isAperturaHome }) => {
    const [articlesList, setArticlesList] = useState({
        content_elements: cachedContentElements || []
    });

    useEffect(() => {
        if (!isAperturaHome) return () => {};

        if (cachedContentElements) {
            setArticlesList({ content_elements: cachedContentElements });
            return () => {};
        }

        let cancelled = false;

        const fetchHomeOpeningArticles = async () => {
            try {
                if (!fetchPromise) {
                    const requestOptions = { cache: 'no-store' };

                    fetchPromise = fetch(
                        '/?_website=la-nacion-ar&outputType=opening',
                        requestOptions
                    )
                        .then(async response => {
                            if (!response || !response.ok) {
                                throw new Error(
                                    `HTTP ${response?.status || 'no-response'}`
                                );
                            }
                            const homePage = await response.json();
                            const contentElements =
                                extractAperturaHomeArticles(homePage);
                            cachedContentElements = contentElements;
                            return contentElements;
                        })
                        .catch(error => {
                            fetchPromise = null;
                            throw error;
                        });
                }

                const contentElements = await fetchPromise;

                if (!cancelled) {
                    setArticlesList({ content_elements: contentElements });
                }
            } catch (error) {
                if (!cancelled) {
                    setArticlesList({ content_elements: [] });
                }
            }
        };

        fetchHomeOpeningArticles();

        return () => {
            cancelled = true;
        };
    }, [isAperturaHome]);

    return articlesList;
};

export default useHomeOpeningArticlesClient;
