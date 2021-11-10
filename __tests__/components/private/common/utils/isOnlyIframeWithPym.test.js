import isOnlyIframeWithPym from '../../../../../components/private/common/utils/isOnlyIframeWithPym';
describe('common - utils - isOnlyIframeWithPym', () => {
    describe('When html contain an', () => {
        test('iframe is nested in div, return False', () => {
            const html =
                '<div style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;"><iframe class="anexo" id="LNcreativa" frameborder="0" width="100%" height="1200" scrolling="no" src="https://www.padron.gob.ar/"></iframe></div>';
            expect(isOnlyIframeWithPym(html)).toBeFalsy();
        });
        test('iframe is nested in div with pym, return False', () => {
            const html =
                '<div style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;"><iframe class="pym" id="LNcreativa" frameborder="0" width="100%" height="1200" scrolling="no" src="https://www.padron.gob.ar/"></iframe></div>';
            expect(isOnlyIframeWithPym(html)).toBeFalsy();
        });
        test('iframe without pym, return False', () => {
            const html =
                '<iframe class="anexo" id="LNcreativa" frameborder="0" width="100%" height="1200" scrolling="no" src="https://www.padron.gob.ar/"></iframe>';
            expect(isOnlyIframeWithPym(html)).toBeFalsy();
        });
        test('iframe with pym, return True', () => {
            const html =
                '<iframe class="anexo pym" id="LNcreativa" frameborder="0" width="100%" height="1200" scrolling="no" src="https://www.padron.gob.ar/"></iframe>';
            expect(isOnlyIframeWithPym(html)).toBeTruthy();
        });
    });
    describe('When html does not contain an iframe', () => {
        test('return false', () => {
            const html =
                '<div style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;"></div>';
            expect(isOnlyIframeWithPym(html)).toBeFalsy;
        });
    });
    describe('When its not a html, return False', () => {
        test('return false', () => {
            const html = 'No soy un html';
            expect(isOnlyIframeWithPym(html)).toBeFalsy();
        });
    });
});
