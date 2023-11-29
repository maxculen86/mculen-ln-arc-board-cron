import React from 'react';
import { render } from '@testing-library/react';
import GameEventScript from '../../../../../components/private/common/scriptManager/GameEventsScript';
import { setEventsGames } from '../../../../../components/private/common/scriptManager/GameEventsScript';
describe('setEventsGames', () => {
    const mockGames = [
        { title: 'Criptograma' },
        { title: 'Palabras cruzadas' }
    ];

    beforeAll(() => {
        window.document.querySelectorAll = jest.fn().mockReturnValue(mockGames);
    });

    it('debe llamar createLabelFunction y addListenersFunction para cada juego', () => {
        const mockCreateLabelFunction = jest.fn();
        const mockAddListenersFunction = jest.fn();

        setEventsGames(mockCreateLabelFunction, mockAddListenersFunction);

        expect(window.document.querySelectorAll).toHaveBeenCalledWith(
            '.ln-card-games > a'
        );
        expect(mockCreateLabelFunction).toHaveBeenCalledTimes(mockGames.length);
        expect(mockAddListenersFunction).toHaveBeenCalledTimes(
            mockGames.length
        );

        mockGames.forEach((game, index) => {
            expect(mockCreateLabelFunction).toHaveBeenCalledWith(game.title);
            expect(mockAddListenersFunction).toHaveBeenCalledWith(
                game,
                expect.any(Object)
            );
        });
    });

    it('debe manejar correctamente cuando no hay juegos', () => {
        window.document.querySelectorAll = jest.fn().mockReturnValue([]);

        const mockCreateLabelFunction = jest.fn();
        const mockAddListenersFunction = jest.fn();

        setEventsGames(mockCreateLabelFunction, mockAddListenersFunction);

        expect(mockCreateLabelFunction).not.toHaveBeenCalled();
        expect(mockAddListenersFunction).not.toHaveBeenCalled();
    });

    it('debe manejar múltiples juegos correctamente', () => {
        const mockMultipleGames = [
            { title: 'Sopa de Letras' },
            { title: 'Criptograma' },
            { title: 'Palabras cruzadas' }
        ];
        window.document.querySelectorAll = jest
            .fn()
            .mockReturnValue(mockMultipleGames);

        const mockCreateLabelFunction = jest.fn();
        const mockAddListenersFunction = jest.fn();

        setEventsGames(mockCreateLabelFunction, mockAddListenersFunction);

        expect(mockCreateLabelFunction).toHaveBeenCalledTimes(
            mockMultipleGames.length
        );
        expect(mockAddListenersFunction).toHaveBeenCalledTimes(
            mockMultipleGames.length
        );
    });

    it('debe manejar juegos null o undefined correctamente', () => {
        const mockGames = [null, { title: 'Criptograma' }, undefined];
        window.document.querySelectorAll = jest.fn().mockReturnValue(mockGames);

        const mockCreateLabelFunction = jest.fn();
        const mockAddListenersFunction = jest.fn();

        setEventsGames(mockCreateLabelFunction, mockAddListenersFunction);

        expect(mockCreateLabelFunction).toHaveBeenCalledTimes(1);
        expect(mockAddListenersFunction).toHaveBeenCalledTimes(1);
    });

    it('Debe insetar el script en el DOM', () => {
        render(<GameEventScript />);
        const scriptTag = document.querySelector('script');
        expect(scriptTag).not.toBeNull();
    });

    it('Debe contener todas las funcioanlidades para el evento de la caja Juegos', () => {
        render(<GameEventScript />);
        const scriptTag = document.querySelector('script');
        const scriptContent = scriptTag.innerHTML;

        const scriptContents = [
            'window.addEventListener',
            'DOMContentLoaded',
            'addEventToDataLayer',
            'addEventListeners',
            'createDynamicLabel',
            'setEventsGames'
        ];

        scriptContents.forEach(script => {
            expect(scriptContent).toContain(script);
        });
    });
});
