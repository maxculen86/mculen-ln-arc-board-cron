import React from 'react';
import LinkedTitle from '../../../common/linkedTitle';
import Picture from '../../../common/picture';
import PictureSource from '../../../common/pictureSource';
import Article from '../../../common/article';

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
