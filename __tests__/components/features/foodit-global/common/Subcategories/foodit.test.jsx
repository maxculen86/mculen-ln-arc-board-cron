import React from 'react';
import { render, screen } from '@testing-library/react';
import Subcategories from '../../../../../../components/layouts/Foodit-subcategorias/foodit';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/BaseLayout/foodit',
    () => ({
        __esModule: true,
        default: ({ children }) => (
            <div data-testid="base-layout">{children}</div>
        )
    })
);

jest.mock(
    '../../../../../../components/layouts/Foodit-subcategorias/Card/CardCategory',
    () => ({
        CardCategory: () => <div data-testid="card-category" />
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/components/UserBookmarks',
    () => ({
        UserBookmarks: () => <div data-testid="user-bookmarks" />
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit',
    () => ({
        __esModule: true,
        default: ({ sectionsCustom }) => (
            <div data-testid="breadcrumb-custom">
                {sectionsCustom?.map(section => (
                    <span key={section.name}>{section.name}</span>
                ))}
            </div>
        )
    })
);

const getChildren = () => [
    <div key="ap">Apertura</div>,
    <div key="no">Notas</div>
];

describe('Subcategories', () => {
    const { useAppContext } = require('fusion:context');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.each([
        ['/cocina-a-tu-medida/', 'Cociná a tu medida', true],
        ['/aprende-en-la-cocina/', 'Aprendé en la cocina', false],
        ['/cocina-facil-y-rapido/', 'Cociná fácil y rápido', false],
        ['/recetas/', 'Recetas', false]
    ])(
        'subtitle visibility and title generation for %p',
        (uri, expectedTitle, shouldShowSubtitle) => {
            useAppContext.mockReturnValue({
                requestUri: uri,
                deployment: jest.fn(path => `https://example.com${path}`),
                contextPath: '/pf'
            });

            render(<Subcategories>{getChildren()}</Subcategories>);

            expect(
                screen.getByRole('heading', { level: 1, name: expectedTitle })
            ).toBeInTheDocument();

            expect(screen.getByTestId('breadcrumb-custom')).toHaveTextContent(
                expectedTitle
            );

            const SUBTITLE_REGEX =
                /Organizá tus comidas con menús de nutricionistas y recetas\s+variadas para cada alimentación/i;

            if (shouldShowSubtitle) {
                expect(screen.getByText(SUBTITLE_REGEX)).toBeInTheDocument();
            } else {
                expect(
                    screen.queryByText(SUBTITLE_REGEX)
                ).not.toBeInTheDocument();
            }

            expect(screen.getByTestId('base-layout')).toBeInTheDocument();
            expect(screen.getByTestId('user-bookmarks')).toBeInTheDocument();
            expect(screen.getByTestId('card-category')).toBeInTheDocument();
        }
    );

    it('handles empty or undefined requestUri', () => {
        useAppContext.mockReturnValue({
            requestUri: undefined,
            deployment: jest.fn(path => `https://example.com${path}`),
            contextPath: '/pf'
        });

        render(<Subcategories>{getChildren()}</Subcategories>);

        expect(
            screen.getByRole('heading', { level: 1, name: 'Subcategorías' })
        ).toBeInTheDocument();
    });
});
