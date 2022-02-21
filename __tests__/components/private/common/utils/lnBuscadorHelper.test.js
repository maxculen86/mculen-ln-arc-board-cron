import insertTitleAndDescrition from '../../../../../components/private/common/utils/lnBuscadorHelper';

describe('Test return function rewriteTitleAndDescrition', () => {
    global.window.document.head.innerHTML = '';

    const title = 'últimas noticias en LA NACION';
    const description = 'Resultado de busqueda para + en la nacion';

    it('Test return for title and meta description', () => {
        insertTitleAndDescrition('noruega', title, description);

        expect(document.querySelector('title').innerHTML).toEqual(
            'noruega: últimas noticias en LA NACION'
        );

        expect(
            document
                .querySelector(`meta[name="description"]`)
                .getAttribute('content')
        ).toEqual('Resultado de busqueda para noruega en la nacion');
    });
});
