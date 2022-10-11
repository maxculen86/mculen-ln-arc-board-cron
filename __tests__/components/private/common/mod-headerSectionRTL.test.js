import React from 'react';
import { render } from '@testing-library/react';
import ModheaderSection from '../../../../components/private/common/mod-headerSection';
import '@testing-library/jest-dom';
import useGetLogoImage from '../../../../components/private/common/hooks/useGetLogoImage';

jest.mock('fusion:consumer', Component => Component => props => (
    <Component {...props} />
));

jest.mock('../../../../components/private/common/hooks/useGetLogoImage', () =>
    jest.fn()
);

describe('Private - Common - ModHeaderSection =>', () => {
    const imageMock = {
        width: 100,
        height: 100,
        url: 'https://lanacion.com.ar/mock.jpeg',
        caption: 'LA NACION'
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
        useGetLogoImage.mockImplementationOnce(() => imageMock);
        const props = {
            title: 'Titulo Separador',
            link: 'https://lanacion.com.ar/',
            image: imageMock,
            size: '--l',
            line: true
        };

        const { getByRole } = render(<ModheaderSection {...props} />);

        expect(getByRole('link')).toBeInTheDocument();
        expect(getByRole('link').title).toEqual(props.title);

        expect(getByRole('img')).toBeInTheDocument();
        expect(getByRole('img').src).toEqual(imageMock.url);
        expect(getByRole('img').alt).toEqual(props.title);
        expect(getByRole('img').width).toEqual(imageMock.width);
        expect(getByRole('img').height).toEqual(imageMock.height);
    });

    test('ModheaderSection without title', () => {
        useGetLogoImage.mockImplementationOnce(() => imageMock);
        const props = {
            link: 'https://lanacion.com.ar/',
            image: { ...imageMock, caption: 'LA NACION' },
            size: '--l',
            line: true
        };

        const { getByRole } = render(<ModheaderSection {...props} />);

        expect(getByRole('link').title).toEqual(props.image.caption);
        expect(getByRole('img').alt).toEqual(props.image.caption);
    });

    test('ModheaderSection without title and caption', () => {
        useGetLogoImage.mockImplementationOnce(() => imageMock);
        const props = {
            link: 'https://lanacion.com.ar/',
            image: { ...imageMock, caption: 'LA NACION' },
            size: '--l',
            line: true
        };

        const { getByRole } = render(<ModheaderSection {...props} />);

        expect(getByRole('link').title).toEqual(props.image.caption);
        expect(getByRole('img').alt).toEqual(props.image.caption);
    });
});
