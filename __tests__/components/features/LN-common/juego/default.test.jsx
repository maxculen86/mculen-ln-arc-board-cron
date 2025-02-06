import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../../../../../components/features/LN-common/Juego/default';
import '@testing-library/jest-dom';
import getGameProperties from '../../../../../components/private/LN/common/utils/getGameProperties';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({ isAdmin: false }))
}));

jest.mock('fusion:consumer', () => component => component);

jest.mock(
    '../../../../../components/private/LN/common/utils/getGameProperties',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

jest.mock('fusion:content', () => ({
    useContent: jest.fn(() => ({
        name: 'Sección de Prueba',
        content_elements: [{ website_url: '/test-url' }]
    }))
}));

const getAssetsPath = contextPath => deployment => path =>
    `${contextPath}/${deployment}/${path}`;

getGameProperties.mockReturnValue({
    title: 'Criptograma',
    logo: {
        src: getAssetsPath('/pf')('assets')('games/criptograma.svg')
    },
    borderColor: 'bg-criptograma'
});

const baseCustomFields = {
    sectionId: '/juegos/crucigrama',
    gameType: 'Interno',
    isNewGame: 'NO',
    forSubscriber: false
};

describe('Component - Features - LN Common - Game', () => {
    const renderComponent = (customFieldsOverrides = {}) => {
        const customFields = { ...baseCustomFields, ...customFieldsOverrides };
        render(<Game customFields={customFields} />);
        return customFields;
    };

    it('renders warning message when sectionId is falsy and isAdmin is true', () => {
        require('fusion:context').useAppContext.mockReturnValue({
            isAdmin: true,
            contextPath: '/some-path',
            deployment: '/some-deployment',
            arcSite: 'some-site',
            renderables: []
        });

        const customFields = {
            sectionId: '',
            gameType: 'Interno',
            isNewGame: 'NO',
            subscriber: 'NO'
        };
        render(
            <Game
                id="test-feature"
                customFields={customFields}
                isAdmin={true}
            />
        );
        expect(
            screen.getByText('El sectionId es un campo obligatorio')
        ).toBeInTheDocument();
    });

    it('does not render warning message when sectionId is falsy and isAdmin is false', () => {
        require('fusion:context').useAppContext.mockReturnValue({
            isAdmin: false,
            contextPath: '/some-path',
            deployment: '/some-deployment',
            arcSite: 'some-site',
            renderables: []
        });

        const customFields = {
            sectionId: null,
            gameType: 'Interno',
            isNewGame: 'NO',
            subscriber: 'NO'
        };
        render(
            <Game
                id="test-feature"
                customFields={customFields}
                isAdmin={false}
            />
        );
        expect(
            screen.queryByText('El sectionId es un campo obligatorio')
        ).not.toBeInTheDocument();
    });

    it('renders GameCard with href as sectionId when gameType is Externo', () => {
        const customFields = {
            sectionId: '/juegos/criptograma',
            gameType: 'Externo',
            isNewGame: 'NO',
            subscriber: 'NO'
        };

        render(
            <Game
                id="test-feature"
                customFields={customFields}
                isAdmin={false}
            />
        );
        const gameCardLink = screen.getByRole('link');
        expect(gameCardLink).toHaveAttribute('href', '/juegos/criptograma/');
        expect(screen.getByText('Criptograma')).toBeInTheDocument();
    });

    it('renders "Nuevo" badge when isNewGame is SI', () => {
        const customFields = {
            sectionId: '/juegos/criptograma',
            gameType: 'Externo',
            isNewGame: 'SI',
            subscriber: 'NO'
        };
        render(
            <Game
                id="test-feature"
                customFields={customFields}
                isAdmin={false}
            />
        );
        expect(screen.getByText('Nuevo')).toBeInTheDocument();
    });

    it('does not render "Nuevo" badge when isNewGame is NO', () => {
        const customFields = renderComponent({ isNewGame: 'NO' });
        render(<Game customFields={customFields} />);
        const newBadge = screen.queryByText('nuevo');
        expect(newBadge).not.toBeInTheDocument();
    });

    it('renders custom icon when forSubscriber is SI', () => {
        const customFields = {
            sectionId: '/juegos/criptograma',
            gameType: 'Externo',
            isNewGame: 'SI',
            subscriber: 'SI'
        };
        const { container } = render(<Game customFields={customFields} />);
        const icon = container.querySelector('i');
        expect(icon).toBeInTheDocument();
    });

    it('does not render custom icon when forSubscriber is NO', () => {
        const customFields = {
            sectionId: '/juegos/criptograma',
            gameType: 'Externo',
            isNewGame: 'SI',
            subscriber: 'NO'
        };
        const { container } = render(<Game customFields={customFields} />);
        const icon = container.querySelector('i');
        expect(icon).not.toBeInTheDocument();
    });

    it('renders Game when sectionId "/juegos/cruciexpress/"', () => {
        const customFields = renderComponent({
            sectionId: '/juegos/cruciexpress/'
        });
        render(<Game customFields={customFields} />);
    });

    it('returns "crucigrama" when sectionId is "/juegos/crucigrama"', () => {
        const customFields = renderComponent({
            sectionId: '/juegos/crucigrama'
        });
        render(<Game customFields={customFields} />);
    });
});
