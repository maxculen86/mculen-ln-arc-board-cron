import {
    scrollToGrid,
    scrollToCard
} from 'features/LN-nota/bodyCards/_utils/bodyCardsHelper';

const HEADER_OFFSET = 100;

beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
    window.scrollY = 500;
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
        cb(performance.now() + 10000);
        return 1;
    });
});

afterEach(() => {
    window.requestAnimationFrame.mockRestore();
});

describe('bodyCardsHelper - scrollToGrid', () => {
    it('should not scroll when gridRef.current is null', () => {
        scrollToGrid({ current: null });

        expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('should call window.scrollTo with calculated offset', () => {
        const mockElement = document.createElement('div');
        jest.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
            top: 200
        });
        const gridRef = { current: mockElement };

        scrollToGrid(gridRef);

        expect(window.scrollTo).toHaveBeenCalledWith(
            0,
            200 + 500 - HEADER_OFFSET
        );
    });
});

describe('bodyCardsHelper - scrollToCard', () => {
    it.each([[''], [null], [undefined]])(
        'should not scroll when cardId is %s',
        cardId => {
            scrollToCard(cardId);
            expect(window.scrollTo).not.toHaveBeenCalled();
        }
    );

    it('should find element by id card-ampliada-{cardId} and scroll with offset', () => {
        const mockElement = document.createElement('div');
        mockElement.id = 'card-ampliada-test-card';
        jest.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
            top: 300
        });
        document.body.appendChild(mockElement);

        scrollToCard('test-card');

        expect(window.scrollTo).toHaveBeenCalledWith(
            0,
            300 + 500 - HEADER_OFFSET
        );

        document.body.removeChild(mockElement);
    });

    it('should not scroll when card element does not exist', () => {
        scrollToCard('non-existent');
        expect(window.scrollTo).not.toHaveBeenCalled();
    });
});
