import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleMain from '../common/articleTypes/articleMain';
import ArticleDate from '../common/dateArticle';

function ArticleAcum({
    children,
    dataSection,
    article: { display_date: displayDate },
    article,
    extraClasses
}) {
    return (
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
    );
}

ArticleAcum.propTypes = {
    dataSection: PropTypes.string,
    extraClasses: PropTypes.string,
    article: PropTypes.shape({
        _id: PropTypes.string,
        display_date: PropTypes.string
    }).isRequired,
    children: PropTypes.node
};

ArticleAcum.defaultProps = {
    dataSection: '',
    extraClasses: undefined,
    children: undefined
};

export default ArticleAcum;
