import hasNotAMP from '../../../../components/output-types/Helper/hasNotAMP';
import Redirect from '../../../../content/sources/utils/redirect';

jest.mock('../../../../content/sources/utils/redirect');
Redirect.mockReturnValue(Promise.reject());

describe('Tests hasNotAMP function', () => {
    it('Should throw a redirect for the non-AMP layout on the client side keeping the query params', () => {
        delete global.window;
        try {
            hasNotAMP(
                'LN-acumulado',
                '/horoscopo/?outputType=amp&adtest=true&d=1302'
            );
        } catch (error) {}
        expect(Redirect).toBeCalled();
        expect(Redirect).toBeCalledWith('/horoscopo/?adtest=true&d=1302', 301);
    });

    it('Should throw redirect for layout without AMP on clientside', () => {
        delete global.window;
        try {
            hasNotAMP(
                'LN-Home_Sports',
                '/deportes/futbol/?adstest=true&outputType=amp'
            );
        } catch (error) {
            expect(Redirect).toBeCalled();
            expect(Redirect).toBeCalledWith(
                '/deportes/futbol/?adstest=true',
                301
            );
        }
    });

    it('Should not throw redirect for layout with AMP on clientside', () => {
        let err;
        const Redirect = jest.fn();
        try {
            hasNotAMP(
                'LN-nota-noticia',
                '/deportes/prueba-ios-y-android-cuerpo-nid12052020/?adstest=true&_website=la-nacion-ar&outputType=amp'
            );
        } catch (error) {
            err = error;
        }
        expect(err).toBeUndefined();
        expect(Redirect).not.toBeCalled();
    });

    it('Should throw redirect to not AMP url with 301 status code on serverside', () => {
        delete global.window;
        try {
            hasNotAMP(
                'LN-Home_Main',
                '/homepage/?outputType=amp&adstest=true&d=2345'
            );
        } catch (error) {}
        expect(Redirect).toBeCalled();
        expect(Redirect).toBeCalledWith('/homepage/?adstest=true&d=2345', 301);
    });

    it('Should not throw redirect for layout with AMP on serverside ', () => {
        delete global.window;
        let err;
        const Redirect = jest.fn();
        try {
            hasNotAMP(
                'LN-nota-noticia',
                '/deportes/prueba-ios-y-android-cuerpo-nid12052020/?adstest=true&_website=la-nacion-ar&outputType=amp'
            );
        } catch (error) {
            err = error;
        }
        expect(err).toBeUndefined();
        expect(Redirect).not.toBeCalled();
    });
});
