import React from 'react';
import { render } from '@testing-library/react';
import AcumuladoTitle from '../../../../../../components/private/LN/acumulado/acumuladoTitle/acumuladoTitle';

const mockModCategory = jest.fn(({ category }) => (
    <mod-category-mock category={category} />
));

jest.mock(
    '../../../../../../components/private/common/mod-category.jsx',
    () => props => mockModCategory(props)
);

jest.mock(
    '../../../../../../components/private/LN/acumulado/hocs/withAcuCategories.jsx',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

describe('Private - LN - Acumulado - AcumuladoTitle => ', () => {
    beforeEach(() => {
        mockModCategory.mockClear();
    });

    it('Render OK', () => {
        const { container } = render(<AcumuladoTitle />);
        const category = container.querySelector('mod-category-mock[category]');

        expect(category).toBeInTheDocument();
    });

    it('Validation Título Sección Principal', () => {
        const props = {
            globalContent: {
                _id: '/recetas',
                name: 'Recetas',
                node_type: 'section'
            }
        };
        render(<AcumuladoTitle {...props} />);

        const categoryElement = document.querySelector(
            'mod-category-mock[category="Recetas"]'
        );

        expect(categoryElement).toBeInTheDocument();
    });

    it('Validation Título Subsección', () => {
        const props = {
            globalContent: {
                _id: '/economia/campo',
                name: 'Campo',
                node_type: 'section'
            }
        };
        render(<AcumuladoTitle {...props} />);

        const categoryElement = document.querySelector(
            'mod-category-mock[category="Campo"]'
        );

        expect(categoryElement).toBeInTheDocument();
    });

    it('Validation Título con Prefijo', () => {
        const props = {
            globalContent: {
                _id: '/recetas/dulces',
                name: 'Dulces',
                node_type: 'section'
            },
            customFields: { prefixTitle: 'Recetas:' },
            isPrimarySection: false
        };

        render(<AcumuladoTitle {...props} />);

        const categoryElement = document.querySelector(
            'mod-category-mock[category="Recetas: Dulces"]'
        );

        expect(categoryElement).toBeInTheDocument();
    });

    it('Validation Título con Replace', () => {
        const props = {
            globalContent: {
                _id: '/recetas/dulces',
                name: 'Dulces',
                node_type: 'section'
            },
            customFields: {
                replaceTitle: 'Título Personalizado'
            }
        };

        render(<AcumuladoTitle {...props} />);

        const categoryElement = document.querySelector(
            'mod-category-mock[category="Título Personalizado"]'
        );

        expect(categoryElement).toBeInTheDocument();
    });

    it('Validation Título Tags', () => {
        const props = {
            globalContent: {
                _id: '/pescados-tid67216',
                Payload: {
                    items: [
                        {
                            name: 'Pescados',
                            _id: '/pescados-tid67216'
                        }
                    ]
                }
            }
        };
        render(<AcumuladoTitle {...props} />);

        const categoryElement = document.querySelector(
            'mod-category-mock[category="Pescados"]'
        );

        expect(categoryElement).toBeInTheDocument();
    });

    it('Validation Título Autor', () => {
        const props = {
            globalContent: {
                _id: '/carlos-pagni-81',
                byline: 'Carlos Pagni'
            }
        };
        render(<AcumuladoTitle {...props} />);

        const categoryElement = document.querySelector(
            'mod-category-mock[category="Carlos Pagni"]'
        );

        expect(categoryElement).toBeInTheDocument();
    });

    it('Validation navigation índices in internas', () => {
        const props = {
            globalContent: {
                _id: '/economia/merval',
                name: 'Merval',
                node_type: 'section',
                acumuladoGeneral: {
                    hierarchy_navigation: 'indices'
                }
            },
            navigation: [
                {
                    _id: '/economia/bonos',
                    name: 'Bonos',
                    node_type: 'section'
                },
                {
                    _id: '/economia/merval',
                    name: 'Merval',
                    node_type: 'section'
                },
                {
                    _id: '/economia/cedears',
                    name: 'Cedears',
                    node_type: 'section'
                }
            ]
        };

        render(<AcumuladoTitle {...props} />);

        const { navigation = [] } = mockModCategory.mock.calls.at(-1)[0];

        expect(navigation.map(item => item.textname)).toEqual([
            'Índices',
            'Bonos',
            'Cedears'
        ]);
    });
});
