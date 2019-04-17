import React from 'react';
import Image from './articleImage';
import Title from './articleTitle';

export default function AuthorArticle(props) {
    const {
        renderClasses,
        imgUrls,
        url,
        authorName,
        subheader,
        teaser,
        title
    } = props;

    const classes = `autor ${renderClasses}`;

    return (
        <article className={classes}>
            <div className="content-firma">
                <Image imgUrls={imgUrls} url={url} />
            </div>
            <h3 className="content-nombre">
                <a href={url}>{authorName}</a>
            </h3>
            <Title teaser={teaser} title={title} />
            {subheader && <Subheader subheader={subheader} url={url} />}
        </article>
    );
}
