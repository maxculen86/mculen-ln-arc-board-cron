import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';

import CajaCollection from '../../../../components/chains/LN10_Caja_Collection/default';
import renderables from '../../../../__mocks__/data/LN10_Caja_Collection/renderablesGrid8And4.json';
import responseSource from '../../../../__mocks__/data/LN10_Caja_Collection/responseUseGetArticleInCollection.json';
import renderablesWithContentLab from '../../../../__mocks__/data/renderables/renderablesWithContentLab.json';
import mockChildProps from '../../../../__mocks__/data/LN10_Caja_Manual/childProps.json';
import renderablesExcSub from '../../../../__mocks__/data/LN10_Caja_Collection/renderablesExclusiveSub.json';
import getDynamicBanners from '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners';
import useGetArticleInCollection from '../../../../components/private/LN/common/hooks/useGetArticleInCollection';
import DivBannerSSR from '../../../../components/private/common/banners/DivBannerSSR';
import { CHAIN_STYLE } from '../../../../components/chains/utils/common/_helpers-WebApi';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners',
    () => jest.fn()
);

jest.mock(
    '../../../../components/private/LN/common/hooks/useGetArticleInCollection',
    () => jest.fn()
);

describe('Tests Chain CajaCollection', () => {
    const customFields = {
        title: 'Caja Collection',
        layout: '',
        hideTitle: false,
        hideCaja: false,
        link: '',
        linkButton: '',
        chainStyle: '',
        logoId: '',
        buttonStyle: '',
        buttonText: '',
        navigator: '',
        buttonLogo: '',
        idCollection: '',
        initialPosition: 0
    };
    const getProps = ({
        customFields,
        id = 'c0fuuilRMMtV6pi',
        renderablesData = renderables,
        childProps = mockChildProps
    }) => ({
        id,
        isAdmin: true,
        customFields,
        tree: {},
        childProps,
        renderables: renderablesData
    });

    describe('Tests for the case warnning', () => {
        it('should return a warning when there is no layout defined', () => {
            render(<CajaCollection {...getProps({ customFields })} />);

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere que seleccione una diagramación')
            ).toBeVisible();
        });

        it('should return a warning when they do not specify a collection id', () => {
            const fields = {
                ...customFields,
                layout: 'bnGrilla4'
            };
            render(
                <CajaCollection
                    {...getProps({ customFields: fields, childProps: [] })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere el id de la colección')
            ).toBeVisible();
        });

        it("should return a warning when the collectionSource doesn't find notes.", () => {
            const fields = {
                ...customFields,
                layout: 'bnGrilla4',
                idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
            };
            useGetArticleInCollection.mockImplementation(() => undefined);
            render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText(
                    'La colección JYLAMSGRTRBSVEZTT7VHO2WO3U no encontró notas'
                )
            ).toBeVisible();
        });

        it('should return a warning when the layout is bn-4-8 and chainStyle is not include in VERTICALS chains', () => {
            const fields = {
                ...customFields,
                layout: 'bn-4-8',
                chainStyle: 'Hashtag',
                idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
            };
            useGetArticleInCollection.mockImplementation(() => responseSource);
            render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText(
                    'La diagramación Grilla 4 Verticales no permite el estilo seleccionado'
                )
            ).toBeVisible();
        });

        it('Should return a warning when the layout is hashtag and the number of articles is less than 7 ', () => {
            const fields = {
                ...customFields,
                layout: 'Hashtag',
                chainStyle: 'Hashtag',
                idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
            };

            useGetArticleInCollection.mockImplementation(() => responseSource);

            render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere minimo 7 articulos para HashTag')
            ).toBeVisible();
        });
    });

    describe('Tests for the case of BN grid 8, 4 and 3', () => {
        const fields = {
            ...customFields,
            layout: 'bnGrilla4',
            idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
        };

        it('should return a grid of 4 items', () => {
            useGetArticleInCollection.mockImplementation(() => responseSource);

            render(
                <CajaCollection
                    {...{
                        ...getProps({ customFields: fields }),
                        id: 'c0fUjhrcHRHB8X',
                        renderables: renderablesExcSub
                    }}
                />
            );

            expect(screen.getAllByRole('article')).toHaveLength(4);
        });

        it('should return a grid of 8 items', () => {
            useGetArticleInCollection.mockImplementation(() => [
                ...responseSource,
                ...responseSource
            ]);

            render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(screen.getAllByRole('article')).toHaveLength(8);
        });

        it('should return a grid of 3 items with variant autor, liveblog, html or regular', () => {
            const fields = {
                ...customFields,
                layout: 'bn_3_grid',
                idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
            };

            const responseSourceX3 = [...responseSource, ...responseSource];

            useGetArticleInCollection.mockImplementation(() =>
                responseSourceX3.slice(0, 3)
            );

            render(
                <CajaCollection
                    {...{
                        ...getProps({ customFields: fields }),
                        id: 'c0fUjhrcHRHB8X',
                        renderables: renderablesExcSub
                    }}
                />
            );

            expect(screen.getAllByRole('article')).toHaveLength(3);

            const variantValues = ['liveblog', 'regular', 'autor', 'html'];

            expect(
                mockChildProps.some(props =>
                    variantValues.includes(props.customFields.variant)
                )
            ).toBeTruthy();
        });

        it('should show the "bajada" when the article has no imaget', () => {
            useGetArticleInCollection.mockImplementation(() => [
                responseSource[3]
            ]);

            const customFields = {
                ...fields,
                layout: 'bn_1_grid'
            };

            const { container } = render(
                <CajaCollection
                    {...getProps({
                        customFields
                    })}
                    isTest={true}
                />
            );

            const bajada =
                'Incidentes frente al hotel donde convocó a militantes';

            const articleWithSubhead = container.querySelector('.subhead');

            expect(articleWithSubhead).toBeDefined();
            expect(screen.getByText(bajada)).toBeVisible();
        });
    });

    describe('Tests cases for focal layouts', () => {
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
            buttonLogo: '',
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
                'should return three articles with layout bn_1_2_grid',
                { layout: 'bn_1_2_grid', quantity: 3 }
            ],
            [
                'should return four articles with layout bn_1_3_grid',
                { layout: 'bn_1_3_grid', quantity: 4 }
            ],
            [
                'should return five articles with layout bn_1_4_grid',
                { layout: 'bn_1_4_grid', quantity: 5 }
            ],
            [
                'should return five articles with layout bn_2_1_2_grid',
                { layout: 'bn_2_1_2_grid', quantity: 5 }
            ],
            [
                'should return seven articles with layout hash-1-2-2-2_grid',
                { layout: 'hash-1-2-2-2_grid', quantity: 7 }
            ]
        ];

        test.each(layoutCases)('%s', (message, { layout, quantity }) => {
            useGetArticleInCollection.mockImplementation(() =>
                responseSourceX2.slice(0, quantity)
            );

            const props = getProps({ customFields: setLayout(layout) });
            const { container } = render(<CajaCollection {...props} />);

            expect(screen.getAllByRole('article')).toHaveLength(quantity);
            expect(
                container.getElementsByClassName(`--${layout}`)
            ).toHaveLength(1);
            expect(container).toMatchSnapshot();
        });
    });

    describe('Tests for the case of Content Lab', () => {
        const fields = {
            ...customFields,
            layout: 'cajaContent1',
            idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
        };

        it('should return a grid of 1 items', () => {
            useGetArticleInCollection.mockImplementation(() =>
                responseSource.slice(0, 1)
            );

            const { container } = render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(screen.getAllByRole('article')).toHaveLength(1);
            expect(
                container.getElementsByClassName('content-lab')
            ).toHaveLength(1);
        });

        it('Should render the box with the --4xl class when rendering in the content section.', () => {
            useGetArticleInCollection.mockImplementation(() =>
                responseSource.slice(0, 1)
            );

            const { container } = render(
                <CajaCollection
                    {...getProps({
                        customFields: fields,
                        id: 'c0fe2FW0maz0cI0',
                        renderablesData: renderablesWithContentLab
                    })}
                />
            );

            expect(container.querySelector('.--4xl')).toBeDefined();
        });

        it('Should render the box with the 3xl class when rendering in sections other than content.', () => {
            useGetArticleInCollection.mockImplementation(() =>
                responseSource.slice(0, 1)
            );

            const { container } = render(
                <CajaCollection
                    {...getProps({
                        customFields: fields,
                        id: 'c0faEuBOlaz0cwr',
                        renderablesData: renderablesWithContentLab
                    })}
                />
            );

            expect(container.querySelector('.--3xl')).toBeDefined();
        });
    });

    describe('Tests banner cases', () => {
        useGetArticleInCollection.mockImplementation(() =>
            responseSource.slice(0, 1)
        );

        const fields = {
            ...customFields,
            layout: 'cajaContent1',
            idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
        };

        it('should render banner mob returned from getDynamicBanners', () => {
            getDynamicBanners.mockImplementation(() => ({
                bannerMob: (
                    <DivBannerSSR
                        bannerConfiguration={{
                            slotId: 'billboard_mob',
                            classes: 'billboard_mob',
                            withoutHide: true,
                            isStatic: true,
                            lazyClass: 'lazy'
                        }}
                    />
                )
            }));

            const { container } = render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(container.querySelector('.--billboard_mob')).toBeVisible();
            expect(screen.getAllByRole('article')).toHaveLength(1);
            expect(container).toMatchSnapshot();
        });

        it('should render banner dsk returned from getDynamicBanners', () => {
            getDynamicBanners.mockImplementation(() => ({
                bannerDsk: (
                    <DivBannerSSR
                        bannerConfiguration={{
                            slotId: 'billboard_dsk',
                            classes: 'billboard_dsk',
                            withoutHide: true,
                            isStatic: true,
                            lazyClass: 'lazy'
                        }}
                    />
                )
            }));

            const { container } = render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(container.querySelector('.--billboard_dsk')).toBeVisible();
            expect(screen.getAllByRole('article')).toHaveLength(1);
            expect(container).toMatchSnapshot();
        });

        it('should render banner subscriber when chain style is sub-exclusive', () => {
            const { container } = render(
                <CajaCollection
                    {...{
                        ...getProps({
                            customFields: {
                                ...fields,
                                chainStyle: CHAIN_STYLE.SUB_EXCLUSIVE
                            }
                        }),
                        id: 'c0fUjhrcHRHB8X',
                        renderables: renderablesExcSub
                    }}
                />
            );

            expect(container.querySelector('.banner-subscriber')).toBeVisible();
            expect(container).toMatchSnapshot();
        });
    });

    describe('Tests for the case BN Grilla 6 + Timeline layout', () => {
        it('should return a warning if LN_TIMELINE feature is missing in BN Grilla 6 + Timeline layout', () => {
            const fields = {
                ...customFields,
                layout: 'bn_6_timeline',
                idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
            };

            useGetArticleInCollection.mockImplementation(() => [
                ...responseSource,
                ...responseSource
            ]);

            render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText(
                    'Esta diagramación requiere el feature LN10 Timeline'
                )
            ).toBeVisible();
        });

        it('should not return a warning if LN_TIMELINE feature is present in BN Grilla 6 + Timeline layout', () => {
            const fields = {
                ...customFields,
                layout: 'bn_6_timeline',
                idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
            };

            const renderables = [
                {
                    collection: 'chains',
                    type: 'LN10_Caja_Collection',
                    props: {
                        collection: 'chains',
                        type: 'LN10_Caja_Collection',
                        id: 'c0fmf5CDUJhwID'
                    },
                    children: [
                        { collection: 'features', type: 'LN-10/timeline' }
                    ]
                }
            ];

            render(
                <CajaCollection
                    {...getProps({
                        customFields: fields,
                        renderablesData: renderables
                    })}
                />
            );

            expect(
                screen.queryByText(
                    'Esta diagramación requiere el feature LN10 Timeline'
                )
            ).toBeNull();
        });
    });
});
