import React from 'react';
import { mount, render } from 'enzyme';
import MetaRobots from '../../../../components/private/common/metaRobots';

describe('MetaRobot', () => {
    it('Matches snapshot', () => {
        const props = {
            type: 'story',
            outputType: 'default',
            subtype: '1',
            syndication: { search: true }
        };
        const component = render(<MetaRobots {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Renders only over story templates', () => {
        const props = {
            type: 'no-story',
            outputType: 'default',
            subtype: '1',
            syndication: { search: true }
        };
        const component = mount(<MetaRobots {...props} />);
        expect(component.html()).toBeNull();
    });

    it('Renders over AMP pages', () => {
        const props = {
            type: 'story',
            outputType: 'amp',
            subtype: '1',
            syndication: { search: true }
        };
        const component = mount(<MetaRobots {...props} />);
        expect(component.html()).not.toBeNull();
    });

    it('Does not render in recipes template', () => {
        const props = {
            type: 'story',
            subtype: '7',
            outputType: 'default',
            syndication: { search: true }
        };
        const component = mount(<MetaRobots {...props} />);
        expect(component.html()).toBeNull();
    });
});
