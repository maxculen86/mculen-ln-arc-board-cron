/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React from 'react';
import get from './get';

export const productClickFromServer = () => {
    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {
                        const articles = document.querySelectorAll('article');
                        ${isSandbox.toString()}
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
        const { dataset: chainDataSet = {} } = (element.closest &&
            element.closest('.box-articles')) || {
            dataset: { blockName: '', diagramacionId: '', chainPosition: '' }
        };

        const { dataset: sectionDataSet = {} } = (element.closest &&
            element.closest('[data-section]')) || {
            dataset: { section: '' }
        };
        return {
            position: `${chainDataSet.chainPosition || ''}${
                articleDataSet.pos
            }`,
            id: articleDataSet.id,
            variant: articleDataSet.source,
            brand: `${sectionDataSet.section}_${chainDataSet.diagramacionId}`,
            list: chainDataSet.blockName,
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
        window.dataLayer.push({
            event: `productClickScore`,
            product
        });
    }
    return true;
};

export const createViewabilityIntersectionObserver = () => {
    try {
        const callback = (entries, _observer) => {
            const articlesToAdd = [];
            const articlesSeen =
                (sessionStorage &&
                    JSON.parse(sessionStorage.getItem('seenArticlesScore'))) ||
                [];

            entries.forEach(entry => {
                if (shouldAddArticle(entry, articlesSeen)) {
                    const product = getDataSetProps(entry.target);
                    articlesToAdd.push(product);
                    _observer.unobserve(entry.target);
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
    const idArticle = get(entry, 'target.dataset.id');
    return (
        entry.isIntersecting &&
        idArticle &&
        Array.isArray(articlesSeen) &&
        !articlesSeen.find(art => art.id === idArticle)
    );
};

const isSandbox = () => {
    if (window && window.location.host === 'lanacion.com.ar') return '';
    return '_DESA';
};

const addEventImpressionToDataLayer = (
    articlesToAdd = [],
    articlesSeen = []
) => {
    if (articlesToAdd.length > 0) {
        window.dataLayer.push({
            event: `impressionsScore`,
            products: articlesToAdd
        });

        articlesSeen.push(...articlesToAdd);

        sessionStorage.setItem(
            'seenArticlesScore',
            JSON.stringify(
                articlesSeen.map(art => {
                    return { id: art.id, name: art.name };
                })
            )
        );
    }
};
