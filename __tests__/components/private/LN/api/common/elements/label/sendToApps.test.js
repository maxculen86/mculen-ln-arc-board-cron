import sentToApps from '../../../../../../../../components/private/LN/api/common/elements/label/sentToApps';
import { LIVEBLOG_EDITORIAL, HTMLLIBRE, RECETA, VIDEOAL100 } from '../../../../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('components - private - LN - api - common - elements - label - sendToApps', () => {
    describe('sentToApps function test', () => {
        it('sentToApps should return true because enviar_a_apps label text is "Si"', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                label: {
                    enviar_a_apps: {
                        text: 'Si'
                    }
                }
            };

            const result = sentToApps(element);
            expect(result).toBe(true);
        });

        it('sentToApps should return true because enviar_a_apps label text is empty', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                label: {}
            };

            const result = sentToApps(element);
            expect(result).toBe(true);
        });

        it('sentToApps should return false because enviar_a_apps label text is "No"', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                label: {
                    enviar_a_apps: {
                        text: 'No'
                    }
                }
            };

            const result = sentToApps(element);
            expect(result).toBe(false);
        });

        it('sentToApps should return false because enviar_a_apps label text is "Browser"', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                label: {
                    enviar_a_apps: {
                        text: 'Browser'
                    }
                }
            };

            const result = sentToApps(element);
            expect(result).toBe(false);
        });

        it('sentToApps should return false for section /juegos/retrofoto regardless of label configuration', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                taxonomy: {
                    primary_section: {
                        path: '/juegos/retrofoto'
                    }
                },
                label: {
                    enviar_a_apps: {
                        text: 'Si'
                    }
                }
            };

            const result = sentToApps(element);
            expect(result).toBe(false);
        });

        it('sentToApps should return false when subtype is LIVEBLOG_EDITORIAL', () => {
            const element = {
                _id: 'JOLGEOYSHFAURFYQ3ZPRAKROM4',
                subtype: LIVEBLOG_EDITORIAL,
                label: {
                    enviar_a_apps: {
                        text: 'Si'
                    }
                }
            };

            const result = sentToApps(element);
            expect(result).toBe(false);
        });
    });

    describe('Hardcoded webview subtypes', () => {
        const HARDCODED_SUBTYPES = [
            { name: 'LIVEBLOG_EDITORIAL', value: LIVEBLOG_EDITORIAL },
            { name: 'HTMLLIBRE', value: HTMLLIBRE },
            { name: 'RECETA', value: RECETA },
            { name: 'VIDEOAL100', value: VIDEOAL100 }
        ];

        test.each(HARDCODED_SUBTYPES)(
            'sentToApps should return false for subtype $name even if enviar_a_apps is Si',
            subtype => {
                const element = {
                    subtype: subtype.value,
                    label: {
                        enviar_a_apps: { text: 'Si' }
                    }
                };

                expect(sentToApps(element)).toBe(false);
            }
        );

        test.each(HARDCODED_SUBTYPES)(
            'sentToApps should return false for subtype $name when enviar_a_apps is empty',
            subtype => {
                const element = {
                    subtype: subtype.value,
                    label: {}
                };

                expect(sentToApps(element)).toBe(false);
            }
        );
    });

});
