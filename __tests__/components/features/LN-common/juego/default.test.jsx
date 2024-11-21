import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../../../../../components/features/LN-common/Juego/default';
import '@testing-library/jest-dom';
import getGameProperties from '../../../../../components/private/LN/common/utils/getGameProperties';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({ isAdmin: true }))
}));

jest.mock('fusion:consumer', () => component => component);

jest.mock(
    '../../../../../components/private/LN/common/utils/getGameProperties',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

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
        const customFields = renderComponent({ sectionId: '' });

        render(
            <Game
                id="test-feature"
                customFields={customFields}
                isAdmin={true}
            />
        );

        const warningMessage = screen.queryByText(
            'El sectionId es un campo obligatorio'
        );
        expect(warningMessage).toBeInTheDocument();
    });

    it('does not render warning message when sectionId is falsy and isAdmin is false', () => {
        jest.mock('fusion:context', () => ({
            useAppContext: jest.fn(() => ({ isAdmin: false }))
        }));

        const customFields = renderComponent({ sectionId: '' });
        render(<Game customFields={customFields} />);

        expect(
            screen.queryByText('El sectionId es un campo obligatorio')
        ).not.toBeInTheDocument();
    });

    it('renders GameCard with href as sectionId when gameType is Externo', () => {
        const customFields = renderComponent({
            sectionId: '/juegos/criptograma',
            gameType: 'Externo'
        });
        const gameCardLink = screen.getByRole('link', {
            name: /Criptograma/
        });

        expect(gameCardLink).toHaveAttribute('href', '/juegos/criptograma/');
        expect(screen.getByText('Criptograma')).toBeInTheDocument();

        const gameCardDiv = gameCardLink.querySelector('div');
        expect(gameCardDiv).toHaveClass('h-6 w-100');
    });

    it('renders "Nuevo" badge when isNewGame is SI', () => {
        const customFields = {
            sectionId: '/juegos/criptograma',
            gameType: 'Externo',
            isNewGame: 'SI',
            forSubscriber: false
        };
        render(<Game customFields={customFields} />);

        const newBadge = screen.getByText('nuevo');
        expect(newBadge).toBeInTheDocument();
    });

    it('does not render "Nuevo" badge when isNewGame is NO', () => {
        const customFields = renderComponent({ isNewGame: 'NO' });
        render(<Game customFields={customFields} />);

        const newBadge = screen.queryByText('nuevo');
        expect(newBadge).not.toBeInTheDocument();
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
