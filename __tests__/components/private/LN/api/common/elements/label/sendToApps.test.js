import sentToApps from '../../../../../../../../components/private/LN/api/common/elements/label/sentToApps';

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
    });
});
