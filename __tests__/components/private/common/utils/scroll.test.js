import Scroll from '../../../../../components/private/common/utils/scroll';

describe('Common - Scroll Utils', () => {
    const scrollUp = {
        isScrollUp: true,
        isScrollDown: false
    };
    const scrollDown = {
        isScrollUp: false,
        isScrollDown: true
    };
    test('la funcion check() retorna un objeto con el valor booleano de scrollUp y scrollDown', () => {
        let lastScroll = 0;
        expect(Scroll.getScrollDirection(lastScroll)).toStrictEqual(scrollDown);
        lastScroll = 50;
        expect(Scroll.getScrollDirection(lastScroll)).toStrictEqual(scrollUp);
    });
});
