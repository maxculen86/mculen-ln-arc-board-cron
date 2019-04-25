import React from 'react';
import LinkedTitle from '../../../common/containers/linkedTitle';
import Picture from '../../../common/containers/picture';
import PictureSource from '../../../common/containers/pictureSource';
import Article from '../../../common/containers/article';

export default function Program({ href, description, imgSrc }) {
    return (
        <Article>
            <a className="figure" href={href}>
                <Picture className="content-picture">
                    <PictureSource srcSet={imgSrc} />
                    <img
                        className="lazy loaded"
                        alt="imagen-destacada"
                        data-src=""
                        data-was-processed="true"
                    />
                </Picture>
            </a>
            <LinkedTitle href={href} title={description} />
        </Article>
    );
}
