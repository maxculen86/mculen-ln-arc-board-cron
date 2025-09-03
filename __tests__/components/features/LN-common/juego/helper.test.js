import {
    DIAGRAMATIONS,
    getButtonProps
} from '../../../../../components/features/LN-common/Juego/helper';

describe('components - features - LN-common - Juego - helper', () => {
    describe('getButtonProps', () => {
        it('should return only label when game is ranking and no top margin applies', () => {
            const result = getButtonProps(
                'ranking',
                false,
                DIAGRAMATIONS.oneHorizontalThreeVertical
            );
            expect(result).toEqual({ label: 'Ver Ranking' });
        });

        it('should return only className when game is not ranking but top margin applies (firstCard = true)', () => {
            const result = getButtonProps(
                'juego',
                true,
                DIAGRAMATIONS.oneHorizontalThreeVertical
            );
            expect(result).toEqual({ className: 'mt-8_m' });
        });

        it('should return both label and className when game is ranking and top margin applies', () => {
            const result = getButtonProps(
                'ranking',
                true,
                DIAGRAMATIONS.oneHorizontalThreeVertical
            );
            expect(result).toEqual({
                label: 'Ver Ranking',
                className: 'mt-8_m'
            });
        });

        it('should return className even if firstCard is false when layout is NOT oneHorizontalThreeVertical', () => {
            const result = getButtonProps('juego', false, 'fourVertical');
            expect(result).toEqual({ className: 'mt-8_m' });
        });

        it('should return an empty object when game is not ranking, firstCard is false, and layout is oneHorizontalThreeVertical', () => {
            const result = getButtonProps(
                'juego',
                false,
                DIAGRAMATIONS.oneHorizontalThreeVertical
            );
            expect(result).toEqual({});
        });
    });
});
