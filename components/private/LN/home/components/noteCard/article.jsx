import React from 'react';

import Consumer from 'fusion:consumer';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Image from './image';

function Article({ title, imageId, lead, subhead, authors, url = '/' }) {
    return (
        // <Static id={featureId}>
        <article className="mod-article w-100-mobile firma-autor">
            {imageId !== null && (
                <div className="com-media">
                    <a href={url} title={title}>
                        <Image imageId={imageId} />
                    </a>
                </div>
            )}
            <div className="com-description">
                <h2 className="com-title">
                    <a href={url} title={title}>
                        {lead && (
                            <span className="com-volanta">{`${lead} `}</span>
                        )}
                        {title}
                    </a>
                </h2>
                {subhead && (
                    <p className="com-subhead">
                        <a href={url} title={title}>
                            {subhead}
                        </a>
                    </p>
                )}
                {authors && (
                    <strong className="com-author">
                        <a href={url} title={authors}>
                            {authors}
                        </a>
                    </strong>
                )}
            </div>
        </article>
        // </Static>
    );
}

export default Consumer(Article);
