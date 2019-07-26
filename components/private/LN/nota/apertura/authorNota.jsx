import React from 'react';
import PropTypes from 'fusion:prop-types';

const AuthorNota = ({ authors }) => {
    const listAuthor = authors.map(authorNota => {
        return (
            <div key={authorNota.slug}>
                <a href={authorNota.slug} className={authorNota.type}>
                    {authorNota.name}
                </a>
                <button
                    type="button"
                    className={authorNota.type}
                    onClick={() => {}}
                >
                    SEGUIR
                </button>
            </div>
        );
    });
    return listAuthor;
};

AuthorNota.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            slug: PropTypes.string
        })
    ).isRequired
};

export default AuthorNota;
