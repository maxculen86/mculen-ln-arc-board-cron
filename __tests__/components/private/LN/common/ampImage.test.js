import React from 'react';
import { render } from 'enzyme';
import AmpImage from '../../../../../components/private/LN/common/ampImage';

describe('AmpImage', () => {
    it('Matches snapshot', () => {
        const url = 'http://lorempixel.com/400/200';
        const sources = [
            {
                resizedUrl: url,
                option: {
                    media: '',
                    width: 600
                }
            }
        ];
        const width = 600;
        const height = 600;
        const alt = 'Test image';
        const mediaData = [
            {
                credits: {
                    affiliation: [
                        {
                            name: 'DIEGO LIMA',
                            type: 'author'
                        }
                    ],
                    by: [
                        {
                            byline: 'photographer',
                            name: 'photographer',
                            type: 'author'
                        },
                        {
                            byline: 'martin',
                            name: 'Tincho',
                            type: 'author'
                        }
                    ]
                },
                additional_properties: {
                    iptc_source: 'LA NACION'
                }
            }
        ];

        const Component = render(
            <AmpImage
                sources={sources}
                url={url}
                alt={alt}
                width={width}
                height={height}
                caption={alt}
                mediaData={mediaData}
                layout={'responsive'}
            />
        );

        expect(Component).toMatchSnapshot();
    });
});
