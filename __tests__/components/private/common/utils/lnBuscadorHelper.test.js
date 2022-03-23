import createTagsTitleAndMetas, {
    createAndInsertElementsHtml
} from '../../../../../components/private/common/utils/lnBuscadorHelper';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
describe('Private -Common - utils lnBuscadorHelper: createTagsTitleAndMetas', () => {
    global.window.document.head.innerHTML = '';

    const url = 'https://www.lanacion.com.ar/buscador/?query=rusia';
    const description = 'Resultado de busqueda para + en la nacion';

    it('Test return for title, meta description and metas OG', () => {
        createTagsTitleAndMetas(description, url, 'noruega');

        expect(document.querySelector('title').innerHTML).toEqual(
            'noruega: Resultados de búsqueda para las últimas noticias en LA NACION'
        );
        expect(
            document
                .querySelector(`meta[property="og:title"]`)
                .getAttribute('content')
        ).toEqual(
            'noruega: Resultados de búsqueda para las últimas noticias en LA NACION'
        );
        expect(
            document
                .querySelector(`meta[name="description"]`)
                .getAttribute('content')
        ).toEqual('Resultado de busqueda para noruega en la nacion');
        expect(
            document
                .querySelector(`meta[property="og:description"]`)
                .getAttribute('content')
        ).toEqual('Resultado de busqueda para noruega en la nacion');
        expect(
            document
                .querySelector(`meta[property="og:url"]`)
                .getAttribute('content')
        ).toEqual(url);
    });
});

describe('Test return function createAndInsertElementsHtml', () => {
    global.window.document.body.innerHTML = `
        <div id="content">
            <div class="section-1"/>
        </div>
    `;

    const tags = [
        {
            element: 'h1',
            children: 'Testing function createAndInsertElementsHtml',
            whereToInsert: '.section-1',
            attributes: [
                {
                    attribute: 'class',
                    value: 'title-1'
                }
            ]
        },
        {
            element: 'div',
            children: '<h2>Section 2</h2>',
            whereToInsert: '#content',
            attributes: [
                {
                    attribute: 'id',
                    value: 'section-2'
                }
            ]
        }
    ];

    it('Test return insert elements with createAndInsertElementsHtml', () => {
        createAndInsertElementsHtml(tags);

        expect(
            screen.getByText('Testing function createAndInsertElementsHtml')
        ).toBeVisible();
        expect(screen.getByText('Section 2')).toBeVisible();
    });
});
