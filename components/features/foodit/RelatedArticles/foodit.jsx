import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

import RenderCollection from '../../../chains/foodit-global/common/RenderCollection/foodit';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';

import useGetRelatedArticles from '../../foodit-global/hooks/useGetRelatedArticles';
import { transformArticleFoodit } from '../../foodit-global/common/utils/notaFooditHelper';
import setRelatedArticlesCustomFields from '../../foodit-global/common/utils/setRelatedArticlesCustomFields';
import fooditRules from '../../foodit-global/common/utils/fooditRules';
import { setStaticDynamically } from '../../../chains/utils/_helpers';
import { validateRelatedArticlesFeature } from './validateRelatedArticlesFeature';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import classNames from 'classnames';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';

const RelatedArticles = ({
    isAdmin,
    customFields,
    globalContent,
    id: featureId
}) => {
    const {
        layout = '',
        filterBy,
        idSectionOrAuthor = '',
        customMaxArticles = null
    } = customFields;

    const { _id: primarySectionId = '', name: primarySectionName = '' } = get(
        globalContent,
        'taxonomy.primary_section',
        {}
    );

    const id =
        filterBy === 'relatedArticles' ? primarySectionId : idSectionOrAuthor;

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

    const titleByFilter = {
        relatedArticles: () => primarySectionName,
        section: () => capitalizeFirstLetter(id.replace(/.*\//, '')),
        author: () => {
            const [firstArticle = {}] = articles;
            return getAuthorsAsString(firstArticle, true);
        }
    };

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
            collectionId={featureId}
            rules={rules}
            title={`Más recetas: ${(titleByFilter[filterBy] &&
                titleByFilter[filterBy]()) ||
                ''}`}
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
        taxonomy: PropTypes.object
    })
};

export default Consumer(RelatedArticles);
