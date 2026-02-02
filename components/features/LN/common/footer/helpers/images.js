import React from 'react';
import Image from '../../../../ui/ln/image/default';
import getAssetsPath from '../../../../../private/common/utils/getAssetsPath';

export const getFooterImages = (contextPath, deployment) => {
    const url = asset => getAssetsPath(contextPath)(deployment)(asset);

    return {
        laNacion: (
            <Image
                src={url('la-nacion.webp')}
                alt="La Nación"
                className="w-full"
                hidePlaceholder
            />
        ),
        storesAndroid: (
            <Image
                src={url('android-store.webp')}
                alt="Google Play"
                hidePlaceholder
            />
        ),
        storesIos: (
            <Image
                src={url('app-store.webp')}
                alt="App Store"
                hidePlaceholder
            />
        ),
        gdaXs: (
            <Image
                src={url('gda.webp')}
                alt="App store"
                className="w-full"
                hidePlaceholder
            />
        ),
        dataFiscal: (
            <Image
                src={url('data-fiscal.webp')}
                alt="App store"
                className="w-full"
                hidePlaceholder
            />
        )
    };
};
