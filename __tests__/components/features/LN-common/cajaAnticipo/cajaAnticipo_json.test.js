import CajaAnticipo from '../../../../../components/features/LN-common/cajaAnticipo/json';

describe('Private - Feature - CajaAnticipo - json =>', () => {
    const customFields = {
        hide: false,
        title: 'Titulo test para Anticipo',
        link: 'https://www.lanacion.com.ar/'
    };

    describe('with empty location or type', () => {
        it('should returns all fields OK', () => {
            const result = CajaAnticipo({ customFields });

            expect(result).toMatchObject({
                information: {
                    hideCaja: false,
                    title: 'Titulo test para Anticipo'
                }
            });
        });

        it('should returns null', () => {
            try {
                const result = CajaAnticipo({});
                expect(extraClass).toBe(null);
            } catch (err) {
                expect(err.message).toBe(
                    "Cannot read property 'hide' of undefined"
                );
            }
        });
    });
});
