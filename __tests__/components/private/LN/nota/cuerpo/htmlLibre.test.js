import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HtmlLibre from '../../../../../../components/private/LN/nota/cuerpo/htmlLibre';
import mockContentElements from '../../../../../../__mocks__/data/nota/cuerpo/htmlContent/htmlTwoBlocks.json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

describe('Private - LN - nota - cuerpo - HtmlLibre', () => {
    const setCommonProps = (contentElements = [], outputType = 'default') => ({
        outputType,
        globalContent: {
            _id: 'KR3WX7TZKJCTXGNFDHUNH24ZCA',
            content_elements: contentElements
        }
    });

    it('should render okay with empty state', () => {
        const { container } = render(<HtmlLibre />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render empty element if outputType is not default', () => {
        const props = setCommonProps(mockContentElements.slice(1, 3), 'amp');
        const { container } = render(<HtmlLibre {...props} />);

        expect(container).toBeEmptyDOMElement();
    });

    it('should render the second content element if there are more than one', () => {
        const props = setCommonProps(mockContentElements.slice(1, 3));
        const { container } = render(<HtmlLibre {...props} />);

        expect(container).toContainHTML(mockContentElements[2].content);
        expect(container).toMatchSnapshot();
    });

    it('should render the first content element if there are less than one', () => {
        const props = setCommonProps(mockContentElements.slice(1, 2));
        const { container } = render(<HtmlLibre {...props} />);

        expect(container).toContainHTML(mockContentElements[1].content);
        expect(container).toMatchSnapshot();
    });

    it('should render wrapped in a StaticContent', () => {
        const props = setCommonProps(mockContentElements.slice(1, 2));
        const { container } = render(<HtmlLibre {...props} />);

        expect(container.childNodes[0].className).toBe('');
        expect(container).toMatchSnapshot();
    });
});
