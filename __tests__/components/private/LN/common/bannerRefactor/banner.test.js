import Consumer from 'fusion:consumer';

import React from 'react';
import { mount, shallow, render } from 'enzyme';
import toJson from 'enzyme-to-json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        const outputType = 'default';
        return props => <Component {...props} outputType={outputType} />;
    };
});

import Context from 'fusion:context';

jest.mock(
    '../../../../../../components/private/common/hocs/withNavigation',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock(
    '../../../../../../components/private/LN/common/hocs/withLoginData',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

import Banner from '../../../../../../components/private/LN/common/bannerRefactor';

describe('Banner', () => {
    it('Renders Sticky One Mob', () => {
        const siteProps = {
            bannerConfig: {
                dfp_id: 133919216
            }
        };

        const config = {
            selectedSlots: {
                desktopSlot: null,
                mobileSLot: 'sticky1_mob',
                tableSlot: null
            },
            slotGroup: 'nota',
            background: true,
            sticky: true,
            screenUtils: {
                device: 'mobile'
            }
        };

        const component = mount(
            <Banner
                siteProperties={siteProps}
                isAdmin={false}
                banner={config}
            />
        );

        console.log(component);

        /* setTimeout(() => {
            component.update();
            console.log(component.html());
            //expect(wrapper.find(ChildComponent).length).to.equal(status.length);
            //done();
        }); */

        expect(true).toBeTruthy();
        expect(component.find('div')).toHaveLength(1);
    });
});
