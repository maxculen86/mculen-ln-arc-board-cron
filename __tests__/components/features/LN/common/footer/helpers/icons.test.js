import React from 'react';
import { getFooterIcons } from '../../../../../../../components/features/LN/common/footer/helpers/icons';

jest.mock(
    '../../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => jest.fn(() => <div>IconSprite</div>)
);

jest.mock('../../../../../../../components/features/ui/ln/image/default', () =>
    jest.fn(() => <img alt="test" />)
);

jest.mock(
    '../../../../../../../components/private/common/utils/getAssetsPath',
    () => jest.fn(() => () => asset => `/assets/${asset}`)
);

describe('getFooterIcons', () => {
    const mockContextPath = '/pf';
    const mockDeployment = jest.fn(url => url);

    it('should return an object with all footer icons', () => {
        const icons = getFooterIcons(mockContextPath, mockDeployment);

        expect(icons).toHaveProperty('laNacion');
        expect(icons).toHaveProperty('facebook');
        expect(icons).toHaveProperty('twitter');
        expect(icons).toHaveProperty('instagram');
        expect(icons).toHaveProperty('rss');
        expect(icons).toHaveProperty('storesAndroid');
        expect(icons).toHaveProperty('storesIos');
        expect(icons).toHaveProperty('gdaXs');
        expect(icons).toHaveProperty('dataFiscal');
    });
});
