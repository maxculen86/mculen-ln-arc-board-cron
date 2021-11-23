/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import ModArticle from '../../common/mod-article';
import getBajadaOrFirstTextParagraph from '../../common/utils/getBajadaOrFirstTextParagraph';
import ComHour from '../../common/com-hour';
import get from '../../common/utils/get';
import getAuthorsAsString from '../../common/utils/getAuthorsAsString';
import addRelatedImage from '../common/utils/addRelatedImage';

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
    withVolanta,
    isRenderAuthor,
    boxPosition,
    artPosition,
    withCategory,
    withTags,
    handleClick
}) => {
    const _article = addRelatedImage(article);
    const {
        display_date,
        headlines,
        website_url,
        label,
        taxonomy: { primary_section: primarySection, tags } = {}
    } = _article;

    const authors =
        typeAcumRules[typeArticle].withAuthors && getAuthorsAsString(_article);

    const subheadText = withSubhead && getBajadaOrFirstTextParagraph(_article);

    const titleTextShort = get(headlines, 'mobile', '');
    const titleTextLong = get(headlines, 'basic', '');
    const leadText = withVolanta ? get(label, 'volanta.text', '') : '';
    const chapita = get(label, 'chapita.text', '');

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
                articleData={_article}
                dataSection={dataSection}
                withMedia={typeAcumRules[typeArticle].withMedia}
                link={website_url}
                titleTag={titleTag}
                titleSize={titleSize}
                titleText={
                    titleTextShort !== '' ? titleTextShort : titleTextLong
                }
                leadText={titleTextShort !== '' ? leadText : ''}
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
                label={{ text: chapita }}
                handleClick={handleClick}
            />
            {children}
        </>
    );
};

ArticleAcum.propTypes = {
    dataSection: PropTypes.string,
    handleClick: PropTypes.func,
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
            primary_section: PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string,
                path: PropTypes.string
            }),
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    slug: PropTypes.string,
                    text: PropTypes.string
                })
            )
        })
    }).isRequired,
    children: PropTypes.node,
    typeArticle: PropTypes.string,
    outputType: PropTypes.string,
    withCategory: PropTypes.bool,
    withTags: PropTypes.bool,
    titleTag: PropTypes.string,
    titleSize: PropTypes.string,
    withSubhead: PropTypes.bool,
    withVolanta: PropTypes.bool,
    isRenderAuthor: PropTypes.bool,
    boxPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    artPosition: PropTypes.string
};

ArticleAcum.defaultProps = {
    dataSection: '',
    titleSize: '',
    titleTag: '',
    artPosition: '',
    typeArticle: 'Grilla',
    outputType: 'default',
    children: undefined,
    handleClick: undefined,
    boxPosition: undefined,
    withCategory: false,
    withTags: false,
    isRenderAuthor: false,
    withSubhead: false,
    withVolanta: true
};

export default ArticleAcum;
