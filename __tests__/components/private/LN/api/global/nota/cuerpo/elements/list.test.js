import ArticleDesordenedList from '../../../../../../../../__mocks__/data/nota/cuerpo/list/DesordenedList.json';
import ArticleEmptyList from '../../../../../../../../__mocks__/data/nota/cuerpo/list/EmptyList.json';
import ArticleOrdenedList from '../../../../../../../../__mocks__/data/nota/cuerpo/list/OrdenedList.json';
import ArticleNoElementList from '../../../../../../../../__mocks__/data/nota/cuerpo/list/NoElementList.json';

import List from '../../../../../../../../../components/private/LN/api/global/v1/nota/cuerpo/elements/list';

describe('Test de las listas en el cuerpo de una nota', () => {
    it('Test de listas si es null', () => {
        const resp = List(null);
        expect(resp).toBe(null);
    });

    it('Test de listas si es vacia', () => {
        const resp = List(ArticleEmptyList);
        expect(resp).toBe(null);
    });

    it('Test lista ordenada cabecera', () => {
        const resp = List(ArticleOrdenedList);
        expect(resp['_t']).toBe('p');
        expect(resp['valor']['_t']).toBe('ol');
        expect(resp['valor']['valor'][0]['_t']).toBe('li');
    });

    it('Test lista desordenada cabecera', () => {
        const resp = List(ArticleDesordenedList);
        expect(resp['_t']).toBe('p');
        expect(resp['valor']['_t']).toBe('ul');
        expect(resp['valor']['valor'][0]['_t']).toBe('li');
    });

    it('Test elementos de lista ordenada', () => {
        const resp = List(ArticleNoElementList);
        expect(resp['valor']['valor']).toHaveLength(3);
    });
});
