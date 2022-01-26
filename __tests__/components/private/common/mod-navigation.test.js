import React from 'react';
import ModNavigation from '../../../../components/private/common/mod-navigation';
import { render } from 'enzyme';

describe('Mod-navigation test', () => {
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
        const navigation = render(<ModNavigation />);
        expect(navigation).toMatchSnapshot;
    });

    it('Renders link list', () => {
        const component = render(<ModNavigation {...modNavigationProps} />);
        expect(component.find('a')).toHaveLength(2);
    });
});
