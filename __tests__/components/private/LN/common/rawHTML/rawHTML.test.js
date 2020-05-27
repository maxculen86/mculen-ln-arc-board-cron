import React from 'react';
import { render, mount } from 'enzyme';
import RawHTML from '../../../../../../components/private/LN/common/rawHTML';

describe('RawHTML', () => {
    const data = {
        _id: 'PLTUN6HWXFEXZI2HW4Z47EAVN4',
        raw_oembed: {
            height: 380,
            html:
                '<iframe width="300" height="380" allowtransparency="true" frameborder="0" allow="encrypted-media" title="Spotify Embed: The New Abnormal" src="https://open.spotify.com/embed/album/2xkZV2Hl1Omi8rk2D7t5lN"></iframe>',
            type: 'spotify',
            width: 300
        },
        subtype: 'spotify',
        type: 'oembed_response'
    };

    let component;

    beforeEach(() => {
        component = mount(<RawHTML data={data} />);
    });

    afterEach(() => {
        component = null;
    });

    it('Matches snapshot', () => {
        const rawHTML = render(<RawHTML data={data} />);
        expect(rawHTML).toMatchSnapshot();
    });

    it('Props', () => {
        expect(component.props().data).toBe(data);
        expect(component.props().data.type).toBe('oembed_response');
    });
});
