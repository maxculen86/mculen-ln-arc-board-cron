import getOpeningMode from '../../../../../../../../components/private/LN/api/common/elements/label/openingMode';
import {
    CARDS,
    LIVEBLOG_EDITORIAL,
    HTMLLIBRE,
    RECETA,
    VIDEOAL100
} from '../../../../../../../../components/private/common/utils/subtypes/subtypeHelper';

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
        it('getOpeningMode should return NativeBrowser when subtype is LIVEBLOG_EDITORIAL and enviar_a_apps is Si', () => {
            const element = {
                _id: '1',
                subtype: LIVEBLOG_EDITORIAL,
                label: {
                    enviar_a_apps: { text: 'Si' }
                }
            };

            const result = getOpeningMode(element);
            expect(result).toEqual('NativeBrowser');
        });

        it('getOpeningMode should return ExternalBrowser when subtype is LIVEBLOG_EDITORIAL and enviar_a_apps is Browser', () => {
            const element = {
                _id: '1',
                subtype: LIVEBLOG_EDITORIAL,
                label: {
                    enviar_a_apps: { text: 'Browser' }
                }
            };

            const result = getOpeningMode(element);
            expect(result).toEqual('ExternalBrowser');
        });
    });
    describe('Hardcoded webview subtypes', () => {
        const HARDCODED_SUBTYPES = [
            { name: 'LIVEBLOG_EDITORIAL', value: LIVEBLOG_EDITORIAL },
            { name: 'HTMLLIBRE', value: HTMLLIBRE },
            { name: 'RECETA', value: RECETA },
            { name: 'VIDEOAL100', value: VIDEOAL100 },
            { name: 'CARDS', value: CARDS }
        ];

        test.each(HARDCODED_SUBTYPES)(
            'should return NativeBrowser for subtype $name when enviar_a_apps is empty',
            subtype => {
                const element = {
                    subtype: subtype.value,
                    label: {}
                };

                expect(getOpeningMode(element)).toBe('NativeBrowser');
            }
        );

        test.each(HARDCODED_SUBTYPES)(
            'should return ExternalBrowser for subtype $name when enviar_a_apps is Browser',
            subtype => {
                const element = {
                    subtype: subtype.value,
                    label: {
                        enviar_a_apps: { text: 'Browser' }
                    }
                };

                expect(getOpeningMode(element)).toBe('ExternalBrowser');
            }
        );
    });
});
