import hasNotAMP from '../../../../components/output-types/Helper/hasNotAMP';
import Redirect from '../../../../content/sources/utils/redirect';

jest.mock('../../../../content/sources/utils/redirect');
Redirect.mockReturnValue(Promise.reject());

describe('Tests hasNotAMP function', () => {
    it('Should not throw redirect for layout without AMP on clientside', () => {
        let err;
        const Redirect = jest.fn();
        try {
            hasNotAMP(
                'LN-Home_Sports',
                '/deportes/?adstest=true&_website=la-nacion-ar&outputType=amp'
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

    it('Should throw redirect to not AMP url with 301 status code on serverside', () => {
        delete global.window;
        try {
            hasNotAMP(
                'LN-Home_Main',
                '/homepage/?adstest=true&_website=la-nacion-ar&outputType=amp'
            );
        } catch (error) {}
        expect(Redirect).toBeCalled();
        expect(Redirect).toBeCalledWith(
            '/homepage/?adstest=true&_website=la-nacion-ar',
            301
        );
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
