/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import classNames from 'classnames';
import useGetRelatedArticles from '../../foodit-global/hooks/useGetRelatedArticles';

import { transformArticleFoodit } from '../../foodit-global/common/utils/notaFooditHelper';
import setRelatedArticlesCustomFields from '../../foodit-global/common/utils/setRelatedArticlesCustomFields';
import fooditRules from '../../foodit-global/common/utils/fooditRules';
import { validateRelatedArticlesFeature } from './validateRelatedArticlesFeature';
import get from '../../../private/common/utils/get';
import isSSR from '../../../private/LN/common/utils/isSSR';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';

import { RenderCollection } from '../../../chains/foodit-global/common/RenderCollection/foodit';
import { LazyLoad } from '../../foodit-global/common/LazyLoad/foodit';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';

function RelatedArticles({
    isAdmin = false,
    customFields,
    globalContent,
    id: featureId
}) {
    const {
        layout = '',
        filterBy,
        idSectionOrAuthor = '',
        customMaxArticles: customFieldMaxArticle = null,
        customTitle
    } = customFields;

    const { _id: primarySectionId = '', name: primarySectionName = '' } = get(
        globalContent,
        'taxonomy.primary_section',
        {}
    );

    const idArticle = get(globalContent, '_id', '');

    const id =
        filterBy === 'relatedArticles' ? primarySectionId : idSectionOrAuthor;

    const rules = fooditRules(layout) || {};

    const { minRelatedArticles, maxRelatedArticles, size, isStatic } = rules;

    const customMaxArticles = Number.isInteger(customFieldMaxArticle)
        ? customFieldMaxArticle
        : maxRelatedArticles;

    const sourceMaxARticles =
        customMaxArticles &&
        customMaxArticles >= minRelatedArticles &&
        customMaxArticles < maxRelatedArticles
            ? customMaxArticles
            : maxRelatedArticles;

    const { articles, articleList } = useGetRelatedArticles({
        filterBy,
        id,
        maxArticles: sourceMaxARticles,
        staticMode: isSSR() && isStatic
    });

    const error = validateRelatedArticlesFeature({
        articleList,
        customMaxArticles,
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

    const conditionalTitle =
        customTitle ||
        `Más recetas: ${
            (titleByFilter[filterBy] && titleByFilter[filterBy]()) || ''
        }`;

    const articlesWithSize = articles
        .filter(article => article._id !== idArticle)
        .map(article => ({ ...transformArticleFoodit(article), size }));

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
            title={conditionalTitle}
            articles={articlesTransformed}
            layout={layout}
            error={error}
        />
    );

    return !isStatic ? (
        <LazyLoad
            onViewport={() => null}
            showComponent={articlesTransformed.length > 0}
        >
            {Component}
        </LazyLoad>
    ) : (
        <Static id={featureId}>
            <div className={staticContentClassName}>{Component}</div>
        </Static>
    );
}

RelatedArticles.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        ...setRelatedArticlesCustomFields()
    }).isRequired,
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string
            })
        })
    }).isRequired
};

export default Consumer(RelatedArticles);
