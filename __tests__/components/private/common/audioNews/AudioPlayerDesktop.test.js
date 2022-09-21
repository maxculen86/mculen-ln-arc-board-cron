import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayerDesktop from '../../../../../components/private/common/audioNews/AudioPlayerDesktop';
import getToken from '../../../../../components/private/common/utils/getToken';
import useFetch from '../../../../../components/private/common/hooks/useFetch';

jest.mock('../../../../../components/private/common/utils/getToken', () =>
    jest.fn()
);

jest.mock('../../../../../components/private/common/hooks/useFetch', () =>
    jest.fn()
);

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({
            state: {
                loginData: {
                    subscription: true
                }
            },
            dispatch: jest.fn()
        })
    };
});

describe('Test - AudioPlayer in desktop', () => {
    global.window.dataLayer = [];
    const props = {
        isListenable: false,
        publishDate: '2022-09-15T23:57:45.682Z',
        noteId: 'CV2AWECQORF4HLDVMFFJCLQ234'
    };

    getToken.mockImplementation(() => '9B979333-C7F4-4F46-8EA8-8BBCBB3F14DF');

    test('Test when the note is not listenable', () => {
        const { container } = render(<AudioPlayerDesktop {...props} />);

        expect(container).toMatchInlineSnapshot(`<div />`);
    });

    describe('Tests when the note is listenable', () => {
        useFetch.mockImplementation(() => ({
            data: {
                audio_url:
                    'https://qa-audionews.lanacion.com.ar/mp3/22/9/08/A/20220908205601-UK57ZJT3DJGPRFTACPR7KTFUWA.1aa42b0e-c9e7-49e2-b561-f6a1243679d1.mp3'
            },
            error: undefined
        }));

        const properties = {
            ...props,
            isListenable: true
        };

        test('It should show listen button, the player and register event on dataLayer  after click', () => {
            const { container } = render(
                <AudioPlayerDesktop {...properties} />
            );
            const button = screen.getByRole('button', {
                name: 'Escuchar nota'
            });
            expect(button).toBeTruthy();

            fireEvent.click(button);

            expect(container.querySelector('audio')).toBeTruthy();
            expect(window.dataLayer).toStrictEqual([
                { clickText: 'Escuchar nota', event: 'gtm.linkClick' }
            ]);
        });

        test('Audio speed multiplier test.', () => {
            render(<AudioPlayerDesktop {...properties} />);

            const button = screen.getByRole('button', {
                name: 'Escuchar nota'
            });

            fireEvent.click(button);

            const speedUpButton = screen.getByRole('button', {
                name: 'Aumentar velocidad de reproducción'
            });
            const comText = speedUpButton.querySelector('.com-text');

            expect(speedUpButton).toBeTruthy();
            expect(comText.innerHTML).toStrictEqual('1x');

            fireEvent.click(speedUpButton);

            expect(comText.innerHTML).toStrictEqual('1.25x');

            fireEvent.click(speedUpButton);

            expect(comText.innerHTML).toStrictEqual('1.5x');

            fireEvent.click(speedUpButton);

            expect(comText.innerHTML).toStrictEqual('1.75x');

            fireEvent.click(speedUpButton);

            expect(comText.innerHTML).toStrictEqual('2x');

            fireEvent.click(speedUpButton);

            expect(comText.innerHTML).toStrictEqual('1x');
        });

        test('forward and back button test', () => {
            render(<AudioPlayerDesktop {...properties} />);

            const button = screen.getByRole('button', {
                name: 'Escuchar nota'
            });

            fireEvent.click(button);

            expect(
                screen.getByRole('button', {
                    name: 'Adelantar 10 segundos'
                })
            ).toBeTruthy();

            expect(
                screen.getByRole('button', {
                    name: 'Retroceder 10 segundos'
                })
            ).toBeTruthy();
        });

        test('play and pause button test', () => {
            render(<AudioPlayerDesktop {...properties} />);

            const button = screen.getByRole('button', {
                name: 'Escuchar nota'
            });

            fireEvent.click(button);

            const pause = screen.getByRole('button', {
                name: 'Pausar'
            });

            expect(pause).toBeTruthy();
            expect(
                pause.firstChild.classList.contains('icon-pause')
            ).toBeTruthy();

            fireEvent.click(pause);

            const play = screen.getByRole('button', {
                name: 'Reproducir'
            });

            expect(play).toBeTruthy();
            expect(
                play.firstChild.classList.contains('icon-play')
            ).toBeTruthy();
        });

        test('It should start paused when the browser is safari', () => {
            delete global.navigator;
            global.navigator = {
                userAgent:
                    'Mozilla/5.0 (Windows; U; Windows NT 6.1; es-AR) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16'
            };

            render(<AudioPlayerDesktop {...properties} />);

            const button = screen.getByRole('button', {
                name: 'Escuchar nota'
            });

            fireEvent.click(button);

            const play = screen.getByRole('button', {
                name: 'Reproducir'
            });

            expect(play).toBeTruthy();
            expect(
                play.firstChild.classList.contains('icon-play')
            ).toBeTruthy();
        });
    });
});
