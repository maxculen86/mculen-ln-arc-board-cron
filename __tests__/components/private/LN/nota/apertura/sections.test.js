import React from 'react';
import Sections from '../../../../../../components/private/LN/nota/apertura/sections';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('PRIVATE - LN - Nota - Apertura - Sections', () => {
    const props = {
        taxonomy: {
            sections: [
                {
                    _id: '/parent-section/section1',
                    path: '/section1',
                    name: 'Section 1',
                    parent_id: '/parent-section'
                },
                {
                    _id: '/parent-section/section2',
                    path: '/section2',
                    name: 'Section 2',
                    parent_id: '/parent-section'
                },
                {
                    _id: '/other-parent-section/section3',
                    path: '/section3',
                    name: 'Section 3',
                    parent_id: '/other-parent-section'
                },
                {
                    _id: '/recetas/cocina',
                    path: '/recetas/cocina/tailandesa',
                    name: 'tailandesa',
                    parent_id: '/recetas'
                }
            ],
            primary_section: {
                _id: '/parent-section',
                path: '/parent-section',
                name: 'Parent Section',
                parent_id: null
            }
        },
        destacado: true,
        temas: true
    };

    it('should render the component with expected props with only two list elements', () => {
        const { container } = render(<Sections {...props} />);
        const [headerSection, taxonomyList] = container.querySelectorAll(
            'section'
        );
        expect(headerSection).toBeInTheDocument();
        expect(taxonomyList).toBeInTheDocument();
        expect(taxonomyList.children.length).toBe(2);
    });

    it('should render empty taxonomyList and not render headerSection if there is no primary section', () => {
        const customProps = {
            ...props,
            taxonomy: { primary_section: undefined }
        };
        const { container } = render(<Sections {...customProps} />);
        const taxonomyList = container.querySelector('.mod-themes');
        expect(taxonomyList.children.length).toBe(0);
    });

    it('should render empty taxonomyList and not render headerSection if there is no parentPrimarySection', () => {
        const customProps = {
            ...props,
            taxonomy: { primary_section: { _id: '' } }
        };
        const { container } = render(<Sections {...customProps} />);
        const taxonomyList = container.querySelector('.mod-themes');
        expect(taxonomyList.children.length).toBe(0);
    });

    it('should not render headerSection if temas is falsy', () => {
        const customProps = { ...props, temas: false };
        const { queryByRole } = render(<Sections {...customProps} />);
        expect(queryByRole('contentinfo')).toBeNull();
    });
});
