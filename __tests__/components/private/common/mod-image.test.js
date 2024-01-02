import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModImage from '../../../../components/private/common/mod-image';

describe('ModImage', () => {
    const props = {
        link: 'https://lanacion.com.ar',
        target: '_self',
        src: 'http://lorempixel.com/400/200',
        alt: 'Random pic',
        amp: false
    };

    it('Matches snapshot', () => {
        const { asFragment } = render(<ModImage {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('Renders link', () => {
        const { getByRole } = render(<ModImage {...props} />);
        const link = getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://lanacion.com.ar');
    });

    it('Renders image', () => {
        const { getByAltText } = render(<ModImage {...props} />);
        const image = getByAltText('Random pic');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'http://lorempixel.com/400/200');
    });
});
