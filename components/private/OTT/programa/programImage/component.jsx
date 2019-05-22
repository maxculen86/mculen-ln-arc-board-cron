import React from 'react';
import defaultImages from '../../common/utils/defaultImages';
export default function component({ imgSrc }) {
    return (
        <section className={'apertura'}>
            <picture className={'content-picture'}>
                {imgSrc && <source srcSet={imgSrc} data-srcset={imgSrc} />}
                {imgSrc && (
                    <img className={'lazy loaded'} className={'img-desktop'} />
                )}
                {!imgSrc && defaultImages.defaultSvgProgramImage(700, 450)}
            </picture>
        </section>
    );
}
