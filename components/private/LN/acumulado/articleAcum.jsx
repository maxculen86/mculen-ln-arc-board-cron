import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleMain from '../common/articleTypes/articleMain';
import ArticleDate from '../common/dateArticle';
import get from '../../common/utils/get';
import ModFirma from '../../common/mod-firma';

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
    const bajada = subheadlines.basic || truncate(firstParagraph, 160);
    return bajada;
};

const ArticleAcum = ({
    children,
    dataSection,
    article: { display_date: displayDate },
    article,
    extraClasses,
    typeArticle
}) => {
    console.log(JSON.stringify(article));
    const authors = get(article, 'credits.by', []);
    const bajada = getBajadaOrFirstTextParagraph(article);

    // console.log(JSON.stringify(typeArticle));
    return (
        <>
            {typeArticle === 'ArticleMain' && (
                <>
                    <ArticleMain
                        dataSection={dataSection}
                        key={`clone-${article._id}`}
                        articleData={article}
                        extraClasses={extraClasses}
                    >
                        <ModFirma autor={authors} />

                        <ArticleDate display_date={displayDate} />
                    </ArticleMain>
                    {children}
                </>
            )}
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
        </>
    );
}

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
