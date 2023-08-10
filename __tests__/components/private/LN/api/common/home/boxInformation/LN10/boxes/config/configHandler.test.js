import attachBanners from '../../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN10/boxes/config/configHandler';

describe('components - private - LN - api - common - home - boxInformation - LN10 - boxes - config - configHandler', () => {
    it('should return the box with banner object if all required parameters are present', () => {
        const box = { id: 1, name: 'box1' };
        const sectionAlias = 'test-section';
        const allBanners = [
            {
                sectionAliasMobile: 'test-section',
                banner: {
                    id_adserver: {
                        android:
                        '/133919216/lanacion_app_android/home/cajasuscriptores_app',
                    ios: '/133919216/lanacion_app_ios/home/cajasuscriptores_app'
                    },
                    size: {
                        height: 250,
                        width: 300
                    },
                    position: 'Bottom'
                }
            }
        ];
        const expected = {
            id: 1,
            name: 'box1',
            banner: {
                id_adserver: {
                    android:
                    '/133919216/lanacion_app_android/home/cajasuscriptores_app',
                ios: '/133919216/lanacion_app_ios/home/cajasuscriptores_app'
                },
                size: { height: 250, width: 300 },
                position: 'Bottom'
            }
        };
        const result = attachBanners(box, sectionAlias, allBanners);
        expect(result).toEqual(expected);
    });

    it('should return the box object if box parameter is not present', () => {
        const sectionAlias = 'test-section';
        const allBanners = [
            { sectionAliasMobile: 'test-section', banner: 'banner1' }
        ];
        const expected = undefined;
        const result = attachBanners(undefined, sectionAlias, allBanners);
        expect(result).toEqual(expected);
    });

    it('should return the box object if sectionAlias parameter is not present', () => {
        const box = { id: 1, name: 'box1' };
        const allBanners = [
            { sectionAliasMobile: 'test-section', banner: 'banner1' }
        ];
        const expected = { id: 1, name: 'box1' };
        const result = attachBanners(box, undefined, allBanners);
        expect(result).toEqual(expected);
    });

    it('should return the box object if allBanners parameter is not present', () => {
        const box = { id: 1, name: 'box1' };
        const sectionAlias = 'test-section';
        const expected = { id: 1, name: 'box1' };
        const result = attachBanners(box, sectionAlias, undefined);
        expect(result).toEqual(expected);
    });

    it('should return the box object with banner property as an empty array if no banners are found for the given sectionAlias', () => {
        const box = { id: 1, name: 'box1' };
        const sectionAlias = 'test-section';
        const allBanners = [
            { sectionAliasMobile: 'another-section', banner: 'banner1' }
        ];
        const expected = { id: 1, name: 'box1' };
        const result = attachBanners(box, sectionAlias, allBanners);
        expect(result).toEqual(expected);
    });
});
