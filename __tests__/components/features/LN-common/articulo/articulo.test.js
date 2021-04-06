import React from 'react';
import article from '../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import { shallow, mount, render } from 'enzyme';
describe('Features - LN-Common - articulo =>', () => {
    describe('with empty article ', () => {
        it('When article is ok', () => {
            // Render a checkbox with label in the document

            const articleSourceNota = article;
            const { _id: notaId, canonical_url: url } = articleSourceNota;
            const articuloData = {
                id_nota: notaId,
                url_nota: url
            };
            expect(articuloData.id_nota).toBe('2KOBND62KNFVVBFQZOADNN6WNY');
            expect(articuloData.url_nota).toBe(
                '/deportes/prueba-ios-y-android-cuerpo-nid12052020/'
            );
        });
        it('When article is empty', () => {
            const articleSourceNota = null;
            const articuloData = null;
            expect(articuloData).toBe(null);
        });
    });
});
