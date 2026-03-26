import React, { forwardRef } from 'react';
import ModArticle from '../../common/mod-article';
import getBajadaOrFirstTextParagraph from '../../common/utils/getBajadaOrFirstTextParagraph';
import ComHour from '../../common/com-hour';
import get from '../../common/utils/get';
import getAuthorsAsString from '../../common/utils/getAuthorsAsString';
import getNumericRatingValue from '../../common/utils/getNumericRatingValue';
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
            dataSection = '',
            sectionName,
            article,
            typeArticle = 'Grilla',
            outputType = 'default',
            titleTag,
            titleSize,
            titleWeight,
            withSubhead = false,
            withVolanta = true,
            isRenderAuthor = false,
            boxPosition,
            artPosition = '',
            withCategory = false,
            withTags = false,
            handleClick,
            isApertura = false,
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
                    rating={getNumericRatingValue(
                        get(_article, 'content_elements', [])
                    )}
                />
                {children}
            </>
        );
    }
);

export default ArticleAcum;
