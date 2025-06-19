/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import classNames from 'classnames';
import {
    getIdCollection,
    validateChainFoodit,
    isElementInPosition
} from './common/_helper';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import { RenderCollection } from '../foodit-global/common/RenderCollection/foodit';
import { transformArticleFoodit } from '../../features/foodit-global/common/utils/notaFooditHelper';
import fooditRules from '../../features/foodit-global/common/utils/fooditRules';
import { useGetArticleInCollectionFoodit } from '../foodit-global/common/hooks/useGetArticleInCollectionFoodit';
import setChainFooditCustomFields from '../foodit-global/common/utils/setChainCustomFieldsFoodit';
import get from '../../private/common/utils/get';
import { LazyLoad } from '../../features/foodit-global/common/LazyLoad/foodit';
import { getCarouselId } from './_helper';
import { LAYOUTS } from '../foodit-global/common/utils/helper-WebApi';

function CajaCollection(props) {
    const { CAROUSEL, CAROUSEL_4 } = LAYOUTS;
    const [inViewport, setInViewport] = useState(false);
    const { isAdmin, customFields, id: chainId, tree } = props;
    const carouselId = getCarouselId(chainId);

    const {
        idCollection,
        initialPosition,
        hideCaja,
        hideTitle,
        link,
        title = '',
        layout = ''
    } = customFields;

    const rules = fooditRules(layout) || {};

    const { minArticles, maxArticles, size, isStatic } = rules;

    const isWithOutLazyLoad =
        [CAROUSEL, CAROUSEL_4].includes(layout) &&
        isElementInPosition({
            positionElement: 0,
            positionBlock: 1,
            id: chainId,
            tree
        });

    const articles = useGetArticleInCollectionFoodit({
        idCollection: getIdCollection({
            isStatic,
            inViewport,
            idCollection,
            isAdmin,
            isWithOutLazyLoad
        }),
        size: maxArticles,
        initialPosition: Number(initialPosition) - 1,
        staticMode: isStatic
    });

    const error = validateChainFoodit({
        minArticles,
        idCollection,
        layout,
        articles
    });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }
    const articlesWithSize = articles.map(article => ({
        ...transformArticleFoodit(article),
        size
    }));
    const articlesTransformed = articlesWithSize.filter(
        article => article.href
    );
    const staticContentClassName = classNames(
        'hidden',
        get(rules, 'classStatic', '')
    );

    const Component = (
        <RenderCollection
            rules={rules}
            title={title}
            link={link}
            hideCaja={hideCaja}
            hideTitle={hideTitle}
            articles={articlesTransformed}
            collectionId={idCollection}
            layout={layout}
            error={error}
        />
    );

    if (!isStatic && isWithOutLazyLoad) {
        return Component;
    }

    return !isStatic && !isAdmin ? (
        <LazyLoad
            id={carouselId}
            hide={hideCaja}
            onViewport={() => setInViewport(true)}
            showComponent={articlesTransformed.length > 0}
            style={{
                scrollMarginTop: '80px',
                scrollBehavior: 'smooth'
            }}
        >
            {Component}
        </LazyLoad>
    ) : (
        <Static id={chainId}>
            <div className={staticContentClassName}>{Component}</div>
        </Static>
    );
}

CajaCollection.label = 'foodit Caja Collection';

CajaCollection.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        ...setChainFooditCustomFields('cajaCollection')
    }).isRequired,
    globalContent: PropTypes.shape({
        name: PropTypes.string
    }).isRequired,
    tree: PropTypes.shape({}).isRequired
};

export default Consumer(CajaCollection);
