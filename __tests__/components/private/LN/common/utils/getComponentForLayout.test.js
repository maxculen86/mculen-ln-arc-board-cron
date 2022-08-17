import React from 'react';
import getComponentForLayout from '../../../../../../components/private/LN/common/utils/getComponentForLayout';
import {
    setTLOrderClass,
    setTLDistribution
} from '../../../../../../components/private/LN/common/utils/timeline';

jest.mock(
    '../../../../../../components/private/LN/common/utils/getFeatureByLayout',
    () =>
        jest.fn(() => ({
            props: {
                id: 'f0fj1U7I4DQq82U'
            }
        }))
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/timeline/',
    () => ({
        setTLOrderClass: jest.fn(() => '--left-top'),
        setTLDistribution: jest.fn(() => ({
            articles: [
                { key: 'f0fj1U7I4DQq82U' },
                { key: 'f0fj1U7I4DQq821' },
                { key: 'f0fj1U7I4DQq822' },
                { key: 'f0fj1U7I4DQq823' },
                { key: 'f0fj1U7I4DQq824' },
                { key: 'f0fj1U7I4DQq825' }
            ],

            content: { key: 'f0fj1U7I4DQq82U' }
        }))
    })
);

describe('private - LN - common - utils - getComponentForLayout', () => {
    const generalMock = {
        layoutName: 'Opinion',
        props: {
            handleClick: () => {},
            layout: 'opinion4',
            articles: [{ _id: 'UQ3WOYTWR5FJ5CQWUGZBLBEZRE' }],
            title: 'Editoriales',
            url: 'https://www.lanacion.com.ar/editoriales'
        }
    };

    it('returns correspondent React component with props', () => {
        const result = getComponentForLayout(...Object.values(generalMock));

        expect(result).toBeInstanceOf(Object);
        expect(result.type.name).toBe(generalMock.layoutName);

        const entriesFromProps = Object.entries(result.props);

        entriesFromProps.forEach(([key, value]) => {
            const stringByValue = JSON.stringify(value);
            const stringByKey = JSON.stringify(
                generalMock.props[key] || 'la-nacion-ar'
            );

            expect(stringByValue).toBe(stringByKey);
        });
    });

    it('returns children sliced', () => {
        const articleFeatureMock = {
            layoutName: 'ArticleFeature',
            props: {
                notesQuantity: 4,
                _children: [
                    { key: 'f0fj1U7I4DQq82U' },
                    { key: 'f0fj1U7I4DQq821' },
                    { key: 'f0fj1U7I4DQq822' },
                    { key: 'f0fj1U7I4DQq823' },
                    { key: 'f0fj1U7I4DQq824' },
                    { key: 'f0fj1U7I4DQq825' }
                ]
            }
        };

        const result = getComponentForLayout(
            ...Object.values(articleFeatureMock)
        );

        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toBe(articleFeatureMock.props._children[0]);
        expect(result).toHaveLength(articleFeatureMock.props.notesQuantity);
    });

    it('returns timeline data object', () => {
        const timelineMock = {
            layoutName: 'Timeline',
            props: {
                _children: [
                    { key: 'f0fj1U7I4DQq82U' },
                    { key: 'f0fj1U7I4DQq821' },
                    { key: 'f0fj1U7I4DQq822' },
                    { key: 'f0fj1U7I4DQq823' },
                    { key: 'f0fj1U7I4DQq824' },
                    { key: 'f0fj1U7I4DQq825' }
                ],
                features: [
                    { props: { id: 'f0fj1U7I4DQq82U' } },
                    { props: { id: 'f0fj1U7I4DQq821' } },
                    { props: { id: 'f0fj1U7I4DQq822' } },
                    { props: { id: 'f0fj1U7I4DQq823' } },
                    { props: { id: 'f0fj1U7I4DQq824' } },
                    { props: { id: 'f0fj1U7I4DQq825' } }
                ]
            }
        };

        const result = getComponentForLayout(...Object.values(timelineMock));

        expect(result).toBeInstanceOf(Object);
        expect(Object.keys(result)).toStrictEqual(['timeline', 'orderClass']);
        expect(result.orderClass).toBe('--left-top');

        expect(result.timeline).toMatchObject({
            articles: [
                { key: 'f0fj1U7I4DQq82U' },
                { key: 'f0fj1U7I4DQq821' },
                { key: 'f0fj1U7I4DQq822' },
                { key: 'f0fj1U7I4DQq823' },
                { key: 'f0fj1U7I4DQq824' },
                { key: 'f0fj1U7I4DQq825' }
            ],

            content: { key: 'f0fj1U7I4DQq82U' }
        });
    });
});
