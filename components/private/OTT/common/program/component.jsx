import React from 'react';
import PictureSource from '../../../common/pictureSource';
import get from 'lodash.get';
import defaultImages from '../utils/defaultImages';
export default function Program({ href, description, image }) {
    const alt = `Ir a ${description}`;
    const imageUrl = get(image, 'url', null);
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
                    {imageUrl && <PictureSource srcSet={imageUrl} />}
                    {imageUrl && (
                        <img
                            className="lazy loaded"
                            alt="imagen-destacada"
                            data-src=""
                            data-was-processed="true"
                        />
                    )}
                    {!imageUrl &&
                        defaultImages.defaultSvgProgramImage(279, 157)}
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
