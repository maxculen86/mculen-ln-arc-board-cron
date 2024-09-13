import cleanHtmlAttributes from '../../../../../components/private/common/utils/cleanHtmlAttributes';

describe('Components - private - common - utils - cleanHtmlAttributes', () => {
    it('Should return the html string with the attributes without leading and trailing whitespace', () => {
        const html =
            '<iframe width=" 100%" height=" 315" src=" https://www.youtube.com/embed/bQzaYY_MmLg?autoplay=1&amp;mute=1" title=" YouTube video player" frameborder=" 0"></iframe>';
        const expected =
            '<iframe width="100%" height="315" src="https://www.youtube.com/embed/bQzaYY_MmLg?autoplay=1&amp;mute=1" title="YouTube video player" frameborder="0"></iframe>';
        expect(cleanHtmlAttributes(html)).toBe(expected);
    });

    it('Should remove spaces inside attributes with values', () => {
        const html = '<img src="  /image.png  " alt="   image   " />';
        const expected = '<img src="/image.png" alt="image" />';
        expect(cleanHtmlAttributes(html)).toBe(expected);
    });

    it('Should return the same string if no spaces are found inside attributes', () => {
        const html = '<input type="text" value="input value" />';
        expect(cleanHtmlAttributes(html)).toBe(html);
    });

    it('Should handle boolean attributes without modifying them', () => {
        const html = '<input type="checkbox" checked disabled readonly />';
        expect(cleanHtmlAttributes(html)).toBe(html);
    });

    it('Should clean attributes in a more complex HTML structure', () => {
        const html = `
            <div class="  container  " id="  main-div  " style="  color: red; ">
                <p class="  text  " data-info="  some info  ">This is a paragraph.</p>
                <img src="  /path/to/image.png  " alt="  image  ">
            </div>
        `;
        const expected = `
            <div class="container" id="main-div" style="color: red;">
                <p class="text" data-info="some info">This is a paragraph.</p>
                <img src="/path/to/image.png" alt="image">
            </div>
        `;
        expect(cleanHtmlAttributes(html)).toBe(expected);
    });

    it('Should return null if value is null', () => {
        expect(cleanHtmlAttributes(null)).toBe(null);
    });

    it('Should return an empty string if value is an empty string', () => {
        expect(cleanHtmlAttributes('')).toBe('');
    });

    it('Should handle multiple attributes with multiple spaces', () => {
        const html = '<a href="   /link    " title="   title  " />';
        const expected = '<a href="/link" title="title" />';
        expect(cleanHtmlAttributes(html)).toBe(expected);
    });

    it('Should not modify strings without attributes', () => {
        const html = '<div>Esto es un div</div>';
        expect(cleanHtmlAttributes(html)).toBe(html);
    });
});
