import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

import useGetRelatedArticles from '../../foodit-global/hooks/useGetRelatedArticles';
import { transformArticleFoodit } from '../../foodit-global/common/utils/notaFooditHelper';
import setRelatedArticlesCustomFields from '../../foodit-global/common/utils/setRelatedArticlesCustomFields';
import fooditRules from '../../foodit-global/common/utils/fooditRules';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import { validateRelatedArticlesFeature } from './validateRelatedArticlesFeature';

import RenderCollection from '../../../chains/foodit-global/common/RenderCollection/foodit';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';
import { setStaticDynamically } from '../../../chains/utils/_helpers';
import classNames from 'classnames';

const RelatedArticles = props => {
    const { isAdmin, customFields, globalContent, id: featureId } = props;

    const {
        layout = '',
        filterBy,
        idSectionOrAuthor = '',
        customMaxArticles = null
    } = customFields;

    const id =
        filterBy === 'relatedArticles'
            ? get(globalContent, 'taxonomy.primary_section._id', '')
            : idSectionOrAuthor;

    const rules = fooditRules(layout) || {};

    const { minRelatedArticles, maxArticles, size, isStatic } = rules;

    const sourceMaxARticles =
        customMaxArticles &&
        customMaxArticles >= minRelatedArticles &&
        customMaxArticles < maxArticles
            ? customMaxArticles
            : maxArticles;

    const articles = useGetRelatedArticles({
        filterBy,
        id,
        maxArticles: sourceMaxARticles,
        staticMode: isSSR() && isStatic
    });

    const error = validateRelatedArticlesFeature({
        minArticles: minRelatedArticles,
        layout,
        articles,
        filterBy,
        idSectionOrAuthor
    });

    if (isAdmin && error) {
        return (
            <WarningMessage
                featureId={featureId}
                type={error.type}
                message={error.message}
            />
        );
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

    // TODO: funcionabilidad del techo pendiente a definicion
    const Component = (
        <RenderCollection
            collectionId={featureId}
            rules={rules}
            title={'Notas relacionadas'}
            articles={articlesTransformed}
            layout={layout}
            error={error}
        />
    );
    return setStaticDynamically(Component, !isStatic, {
        className: staticContentClassName
    });
};

RelatedArticles.propTypes = {
    id: PropTypes.string,
    isAdmin: PropTypes.bool,
    customFields: PropTypes.shape({
        ...setRelatedArticlesCustomFields()
    }),
    globalContent: PropTypes.shape({
        name: PropTypes.string
    })
};

export default Consumer(RelatedArticles);
