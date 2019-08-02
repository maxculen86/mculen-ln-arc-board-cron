import React from 'react';
import PropTypes from 'fusion:prop-types';

const AuthorNota = ({
    globalContent: {
        credits: { by }
    }
}) => {
    const listAuthor = by.map(authorNota => {
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
    credits: PropTypes.shape({
        by: PropTypes.shape({
            authors: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    type: PropTypes.string,
                    slug: PropTypes.string
                })
            )
        })
    })
};

AuthorNota.defaultProps = {
    authors: []
};

export default AuthorNota;
