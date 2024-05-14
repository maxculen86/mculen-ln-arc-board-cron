import transformSocial from '../../../../../../components/features/private-global/common/utils/transformSocial';

describe('transformSocial', () => {
    it('debería transformar correctamente un enlace de red social', () => {
        const resultado = transformSocial(
            'instagram',
            'https://instagram.com/juanpravatanorecuerdotuinsta/'
        );
        expect(resultado).toEqual({
            name: '@juanpravatanorecuerdotuinsta',
            href: 'https://instagram.com/juanpravatanorecuerdotuinsta/',
            icon: 'instagram'
        });
    });

    it('debería transformar correctamente un nombre de usuario de red social', () => {
        const resultado = transformSocial('twitter', '@juantwitter');
        expect(resultado).toEqual({
            name: '@juantwitter',
            href: 'https://twitter.com/juantwitter/',
            icon: 'twitter'
        });
    });

    it('debería manejar correctamente un nombre de usuario sin "@"', () => {
        const resultado = transformSocial('pinterest', 'juanpinterest');
        expect(resultado).toEqual({
            name: '@juanpinterest',
            href: 'https://pinterest.com/juanpinterest/',
            icon: 'pinterest'
        });
    });

    it('debería manejar correctamente un nombre de usuario sin "@"', () => {
        const resultado = transformSocial('pinterest', '');
        expect(resultado).toEqual({});
    });
});
