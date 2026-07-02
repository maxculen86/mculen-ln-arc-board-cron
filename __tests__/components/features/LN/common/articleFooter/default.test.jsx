import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticleFooterUi } from '../../../../../../components/features/LN/common/articleFooter/default';

jest.mock(
    '../../../../../../components/features/LN/common/articleFooter/components/articleFooterRoot',
    () => {
        const Root = ({ children }) => <div data-testid="root">{children}</div>;
        Root.displayName = 'ArticleFooterUi';
        return { __esModule: true, default: Root };
    }
);

jest.mock(
    '../../../../../../components/features/LN/common/articleFooter/components/articleFooterAuthorAndDescription',
    () => ({
        __esModule: true,
        default: () => <div data-testid="author" />
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/articleFooter/components/articleFooterTags',
    () => ({
        __esModule: true,
        default: () => <div data-testid="tags" />
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/articleFooter/components/articleFooterBrand',
    () => ({
        __esModule: true,
        default: () => <div data-testid="brand" />
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/articleFooter/components/articleFooterTrustProject',
    () => ({
        __esModule: true,
        default: () => <div data-testid="trust" />
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/articleFooter/components/articleFooterWorkType',
    () => ({
        __esModule: true,
        default: () => <div data-testid="worktype" />
    })
);

describe('ArticleFooterUi', () => {
    describe('compound assembly', () => {
        it('should attach every sub-component as a static member', () => {
            expect(ArticleFooterUi.AuthorAndDescription).toBeDefined();
            expect(ArticleFooterUi.Tags).toBeDefined();
            expect(ArticleFooterUi.Brand).toBeDefined();
            expect(ArticleFooterUi.TheTrustProject).toBeDefined();
            expect(ArticleFooterUi.WorkType).toBeDefined();
        });
    });

    describe('when rendered as a compound', () => {
        it('should render the root wrapper around its children', () => {
            render(
                <ArticleFooterUi>
                    <ArticleFooterUi.AuthorAndDescription />
                </ArticleFooterUi>
            );

            expect(screen.getByTestId('root')).toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot of the composed footer', () => {
            const { asFragment } = render(
                <ArticleFooterUi>
                    <ArticleFooterUi.AuthorAndDescription />
                    <ArticleFooterUi.Tags />
                    <ArticleFooterUi.Brand />
                    <ArticleFooterUi.TheTrustProject />
                    <ArticleFooterUi.WorkType />
                </ArticleFooterUi>
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
