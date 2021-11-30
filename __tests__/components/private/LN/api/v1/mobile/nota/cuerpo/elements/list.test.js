import ArticleDesordenedList from '../../../../../../../../../../__mocks__/data/nota/cuerpo/list/DesordenedList.json';
import ArticleEmptyList from '../../../../../../../../../../__mocks__/data/nota/cuerpo/list/EmptyList.json';
import ArticleOrdenedList from '../../../../../../../../../../__mocks__/data/nota/cuerpo/list/OrdenedList.json';
import ArticleNoElementList from '../../../../../../../../../../__mocks__/data/nota/cuerpo/list/NoElementList.json';

import List from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/list';

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
        expect(resp['_t']).toBe('list');
        expect(resp['type']).toBe('ol');
        expect(resp['items'][0]['_t']).toBe('li');
        expect(resp['items'][0]['value']['_t']).toBe('text');
    });

    it('Test lista desordenada cabecera', () => {
        const resp = List(ArticleDesordenedList);
        expect(resp['_t']).toBe('list');
        expect(resp['type']).toBe('ul');
        expect(resp['items'][0]['_t']).toBe('li');
        expect(resp['items'][0]['value']['_t']).toBe('text');
    });

    it('Test elementos de lista ordenada', () => {
        const resp = List(ArticleNoElementList);
        expect(resp['items']).toHaveLength(3);
    });
    it('Test valor de elemento distinto de texto', () => {
        const articles = {
            _id: 'AJAAVYUAYZGSJEZ2E44K4BLEYQ',
            additional_properties: {},
            items: [
                {
                    _id: 'OACDOMQWK5BRBJ3V6QHJWY7OGE',
                    content: 4,
                    type: 'text'
                },
                {
                    _id: 'OACDOMQWK5BRBJ3V6QHJWY7OGE',
                    type: 'text'
                },
                {
                    _id: '2LT67DUHJVFIBGKY34GXTVSZ7A',
                    content: 'Tipo de letra negrita',
                    type: 'text'
                }
            ],
            list_type: 'ordered',
            type: 'list'
        };
        const resp = List(articles);
        //expect(resp['items'][0]).toBeNull();
    });
});
