import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import OpenningRawHTML from '../../../../../components/private/common/scriptManager/OpenningRawHtml';
import mockContentElements from '../../../../../__mocks__/data/nota/cuerpo/htmlContent/htmlTwoBlocks.json';

jest.mock('html-react-parser', () => jest.fn(element => element));

describe('components - private - common - OpenningRawHTML', () => {
    it('should render okay with empty state', () => {
        const { container } = render(<OpenningRawHTML />);
        expect(container).toBeEmptyDOMElement();
    });

    it.each([
        [
            'empty dom element without raw htmls',
            mockContentElements.slice(0, 1),
            0
        ],
        [
            'empty dom element with just only one raw html',
            mockContentElements.slice(1, 2),
            0
        ],
        ['one element with two raw htmls', mockContentElements.slice(1, 3), 1]
    ])('should return %s', (_, contentElements, expected) => {
        const { container } = render(
            <OpenningRawHTML contentElements={contentElements} />
        );
        expect(container.childNodes).toHaveLength(expected);
        expect(container).toMatchSnapshot();
    });
});
