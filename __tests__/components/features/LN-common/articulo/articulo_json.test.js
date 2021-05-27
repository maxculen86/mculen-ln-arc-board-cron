import React from 'react';
import article from '../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import { shallow, mount, render } from 'enzyme';
describe('Features - LN-Common - articulo =>', () => {
    describe('with empty article ', () => {
        it('When article is ok', () => {
            const articleSourceNota = article;
            expect(articleSourceNota._id).toBe('2KOBND62KNFVVBFQZOADNN6WNY');
            expect(articleSourceNota.canonical_url).toBe(
                '/deportes/prueba-ios-y-android-cuerpo-nid12052020/'
            );
            expect(articleSourceNota.owner).toStrictEqual({
                sponsored: false
            });
        });
        it('When article is empty', () => {
            const articleSourceNota = null;
            expect(articleSourceNota).toBe(null);
        });
    });
});
