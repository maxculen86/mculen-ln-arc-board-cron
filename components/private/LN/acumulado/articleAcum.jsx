/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModArticle from '../../common/mod-article';
import getBajadaOrFirstTextParagraph from '../../common/utils/getBajadaOrFirstTextParagraph';
import ComHour from '../../common/com-hour';
import get from '../../common/utils/get';
import getAuthorsAsString from '../../common/utils/getAuthorsAsString';

const typeAcumRules = {
    Grilla: {
        withMedia: true,
        withAuthors: true,
        withHour: false
    },
    Listado: {
        withMedia: false,
        withAuthors: true,
        withHour: false
    },
    Timeline: {
        withMedia: true,
        withAuthors: true,
        withHour: true
    }
};

const ArticleAcum = ({
    children,
    dataSection,
    article,
    typeArticle = 'Grilla',
    outputType,
    titleTag,
    titleSize,
    withSubhead,
    isRenderAuthor,
    boxPosition,
    artPosition,
    withCategory,
    withTags
}) => {
    const {
        display_date,
        headlines,
        website_url,
        label,
        taxonomy: { primary_section: primarySection, tags } = {}
    } = article;

    const authors =
        typeAcumRules[typeArticle].withAuthors && getAuthorsAsString(article);

    const subheadText = withSubhead && getBajadaOrFirstTextParagraph(article);

    const titleText = get(headlines, 'mobile') || get(headlines, 'basic');
    const leadText = get(label, 'volanta.text', '');

    const tagList =
        (typeArticle === 'Timeline' && tags) || (tags && tags.slice(0, 1));

    const hourToDisplay = typeAcumRules[typeArticle].withHour && (
        <ComHour
            display_date={display_date}
            size="--twoxs"
            isUltimasNoticias={typeArticle === 'Timeline'}
        />
    );

    return (
        <>
            <ModArticle
                articleData={article}
                dataSection={dataSection}
                withMedia={typeAcumRules[typeArticle].withMedia}
                link={website_url}
                titleTag={titleTag}
                titleSize={titleSize}
                titleText={titleText}
                leadText={leadText}
                authors={authors}
                dateText={!typeAcumRules[typeArticle].withHour && display_date}
                hour={hourToDisplay}
                subheadText={subheadText}
                outputType={outputType}
                isRenderAuthor={isRenderAuthor}
                typeArticle={typeArticle}
                artPosition={artPosition}
                boxPosition={boxPosition}
                category={withCategory && primarySection}
                tags={withTags && tagList}
            />
            {children}
        </>
    );
};

ArticleAcum.propTypes = {
    dataSection: PropTypes.string,
    article: PropTypes.shape({
        _id: PropTypes.string,
        display_date: PropTypes.string,
        headlines: PropTypes.object,
        website_url: PropTypes.string,
        label: PropTypes.shape({
            volanta: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.obj)
        })
    }).isRequired,
    children: PropTypes.node,
    typeArticle: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    withCategory: PropTypes.bool,
    withTags: PropTypes.bool,
    titleTag: PropTypes.string,
    titleSize: PropTypes.string,
    withSubhead: PropTypes.bool,
    isRenderAuthor: PropTypes.bool,
    boxPosition: PropTypes.string.isRequired,
    artPosition: PropTypes.string.isRequired
};

ArticleAcum.defaultProps = {
    dataSection: '',
    titleSize: '',
    titleTag: '',
    children: undefined,
    withCategory: false,
    withTags: false,
    isRenderAuthor: false,
    withSubhead: false
};

export default ArticleAcum;
