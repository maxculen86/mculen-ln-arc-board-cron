import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleFooterUiRoot from '../../../../../../../components/features/LN/common/articleFooter/components/articleFooterRoot';

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.flat().filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/ui/ln/divider/default',
    () =>
        function MockDivider({ color }) {
            return <hr data-testid="divider" data-color={color} />;
        }
);

/** Crea un stub con el displayName que el Root usa para ubicar cada slot. */
function makeSlot(displayName, testId) {
    const Slot = () => <div data-testid={testId} />;
    Slot.displayName = displayName;
    return Slot;
}

const AuthorAndDescription = makeSlot(
    'ArticleFooterUi.AuthorAndDescription',
    'slot-author'
);
const Tags = makeSlot('ArticleFooterUi.Tags', 'slot-tags');
const Brand = makeSlot('ArticleFooterUi.Brand', 'slot-brand');
const TheTrustProject = makeSlot(
    'ArticleFooterUi.TheTrustProject',
    'slot-trust'
);
const WorkType = makeSlot('ArticleFooterUi.WorkType', 'slot-worktype');

function renderWithAllSlots(className) {
    return render(
        <ArticleFooterUiRoot className={className}>
            <AuthorAndDescription distributor="LA NACION" />
            <Tags tags={[{ text: 'Política', url: '/politica' }]} />
            <Brand />
            <TheTrustProject />
            <WorkType />
        </ArticleFooterUiRoot>
    );
}

describe('ArticleFooterUiRoot', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when all slots are provided', () => {
        it('should place each provided slot in the layout', () => {
            renderWithAllSlots();

            expect(screen.getByTestId('slot-author')).toBeInTheDocument();
            expect(screen.getByTestId('slot-tags')).toBeInTheDocument();
            expect(screen.getByTestId('slot-brand')).toBeInTheDocument();
            expect(screen.getByTestId('slot-trust')).toBeInTheDocument();
            expect(screen.getByTestId('slot-worktype')).toBeInTheDocument();
        });

        it('should apply the custom className to the inner container', () => {
            const { container } = renderWithAllSlots('my-custom-class');

            expect(container.firstChild.firstChild).toHaveClass(
                'my-custom-class'
            );
        });
    });

    describe('when slots are missing or invalid', () => {
        it('should not render a slot whose displayName does not match', () => {
            const Unknown = makeSlot('Unknown.Slot', 'slot-unknown');
            render(
                <ArticleFooterUiRoot>
                    <Unknown />
                </ArticleFooterUiRoot>
            );

            expect(
                screen.queryByTestId('slot-unknown')
            ).not.toBeInTheDocument();
        });
    });

    describe('author/tags section conditional rendering', () => {
        it('should not render the author/tags section when AuthorAndDescription has no distributor and no complementaryText', () => {
            render(
                <ArticleFooterUiRoot>
                    <AuthorAndDescription />
                    <Tags tags={[{ text: 'Política', url: '/politica' }]} />
                    <Brand />
                    <TheTrustProject />
                    <WorkType />
                </ArticleFooterUiRoot>
            );

            expect(screen.getByTestId('slot-tags')).toBeInTheDocument();
        });

        it('should not render the author/tags section when Tags has empty array and AuthorAndDescription has no props', () => {
            render(
                <ArticleFooterUiRoot>
                    <AuthorAndDescription />
                    <Tags tags={[]} />
                    <Brand />
                    <TheTrustProject />
                    <WorkType />
                </ArticleFooterUiRoot>
            );

            expect(screen.queryByTestId('slot-author')).not.toBeInTheDocument();
            expect(screen.queryByTestId('slot-tags')).not.toBeInTheDocument();
        });

        it('should render the author/tags section when only complementaryText is provided', () => {
            render(
                <ArticleFooterUiRoot>
                    <AuthorAndDescription complementaryText="Texto" />
                    <Tags tags={[]} />
                    <Brand />
                    <TheTrustProject />
                    <WorkType />
                </ArticleFooterUiRoot>
            );

            expect(screen.getByTestId('slot-author')).toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with all slots', () => {
            const { asFragment } = renderWithAllSlots();

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
