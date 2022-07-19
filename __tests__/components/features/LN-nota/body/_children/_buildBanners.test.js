import React from 'react';
import BuildBanners from '../../../../../../components/features/LN-nota/body/_children/_buildBanners';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import contentElements from '../../../../../../__mocks__/data/nota/body/contentElements.json';
import siteProperties from '../../../../../../__mocks__/data/nota/body/siteProperties.json';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({
            state: {
                siteService: {
                    adserver: []
                }
            }
        })
    };
});

useContent.mockImplementation(() => {});

Context.useAppContext = jest.fn(() => ({
    globalContent: {},
    siteProperties
}));

const banners = [
    { mobile: 'caja1_mob', position: 1 },
    {
        desktop: 'caja1_dsk',
        mobile: 'caja1_mob',
        tablet: 'middle_1_tab',
        position: 2
    },
    { desktop: 'middle_1_dsk', position: 3, sticky: true },
    { desktop: 'caja1_amp', position: 3 },
    { mobile: 'caja2_mob', position: 4, background: true },
    { mobile: 'caja3_mob', position: 5 },
    { mobile: 'caja4_mob', position: 6 },
    { mobile: 'caja7_mob', position: 7 },
    { mobile: 'caja8_mob', position: 8 },
    { mobile: 'caja9_mob', position: 9 },
    { mobile: 'caja10_mob', position: 10 }
];

describe('BuildBanners', () => {
    it('deberia renderizar un Div Banner caja1_mob', () => {
        const { container } = render(
            BuildBanners({
                banners,
                globalContent: {},
                elementPosition: 1,
                contentElements,
                outputType: 'default'
            })
        );

        expect(container.querySelector(`div`).getAttribute('class')).toEqual(
            'mod-banner --caja1_mob  '
        );
    });

    it('deberia renderizar un Div Banner middle_1_dsk', () => {
        const { container } = render(
            BuildBanners({
                banners,
                globalContent: {},
                elementPosition: 3,
                contentElements,
                outputType: 'default'
            })
        );

        expect(container.querySelector(`div`).getAttribute('class')).toEqual(
            'mod-banner --middle_1_dsk  '
        );
    });

    it('deberia renderizar un Div Banner amp caja1_amp', () => {
        const { container } = render(
            BuildBanners({
                banners,
                globalContent: {},
                elementPosition: 3,
                contentElements,
                outputType: 'amp'
            })
        );

        expect(container.querySelector(`amp-ad`).getAttribute('id')).toEqual(
            'caja1_amp'
        );
    });

    it('no deberia renderizar nada', () => {
        const { container } = render(
            BuildBanners({
                banners: [],
                globalContent: {},
                elementPosition: 1,
                contentElements,
                outputType: 'default'
            })
        );

        expect(container.querySelector(`div`)).toBeNull();
    });

    it('No deberia renderizar nada', () => {
        const { container } = render(
            BuildBanners({
                banners: [{ mobile: null, position: 11 }],
                globalContent: {},
                elementPosition: 11,
                contentElements,
                outputType: 'default'
            })
        );

        expect(container.querySelector(`div`)).toBeNull();
    });

    it('deberia renderizar Tres Div Banner para cada dispositivo (tablet, mobile, desktop)', () => {
        const { container } = render(
            BuildBanners({
                banners,
                globalContent: {},
                elementPosition: 2,
                contentElements,
                outputType: 'default'
            })
        );

        expect(
            container.querySelector(`div[class*="mod-banner --caja1_dsk"]`)
        ).toBeVisible();

        expect(
            container.querySelector(`div[class*="mod-banner --middle_1_tab"]`)
        ).toBeVisible();

        expect(
            container.querySelector(`div[class*="mod-banner --caja1_mob"]`)
        ).toBeVisible();
    });

    describe('Para usuario suscriptor', () => {
        const props = {
            banners,
            globalContent: {
                subscription: 'S'
            },
            elementPosition: 4,
            contentElements,
            outputType: 'default'
        };

        it('No deberia renderizar la caja2_mob', () => {
            const { container } = render(BuildBanners(props));

            expect(
                container.querySelector(`div[class*="mod-banner --caja2_mob"]`)
            ).toBeNull();
        });

        it('No deberia renderizar la caja7_mob', () => {
            const { container } = render(
                BuildBanners({
                    ...props,
                    elementPosition: 7
                })
            );

            expect(
                container.querySelector(`div[class*="mod-banner --caja7_mob"]`)
            ).toBeNull();
        });

        it('No deberia renderizar la caja8_mob', () => {
            const { container } = render(
                BuildBanners({
                    ...props,
                    elementPosition: 8
                })
            );

            expect(
                container.querySelector(`div[class*="mod-banner --caja8_mob"]`)
            ).toBeNull();
        });

        it('No deberia renderizar la caja9_mob', () => {
            const { container } = render(
                BuildBanners({
                    ...props,
                    elementPosition: 9
                })
            );

            expect(
                container.querySelector(`div[class*="mod-banner --caja9_mob"]`)
            ).toBeNull();
        });

        it('No deberia renderizar la caja10_mob', () => {
            const { container } = render(
                BuildBanners({
                    ...props,
                    elementPosition: 10
                })
            );

            expect(
                container.querySelector(`div[class*="mod-banner --caja10_mob"]`)
            ).toBeNull();
        });
    });
});
