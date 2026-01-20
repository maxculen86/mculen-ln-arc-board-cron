import fusionConsumer from 'fusion:consumer';
import CajaApertura from '../../../../components/chains/LN10_Caja_Apertura/default';
import ArticleFeature from '../../../../components/features/LN-10/article/default';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderables from '../../../../__mocks__/data/renderables/LN10_Caja_Bomba.json';
import getDynamicBanners from '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners';
import DivBannerSSR from '../../../../components/private/common/banners/DivBannerSSR';
import Context from 'fusion:context';

jest.mock(
    '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners',
    () => jest.fn()
);

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

jest.mock(
    '../../../../components/features/LN-10/article/default',
    () => 'mocked-ArticleFeature'
);

describe('components - chains - LN10_Caja_Apertura - helper', () => {
    const articleFeature = <ArticleFeature id="noteId" />;

    const getProps = (layout, children, isAdmin = true) => ({
        id: 'c0fGiApKcEVS2BX',
        isAdmin,
        customFields: { layout, hideCaja: false },
        children,
        childProps: renderables[3].children[0].children,
        renderables
    });

    describe('helper - setFeaturedChildren', () => {
        it('Check Props', () => {});
    });

    describe('Tests validation by section', () => {
        test('should return a warning, when the component is not render in the section "Apertura"', () => {
            render(
                <section data-section="pre-apertura">
                    <CajaApertura {...getProps('focal-70', [articleFeature])} />
                </section>
            );

            expect(screen.getByText('Advertencia')).toBeDefined();

            expect(
                screen.getByText(
                    'La chain debe estar dentro de la sección Apertura'
                )
            ).toBeDefined();
        });

        test('should return the component, when the section is correct', () => {
            const { container } = render(
                <section data-section="apertura">
                    <CajaApertura
                        {...getProps('bn-opening-4', [
                            articleFeature,
                            articleFeature,
                            articleFeature,
                            articleFeature
                        ])}
                    />
                </section>
            );

            expect(container.querySelector('.focal-70')).toBeDefined();
        });

        test('should not render the component if there is an error outside the page builder', () => {
            const { container } = render(
                <section data-section="pre-apertura">
                    <CajaApertura
                        {...getProps('focal-70', [articleFeature], false)}
                    />
                </section>
            );

            expect(container.querySelector('.focal-70')).toBeNull();
        });

        test('should render banner mob returned from getDynamicBanners', () => {
            getDynamicBanners.mockImplementation(() => ({
                bannerMob: (
                    <DivBannerSSR
                        bannerConfiguration={{
                            slotId: 'caja2_mob',
                            classes: 'caja2_mob',
                            withoutHide: true,
                            isStatic: true
                        }}
                    />
                )
            }));

            const { container } = render(
                <section data-section="pre-apertura">
                    <CajaApertura
                        {...getProps('focal-70', [articleFeature], false)}
                    />
                </section>
            );

            const divBanner = container.querySelector('.ln-banner-container');
            const comBanner = container.querySelector('.ln-banner');
            const idAttribute = comBanner.getAttribute('id');

            expect(divBanner).toBeInTheDocument();
            expect(divBanner).toHaveClass('--caja2_mob', 'caja2_mob');

            expect(comBanner).toBeInTheDocument();
            expect(comBanner).toHaveAttribute('data-prebid-enabled', 'false');
            expect(comBanner).toHaveAttribute('data-size', '[]');
            expect(comBanner).toHaveAttribute('data-sizemap', '[]');
            expect(comBanner).toHaveAttribute('data-subscription', 'false');
            expect(comBanner).toHaveAttribute('data-without-hide', 'true');

            expect(idAttribute).toBe('caja2_mob');
        });
    });
});
