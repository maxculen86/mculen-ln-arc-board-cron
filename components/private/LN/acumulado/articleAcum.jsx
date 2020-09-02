/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
// import ArticleMain from '../common/articleTypes/articleMain';
// import ArticleDate from '../common/dateArticle';
import get from '../../common/utils/get';
import ModArticle from '../../common/mod-article';

const setDecimal = num => (num > 9 ? num : `0${num}`);
const getHour = date =>
    `${setDecimal(date.getHours())}:${setDecimal(date.getMinutes())}`;

const truncate = (text = '', maxChar) => {
    return text.length > maxChar ? `${text.substr(0, maxChar - 1)}...` : text;
};

const getBajadaOrFirstTextParagraph = data => {
    // eslint-disable-next-line camelcase
    const { content_elements = [], subheadlines } = data;
    const firstContentElementText = content_elements.find(
        elem => elem.type === 'text'
    );
    const firstParagraph =
        firstContentElementText && firstContentElementText.content;

    return subheadlines.basic || truncate(firstParagraph, 160);
};

const getTitleText = (headlines = {}, label = '') => {
    const { basic = '', mobile = '' } = headlines;
    const volanta = label && label.volanta && label.volanta.text;
    const volantaComponent = volanta && `${volanta} `;
    const titleText = `${mobile || basic}`;
    return `${volantaComponent}${titleText}`;
};

const ArticleAcum = ({
    children,
    dataSection,
    article,
    extraClasses,
    typeArticle
}) => {
    // console.log(JSON.stringify(article));
    const { display_date, headlines, website_url, label} = article;
    const authors = get(article, 'credits.by', []);
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
        display_date: PropTypes.string
    }).isRequired,
    children: PropTypes.ndoe,
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
