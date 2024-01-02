import html from '../../../../../../../../../../components/private/LN/api/common/elements/story/cuerpo/elements/htmlContent';

describe('components - private - LN - api - common - elements - story - cuerpo - elements - htmlContent.js test suite', () => {
    const nodo = {
        _id: 'B4IZYTAECRDB3HS6L26ZAPO6TI',
        content:
            '<div class="com-embed --logo"><div class="contenido-externo"><svg height="40" preserveaspectratio="xMidYMid meet" version="1.1" viewbox="0 0 175.72 40" width="176" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><defs><path d="29.4 66.99 29.4 66.67 29.4Z" id="daBtQxdAK"></path></defs><g><g><use fill="#fb8033" fill-opacity="1" opacity="1" href="#i531kJ4Aoc"></use><g><use fill-opacity="0" opacity="1" stroke="#000000" stroke-opacity="0" stroke-width="1" href="#i531kJ4Aoc"></use></g></g><g><use fill="#666666" fill-opacity="1" opacity="1" href="#daBtQxdAK"></use><g><use fill-opacity="0" opacity="1" stroke="#000000" stroke-opacity="0" stroke-width="1" href="#daBtQxdAK"></use></g></g></g></svg></div></div>',
        type: 'raw_html'
    };

    test('should return null if node is not defined', () => {
        const result = html(null, '');

        expect(result).toBe(null);
    });
    test('iframe content should return right output', () => {
        const noteId = '';

        const result = html(nodo, noteId);

        expect(result).toEqual({
            _t: 'ext',
            id: 'html',
            src:
                '<div class="com-embed --logo"><div class="contenido-externo"><svg height="40" preserveaspectratio="xMidYMid meet" version="1.1" viewbox="0 0 175.72 40" width="176" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><defs><path d="29.4 66.99 29.4 66.67 29.4Z" id="daBtQxdAK"></path></defs><g><g><use fill="#fb8033" fill-opacity="1" opacity="1" href="#i531kJ4Aoc"></use><g><use fill-opacity="0" opacity="1" stroke="#000000" stroke-opacity="0" stroke-width="1" href="#i531kJ4Aoc"></use></g></g><g><use fill="#666666" fill-opacity="1" opacity="1" href="#daBtQxdAK"></use><g><use fill-opacity="0" opacity="1" stroke="#000000" stroke-opacity="0" stroke-width="1" href="#daBtQxdAK"></use></g></g></g></svg></div></div>',
            arc_content: {
                _id: 'B4IZYTAECRDB3HS6L26ZAPO6TI',
                content:
                    '<div class="com-embed --logo"><div class="contenido-externo"><svg height="40" preserveaspectratio="xMidYMid meet" version="1.1" viewbox="0 0 175.72 40" width="176" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><defs><path d="29.4 66.99 29.4 66.67 29.4Z" id="daBtQxdAK"></path></defs><g><g><use fill="#fb8033" fill-opacity="1" opacity="1" href="#i531kJ4Aoc"></use><g><use fill-opacity="0" opacity="1" stroke="#000000" stroke-opacity="0" stroke-width="1" href="#i531kJ4Aoc"></use></g></g><g><use fill="#666666" fill-opacity="1" opacity="1" href="#daBtQxdAK"></use><g><use fill-opacity="0" opacity="1" stroke="#000000" stroke-opacity="0" stroke-width="1" href="#daBtQxdAK"></use></g></g></g></svg></div></div>',
                type: 'raw_html'
            }
        });
    });
});
