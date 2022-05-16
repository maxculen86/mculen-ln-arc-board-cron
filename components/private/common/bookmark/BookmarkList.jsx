import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModArticle from '../mod-article';
import EmptyBookmark from './EmptyBookmark';
import ComButton from '../com-button';

const BookmarkList = ({ data }) => {
    return (
        <section className="bookmark-list">
            {data.length === 0 ? (
                <EmptyBookmark />
            ) : (
                data.map(e => {
                    return (
                        <div className="item">
                            <ModArticle
                                withMedia
                                titleText={e.title}
                                articleData={data}
                                dateText="2022-05-13T13:29:11.337Z"
                            />
                            <ComButton iconName="bookmark" />
                        </div>
                    );
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
