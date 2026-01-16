import React from 'react';
import { render } from '@testing-library/react';
import Divider from '../../../../../../components/features/LN/common/divider/default';

describe('Divider', () => {
    it('renders without crashing', () => {
        const { container } = render(<Divider />);

        expect(container).toBeDefined();
    });

    it('renders a single div element', () => {
        const { container } = render(<Divider />);

        expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });

    it('renders an empty div', () => {
        const { container } = render(<Divider />);

        const div = container.firstChild;

        expect(div).toBeEmptyDOMElement();
    });

    it('exposes arcType correctly', () => {
        expect(Divider.arcType).toBe('divider');
    });
});
