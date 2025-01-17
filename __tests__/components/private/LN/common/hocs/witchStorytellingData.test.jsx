import React from 'react';
import { render } from '@testing-library/react';
import WithStorytellingData from '../../../../../../components/private/LN/common/hocs/WithStorytellingData';

import PropTypes from 'fusion:prop-types';

const MockComponent = ({ storytellingData }) => (
    <div id="storytelling-id">{JSON.stringify(storytellingData)}</div>
);

MockComponent.propTypes = {
    storytellingData: PropTypes.object
};

const WrappedComponent = WithStorytellingData(MockComponent);

describe('WithStorytellingData', () => {
    it('should pass props storytellingData apertura to wrapper component by type story, subtype 4 and  video content', () => {
        const globalContent = {
            promo_items: {
                basic: { url: 'urlmock' },
                storytelling: { text: 'Storytelling nota' },
                storytelling_mobile: null
            },
            type: 'story',
            subtype: '4'
        };

        const isLoadWithPicture = true;

        const { container } = render(
            <WrappedComponent
                globalContent={globalContent}
                isLoadWithPicture={isLoadWithPicture}
            />
        );

        const storytellingDataElement =
            container.querySelector('#storytelling-id');
        expect(storytellingDataElement).toMatchSnapshot();

        const storytellingData = JSON.parse(
            storytellingDataElement.textContent
        );

        expect(storytellingData).toHaveProperty('apertura');
        expect(storytellingData.apertura).not.toEqual({});
    });

    it('should return an empty object when conditions are not meet', () => {
        const globalContent = {
            promo_items: {},
            type: '10',
            subtype: 'video_jw'
        };

        const isLoadWithPicture = false;

        const { container } = render(
            <WrappedComponent
                globalContent={globalContent}
                isLoadWithPicture={isLoadWithPicture}
            />
        );

        const storytellingDataElement =
            container.querySelector('#storytelling-id');
        expect(storytellingDataElement).toMatchSnapshot();

        const storytellingData = JSON.parse(
            storytellingDataElement.textContent
        );
        expect(storytellingData.apertura).toEqual({});
    });
});
