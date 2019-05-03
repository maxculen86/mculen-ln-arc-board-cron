import React from 'react';
import PictureSource from '../../../common/pictureSource';
import Article from '../../../common/article';

export default function Program({ href, description, imgSrc }) {
    const alt = `Ir a ${description}`;
    return (
        <article className={'article'}>
            <a
                className="figure"
                href={href}
                alt={alt}
                data-event="LinkClick"
                data-section="LinksOTT"
            >
                <picture className="content-picture">
                    <PictureSource srcSet={imgSrc} />
                    <img
                        className="lazy loaded"
                        alt="imagen-destacada"
                        data-src=""
                        data-was-processed="true"
                    />
                </picture>
            </a>
            <h2 className={'title'}>
                <a
                    href={href}
                    alt={alt}
                    data-event="LinkClick"
                    data-section="LinksOTT"
                >
                    {description}
                </a>
            </h2>
        </article>
    );
}
