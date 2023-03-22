import hasNotAMP from '../../../../components/output-types/Helper/hasNotAMP';
import Redirect from '../../../../content/sources/utils/redirect';

jest.mock('../../../../content/sources/utils/redirect');
Redirect.mockReturnValue(Promise.reject());

describe('Tests hasNotAMP function', () => {
    it('Should throw a redirect for the non-AMP pages horoscope on server side', () => {
        delete global.window;
        try {
            hasNotAMP(
                'LN-acumulado',
                '/horoscopo/?outputType=amp&adtest=true&d=1302'
            );
        } catch (error) {}
        expect(Redirect).toBeCalled();
        expect(Redirect).toBeCalledWith('/horoscopo/?outputType=default', 301);
    });

    it('Should throw a redirect for the non-AMP pages sport on server side', () => {
        delete global.window;
        try {
            hasNotAMP(
                'LN-Home_Sports',
                '/deportes/futbol/?adstest=true&outputType=amp'
            );
        } catch (error) {
            expect(Redirect).toBeCalled();
            expect(Redirect).toBeCalledWith(
                '/deportes/futbol/?outputType=default',
                301
            );
        }
    });

    it('Should throw a redirect for the non-AMP pages home on server side', () => {
        delete global.window;
        try {
            hasNotAMP(
                'LN-Home_Main',
                '/homepage/?outputType=amp&adstest=true&d=2345'
            );
        } catch (error) {}
        expect(Redirect).toBeCalled();
        expect(Redirect).toBeCalledWith('/homepage/?outputType=default', 301);
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
});
