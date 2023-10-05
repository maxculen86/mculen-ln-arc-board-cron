import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import OpeningRawHtml from '../../../../../components/private/common/scriptManager/OpeningRawHtml';
import mockContentElements from '../../../../../__mocks__/data/nota/cuerpo/htmlContent/htmlTwoBlocks.json';

jest.mock('html-react-parser', () => jest.fn(element => element));

describe('components - private - common - OpeningRawHtml', () => {
    it('should render okay with empty state', () => {
        const { container } = render(<OpeningRawHtml />);
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
            <OpeningRawHtml contentElements={contentElements} />
        );
        expect(container.childNodes).toHaveLength(expected);
        expect(container).toMatchSnapshot();
    });
});
