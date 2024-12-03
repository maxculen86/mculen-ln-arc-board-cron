import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FigCaption from '../../../../components/features/LN-10-global/common/figCaption/default';

describe('Components - Features - LN-10-global - Common - FigCaption', () => {
    it('should render the figcaption with epigraphTitle', () => {
        const props = {
            epigraphTitle: 'mocked content'
        };
        const { container } = render(<FigCaption {...props} />);
        const element = container.querySelector('figcaption');
        expect(element).toHaveTextContent('mocked content');
        expect(container).toMatchSnapshot();
    });

    it('should render the figcaption with epigraphTitle and credit', () => {
        const props = {
            epigraphTitle: 'mocked content',
            credit: 'mocked credit'
        };
        const { container } = render(<FigCaption {...props} />);
        const element = container.querySelector('figcaption');
        expect(element).toHaveTextContent('mocked content');
        expect(element).toHaveTextContent('mocked credit');
        expect(container).toMatchSnapshot();
    });

    it('should not render figcaption without epigraphTitle', () => {
        const props = {
            epigraphTitle: ''
        };
        const { container } = render(<FigCaption {...props} />);
        const element = container.querySelector('figcaption');
        expect(element).toBeNull();
        expect(container).toMatchSnapshot();
    });

    it('should render figcaption with epigraphTitle but without credit', () => {
        const props = {
            epigraphTitle: 'test content',
            credit: ''
        };
        const { container } = render(<FigCaption {...props} />);
        const element = container.querySelector('figcaption');
        expect(element).toHaveTextContent('test content');
        expect(element).not.toHaveTextContent('mocked credit');
        expect(container).toMatchSnapshot();
    });
});
