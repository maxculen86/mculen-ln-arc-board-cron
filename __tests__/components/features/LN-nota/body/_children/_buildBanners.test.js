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
    { desktop: 'middle_1_dsk', position: 3, sticky: true },
    { desktop: 'middle_2_dsk', position: 6 },
    { desktop: 'caja1_amp', position: 3 },
    { desktop: 'caja2_amp', position: 5 },
    { mobile: 'caja1_mob', position: 1 },
    { mobile: 'caja2_mob', position: 4, background: true },
    { mobile: 'caja3_mob', position: 7 },
    { mobile: 'caja4_mob', position: 9 },
    { mobile: 'caja5_mob', position: 11 }
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
});
