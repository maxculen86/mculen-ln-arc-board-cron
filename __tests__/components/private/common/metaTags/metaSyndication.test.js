import React from 'react';
import { mount } from 'enzyme';
import MetaSyndication from '../../../../../components/private/common/syndication';

describe('LN - Common - MetaSyndication', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        subtype: '1',
        syndication: {
            external_distribution: false,
            search: false
        }
    };
    it('MetaSyndication nota snapshot', () => {
        const metaSyndicationBasic = mount(
            <MetaSyndication
                arcSite={props.arcSite}
                subtype={props.subtype}
                syndication={props.syndication}
            />
        );
        expect(metaSyndicationBasic).toMatchSnapshot();
    });
});
