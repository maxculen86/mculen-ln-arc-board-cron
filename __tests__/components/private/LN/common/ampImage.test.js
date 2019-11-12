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
        const alt = 'Test image';

        const Component = render(
            <AmpImage sources={sources} url={url} alt={alt} />
        );

        expect(Component).toMatchSnapshot();
    });
});
