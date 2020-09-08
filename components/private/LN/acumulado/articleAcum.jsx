/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
// import ArticleMain from '../common/articleTypes/articleMain';
// import ArticleDate from '../common/dateArticle';
import ModArticle from '../../common/mod-article';
import getBajadaOrFirstTextParagraph from '../../common/utils/getBajadaOrFirstTextParagraph';
import getTitleText from '../../common/utils/getTitleText';
import ComHour from '../../common/com-hour';
import getAuthorsAsString from '../../common/utils/getAuthorsAsString';

const typeAcumRules = {
    Grilla: {
        withMedia: true,
        withSubhead: false,
        withAuthors: true,
        withHour: false
    },
    Listado: {
        withMedia: false,
        withSubhead: true,
        withAuthors: true,
        withHour: false
    },
    Timeline: {
        withMedia: false,
        withSubhead: false,
        withAuthors: false,
        withHour: true
    }
};

const ArticleAcum = ({ children, dataSection, article, typeArticle }) => {
    const { display_date, headlines, website_url, label } = article;

    const authors =
        typeAcumRules[typeArticle].withAuthors && getAuthorsAsString(article);

    const subheadText =
        typeAcumRules[typeArticle].withSubhead &&
        getBajadaOrFirstTextParagraph(article);

    const titleText = getTitleText(headlines, label);

    const hourToDisplay = typeAcumRules[typeArticle].withHour && (
        <ComHour display_date={display_date} />
    );

    return (
        <>
            <ModArticle
                articleData={article}
                dataSection={dataSection}
                withMedia={typeAcumRules[typeArticle].withMedia}
                link={website_url}
                titleTag="h1"
                titleSize="--s"
                titleText={titleText}
                authors={authors}
                dateText={!typeAcumRules[typeArticle].withHour && display_date}
                hour={hourToDisplay}
                subheadText={subheadText}
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
        headlines: PropTypes.string,
        website_url: PropTypes.string,
        label: PropTypes.shape({
            volanta: PropTypes.shape({
                text: PropTypes.string
            })
        })
    }).isRequired,
    children: PropTypes.node,
    typeArticle: PropTypes.string.isRequired
};

ArticleAcum.defaultProps = {
    dataSection: '',
    children: undefined
};

export default ArticleAcum;

/*
const HourComponent = date => {
    if (!date) return null;

    const setDecimal = num => (num > 9 ? num : `0${num}`);

    const getHour = date =>
    `${setDecimal(date.getHours())}:${setDecimal(date.getMinutes())}`;

    const hour = getHour(new Date(date));

    return <div className="com-hour --threexs">{hour}</div>
}


{typeArticle === 'ArticleTimeLine' && (
        <ArticleMain
            dataSection={dataSection}
            key={`clone-${article._id}`}
            articleData={article}
            extraClasses={`${extraClasses} --list`}
            hourToDisplay={
                displayDate && getHour(new Date(displayDate))
            }
        />
    )}


    <ArticleMain
        dataSection={dataSection}
        key={`clone-${article._id}`}
        articleData={article}
        extraClasses={extraClasses}
    >
        
        <ArticleDate display_date={displayDate} />
    </ArticleMain>
    {children}
            
*/
