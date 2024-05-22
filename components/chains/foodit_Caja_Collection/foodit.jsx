import React, { useState } from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import { getIdCollection, validateChainFoodit } from './common/_helper';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import RenderCollection from '../foodit-global/common/RenderCollection/foodit';
import { transformArticleFoodit } from '../../features/foodit-global/common/utils/notaFooditHelper';
import fooditRules from '../../features/foodit-global/common/utils/fooditRules';
import useGetArticleInCollectionFoodit from '../foodit-global/common/hooks/useGetArticleInCollectionFoodit';
import setChainFooditCustomFields from '../foodit-global/common/utils/setChainCustomFieldsFoodit';
import get from '../../private/common/utils/get';
import classNames from 'classnames';
import LazyLoad from '../../features/foodit-global/common/LazyLoad/foodit';

const CajaCollection = props => {
    const [inViewport, setInViewport] = useState(false);
    const { isAdmin, customFields, id: chainId } = props;

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

    const articles = useGetArticleInCollectionFoodit({
        idCollection: getIdCollection(
            isStatic,
            inViewport,
            idCollection,
            isAdmin
        ),
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
    const articlesWithSize = articles.map(article => {
        return { ...transformArticleFoodit(article), size };
    });
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

    return !isStatic && !isAdmin ? (
        <LazyLoad
            hide={hideCaja}
            onViewport={() => setInViewport(true)}
            showComponent={articlesTransformed.length > 0}
        >
            {Component}
        </LazyLoad>
    ) : (
        <Static id={chainId}>
            <div className={staticContentClassName}>{Component}</div>
        </Static>
    );
};

CajaCollection.label = 'foodit Caja Collection';

CajaCollection.propTypes = {
    isAdmin: PropTypes.bool,
    customFields: PropTypes.shape({
        ...setChainFooditCustomFields('cajaCollection')
    }),
    globalContent: PropTypes.shape({
        name: PropTypes.string
    })
};

export default Consumer(CajaCollection);
