import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../assets/bundles/css/ln/components/author.css';

const authorArticle = ({
    globalContent: {
        credits: { by }
    }
}) => {
    const listAuthor = by.map((authorNota, i) => {
        return (
            <div key={authorNota._id} className="com-author">
                {authorNota.url !== '' ? (
                    <a href={authorNota.url} className={authorNota.type}>
                        {authorNota.name}
                    </a>
                ) : (
                    <span>{authorNota.name}</span>
                )}
                {i < by.length && by.length > 1 ? (
                    <span>, </span>
                ) : (
                    <>{i === by.length ? <span> y</span> : ''}</>
                )}
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
