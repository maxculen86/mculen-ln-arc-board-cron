/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModArticle from '../../common/mod-article';
import getBajadaOrFirstTextParagraph from '../../common/utils/getBajadaOrFirstTextParagraph';
import getTitleText from '../../common/utils/getTitleText';
import ComHour from '../../common/com-hour';
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
        withAuthors: false,
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
    isRenderAuthor
}) => {
    const { display_date, headlines, website_url, label } = article;

    const authors =
        typeAcumRules[typeArticle].withAuthors && getAuthorsAsString(article);

    const subheadText = withSubhead && getBajadaOrFirstTextParagraph(article);

    const titleText = getTitleText(headlines, label);

    const hourToDisplay = typeAcumRules[typeArticle].withHour && (
        <ComHour display_date={display_date} size="--twoxs" />
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
                authors={authors}
                dateText={!typeAcumRules[typeArticle].withHour && display_date}
                hour={hourToDisplay}
                subheadText={subheadText}
                outputType={outputType}
                isRenderAuthor={isRenderAuthor}
                typeArticle={typeArticle}
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
        })
    }).isRequired,
    children: PropTypes.node,
    typeArticle: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired
};

ArticleAcum.defaultProps = {
    dataSection: '',
    children: undefined
};

export default ArticleAcum;
