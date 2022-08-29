import React from 'react';
import getProperties from 'fusion:properties';
import promoItems from '../../../__mocks__/data/images/promoItems.json';
import replaceUrlResizer from '../../../content/sources/utils/replaceUrlResizerToWWW';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('Private - Common - Hooks - replaceUrlResizer', () => {
    describe('When has a promoItemas with resizer urls', () => {
        it('Should return with url with www.lanacion.com.ar', () => {
            expect(replaceUrlResizer(promoItems)).toMatchSnapshot();
        });
    });

    describe('When has URL with www.lanacion.com.ar', () => {
        it('Should return orignal promoIteam', () => {
            const promoIteamMod = replaceUrlResizer(promoItems);
            expect(replaceUrlResizer(promoIteamMod)).toMatchSnapshot();
        });
    });
    describe('When has URL is a empty string', () => {
        it('Should return empty string', () => {
            expect(replaceUrlResizer('')).toEqual('');
        });
    });

    describe('When promoItem Type is not image', () => {
        it('should return original promoItem', () => {
            const promoItemsMod = { ...promoItems, type: 'video' };
            expect(replaceUrlResizer(promoItemsMod)).toEqual(promoItemsMod);
        });
    });
});
