import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MapperIcon from '../../../../../../components/private/common/icons/mapperIcon';

describe('Private -LN -COMMON - ICONS', () => {
    describe('MapperIcons tests with data', () => {
        const { container } = render(<MapperIcon name={'sun'} />);
        it('Should render the sun icon', () => {
            expect(container).toMatchSnapshot();
        });
    });
    describe('MapperIcons without data', () => {
        const { container } = render(<MapperIcon />);
        it('Should return an empty element', () => {
            expect(container).toBeEmptyDOMElement();
        });
    });
});
