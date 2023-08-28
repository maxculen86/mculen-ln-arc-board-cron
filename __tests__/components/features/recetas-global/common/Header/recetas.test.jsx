import React from 'react';
import { render } from '@testing-library/react';
import HeaderRecetas from '../../../../../../components/features/recetas-global/common/Header/recetas';
import Context from 'fusion:context';

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve
}));

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Components - Features - Recetas-global - Common - HeaderRecetas', () => {
    Context.useAppContext = jest.fn(() => ({
        layout: 'Recetas-home'
    }));
    // TODO: testear las distintas versiones segun tipo de usuario
    // TODO: testear comportamiento topnavigation cuando se defina el contenido
    it('when the header state sticky is true, should contain fixed class', () => {
        render(<HeaderRecetas isSticky />);
        const header = document.querySelector('header');
        expect(header.classList.contains('fixed')).toBeTruthy();
    });

    it('should match snapshot', () => {
        const { container } = render(<HeaderRecetas />);
        expect(container).toMatchSnapshot();
    });
});
