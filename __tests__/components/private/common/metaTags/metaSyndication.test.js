import React from 'react';
import { mount } from 'enzyme';
import MetaSyndication from '../../../../../components/private/common/syndication';

describe('LN - Common - MetaSyndication', () => {
    it('MetaSyndication nota snapshot', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            outputType: 'default',
            type: 'story',
            subtype: '1',
            syndication: {
                external_distribution: false,
                search: false
            }
        };

        const component = mount(
            <MetaSyndication
                arcSite={props.arcSite}
                subtype={props.subtype}
                syndication={props.syndication}
                type={props.type}
                outputType={props.outputType}
            />
        );
        expect(component).toMatchSnapshot();
    });

    it('Renders only over story templates', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            outputType: 'default',
            type: 'no-story',
            subtype: '1',
            syndication: {
                external_distribution: false,
                search: false
            }
        };

        const component = mount(
            <MetaSyndication
                arcSite={props.arcSite}
                subtype={props.subtype}
                syndication={props.syndication}
                type={props.type}
                outputType={props.outputType}
            />
        );
        expect(component.html()).toBeNull();
    });

    it('Renders over AMP pages', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            outputType: 'amp',
            type: 'story',
            subtype: '1',
            syndication: {
                external_distribution: false,
                search: false
            }
        };

        const component = mount(
            <MetaSyndication
                arcSite={props.arcSite}
                subtype={props.subtype}
                syndication={props.syndication}
                type={props.type}
                outputType={props.outputType}
            />
        );
        expect(component.html()).not.toBeNull();
    });

    it('Does not render in recipes template', () => {
        const props = {
            arcSite: 'la-nacion-ar',
            outputType: 'amp',
            type: 'story',
            subtype: '7',
            syndication: {
                external_distribution: false,
                search: false
            }
        };

        const component = mount(
            <MetaSyndication
                arcSite={props.arcSite}
                subtype={props.subtype}
                syndication={props.syndication}
                type={props.type}
                outputType={props.outputType}
            />
        );
        expect(component.html()).toBeNull();
    });
});
