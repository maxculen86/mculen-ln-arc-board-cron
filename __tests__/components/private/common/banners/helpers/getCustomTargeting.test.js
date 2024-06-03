import getCustomTargeting from '../../../../../../components/private/common/banners/helpers/getCustomTargeting';
import handleCookie from '../../../../../../components/private/LN/common/utils/handleCookie';

jest.mock('../../../../../../components/private/LN/common/utils/handleCookie');

const mockGetCookie = jest.fn();

handleCookie.mockImplementation(() => ({
    getCookie: mockGetCookie
}));

describe('private - common - banners - helpers - getCustomTargeting', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('returns empty object when bannerId does not match any key', () => {
        const result = getCustomTargeting({ bannerId: 'cabezal_dsk' });
        expect(result).toEqual({});
    });

    test('returns correct targeting for signwall banner', () => {
        const cookieValues = {
            gaComboType: 'ga-combo3',
            controlGroupV3: JSON.stringify({
                GrupoControlMeteredV3: 'maxorg_s2'
            }),
            usuarioDetalleClubNacion: 'P',
            metering_arc_counter: '5',
            cookieLogin: 'yes'
        };

        mockGetCookie.mockImplementation(
            cookieName => cookieValues[cookieName] || ''
        );

        localStorage.setItem('CDpayUser', 'yes');

        const result = getCustomTargeting({ bannerId: '1x1_signwall_dsk' });
        expect(result).toEqual({
            p_gaComboType: 'ga-combo3',
            p_controlGroupV3: 'maxorg_s2',
            p_credencialClub: 'P',
            p_notaMeetering: '5',
            p_logeado: 'yes',
            p_suscriptor: 'yes'
        });
    });

    test('handles missing cookies ok', () => {
        mockGetCookie.mockReturnValue('');

        const result = getCustomTargeting({ bannerId: 'signwall_banner' });
        expect(result).toEqual({
            p_gaComboType: '',
            p_controlGroupV3: '',
            p_credencialClub: '',
            p_notaMeetering: '',
            p_logeado: 'no',
            p_suscriptor: ''
        });
    });

    test('returns empty object when bannerId is not provided', () => {
        const result = getCustomTargeting({});
        expect(result).toEqual({});
    });

    test('returns empty object when bannerId is undefined', () => {
        const result = getCustomTargeting({ bannerId: undefined });
        expect(result).toEqual({});
    });

    test('returns empty object when argument is null', () => {
        const result = getCustomTargeting(null);
        expect(result).toEqual({});
    });
});
