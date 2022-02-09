import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/author.css';

// TODO: esta mal como arma el listado con las 'y' y las ','. El test pasa para poder mergear pero hay que corregirlo!
const authorArticle = ({
    globalContent: {
        credits: { by }
    }
}) => {
    const concatAuthors = (index, authors) => {
        if (index < authors.length - 2) return ',';
        if (index === authors.length - 2) return 'y';
        return '';
    };

    if (!by) return null;
    by = by.filter(author => author.type === 'author');
    return (
        <>
            {by.length > 0 ? <span>Por</span> : ''}
            {by.map((authorNota, i) => (
                <span key={authorNota._id} className="">
                    {authorNota.url && authorNota.url !== '' ? (
                        <a href={authorNota.url}>{authorNota.name}</a>
                    ) : (
                        <span>{authorNota.name}</span>
                    )}
                    {concatAuthors(i, by)}
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
