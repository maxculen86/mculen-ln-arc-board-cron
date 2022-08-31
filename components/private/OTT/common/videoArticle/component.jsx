import React from 'react';
import LinkedTitle from '../../../common/linkedTitle';
import addForwardSlash from '../../../LN/common/utils/addForwardSlash';

export default function VideoArticle({ href, description, imgSrc, date }) {
    return (
        <article className="article">
            <a className="figure" href={addForwardSlash(href)}>
                <picture className="content-picture">
                    <source srcSet={imgSrc} />
                    <img
                        className="lazy loaded"
                        alt="imagen-destacada"
                        data-src=""
                        data-was-processed="true"
                    />
                </picture>
            </a>
            <LinkedTitle href={href} title={description} />
        </article>
    );
}
