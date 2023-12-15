import React from 'react';
import ModNavigation from '../../../../components/private/common/mod-navigation';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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
        const { asFragment } = render(
            <ModNavigation {...modNavigationProps} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('Renders link list', () => {
        const { getAllByRole } = render(
            <ModNavigation {...modNavigationProps} />
        );
        const links = getAllByRole('link');
        expect(links).toHaveLength(2);
    });
});
