import { useContent } from 'fusion:content';
import get from './get';
import Consumer from 'fusion:consumer';

import filter from '../../../../content/filters/LN/acumulado/articleAcu';
import browser from './browser';
const getArticlesFromElement = values => {
    const { id, isAdmin, sizeCf, pageCf, paramUrlId, requestUri } =
        values || {};

    let size = browser.getSizesFrom(
        isAdmin,
        sizeCf,
        paramUrlId,
        'size',
        requestUri
    );

    if (size > 100) size = 100;

    const page = browser.getSizesFrom(
        isAdmin,
        pageCf,
        paramUrlId,
        'page',
        requestUri
    );

    this.fetchContent({
        acuArticlesSource: {
            source: 'acuArticlesSource',
            query: {
                sectionId: null,
                authorId: id,
                tagId: null,
                imageConfig: 'm',
                size,
                page
            }
        }
    });

    return true;
};

export default getArticlesFromElement;
