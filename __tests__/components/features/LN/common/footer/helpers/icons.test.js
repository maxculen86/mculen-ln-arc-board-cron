import React from 'react';
import { getFooterImages } from '../../../../../../../components/features/LN/common/footer/helpers/images';

jest.mock('../../../../../../../components/features/ui/ln/image/default', () =>
    jest.fn(() => <img alt="test" />)
);

jest.mock(
    '../../../../../../../components/private/common/utils/getAssetsPath',
    () => jest.fn(() => () => asset => `/assets/${asset}`)
);

describe('getFooterImages', () => {
    const mockContextPath = '/pf';
    const mockDeployment = jest.fn(url => url);

    it('should return an object with all footer images', () => {
        const images = getFooterImages(mockContextPath, mockDeployment);

        expect(images).toHaveProperty('laNacion');
        expect(images).toHaveProperty('storesAndroid');
        expect(images).toHaveProperty('storesIos');
        expect(images).toHaveProperty('gdaXs');
        expect(images).toHaveProperty('dataFiscal');
    });
});
