import React from 'react';
import { render, screen } from '@testing-library/react';
import WorkType from '../../../../../../../components/features/LN/common/articleFooter/components/articleFooterWorkType';

jest.mock('@ln/common-ui-tooltip', () => ({
    Tooltip: ({ children, content }) => (
        <div data-testid="tooltip">
            <div data-testid="tooltip-content">{content}</div>
            {children}
        </div>
    )
}));

describe('WorkType', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when tooltipData has no text', () => {
        it('should render null when tooltipData is undefined', () => {
            const { container } = render(<WorkType />);

            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('when tooltipData has text but no label', () => {
        it('should render the text as plain bold content without a tooltip', () => {
            render(<WorkType tooltipData={{ text: 'Noticia original' }} />);

            expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
        });
    });

    describe('when tooltipData has both text and label', () => {
        const tooltipData = {
            text: 'Noticia original',
            label: 'Informacion verificada de primera mano.'
        };

        it('should render the text inside a tooltip trigger', () => {
            render(<WorkType tooltipData={tooltipData} />);

            expect(screen.getByTestId('tooltip')).toBeInTheDocument();
        });

        it('should render the label as the tooltip content', () => {
            render(<WorkType tooltipData={tooltipData} />);

            expect(
                screen.getByText('Informacion verificada de primera mano.')
            ).toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with text and label', () => {
            const { asFragment } = render(
                <WorkType
                    tooltipData={{
                        text: 'Noticia original',
                        label: 'Informacion verificada de primera mano.'
                    }}
                />
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
