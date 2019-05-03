import React from 'react';
import Picture from '../../../common/picture';
export default function component({ imgSrc }) {
    console.log('imgSrc', imgSrc);
    return (
        <section className={null}>
            <picture className={'content-picture'}>
                <img
                    className={'img-desktop'}
                    src={imgSrc}
                    style={{ width: '400px', height: '400px' }}
                />
            </picture>
        </section>
    );
}
