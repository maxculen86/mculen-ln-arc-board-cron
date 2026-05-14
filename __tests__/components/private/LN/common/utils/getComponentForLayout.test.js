import React from 'react';
import getComponentForLayout from '../../../../../../components/private/LN/common/utils/getComponentForLayout';

jest.mock(
    '../../../../../../components/private/common/opinion',
    () =>
        function Opinion() {
            return null;
        }
);
jest.mock(
    '../../../../../../components/private/common/editoriales',
    () =>
        function Editoriales() {
            return null;
        }
);
jest.mock(
    '../../../../../../components/private/LN/acumulado/articleAcum',
    () =>
        function ArticleAcum() {
            return null;
        }
);
jest.mock(
    '../../../../../../components/private/LN/home/templatesContainers/focalFactory',
    () =>
        function FocalFactory() {
            return null;
        }
);
jest.mock(
    '../../../../../../components/private/LN/common/utils/cajaTemasHelper',
    () => ({ customHeading: {} })
);
jest.mock(
    '../../../../../../components/private/LN/common/utils/getFeatureByLayout',
    () =>
        jest.fn(() => ({
            props: { id: 'f0fj1U7I4DQq82U' }
        }))
);
jest.mock(
    '../../../../../../components/private/LN/common/utils/timeline',
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

    it('returns a React element with the correct component type and props', () => {
        const result = getComponentForLayout(...Object.values(generalMock));

        expect(result).toBeInstanceOf(Object);
        expect(result.type.name).toBe(generalMock.layoutName);

        Object.entries(result.props).forEach(([key, value]) => {
            expect(JSON.stringify(value)).toBe(
                JSON.stringify(generalMock.props[key] || 'la-nacion-ar')
            );
        });
    });

    it('returns children sliced to notesQuantity for ArticleFeature', () => {
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
});
