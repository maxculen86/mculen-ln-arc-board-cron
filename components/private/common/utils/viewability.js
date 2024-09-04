/* eslint-disable no-console */
import get from './get';

export const getDataSetProps = element => {
    if (element) {
        const { dataset: articleDataSet = {} } = element;
        const { dataset: chainDataSet = {} } = (element.closest &&
            element.closest('[data-is-block]')) || {
            dataset: {
                blockName: '',
                diagramacionId: '',
                chainPosition: '',
                isSubscriptor: false
            }
        };

        const { dataset: sectionDataSet = {} } = (element.closest &&
            element.closest('[data-section]')) || {
            dataset: { section: '' }
        };

        const {
            chainPosition,
            diagramacionId,
            blockName,
            isSubscriptor
        } = chainDataSet;
        const { section } = sectionDataSet;
        const { pos, id, source } = articleDataSet;

        const isLive = diagramacionId === 'enVivo';
        const itemBrand = isSubscriptor ? 'excSuscriptor' : section;

        if (isLive) {
            return {
                product: {
                    position: `lv${pos}`,
                    id,
                    variant: source,
                    brand: `${itemBrand}_${diagramacionId}`,
                    list: blockName,
                    name: getName(element)
                },
                item: {
                    item_list_id: `lv${pos}`,
                    item_id: id,
                    item_variant: source,
                    item_brand: `${itemBrand}_${diagramacionId}`,
                    item_list_name: blockName,
                    item_name: getName(element),
                    item_category: diagramacionId,
                    price: 1,
                    quantity: 1
                }
            };
        }

        const product = {
            position: `${chainPosition || ''}${pos}`,
            id,
            variant: source,
            brand: `${itemBrand}_${diagramacionId}`,
            list: blockName,
            name: getName(element)
        };

        const item = {
            item_list_id: `${chainPosition || ''}${pos}`,
            item_id: id,
            item_variant: source,
            item_brand: `${itemBrand}_${diagramacionId}`,
            item_list_name: blockName,
            item_name: getName(element),
            item_category: 'N/A',
            price: 1,
            index: 1,
            quantity: 1
        };

        return {
            product,
            item
        };
    }
    return {};
};

const getName = element => {
    const subtitle = element.querySelectorAll('h4, h2, h1');
    if (subtitle && subtitle.length > 0) {
        return (subtitle[0].innerText && subtitle[0].innerText.trim()) || '';
    }
    return '';
};

export const productClickFromClient = (element = {}) => {
    const { item } = getDataSetProps(element.currentTarget);
    if (item.item_id) {
        window?.dataLayer?.push({
            event: `productClickScore`,
            item
        });
    }
    return true;
};

export const createIntersectionObserver = () => {
    try {
        const callback = (entries, _observer) => {
            const articlesToAdd = [];
            const itemsToAdd = [];
            const articlesSeen =
                (sessionStorage &&
                    JSON.parse(sessionStorage.getItem('seenArticlesScore'))) ||
                [];

            entries.forEach(entry => {
                if (shouldAddArticle(entry, articlesSeen)) {
                    const { product, item } = getDataSetProps(entry.target);
                    articlesToAdd.push(product);
                    itemsToAdd.push(item);
                    observer.unobserve(entry.target);
                }
            });

            const articlesToAddFiltered = [];
            articlesToAdd.forEach(data => {
                const existElement = articlesToAddFiltered.find(
                    element =>
                        element.id === data.id && element.list === data.list
                );
                if (!existElement) {
                    articlesToAddFiltered.push(data);
                }
            });

            addEventImpressionToDataLayer(
                articlesToAddFiltered,
                itemsToAdd,
                articlesSeen
            );
        };

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        document
            .querySelectorAll('article, .live-body > article')
            .forEach(element => {
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
    const sectionOfArticle =
        get(entry, 'target') && get(entry, 'target').closest('[data-is-block]');

    const blockName = get(sectionOfArticle, 'dataset.blockName');
    return (
        entry.isIntersecting &&
        idArticle &&
        Array.isArray(articlesSeen) &&
        !articlesSeen.find(
            art => art.id === idArticle && art.list === blockName
        )
    );
};

export const updateIndexOfItems = (items = []) => {
    const newItems = [];
    items.forEach((item, i) => {
        newItems.push({
            ...item,
            index: i + 1
        });
    });
    return newItems;
};

const addEventImpressionToDataLayer = (
    articlesToAdd = [],
    itemsToAdd = [],
    articlesSeen = []
) => {
    if (articlesToAdd.length > 0) {
        const itemsUpdated = updateIndexOfItems(itemsToAdd);
        window.dataLayer.push({
            ecommerce: null
        });
        window.dataLayer.push({
            event: `impressionsScore`,
            ecommerce: { items: itemsUpdated }
        });

        articlesSeen.push(...articlesToAdd);

        sessionStorage.setItem(
            'seenArticlesScore',
            JSON.stringify(
                articlesSeen.map(art => {
                    return {
                        id: art.id,
                        name: art.name,
                        list: art.list
                    };
                })
            )
        );
    }
};

export const createViewabilityObservers = (isLN10 = false) => {
    const interSectionObserver = createIntersectionObserver();

    if (!isLN10) {
        const mutationCallback = (mutationsList, observer) => {
            mutationsList.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (get(node, 'dataset.module')) {
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
        mutationObserver.observe(
            document.querySelector('section[data-section=multimedia'),
            {
                attributes: false,
                childList: true,
                subtree: true
            }
        );

        // mutationObserver.disconnect();
    }
};
