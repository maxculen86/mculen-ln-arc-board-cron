import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';
import useGetUserConfig from '../../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import AudioRecipe from '../../../../../../components/features/foodit-global/common/OpeningRecipe/audioRecipe';

// Mock all required dependencies
jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

// Mock the UI components
jest.mock('@ln/common-ui-dialog', () => {
    const DialogHeader = ({ children }) => (
        <div data-testid="dialog-header">{children}</div>
    );
    const DialogBody = ({ children }) => (
        <div data-testid="dialog-body">{children}</div>
    );
    const Dialog = ({ children, isOpen }) => {
        if (!isOpen) return null;
        return (
            <div role="dialog" data-testid="dialog">
                {children}
            </div>
        );
    };
    Dialog.Header = DialogHeader;
    Dialog.Body = DialogBody;
    return { Dialog };
});
jest.mock('@ln/foodit-ui-button', () => ({
    Button: ({ children, onClick, title }) => (
        <button onClick={onClick} title={title}>
            {children}
        </button>
    )
}));
jest.mock('@ln/common-ui-text', () => ({
    Text: ({ children, text }) => <p>{text || children}</p>
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ children }) => <div data-testid="icon">{children}</div>
}));

jest.mock('@ln/contenidos-ui-animatedicons', () => ({
    AnimatedIcons: () => <div data-testid="animated-icon" />
}));

jest.mock('@ln/foodit-ui-image', () => ({
    Image: ({ alt, src }) => (
        <img alt={alt} src={src} data-testid="recipe-image" />
    )
}));

jest.mock(
    '../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => ({
        __esModule: true,
        default: () => <div data-testid="icon-sprite" />
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/emptyState/foodit',
    () => ({
        __esModule: true,
        default: () => <div data-testid="empty-state" />
    })
);

jest.mock(
    '../../../../../../components/features/ui/foodit/emptyState/default',
    () => ({
        __esModule: true,
        EmptyStateDS: () => <div data-testid="empty-state" />
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/AudioFoodit/foodit',
    () => ({
        AudioFoodit: () => <div data-testid="audio-foodit" />
    })
);

const defaultProps = {
    title: 'Test Recipe',
    resizedUrl: 'https://example.com/image-resized.jpg',
    url: 'https://example.com/image.jpg',
    article: {
        _id: 'ABC123',
        credits: {
            by: [
                {
                    name: 'Test Author'
                }
            ]
        }
    }
};

describe('AudioRecipe', () => {
    beforeEach(() => {
        addEventToDataLayerV2.mockClear();
    });

    test.each([
        ['subscribed logged user', 'logged', true],
        ['subscribed unlogged user', 'unlogged', true]
    ])(
        'fires page_listened event for %s',
        async (_, userType, isSubscribed) => {
            useGetUserConfig.mockReturnValue({ userType, isSubscribed });

            render(<AudioRecipe {...defaultProps} />);
            fireEvent.click(screen.getByTitle('escuchar receta'));

            await waitFor(() => {
                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'page_listened',
                    origin: 'receta',
                    title: defaultProps.title,
                    rest: {
                        autor_nombre: defaultProps.article.credits.by[0].name,
                        nota_id_arc: defaultProps.article._id,
                        seccion: 'ficha_receta'
                    }
                });
            });

            expect(screen.getByTestId('audio-foodit')).toBeInTheDocument();
            expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
        }
    );

    test.each([
        ['non-subscribed logged user', 'logged', false],
        ['non-subscribed unlogged user', 'unlogged', false]
    ])(
        'does not fire page_listened event for %s',
        async (_, userType, isSubscribed) => {
            useGetUserConfig.mockReturnValue({ userType, isSubscribed });

            render(<AudioRecipe {...defaultProps} />);
            fireEvent.click(screen.getByTitle('escuchar receta'));

            await waitFor(() => {
                expect(addEventToDataLayerV2).not.toHaveBeenCalled();
            });

            expect(
                screen.queryByTestId('audio-foodit')
            ).not.toBeInTheDocument();
            expect(screen.getByTestId('empty-state')).toBeInTheDocument();
        }
    );
});
