/* eslint-disable react/button-has-type */
import React from 'react';
import { useLiveblogAuthors } from './hook/useLiveblogAuthors';
import { scrollToFirstPostOf } from '../../_helpers/getUniqueAuthorsFromPosts';

function LiveblogAuthorsBox() {
    const { authors, shouldShow } = useLiveblogAuthors();

    if (!shouldShow) return null;

    return (
        <div className="liveblog-authors-box">
            {authors.map(author => (
                <button
                    key={author.id}
                    style={{
                        border: '2px solid red',
                        position: 'relative',
                        zIndex: 9999
                    }}
                    className="author-card"
                    onClick={() => scrollToFirstPostOf(author.name)}
                >
                    <img src={author.photo} alt={author.name} />
                    <span>{author.name}</span>
                </button>
            ))}
        </div>
    );
}

export default LiveblogAuthorsBox;
