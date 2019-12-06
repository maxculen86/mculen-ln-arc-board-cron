import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleMain from '../common/articleTypes/articleMain';
import ArticleDate from '../common/dateArticle';

const setDecimal = num => (num > 9 ? num : `0${num}`);
const getHour = date =>
    `${setDecimal(date.getHours())}:${setDecimal(date.getMinutes())}`;

function ArticleAcum({
    children,
    dataSection,
    article: { display_date: displayDate },
    article,
    extraClasses,
    typeArticle
}) {
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
