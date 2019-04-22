import React from 'react';
import LinkedTitle from '../../../common/containers/linkedTitle';
import Picture from '../../../common/containers/picture';
import PictureSource from '../../../common/containers/pictureSource';

export default function Program({ href, description, imgSrc }) {
    return (
        <article class="article">
            <a class="figure" href={props.href}>
                <Picture class="content-picture">
                    <PictureSource srcset={imgSrc} />
                    <img
                        class="lazy loaded"
                        alt="imagen-destacada"
                        data-src=""
                        data-was-processed="true"
                    />
                </Picture>
            </a>
            <LinkedTitle href={href} title={description} />
        </article>
    );
}
