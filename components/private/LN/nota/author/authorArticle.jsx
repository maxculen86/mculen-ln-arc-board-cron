import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/author.css';

const authorArticle = ({
    globalContent: {
        credits: { by }
    }
}) => {
    const concatAuthors = (index, authors) => {
        if (index < authors.length - 2) return ', ';
        if (index === authors.length - 2) return ' y ';
        return '';
    };

    if (!by) return null;
    const authors = by.filter(author => author.type === 'author');
    return (
        <>
            {authors.length > 0 ? <span>Por </span> : ''}
            {authors.map((authorNota, i) => (
                <span key={authorNota._id}>
                    {authorNota.url ? (
                        <a href={authorNota.url}>{authorNota.name}</a>
                    ) : (
                        <span>{authorNota.name}</span>
                    )}
                    {concatAuthors(i, authors)}
                </span>
            ))}
        </>
    );
};

authorArticle.propTypes = {
    globalContent: PropTypes.shape({
        credits: PropTypes.shape({
            by: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string,
                    name: PropTypes.string,
                    type: PropTypes.string,
                    slug: PropTypes.string,
                    url: PropTypes.string
                })
            )
        })
    }).isRequired
};

export default authorArticle;
