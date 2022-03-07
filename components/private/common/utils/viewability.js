/* eslint-disable react/no-danger */
import React from 'react';

const articlesSeen = [];

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
        const { dataset: sectionDataSet = {} } = element.closest(
            '.box-articles'
        ) || { dataset: { blockName: 'h_tema-01', diagramacionId: 'h_00' } };
        return {
            position: articleDataSet.pos,
            id: articleDataSet.id,
            variant: articleDataSet.source,
            brand: sectionDataSet.diagramacionId, // focalLeft3",// se saca de data-diagramacion-id de la <section> padre del <article>
            list: sectionDataSet.blockName, // "h_tema-01",// se saca de data-block-name de la <section> padre del <article>
            name: getName(element) // se saca del contenido de la etique <a> del <section class="mod-description">"
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
        window.dataLayer.push({ event: 'productClickLocal', product });
    }
};

// export const prepareImpressionEvent = () => {
//     setInterval(() => {
//         pushImpressionEvent();
//     }, 3000);
// };

// export const pushImpressionEvent = () => {
//     const targetElements = document.querySelectorAll('article');
//     const articlesToAdd = [];
//     targetElements.forEach(domElm => {
//         if (elementInViewport(domElm)) {
//             if (
//                 domElm.dataset.id !== undefined &&
//                 !articlesSeen.find(art => art.id === domElm.dataset.id)
//             ) {
//                 const product = getDataSetProps(domElm);
//                 articlesToAdd.push(product);
//             }
//         }
//     });

//     if (articlesToAdd.length > 0) {
//         window.dataLayer.push({
//             event: 'impressionsLocal',
//             products: articlesToAdd
//         });

//         articlesSeen.push(...articlesToAdd);
//     }
// };

// const elementInViewport = el => {
//     const bounding = el.getBoundingClientRect();
//     return (
//         bounding.top >= 0 &&
//         bounding.left >= 0 &&
//         bounding.bottom <=
//             (window.innerHeight || document.documentElement.clientHeight) &&
//         bounding.right <=
//             (window.innerWidth || document.documentElement.clientWidth)
//     );
// };

const createIntersectionObserver = () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const callback = (entries, observer) => {
        const articlesToAdd = [];
        entries.forEach(entry => {
            if (
                entry.isIntersecting &&
                !articlesSeen.find(art => art.id === entry.target.dataset.id)
            ) {
                const product = getDataSetProps(entry.target);
                articlesToAdd.push(product);
                observer.unobserve(entry.target);
            }
        });

        if (articlesToAdd.length > 0) {
            window.dataLayer.push({
                event: 'impressionsLocal',
                products: articlesToAdd
            });

            articlesSeen.push(...articlesToAdd);
        }
    };

    const observer = new IntersectionObserver(callback, options);

    document.querySelectorAll('article').forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });

    return observer;
    // const target = document.querySelector('.mod-article');
    // observer.observe(target);
};

export const createObservers = () => {
    const interSectionObserver = createIntersectionObserver();

    const mutationCallback = (mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.dataset.module) {
                    // if (node.nodeName === 'ARTICLE') {
                    // interSectionObserver.observe(node);
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

    const targetNode = document.querySelector('#wrapper');

    const config = { attributes: false, childList: true, subtree: true };

    const mutationObserver = new MutationObserver(mutationCallback);
    mutationObserver.observe(targetNode, config);

    // mutationObserver.disconnect();
};
