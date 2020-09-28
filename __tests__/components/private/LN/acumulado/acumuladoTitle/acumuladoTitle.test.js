jest.mock(
    '../../../../../../components/private/common/mod-category.jsx',
    () => 'mod-category-mock'
);
jest.mock(
    '../../../../../../components/private/LN/acumulado/hocs/withAcuCategories.jsx',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

import React from 'react';
import { render, mount } from 'enzyme';

import AcumuladoTitle from '../../../../../../components/private/LN/acumulado/acumuladoTitle/acumuladoTitle';

describe('Private - LN - Acumulado - AcumuladoTitle => ', () => {
    it('Render OK', () => {
        const component = mount(<AcumuladoTitle />);
        expect(component).toBeDefined();
        expect(component.isEmptyRender()).toBeFalsy();
        expect(component.find('mod-category-mock')).toHaveLength(1);
    });

    it('Validación Título Sección Principal', () => {
        const props = {
            globalContent: {
                _id: '/recetas',
                name: 'Recetas',
                node_type: 'section'
            }
        };
        const component = mount(<AcumuladoTitle {...props} />);
        const titleSectionPrimary = component.find('mod-category-mock');
        expect(titleSectionPrimary.props().category).toBe('Recetas');
    });

    it('Validación Título Subsección', () => {
        const props = {
            globalContent: {
                _id: '/economia/campo',
                name: 'Campo',
                node_type: 'section'
            }
        };
        const component = mount(<AcumuladoTitle {...props} />);
        const titleSubsection = component.find('mod-category-mock');
        expect(titleSubsection.props().category).toBe('Campo');
    });

    it('Validación Título con Prefijo', () => {
        const props = {
            globalContent: {
                _id: '/recetas/dulces',
                name: 'Dulces',
                node_type: 'section'
            },
            customFields: { prefixTitle: 'Recetas:' },
            isPrimarySection: false
        };
        const component = mount(<AcumuladoTitle {...props} />);
        const titleRecetas = component.find('mod-category-mock');
        expect(titleRecetas.props().category).toBe('Recetas: Dulces');
    });

    it('Validación Título con Replace', () => {
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
        const component = mount(<AcumuladoTitle {...props} />);
        const titleRecetas = component.find('mod-category-mock');
        expect(titleRecetas.props().category).toBe('Título Personalizado');
    });

    it('Validación Título Tags', () => {
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
        const component = mount(<AcumuladoTitle {...props} />);
        const titleTags = component.find('mod-category-mock');
        expect(titleTags.props().category).toBe('Pescados');
    });

    it('Validación Título Autor', () => {
        const props = {
            globalContent: {
                _id: '/carlos-pagni-81',
                byline: 'Carlos Pagni'
            }
        };
        const component = mount(<AcumuladoTitle {...props} />);
        const titleAuthor = component.find('mod-category-mock');
        expect(titleAuthor.props().category).toBe('Carlos Pagni');
    });
});
