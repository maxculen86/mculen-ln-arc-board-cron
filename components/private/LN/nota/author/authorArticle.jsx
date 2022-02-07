import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/author.css';

// TODO: esta mal como arma el listado con las 'y' y las ','. El test pasa para poder mergear pero hay que corregirlo!
const authorArticle = ({
    globalContent: {
        credits: { by }
    }
}) => {
    if (!by) return null;
    by = by.filter(author => author.type === 'author');
    return (
        <>
            {by && by.length > 0 ? <span>Por</span> : ''}
            {by &&
                by.map((authorNota, i) => (
                    <span key={authorNota._id} className="">
                        {authorNota.url && authorNota.url !== '' ? (
                            <a href={authorNota.url}>{authorNota.name}</a>
                        ) : (
                            <span> {authorNota.name} </span>
                        )}
                        {i < by.length - 2 ? (
                            <>{','}</>
                        ) : (
                            <>{i === by.length - 2 && ' y'}</>
                        )}
                    </span>
                ))}
        </>
    );
};

authorArticle.propTypes = {
    credits: PropTypes.shape({
        by: PropTypes.shape({
            authors: PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string,
                    name: PropTypes.string,
                    type: PropTypes.string,
                    slug: PropTypes.string,
                    url: PropTypes.string
                })
            )
        })
    })
};

export default authorArticle;
