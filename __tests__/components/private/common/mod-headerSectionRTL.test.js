import React from 'react';
import { render, screen } from '@testing-library/react';
import ModheaderSection from '../../../../components/private/common/mod-headerSection';
import '@testing-library/jest-dom';

jest.mock('fusion:consumer', Component => Component => props => (
    <Component {...props} />
));

describe('Private - Common - ModHeaderSection =>', () => {
    const imageMock = {
        width: 100,
        height: 100,
        url: 'https://lanacion.com.ar/mock.jpeg'
    };

    test('Render OK', () => {
        const props = {
            title: 'Titulo Separador',
            link: 'https://lanacion.com.ar/',
            size: '--l',
            classCondition: '--pink',
            line: true
        };

        const { getByRole } = render(<ModheaderSection {...props} />);

        expect(getByRole('heading')).toHaveClass(props.size);
        expect(getByRole('contentinfo')).toHaveClass(
            `${props.classCondition} --line`
        );
    });

    test('Render OK without classCondition', () => {
        const props = {
            title: 'Titulo Separador',
            link: 'https://lanacion.com.ar/',
            size: '--l',
            line: true
        };

        const { getByRole } = render(<ModheaderSection {...props} />);

        expect(getByRole('contentinfo')).toBeInTheDocument();
        expect(getByRole('contentinfo').className).toEqual(
            'mod-headersection  --line'
        );
    });

    test('Render NOTOK', () => {
        const { elementType } = render(<ModheaderSection />);
        expect(elementType).toBeFalsy();
    });

    test('Render del link', () => {
        const props = {
            title: 'Titulo Separador',
            link: 'https://lanacion.com.ar/'
        };

        const { getByRole } = render(<ModheaderSection {...props} />);

        expect(getByRole('link')).toBeInTheDocument();
        expect(getByRole('link').href).toEqual(props.link);
        expect(getByRole('link')).toHaveTextContent(props.title);
    });

    test('ModheaderSection with image should render mod-logo', () => {
        const props = {
            title: 'Titulo Separador',
            link: 'https://lanacion.com.ar/',
            image: imageMock,
            size: '--l',
            line: true
        };

        const { getByAltText, getByRole } = render(
            <ModheaderSection {...props} />
        );

        expect(getByRole('link')).toBeInTheDocument();
        expect(getByRole('img')).toBeInTheDocument();
        expect(getByRole('img').src).toEqual(imageMock.url);
        expect(getByRole('img').width).toBe(imageMock.width);
        expect(getByRole('img').height).toEqual(imageMock.height);
    });
});
