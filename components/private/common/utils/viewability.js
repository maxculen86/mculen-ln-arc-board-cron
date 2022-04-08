/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React from 'react';

export const productClickFromServer = () => {
    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {
                        const articles = document.querySelectorAll('article');
                        ${getName.toString()}
                        ${getDataSetProps.toString()}
                        ${productClickFromClient.toString()}
                        articles.forEach(art => {
                
                            art.addEventListener('click', (element) => {
                                productClickFromClient(element);
                            });

                            art.addEventListener('auxclick', (element) => {
                                productClickFromClient(element);
                               
                            });

                        })
              
                    })
                `
            }}
        />
    );
};

const getDataSetProps = element => {
    if (element) {
        const { dataset: articleDataSet = {} } = element;
        const { dataset: sectionDataSet = {} } = (element.closest &&
            element.closest('.box-articles')) || {
            dataset: { blockName: 'h_tema-01', diagramacionId: 'h_00' }
        };
        return {
            position: articleDataSet.pos,
            id: articleDataSet.id,
            variant: articleDataSet.source,
            brand: sectionDataSet.diagramacionId,
            list: sectionDataSet.blockName,
            name: getName(element)
        };
    }
    return {};
};

const getName = element => {
    const subtitle = element.querySelectorAll('h2, h1');
    if (subtitle && subtitle.length > 0) {
        return (subtitle[0].innerText && subtitle[0].innerText.trim()) || '';
    }
    return '';
};

export const productClickFromClient = (element = {}) => {
    const product = getDataSetProps(element.currentTarget);
    if (product.id) {
        window.dataLayer.push({ event: 'productClickTest', product });
    }
};

export const createIntersectionObserver = () => {
    try {
        const callback = (entries, observer) => {
            const articlesToAdd = [];
            const articlesSeen =
                JSON.parse(sessionStorage.getItem('seenArticlesTest')) || [];

            entries.forEach(entry => {
                if (shouldAddArticle(entry, articlesSeen)) {
                    const product = getDataSetProps(entry.target);
                    articlesToAdd.push(product);
                    observer.unobserve(entry.target);
                }
            });

            addEventImpressionToDataLayer(articlesToAdd, articlesSeen);
        };

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        document.querySelectorAll('article').forEach(element => {
            if (element) {
                observer.observe(element);
            }
        });

        return observer;
    } catch (error) {
        console.error('Error en viewability.js => createIntersectionObserver', {
            error,
            outputType: 'default',
            websiteUrl: 'lanacion.com.ar'
        });
        return {};
    }
};

const shouldAddArticle = (entry, articlesSeen) => {
    return (
        entry.isIntersecting &&
        Array.isArray(articlesSeen) &&
        !articlesSeen.find(art => art.id === entry.target.dataset.id)
    );
};

const addEventImpressionToDataLayer = (
    articlesToAdd = [],
    articlesSeen = []
) => {
    if (articlesToAdd.length > 0) {
        window.dataLayer.push({
            event: 'impressionsTest',
            products: articlesToAdd
        });

        articlesSeen.push(...articlesToAdd);

        sessionStorage.setItem(
            'seenArticlesTest',
            JSON.stringify(
                articlesSeen.map(art => {
                    return { id: art.id, name: art.name };
                })
            )
        );
    }
};

export const createObservers = () => {
    const interSectionObserver = createIntersectionObserver();

    const mutationCallback = (mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.dataset.module) {
                    const arts = document.querySelectorAll(
                        `div[data-module=${node.dataset.module}] article`
                    );
                    arts.forEach(element => {
                        if (element && element.dataset.id) {
                            interSectionObserver.observe(element);
                        }
                    });
                }

                if (node.nodeName === 'ARTICLE' && node.dataset.id) {
                    interSectionObserver.observe(node);
                }
            });
        });
    };

    const mutationObserver = new MutationObserver(mutationCallback);
    mutationObserver.observe(document.querySelector('#wrapper'), {
        attributes: false,
        childList: true,
        subtree: true
    });

    // mutationObserver.disconnect();
};
