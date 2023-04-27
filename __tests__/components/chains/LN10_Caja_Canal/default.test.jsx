import React from 'react';
import CajaCanal from '../../../../components/chains/LN10_Caja_Canal/default';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderables from '../../../../__mocks__/data/LN10_Caja_Collection/renderablesGrid8And4.json';
import responseSource from '../../../../__mocks__/data/LN10_Caja_Collection/responseUseGetArticleInCollection.json';
import getDynamicBanners from '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners';
import useGetArticleInCollection from '../../../../components/private/LN/common/hooks/useGetArticleInCollection';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/private/LN/common/hooks/useGetArticleInCollection',
    () => jest.fn()
);

describe('Tests Chain Caja Canal', () => {
    const getProps = ({
        customFields = {},
        id = 'c0fwX0hVZJbN0f',
        renderablesData = renderables
    }) => ({
        id,
        isAdmin: false,
        customFields,
        tree: {},
        layout: 'LN10-Home_Main',
        renderables: renderablesData
    });

    describe('Tests cases for different layouts', () => {
        const responseSourceX2 = [...responseSource, ...responseSource];

        const customFields = {
            idCollection: 'FPKJS5YHQVFGVD46GOLY7A265U',
            initialPosition: 1,
            chainStyle: 'bienestar',
            title: 'Bienestar',
            link: '',
            logoId: '4HYEWZCP5VBZRBAOCOF5S3IGR4',
            hideTitle: false,
            navigator: 'Politics',
            buttonText: '',
            linkButton: '',
            buttonStyle: 'generico'
        };

        const setLayout = layout => ({
            ...customFields,
            layout
        });

        const layoutCases = [
            [
                'should return two articles with layout bn_1_1_grid',
                { layout: 'bn_1_1_grid', quantity: 2 }
            ],
            [
                'should return three articles with layout canal_1_2_grid',
                { layout: 'canal_1_2_grid', quantity: 3 }
            ],
            [
                'should return four articles with layout canal_1_3_grid',
                { layout: 'canal_1_3_grid', quantity: 4 }
            ],
            [
                'should return five articles with layout canal_1_4_grid',
                { layout: 'canal_1_4_grid', quantity: 5 }
            ],
            [
                'should return four articles with layout bn-4-8',
                { layout: 'bn-4-8', quantity: 4 }
            ]
        ];

        test.each(layoutCases)('%s', (message, { layout, quantity }) => {
            useGetArticleInCollection.mockImplementation(() =>
                responseSourceX2.slice(0, quantity)
            );

            const props = getProps({ customFields: setLayout(layout) });
            const { container } = render(<CajaCanal {...props} />);

            expect(screen.getAllByRole('article')).toHaveLength(quantity);
            expect(container).toMatchSnapshot();
        });
    });
});
