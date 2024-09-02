import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from '../../../../components/features/LN-common/Juego/default';
import Context from 'fusion:context';
import '@testing-library/jest-dom';
import getGameProperties from '../../../../components/private/LN/common/utils/getGameProperties';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock(
    '../../../../components/private/LN/common/utils/getGameProperties',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

const mockContextValue = {
    isAdmin: true
};
jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => mockContextValue)
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

describe('Game Component', () => {
    Context.useAppContext = jest.fn(() => ({}));

    it('renders warning message when sectionId is falsy and isAdmin is true ', () => {
        const customFields = {
            sectionId: '',
            gameType: 'SomeType',
            subscriber: true
        };
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
        const customFields = {
            sectionId: '',
            gameType: 'SomeType',
            isAdmin: false,
            forSubscriber: true
        };
        render(<Game customFields={customFields} />);

        expect(
            screen.queryByText('El sectionId es un campo obligatorio')
        ).not.toBeInTheDocument();
    });

    it('renders GameCard with href as sectionId when gameType is Externo', () => {
        const customFields = {
            sectionId: '/juegos/criptograma',
            gameType: 'Externo',
            forSubscriber: false
        };
        render(<Game customFields={customFields} />);

        const gameCardLink = screen.getByRole('link', { name: /Criptograma/ });
        expect(gameCardLink).toHaveAttribute('href', '/juegos/criptograma');

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
        const customFields = {
            sectionId: '/juegos/criptograma',
            gameType: 'Externo',
            isNewGame: 'NO',
            forSubscriber: false
        };
        render(<Game customFields={customFields} />);

        const newBadge = screen.queryByText('nuevo');
        expect(newBadge).not.toBeInTheDocument();
    });
});
