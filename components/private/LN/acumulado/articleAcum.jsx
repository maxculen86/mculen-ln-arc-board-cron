import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ModArticle from '../../common/mod-article';
import getBajadaOrFirstTextParagraph from '../../common/utils/getBajadaOrFirstTextParagraph';
import ComHour from '../../common/com-hour';
import get from '../../common/utils/get';
import getAuthorsAsString from '../../common/utils/getAuthorsAsString';
import addRelatedImage from '../common/utils/addRelatedImage';
import setAuthorsRender from '../../common/utils/setAuthorsRender';
import unescapeHtml from '../../common/utils/unescapeHtml';

const typeAcumRules = {
    Grilla: {
        withMedia: true,
        withAuthors: true,
        withHour: false,
        SeguiLeyendo: {
            withAuthors: false
        }
    },
    Listado: {
        withMedia: false,
        withAuthors: true,
        withHour: false
    },
    Timeline: {
        withMedia: true,
        withAuthors: true,
        withHour: true,
        dateClassNames: '--font-primary --font-black --m'
    },
    Bookmark: {
        withMedia: true,
        withAuthors: true,
        withHour: false,
        isBookmark: true
    }
};

const ArticleAcum = forwardRef(
    (
        {
            children,
            dataSection,
            sectionName,
            article,
            typeArticle = 'Grilla',
            outputType,
            titleTag,
            titleSize,
            titleWeight,
            withSubhead,
            withVolanta,
            isRenderAuthor,
            boxPosition,
            artPosition,
            withCategory,
            withTags,
            handleClick,
            isApertura,
            openBarrier
        },
        ref
    ) => {
        const _article = addRelatedImage(article);

        const {
            display_date: displayDate,
            headlines,
            website_url: websiteUrl,
            canonical_url: canonicalUrl,
            label,
            taxonomy: { primary_section: primarySection, tags } = {}
        } = _article;

        const finalLink =
            websiteUrl ||
            canonicalUrl ||
            get(_article, 'websites.lanacionar.website_url', '');

        const authors =
            setAuthorsRender({ typeAcumRules, typeArticle, sectionName }) &&
            getAuthorsAsString(_article);

        const subheadText =
            withSubhead && getBajadaOrFirstTextParagraph(_article);

        const titleTextShort = get(headlines, 'mobile', '');
        const titleTextLong = unescapeHtml(get(headlines, 'basic', ''));
        const headlinesWeb = get(headlines, 'web', '');
        const leadText = withVolanta
            ? get(label, 'volanta.text', headlinesWeb)
            : '';
        const chapita = get(label, 'chapita.text', '');

        const tagList =
            (typeArticle === 'Timeline' && tags) || (tags && tags.slice(0, 1));

        const hourToDisplay = typeAcumRules[typeArticle].withHour && (
            <ComHour
                display_date={displayDate}
                size={typeAcumRules[typeArticle].dateClassNames || '--twoxs'}
            />
        );

        return (
            <>
                <ModArticle
                    ref={ref}
                    articleData={_article}
                    dataSection={dataSection}
                    withMedia={typeAcumRules[typeArticle].withMedia}
                    link={finalLink}
                    titleTag={titleTag}
                    titleSize={titleSize}
                    titleText={
                        titleTextShort !== '' ? titleTextShort : titleTextLong
                    }
                    titleWeight={titleWeight}
                    leadText={titleTextShort !== '' ? leadText : ''}
                    authors={authors}
                    dateText={
                        !typeAcumRules[typeArticle].withHour && displayDate
                    }
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
                    isApertura={isApertura}
                    openBarrier={openBarrier}
                />
                {children}
            </>
        );
    }
);

ArticleAcum.propTypes = {
    dataSection: PropTypes.string,
    handleClick: PropTypes.func,
    article: PropTypes.shape({
        _id: PropTypes.string,
        display_date: PropTypes.string,
        headlines: PropTypes.shape({
            basic: PropTypes.string,
            meta_title: PropTypes.string,
            mobile: PropTypes.string
        }),
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
    titleWeight: PropTypes.string,
    withSubhead: PropTypes.bool,
    withVolanta: PropTypes.bool,
    isRenderAuthor: PropTypes.bool,
    boxPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    artPosition: PropTypes.string,
    isApertura: PropTypes.bool,
    sectionName: PropTypes.string.isRequired,
    openBarrier: PropTypes.func.isRequired
};

ArticleAcum.defaultProps = {
    dataSection: '',
    titleSize: undefined,
    titleTag: undefined,
    titleWeight: undefined,
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
    withVolanta: true,
    isApertura: false
};

export default ArticleAcum;
