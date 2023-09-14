import React from 'react';
import { render } from '@testing-library/react';
import HeaderFoodit from '../../../../../../components/features/foodit-global/common/Header/foodit';
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

describe('Components - Features - foodit-global - Common - HeaderFoodit', () => {
    Context.useAppContext = jest.fn(() => ({
        layout: 'Foodit-home'
    }));
    // TODO: testear las distintas versiones segun tipo de usuario
    // TODO: testear comportamiento topnavigation cuando se defina el contenido
    it('when the header state sticky is true, should contain fixed class', () => {
        render(<HeaderFoodit isSticky />);
        const header = document.querySelector('header');
        expect(header.classList.contains('fixed')).toBeTruthy();
    });

    it('should match snapshot', () => {
        const { container } = render(<HeaderFoodit />);
        expect(container).toMatchSnapshot();
    });
});
