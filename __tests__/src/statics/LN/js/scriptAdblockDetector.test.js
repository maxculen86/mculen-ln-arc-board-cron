import { pushAdblockEventToDataLayer } from '../../../../../src/statics/LN/js/scriptAdblockDetector';

describe('src - statics - LN - js - adblockDetector', () => {
    beforeEach(() => {
        window.dataLayer = [];
    });

    test('should push data to dataLayer with detectado set to true', () => {
        pushAdblockEventToDataLayer(true);

        expect(window.dataLayer).toHaveLength(1);
        expect(window.dataLayer[0]).toEqual({
            event: 'adblock-detected',
            detectado: true
        });
    });

    test('should push data to dataLayer with detectado set to false', () => {
        pushAdblockEventToDataLayer(false);

        expect(window.dataLayer).toHaveLength(1);
        expect(window.dataLayer[0]).toEqual({
            event: 'adblock-detected',
            detectado: false
        });
    });
});
