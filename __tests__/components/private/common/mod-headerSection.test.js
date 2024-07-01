import React from 'react';
import { render, screen } from '@testing-library/react';
import ModheaderSection from '../../../../components/private/common/mod-headerSection';
import useGetLogoImage from '../../../../components/private/common/hooks/useGetLogoImage';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('../../../../components/private/common/hooks/useGetLogoImage', () =>
    jest.fn()
);

const imageMock = {
    width: '100',
    height: '100',
    url: 'https://lanacion.com.ar/mock.jpeg'
};

describe('Private - Common - ModheaderSection', () => {
    it('Should render the componente with props', () => {
        render(
            <ModheaderSection
                title="Titulo Separador"
                link="https://lanacion.com.ar/"
                size="--l"
                classCondition="--pink"
                line
            />
        );

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        expect(screen.getByText('Titulo Separador')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Titulo Separador' })
        ).toHaveAttribute('href', 'https://lanacion.com.ar/');
        expect(screen.getByRole('contentinfo')).toHaveClass(
            'mod-headersection',
            '--line',
            '--pink'
        );
    });

    it('Render OK without classCondition', () => {
        render(
            <ModheaderSection
                title="Titulo Separador"
                link="https://lanacion.com.ar/"
                size="--l"
                line
            />
        );

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        expect(screen.getByText('Titulo Separador')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Titulo Separador' })
        ).toHaveAttribute('href', 'https://lanacion.com.ar/');
        expect(screen.getByRole('contentinfo')).toHaveClass(
            'mod-headersection',
            '--line'
        );
    });

    it('should not render the component in the roof', () => {
        render(<ModheaderSection />);
        expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it('Render link', () => {
        render(
            <ModheaderSection
                title="Titulo Separador"
                link="https://lanacion.com.ar/"
            />
        );

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Titulo Separador' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Titulo Separador' })
        ).toHaveAttribute('href', 'https://lanacion.com.ar/');
    });

    it('Snapshots ModheaderSection', () => {
        const { asFragment } = render(
            <ModheaderSection title="Titulo Separador" size="--l" line />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('ModheaderSection with image should render mod-logo', () => {
        useGetLogoImage.mockImplementationOnce(() => imageMock);
        render(<ModheaderSection title="Titulo Separador" size="--l" line />);

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            'https://lanacion.com.ar/mock.jpeg'
        );
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'alt',
            'Titulo Separador'
        );
        expect(screen.getByRole('img')).toHaveClass('com-image');
        expect(screen.getByRole('img')).toHaveAttribute('width', '100');
        expect(screen.getByRole('img')).toHaveAttribute('height', '100');
    });

    it('ModheaderSection with image and link should render mod-logo with anchor tag', () => {
        useGetLogoImage.mockImplementationOnce(() => imageMock);
        render(
            <ModheaderSection
                link="https://lanacion.com.ar/"
                title="Titulo Separador"
                image={imageMock}
                size="--l"
                line
            />
        );

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            'https://lanacion.com.ar/mock.jpeg'
        );
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            'https://lanacion.com.ar/'
        );
        expect(screen.getByRole('img')).toHaveAttribute(
            'alt',
            'Titulo Separador'
        );
        expect(screen.getByRole('img')).toHaveClass('com-image');
        expect(screen.getByRole('img')).toHaveAttribute('width', '100');
        expect(screen.getByRole('img')).toHaveAttribute('height', '100');
    });

    it('Snapshot ModheaderSection con link', () => {
        const { asFragment } = render(
            <ModheaderSection
                title="Titulo Separador"
                link="https://lanacion.com.ar"
                size="--l"
                line
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
