import React from 'react';
import Picture from '../../../common/picture';
export default function component({ imgSrc }) {
    return (
        <section className={'apertura'}>
            <picture className={'content-picture'}>
                <source srcset={imgSrc} data-srcset={imgSrc} />
                <img className={'lazy loaded'} className={'img-desktop'} />
            </picture>
        </section>
    );
}
