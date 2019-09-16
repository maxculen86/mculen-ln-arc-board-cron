import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/author.css';

const authorArticle = ({
    globalContent: {
        credits: { by }
    }
}) => {
    return (
        <>
            <span>Por </span>
            {by &&
                by.map((authorNota, i) => (
                    <div key={authorNota._id} className="com-author">
                        {authorNota.url !== '' ? (
                            <a
                                href={authorNota.url}
                                className={authorNota.type}
                            >
                                {authorNota.name}
                            </a>
                        ) : (
                            <span> {authorNota.name} </span>
                        )}
                        {i < by.length - 2 ? (
                            <span>, </span>
                        ) : (
                            <>{i === by.length - 2 ? ' y\u00A0' : ''}</>
                        )}
                    </div>
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

authorArticle.defaultProps = {
    authors: []
};

export default authorArticle;
