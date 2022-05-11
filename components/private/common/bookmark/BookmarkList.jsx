import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModArticle from '../mod-article';
import EmptyBookmark from './EmptyBookmark';

const BookmarkList = ({ data }) => {
    return (
        <section className="bookmark-list">
            {data.length === 0 ? (
                <EmptyBookmark />
            ) : (
                data.map(e => {
                    return <ModArticle titleText={e.title} />;
                })
            )}
        </section>
    );
};

BookmarkList.propTypes = {
    data: PropTypes.shape([{}])
};
BookmarkList.defaultProps = {
    data: []
};

export default BookmarkList;
