import React from 'react';
import { BannerBaseFoodit } from './BannerBaseFoodit';
import { bannersTypes } from './_helpers/bannersTypes';

export const BannersFoodit = {
    modal_1x1: () => <BannerBaseFoodit bannerType={bannersTypes.modal_1x1} />,
    sale_box: () => <BannerBaseFoodit bannerType={bannersTypes.sale_box} />
};
