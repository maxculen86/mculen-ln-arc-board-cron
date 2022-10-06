import React from 'react';
import { render } from '@testing-library/react';
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

    it('Matches snapshot', () => {
        const { container } = render(<RawHTML data={data} />);
        expect(
            container.firstChild.classList.contains('--spotify')
        ).toBeTruthy();

        expect(container).toMatchSnapshot();
    });

    describe('Attribute tests loading in iframes', () => {
        const cases = [
            {
                ...data,
                subtype: 'youtube',
                raw_oembed: {
                    ...data.raw_oembed,
                    html:
                        '<iframe width="560" height="315" src="https://www.youtube.com/embed/hC8CH0Z3L54?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="FKJ & Masego - Tadow"></iframe>'
                }
            },
            {
                ...data,
                subtype: 'vimeo',
                raw_oembed: {
                    ...data.raw_oembed,
                    html:
                        '<iframe src="https://player.vimeo.com/video/747666103?h=2c819739d8&amp;app_id=122963" width="426" height="240" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Electrolux &amp;mdash; Break the pattern"></iframe>'
                }
            },
            {
                ...data,
                subtype: 'dailymotion',
                raw_oembed: {
                    ...data.raw_oembed,
                    html:
                        '<iframe frameborder="0" width="480" height="269" src="https://www.dailymotion.com/embed/video/x589c8d?pubtool=oembed" allowfullscreen allow="autoplay"></iframe>'
                }
            }
        ];

        test.each(cases)(
            'should contain the loading attribute in lazy',
            props => {
                const { container } = render(<RawHTML data={props} />);

                expect(container.querySelector('[loading=lazy]')).toBeTruthy();
            }
        );
    });

    describe('Tests of modifier classes', () => {
        const cases = [
            {
                ...data,
                subtype: 'facebook-post',
                raw_oembed: {
                    ...data.raw_oembed,
                    html:
                        '<div id="fb-root"></div>\n\x3Cscript async="1" defer="…/">Wednesday, June 3, 2020</a></blockquote></div>'
                }
            },
            {
                ...data,
                subtype: 'facebook-video',
                raw_oembed: {
                    ...data.raw_oembed,
                    html:
                        '<div id="fb-root"></div>\n\x3Cscript async="1" defer="…/">Wednesday, June 3, 2020</a></blockquote></div>'
                }
            }
        ];

        test.each(cases)(
            'Should contain the modifier class --facebook',
            props => {
                const { container } = render(<RawHTML data={props} />);

                expect(
                    container.firstChild.classList.contains('--facebook')
                ).toBeTruthy();
            }
        );
    });
});
