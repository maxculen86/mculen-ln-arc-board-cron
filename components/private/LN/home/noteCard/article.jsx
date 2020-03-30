import React from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './image';

const Article = ({ title, imageId, lead, subhead, authors }) => {
    return (
        <article className="mod-article w-100-mobile firma-autor">
            <div className="com-media">
                <a href="" title={title}>
                    <Image imageId={imageId} />
                </a>
            </div>
            <div className="com-description">
                <h2 className="com-title">
                    <a href="" title={title}>
                        {lead && <em className="com-volanta">{`${lead} `}</em>}
                        {title}
                    </a>
                </h2>
                {subhead && (
                    <p className="com-subhead">
                        <a href="" title={title}>
                            {subhead}
                        </a>
                    </p>
                )}
                {authors && (
                    <strong className="com-author">
                        <a href="/" title={authors}>
                            {authors}
                        </a>
                    </strong>
                )}
            </div>
        </article>
    );
};

Article.propTypes = {
    title: PropTypes.string,
    imageId: PropTypes.string,
    lead: PropTypes.string,
    subhead: PropTypes.string,
    authors: PropTypes.string
};

Article.defaultProps = {
    title: undefined,
    imageId: undefined,
    lead: undefined,
    subhead: undefined,
    authors: undefined
};

export default Article;
