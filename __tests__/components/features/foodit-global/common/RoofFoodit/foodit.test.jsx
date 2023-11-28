import React from 'react';
import RoofFoodit from '../../../../../../components/features/foodit-global/common/RoofFoodit/foodit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
describe('Tests RoofFoodit', () => {
    const defaultMockProps = {
        title: { text: 'Título de prueba', as: 'h3' },
        displayArrow: true,
        linkProps: {
            text: 'Texto del enlace',
            href: 'https://lanacion.com.ar/',
            bold: true,
            uppercase: true
        },
        icon: <svg data-testid="test-icon">icono-de-prueba</svg>,
        hide: false
    };
    it('should render component with a link', () => {
        const props = { ...defaultMockProps, title: undefined };
        render(<RoofFoodit {...props} />);

        const linkElement = screen.getByText(props.linkProps.text);
        expect(linkElement.href).toStrictEqual(props.linkProps.href);
        expect(linkElement).toBeInTheDocument();
    });
    it('should render component a with text in <h3/>', () => {
        const props = { ...defaultMockProps, linkProps: undefined };
        render(<RoofFoodit {...props} />);

        const titleElement = screen.getByText(props.title.text);
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.tagName.toLowerCase()).toStrictEqual(
            props.title.as
        );
    });
    it('should render Icon when buttonProps and icon props is provided', () => {
        const props = { ...defaultMockProps, buttonProps: {} };
        render(<RoofFoodit {...props} />);
        const iconElement = screen.getByTestId('test-icon');
        expect(iconElement).toBeInTheDocument();
    });
    it('should return a fragment when hide is true', () => {
        const props = { ...defaultMockProps, hide: true };
        const { container } = render(<RoofFoodit {...props} />);

        expect(container.firstChild).toBeNull();
    });
    it('Should match snapshot', () => {
        const { container } = render(<RoofFoodit {...defaultMockProps} />);
        expect(container).toMatchSnapshot();
    });
});
