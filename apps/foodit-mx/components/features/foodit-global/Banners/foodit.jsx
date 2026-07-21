import React from 'react';
import { BannerBaseFoodit } from './BannerBaseFoodit';
import { bannersTypes } from './_helpers/bannersTypes';
import siteProperties from '../../../../properties/sites/foodit';

const { layoutsName } = siteProperties;
export const BannersFoodit = {
    modal_1x1: () => <BannerBaseFoodit bannerType={bannersTypes.modal_1x1} />,
    sale_box: () => <BannerBaseFoodit bannerType={bannersTypes.sale_box} />,
    caja_1: () => <BannerBaseFoodit bannerType={bannersTypes.caja_1} />
};

export const bannersElements = [
    {
        _id: 'caja_1',
        position: 5,
        type: 'banner-element',
        allowLayouts: [layoutsName.FooditFichaNota]
    }
];
