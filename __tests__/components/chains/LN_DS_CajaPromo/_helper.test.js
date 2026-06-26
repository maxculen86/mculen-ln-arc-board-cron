import { shouldShowGamesCaja } from '../../../../components/chains/LN_DS_CajaPromo/common/_helper';
import config from '../../../../properties/sites/la-nacion-ar';

const { layoutsName } = config;
const INFOGRAFIA = layoutsName.Infografia;

const withLabel = text => ({ label: { mostrar_caja_juegos: { text } } });

describe('shouldShowGamesCaja', () => {
    describe('when contentType is game and layout is Infografia', () => {
        it('should return true when the label is "Mostrar"', () => {
            const result = shouldShowGamesCaja({
                layout: INFOGRAFIA,
                globalContent: withLabel('Mostrar'),
                contentType: 'game'
            });

            expect(result).toBe(true);
        });

        it('should return false when the label is not "Mostrar"', () => {
            const result = shouldShowGamesCaja({
                layout: INFOGRAFIA,
                globalContent: withLabel('Ocultar'),
                contentType: 'game'
            });

            expect(result).toBe(false);
        });

        it('should return false when the label is missing', () => {
            const result = shouldShowGamesCaja({
                layout: INFOGRAFIA,
                globalContent: {},
                contentType: 'game'
            });

            expect(result).toBe(false);
        });
    });

    describe('when layout is not Infografia', () => {
        it('should return true even when the label would hide the caja', () => {
            const result = shouldShowGamesCaja({
                layout: layoutsName.HomeLN10,
                globalContent: withLabel('Ocultar'),
                contentType: 'game'
            });

            expect(result).toBe(true);
        });
    });

    describe('when contentType is not game', () => {
        it('should return true in Infografia because the label does not apply', () => {
            const result = shouldShowGamesCaja({
                layout: INFOGRAFIA,
                globalContent: {},
                contentType: 'podcast'
            });

            expect(result).toBe(true);
        });
    });

    describe('when called without arguments', () => {
        it('should return true using the default game contentType', () => {
            const result = shouldShowGamesCaja();

            expect(result).toBe(true);
        });
    });
});
