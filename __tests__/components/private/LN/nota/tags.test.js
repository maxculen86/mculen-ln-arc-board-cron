import React from 'react';
import { render, screen } from '@testing-library/react';
import Tags from '../../../../../components/private/LN/nota/apertura/tags';
import propsForTagsSections from '../../../../../__mocks__/data/nota/propsForTagsSections.json';

describe('components - private - LN - nota', () => {
    describe('In Notas', () => {
        const propsNota = propsForTagsSections.nota;

        it('listTags should return 4 tags maximum', () => {
            render(<Tags {...propsNota} />);
            const listTags = screen.getAllByRole('link');
            expect(listTags.length).toBe(4);
        });

        it('List tags in Nota should return tags without main sections', () => {
            render(<Tags {...propsNota} />);
            const listTags = screen.getAllByRole('link');

            listTags.forEach(tag => {
                expect(tag).not.toHaveTextContent(
                    '/deportes/futbol/boca-juniors'
                );
                expect(tag).not.toHaveTextContent('/deportes/futbol');
                expect(tag).not.toHaveTextContent('/deportes');
            });
        });
    });

    describe('In Recetas', () => {
        const propsReceta = propsForTagsSections.receta;

        it('listTags should return 3 tags', () => {
            render(<Tags {...propsReceta} />);
            const listTags = screen.getAllByRole('link');

            expect(listTags.length).toBe(3);
        });

        it('List tags in Receta should return same tags as provided', () => {
            const listTagsReceta = [
                {
                    text: 'Recetas con cous cous'
                },
                { text: 'Recetas con Soja' },
                {
                    text: 'Recetas con cebolla de verdeo'
                }
            ];

            render(<Tags {...propsReceta} />);
            const listTags = screen.getAllByRole('link');

            const listTagsText = listTags.map(tag => {
                return {
                    text: tag.textContent
                };
            });

            expect(listTagsText).toEqual(listTagsReceta);
        });
    });
});
