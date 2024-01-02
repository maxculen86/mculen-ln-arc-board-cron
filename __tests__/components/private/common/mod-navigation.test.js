import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import ModNavigation from '../../../../components/private/common/mod-navigation';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('Mod-navigation test', () => {
    beforeEach(() => {
        Context.useAppContext.mockImplementation(() => ({
            deployment: jest.fn(),
            contextPath: '/pf'
        }));
    });

    const modNavigationProps = {
        navigation: [
            {
                classCondition: '',
                dataEvent: '',
                dataSection: '',
                link: 'http://www.google.com',
                size: '',
                style: '',
                target: '_blank',
                textname: 'LN Link Custom',
                title: 'LN Link Custom'
            },
            {
                classCondition: '',
                dataEvent: '',
                dataSection: '',
                link: '/revista-ohlala',
                size: '',
                style: '',
                target: '',
                textname: 'OHLALA',
                title: 'OHLALA'
            }
        ]
    };

    it('Matches snapshot', () => {
        const { container } = render(<ModNavigation />);
        expect(container).toMatchSnapshot();
    });

    it('Renders link list', () => {
        const { container } = render(<ModNavigation {...modNavigationProps} />);
        const links = container.querySelectorAll('a');
        expect(links).toHaveLength(2);
    });
});
