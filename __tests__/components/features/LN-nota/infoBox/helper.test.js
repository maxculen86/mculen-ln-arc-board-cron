import { getZocaloProps } from '../../../../../components/features/LN-nota/infoBox/helper';

jest.mock('fusion:environment', () => ({
    ARC_STATIC: 'https://arc-static.glanacion.com'
}));

describe('components - features - LN-Nota - infoBox - helper', () => {
    test('should return the correct config for deportes', () => {
        const zocaloProps = getZocaloProps(arg => arg, '/pf', '/deportes');

        expect(zocaloProps).toMatchSnapshot();
    });

    test('should return the correct config for juegos', () => {
        const zocaloProps = getZocaloProps(arg => arg, '/pf', '/juegos');

        expect(zocaloProps).toMatchSnapshot();
    });

    test('should show zocalo false config', () => {
        const zocaloProps = getZocaloProps(arg => arg, '/pf', '/mundo');

        expect(zocaloProps).toStrictEqual({ showZocalo: false });
    });
});
