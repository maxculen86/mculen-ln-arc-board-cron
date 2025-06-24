import React from 'react';
import { render } from '@testing-library/react';
import useLazyEmbeds from '../../../../../components/features/LN-common/hooks/useLazyEmbeds';
import { setStorageConfiguration } from '../../../../../components/private/common/utils/storage';
import {
    embedIntersectionObserver,
    takeEmbedScriptToDiffer
} from '../../../../../components/features/LN-nota/body/_utils/_embedHelper';

jest.mock(
    '../../../../../components/features/LN-nota/body/_utils/_embedHelper',
    () => ({
        embedIntersectionObserver: jest.fn(),
        takeEmbedScriptToDiffer: jest.fn(() => ['mocked-embed'])
    })
);

jest.mock('../../../../../components/private/common/utils/storage', () => ({
    setStorageConfiguration: jest.fn()
}));

const TestComponent = props => {
    useLazyEmbeds(props);
    return <div>Test</div>;
};

describe('Components - features - LN-common - hooks - useLazyEmbeds', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call setStorageConfiguration when noteId is provided', () => {
        render(<TestComponent noteId="2KOBND62KNFVVBFQZOADNN6WNY" />);

        expect(setStorageConfiguration).toHaveBeenCalledWith(
            '2KOBND62KNFVVBFQZOADNN6WNY'
        );
    });

    it('should NOT call setStorageConfiguration when noteId is empty', () => {
        render(<TestComponent noteId="" />);

        expect(setStorageConfiguration).not.toHaveBeenCalled();
    });

    it('should call embedIntersectionObserver with the result from takeEmbedScriptToDiffer', () => {
        const contentElements = [
            { type: 'oembed_response', subtype: 'twitter' }
        ];

        render(
            <TestComponent
                contentElements={contentElements}
                selector="cuerpo__nota"
            />
        );

        expect(takeEmbedScriptToDiffer).toHaveBeenCalledWith(contentElements);
        expect(embedIntersectionObserver).toHaveBeenCalledWith(
            ['mocked-embed'],
            'cuerpo__nota'
        );
    });

    it('should handle errors without crashing (catch)', () => {
        setStorageConfiguration.mockImplementation(() => {
            throw new Error('intentional failure');
        });

        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        render(
            <TestComponent
                noteId="2KOBND62KNFVVBFQZOADNN6WNY"
                bodyOrigin="Body default"
                outputType="default"
            />
        );

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Error en setear Local Storage, Body default',
            expect.objectContaining({
                error: expect.any(Error),
                outputType: 'default',
                IdNota: '2KOBND62KNFVVBFQZOADNN6WNY'
            })
        );

        consoleErrorSpy.mockRestore();
    });
});
