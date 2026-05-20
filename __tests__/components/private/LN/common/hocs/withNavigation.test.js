import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import WithNavigation from '../../../../../../components/private/LN/common/hocs/WithNavigation';

jest.mock('fusion:consumer', () => ComponentClass => {
    return class extends ComponentClass {
        getContent() {
            return { cached: null };
        }
    };
});

const TestTarget = ({ sectionId, sections, termicas }) => (
    <div
        data-testid="test-target"
        data-section-id={sectionId}
        data-sections={JSON.stringify(sections)}
        data-termicas={JSON.stringify(termicas)}
    />
);

describe('components - private - LN - common - hocs - withNavigation', () => {
    const sectionId = '/deportes';

    it('passes original props to the wrapped component', () => {
        const Wrapped = WithNavigation(TestTarget);
        render(<Wrapped sectionId={sectionId} arcSite="la-nacion-ar" />);
        expect(screen.getByTestId('test-target')).toHaveAttribute(
            'data-section-id',
            sectionId
        );
    });

    it('injects sections and termicas props into the wrapped component', () => {
        const Wrapped = WithNavigation(TestTarget);
        render(<Wrapped sectionId={sectionId} arcSite="la-nacion-ar" />);
        const el = screen.getByTestId('test-target');
        expect(el).toHaveAttribute('data-sections', '[]');
        expect(el).toHaveAttribute('data-termicas', '{}');
    });
});
