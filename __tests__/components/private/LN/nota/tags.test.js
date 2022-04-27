import React from 'react';
import { shallow } from 'enzyme';
import Consumer from 'fusion:consumer';
import Tags from '../../../../../components/private/LN/nota/apertura/tags';
import TaxonomyComponent from '../../../../../components/private/LN/common/taxonomyImportantList';
import propsForTagsSections from '../../../../../__mocks__/data/nota/propsForTagsSections.json';

describe('La Nacion - Nota - Tags (Main categories removed from Themes)', () => {
    describe('In Notas', () => {
        const propsNota = propsForTagsSections.nota;

        it('listTags should return 8 tags', () => {
            const comp = shallow(<Tags {...propsNota} />);
            const listTags = comp.find(TaxonomyComponent).props().list;

            expect(listTags.length).toBe(8);
        });

        it('List tags in Nota should return tags without main sections', () => {
            const comp = shallow(<Tags {...propsNota} />);
            const listTags = comp.find(TaxonomyComponent).props().list;

            listTags.forEach(tag => {
                expect(tag.path).not.toEqual('/deportes/futbol/boca-juniors');
                expect(tag.path).not.toEqual('/deportes/futbol');
                expect(tag.path).not.toEqual('/deportes');
            });
        });
    });

    describe('In Recetas', () => {
        const propsReceta = propsForTagsSections.receta;

        it('listTags should return 3 tags', () => {
            const comp = shallow(<Tags {...propsReceta} />);
            const listTags = comp.find(TaxonomyComponent).props().list;

            expect(listTags.length).toBe(3);
        });

        it('List tags in Receta should return same tags as provided', () => {
            const listTagsReceta = [
                {
                    type: 'tag',
                    path: 'cous-cous-tid47203',
                    text: 'Recetas con cous cous'
                },
                { type: 'tag', path: 'soja', text: 'Recetas con Soja' },
                {
                    type: 'tag',
                    path: 'cebolla-de-verdeo-tid47175',
                    text: 'Recetas con cebolla de verdeo'
                }
            ];
            const comp = shallow(<Tags {...propsReceta} />);

            const listTags = comp.find(TaxonomyComponent).props().list;

            expect(listTags).toEqual(listTagsReceta);
        });
    });
});
