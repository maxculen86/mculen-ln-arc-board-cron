/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
// import ArticleMain from '../common/articleTypes/articleMain';
// import ArticleDate from '../common/dateArticle';
import get from '../../common/utils/get';
import ModArticle from '../../common/mod-article';
import getBajadaOrFirstTextParagraph from '../../common/utils/getBajadaOrFirstTextParagraph';
import getTitleText from '../../common/utils/getTitleText';

const setDecimal = num => (num > 9 ? num : `0${num}`);
const getHour = date =>
    `${setDecimal(date.getHours())}:${setDecimal(date.getMinutes())}`;

const ArticleAcum = ({
    children,
    dataSection,
    article,
    extraClasses,
    typeArticle
}) => {
    // console.log(JSON.stringify(article));
    const { display_date, headlines, website_url, label } = article;
    //console.log("article", JSON.stringify(article))
    const authors = get(article, 'credits.by', []);
    // TODO: filtrar content element en content source?
    const subheadText = getBajadaOrFirstTextParagraph(article);
    const titleText = getTitleText(headlines, label);

    return (
        <>
            <ModArticle
                key={`clone-${article._id}`}
                articleData={article}
                dataSection={dataSection}
                extraClasses={extraClasses}
                withMedia={typeArticle === 'Grilla'}
                link={website_url}
                titleTag="h1"
                titleSize="--s"
                titleText={titleText}
                authors={authors}
                dateText={display_date}
                subheadText={typeArticle !== 'Grilla' && subheadText}
            />
            {children}
            {/*
            <ArticleMain
                dataSection={dataSection}
                key={`clone-${article._id}`}
                articleData={article}
                extraClasses={extraClasses}
            >
                
                <ArticleDate display_date={displayDate} />
            </ArticleMain>
            {children}
            */}
        </>
    );
};

ArticleAcum.propTypes = {
    dataSection: PropTypes.string,
    extraClasses: PropTypes.string,
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
    extraClasses: undefined,
    children: undefined
};

export default ArticleAcum;
/*
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
*/
