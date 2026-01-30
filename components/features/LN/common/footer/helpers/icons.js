import React from 'react';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import Image from '../../../../ui/ln/image/default';
import getAssetsPath from '../../../../../private/common/utils/getAssetsPath';

export const getFooterIcons = (contextPath, deployment) => {
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
        facebook: <IconSprite name="facebook" fill="#333" />,
        twitter: <IconSprite name="twitter" fill="#333" />,
        instagram: <IconSprite name="instagram" fill="#333" />,
        rss: <IconSprite name="rss" fill="#333" />,
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
