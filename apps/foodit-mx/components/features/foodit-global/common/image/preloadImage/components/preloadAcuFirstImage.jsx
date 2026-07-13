import React from 'react';

import useGridArticlesFoodit from '../../../../../foodit/GrillaNotasAcu/hooks/useGridArticles';
import PreloadImages from '../../../../../private-global/common/preloadImage/preloadImages';
import get from '../../../../../../private/common/utils/get';

export function PreloadAcuFirstImage({ id = '', layout = '' }) {
    const { articles = [] } = useGridArticlesFoodit({
        id,
        layout,
        staticMode: true,
        maxArticles: 1
    });

    const [article] = articles;
    const resizedUrls = get(article, 'promo_items.basic.resized_urls', []);

    return <PreloadImages resizedUrls={resizedUrls} />;
}
