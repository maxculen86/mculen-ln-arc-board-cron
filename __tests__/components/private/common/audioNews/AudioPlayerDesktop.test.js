import React from 'react';
import { render, screen } from '@testing-library/react';
import AudioPlayerDesktop from '../../../../../components/private/common/audioNews/AudioPlayerDesktop';
import getToken from '../../../../../components/private/common/utils/getToken';
import useFetch from '../../../../../components/private/common/hooks/useFetch';
import useTermica from '../../../../../components/private/common/hooks/useTermica';

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

jest.mock('../../../../../components/private/common/utils/getToken', () =>
    jest.fn()
);

jest.mock('../../../../../components/private/common/hooks/useFetch', () =>
    jest.fn()
);

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
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

Object.defineProperty(window, 'performance', {
    value: {
        getEntriesByType: jest.fn().mockReturnValue([{ type: 'navigate' }]),
        measure: jest.fn()
    }
});

describe('components - private - common -audioNews - AudioPlayerDesktop', () => {
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

        it('should not render isListenable button if useTermica returns true', () => {
            useTermica.mockImplementation(() => true);

            render(
                <AudioPlayerDesktop
                    isListenable={true}
                    publishDate="2022-09-15T23:57:45.682Z"
                    noteId="CV2AWECQORF4HLDVMFFJCLQ234"
                />
            );

            expect(useTermica).toHaveBeenCalledWith('hide_listening_articles');
            expect(
                screen.queryByRole('button', { name: 'Escuchar nota' })
            ).toBeNull();
        });

        it('should render isListenable button if useTermica returns false', () => {
            useTermica.mockImplementation(() => false);

            render(
                <AudioPlayerDesktop
                    isListenable={true}
                    publishDate="2022-09-15T23:57:45.682Z"
                    noteId="CV2AWECQORF4HLDVMFFJCLQ234"
                />
            );

            expect(useTermica).toHaveBeenCalled();

            try {
                screen.getByRole('button', 'Escuchar nota');
            } catch (error) {
                throw new Error(
                    'El botón "Escuchar nota" no está renderizado correctamente'
                );
            }
        });
    });
});
