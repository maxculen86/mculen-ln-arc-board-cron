import React from 'react';
import PropTypes from 'fusion:prop-types';

const authorArticle = ({
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

authorArticle.propTypes = {
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

authorArticle.defaultProps = {
    authors: []
};

export default authorArticle;
