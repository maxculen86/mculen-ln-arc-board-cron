import React from 'react';
import { render, screen, within } from '@testing-library/react';
import TrustFeature from '../../../../../components/features/LN-10/trustProject/default';
import Context from 'fusion:context';

jest.mock('fusion:context', () => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    deployment: value => value,
    contextPath: '/pf'
}));

const props = {
    globalContent: {
        label: {
            trust: { text: 'Mostrar Trust' },
            marca_anunciante: { text: '' }
        },
        owner: { sponsored: false },
        subtype: '1'
    }
};

const mockGlobalContext = {
    state: {
        siteService: {
            tooltips: [
                { text: 'Análisis', label: 'Interpretación de...' },
                {
                    text: 'Mostrar Trust',
                    label: 'Texto que se muestra en el tooltip'
                }
            ]
        }
    }
};

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(() => mockGlobalContext)
}));

describe('features - LN10 - TrustFeature', () => {
    it('renders correctly with all data', () => {
        const { container } = render(<TrustFeature {...props} />);

        const sectionElement = container.querySelector('section');
        expect(sectionElement).toBeInTheDocument();

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute(
            'src',
            '/pf/resources/images/the-trust-project.webp'
        );
        expect(img).toHaveAttribute('fetchpriority', 'low');
        expect(img).toHaveAttribute('loading', 'lazy');

        expect(screen.getByText('Conforme a')).toBeInTheDocument();
        expect(screen.getByText('los criterios de')).toBeInTheDocument();

        expect(screen.getByText('Tipo de trabajo:')).toBeInTheDocument();
        expect(
            screen.getByText('Mostrar Trust'.toLowerCase())
        ).toBeInTheDocument();
        expect(
            screen.getByText('Texto que se muestra en el tooltip')
        ).toBeInTheDocument();

        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute(
            'href',
            'https://www.lanacion.com.ar/tema/the-trust-project-tid68036/'
        );
        expect(link).toHaveAttribute('title', 'Ir a Proyecto Trust');
        expect(within(link).getByText('Conocé más')).toBeInTheDocument();
    });

    it('if globalContent.label.trust.text is "No mostrar Trust", it should return null', () => {
        const propsCopy = {
            globalContent: { label: { trust: { text: 'No mostrar Trust' } } }
        };
        const { container } = render(<TrustFeature {...propsCopy} />);
        expect(container.firstChild).toBeNull();
    });

    it('if globalContent.label.marca_anunciante.text exists, it should return null', () => {
        const propsCopy = {
            globalContent: {
                label: { marca_anunciante: { text: 'some text' } }
            }
        };
        const { container } = render(<TrustFeature {...propsCopy} />);
        expect(container.firstChild).toBeNull();
    });

    it('if globalContent.owner.sponsored is true, it should return null', () => {
        const propsCopy = { globalContent: { owner: { sponsored: true } } };
        const { container } = render(<TrustFeature {...propsCopy} />);
        expect(container.firstChild).toBeNull();
    });

    it('if the note is "RECETA" subtype, it should return null', () => {
        const propsCopy = { globalContent: { subtype: '7' } };
        const { container } = render(<TrustFeature {...propsCopy} />);
        expect(container.firstChild).toBeNull();
    });
});
