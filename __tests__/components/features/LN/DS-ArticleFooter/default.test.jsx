import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleFooter from '../../../../../components/features/LN/DS-ArticleFooter/default';

jest.mock('fusion:context', () => ({
    __esModule: true,
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock(
    '../../../../../components/private/common/hooks/useTrustProjectData',
    () => jest.fn(() => ({ image: {} }))
);

jest.mock('../../../../../components/private/common/hooks/useSiteTooltip', () =>
    jest.fn(() => undefined)
);

jest.mock(
    '../../../../../components/features/LN/common/articleFooter/components/articleFooterAuthorAndDescription',
    () => {
        const AuthorAndDescription = jest.fn(() => (
            <div data-testid="author-and-description" />
        ));
        AuthorAndDescription.displayName =
            'ArticleFooterUi.AuthorAndDescription';
        return { __esModule: true, default: AuthorAndDescription };
    }
);

const { useAppContext } = require('fusion:context');
const AuthorAndDescription =
    require('../../../../../components/features/LN/common/articleFooter/components/articleFooterAuthorAndDescription').default;

describe('components - features - LN - DS-ArticleFooter - ArticleFooter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing when globalContent is empty', () => {
        useAppContext.mockReturnValue({});

        expect(() => render(<ArticleFooter />)).not.toThrow();

        expect(AuthorAndDescription).not.toHaveBeenCalled();
        expect(document.querySelector('#fin-de-nota')).toBeInTheDocument();
    });

    it('passes undefined distributor fields and a null href when there is no distributor but there is a subcategory', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                distributor: { subcategory: 'Economía' },
                taxonomy: { tags: [] }
            }
        });

        render(<ArticleFooter />);

        expect(AuthorAndDescription).toHaveBeenCalledWith(
            expect.objectContaining({
                distributor: undefined,
                distributorMode: undefined,
                complementaryText: 'Economía',
                href: null
            }),
            undefined
        );
    });

    it('passes distributor name, mode and href to AuthorAndDescription for a default distributor', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                distributor: {
                    name: 'REUTERS',
                    mode: 'default',
                    subcategory: 'Economía'
                },
                taxonomy: { tags: [] }
            }
        });

        render(<ArticleFooter />);

        expect(AuthorAndDescription).toHaveBeenCalledWith(
            expect.objectContaining({
                distributor: 'REUTERS',
                distributorMode: 'default',
                complementaryText: 'Economía',
                href: 'https://www.lanacion.com.ar/distributor/reuters/'
            }),
            undefined
        );
    });

    it('passes distributorMode=custom through to AuthorAndDescription', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                distributor: {
                    name: 'lanacion.ar',
                    mode: 'custom',
                    subcategory: null
                },
                taxonomy: { tags: [] }
            }
        });

        render(<ArticleFooter />);

        expect(AuthorAndDescription).toHaveBeenCalledWith(
            expect.objectContaining({
                distributor: 'lanacion.ar',
                distributorMode: 'custom',
                href: 'https://www.lanacion.com.ar/distributor/lanacion-ar/'
            }),
            undefined
        );
    });

    it('passes a null href when distributor is LA NACION', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                distributor: { name: 'LA NACION', mode: 'default' },
                taxonomy: { tags: [] }
            }
        });

        render(<ArticleFooter />);

        expect(AuthorAndDescription).toHaveBeenCalledWith(
            expect.objectContaining({
                distributor: 'LA NACION',
                href: null
            }),
            undefined
        );
    });
});
