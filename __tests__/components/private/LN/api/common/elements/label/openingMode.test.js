import getOpeningMode from '../../../../../../../../components/private/LN/api/common/elements/label/openingMode';
import { LIVEBLOG_EDITORIAL } from '../../../../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('components - private - LN - api - common - elements - label - openingMode', () => {
    describe('getOpeningMode function test', () => {
        it('getOpeningMode should return Native because enviar_a_apps label text is empty', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                label: {}
            };

            const result = getOpeningMode(element);
            expect(result).toEqual('Native');
        });

        it('getOpeningMode should return Native because enviar_a_apps label text is "Si"', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                label: {
                    enviar_a_apps: {
                        text: 'Si'
                    }
                }
            };

            const result = getOpeningMode(element);
            expect(result).toEqual('Native');
        });

        it('getOpeningMode should return NativeBrowser because enviar_a_apps label text is "No"', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                label: {
                    enviar_a_apps: {
                        text: 'No'
                    }
                }
            };

            const result = getOpeningMode(element);
            expect(result).toEqual('NativeBrowser');
        });

        it('getOpeningMode should return "ExternalBrowser" because enviar_a_apps label text is "Browser"', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                label: {
                    enviar_a_apps: {
                        text: 'Browser'
                    }
                }
            };

            const result = getOpeningMode(element);
            expect(result).toEqual('ExternalBrowser');
        });
        it('getOpeningMode should return NativeBrowser when subtype is LIVEBLOG_EDITORIAL regardless of label', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                subtype: LIVEBLOG_EDITORIAL,
                label: {
                    enviar_a_apps: {
                        text: 'Si'
                    }
                }
            };

            const result = getOpeningMode(element);
            expect(result).toEqual('NativeBrowser');
        });
    });
});
