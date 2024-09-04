import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MapperIcon from '../../../../../../components/private/common/icons/mapperIcon';

describe('Private -LN -COMMON - ICONS', () => {
    const mockListIcons = [
        'arrow-down',
        'arrow-left',
        'arrow-right',
        'bookmark-filled',
        'alert',
        'bookmark',
        'close',
        'comment',
        'lamp',
        'zoom'
    ];
    it('MapperIcons tests with name zoom', () => {
        const { container } = render(<MapperIcon name="zoom" />);
        expect(container).toMatchSnapshot();
    });
    it('Should render correctly all icons', () => {
        mockListIcons.forEach(icon => {
            const { container } = render(<MapperIcon name={icon} />);
            expect(container).toBeInTheDocument();
        });
    });
    it('MapperIcons without data should return an empty element', () => {
        const { container } = render(<MapperIcon />);
        expect(container).toBeEmptyDOMElement();
    });
});
