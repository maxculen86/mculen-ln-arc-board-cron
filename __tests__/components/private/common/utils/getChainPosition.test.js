import getChainPosition from '../../../../../components/private/common/utils/getChainPosition';

jest.mock(
    '../../../../../components/chains/LN10_Caja_Segmentada/_helpers',
    () => ({
        isTodayEnabled: jest.fn(() => true)
    })
);

describe('Components - private - common - utils - getChainPosition', () => {
    const {
        isTodayEnabled
    } = require('../../../../../components/chains/LN10_Caja_Segmentada/_helpers');

    beforeEach(() => {
        jest.clearAllMocks();
        isTodayEnabled.mockReturnValue(true);
    });

    const createChain = (type, id, enabledDays = []) => ({
        collection: 'chains',
        type,
        props: {
            id,
            customFields: { enabledDays }
        }
    });

    describe("when caja segmentada's termica is disabled", () => {
        it('should skip ALL caja_segmentada and adjust positions accordingly', () => {
            const termicaCajaSegmentada = false;

            const renderables = [
                createChain('LN10_Caja_Manual', 'manual1'),
                createChain('LN10_Caja_Segmentada', 'seg1'),
                createChain('LN10_Caja_Apertura', 'apertura1'),
                createChain('LN10_Caja_Segmentada', 'seg2'),
                createChain('LN10_Caja_Collection', 'collection1')
            ];

            expect(
                getChainPosition(
                    'apertura1',
                    termicaCajaSegmentada,
                    renderables
                )
            ).toBe(1);
            expect(
                getChainPosition(
                    'collection1',
                    termicaCajaSegmentada,
                    renderables
                )
            ).toBe(2);
            expect(isTodayEnabled).not.toHaveBeenCalled();
        });
    });

    describe("when caja segmentada's termica is enabled but days differ", () => {
        it('should skip specific caja_segmentada based on day validation', () => {
            const termicaCajaSegmentada = true;
            isTodayEnabled.mockReturnValueOnce(true).mockReturnValueOnce(false);

            const renderables = [
                createChain('LN10_Caja_Manual', 'manual1'),
                createChain('LN10_Caja_Segmentada', 'seg1', ['lunes']),
                createChain('LN10_Caja_Segmentada', 'seg2', ['martes']),
                createChain('LN10_Caja_Collection', 'collection1')
            ];

            expect(
                getChainPosition(
                    'collection1',
                    termicaCajaSegmentada,
                    renderables
                )
            ).toBe(2);
            expect(isTodayEnabled).toHaveBeenCalledTimes(2);
        });
    });

    describe("when caja segmentada's termica is enabled and valid days", () => {
        it('should include all caja_segmentada when both termica and days are valid', () => {
            const termicaCajaSegmentada = true;
            isTodayEnabled.mockReturnValue(true);

            const renderables = [
                createChain('LN10_Caja_Manual', 'manual1'),
                createChain('LN10_Caja_Segmentada', 'seg1'),
                createChain('LN10_Caja_Segmentada', 'seg2'),
                createChain('LN10_Caja_Collection', 'collection1')
            ];

            expect(
                getChainPosition(
                    'collection1',
                    termicaCajaSegmentada,
                    renderables
                )
            ).toBe(3);
        });
    });

    describe('when chains excluded from position are present', () => {
        it('should skip encuesta and juegos chains and keep normal chain positions stable', () => {
            const termicaCajaSegmentada = true;

            const renderables = [
                createChain('LN10_Caja_Manual', 'manual1'),
                createChain('LN10_Caja_Encuesta', 'encuesta1'),
                createChain('LN10_Caja_Apertura', 'apertura1'),
                createChain('LN10_Caja_Juegos_v2', 'juegos1'),
                createChain('LN10_Caja_Collection', 'collection1')
            ];

            expect(
                getChainPosition(
                    'apertura1',
                    termicaCajaSegmentada,
                    renderables
                )
            ).toBe(1);
            expect(
                getChainPosition(
                    'collection1',
                    termicaCajaSegmentada,
                    renderables
                )
            ).toBe(2);
        });
    });
});
