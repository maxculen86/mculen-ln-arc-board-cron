import React from 'react';
export default function component({ imgSrc }) {
    return (
        <section className={'apertura'}>
            <picture className={'content-picture'}>
                {imgSrc && <source srcSet={imgSrc} data-srcset={imgSrc} />}
                {imgSrc && (
                    <img className={'lazy loaded'} className={'img-desktop'} />
                )}
            </picture>
        </section>
    );
}
