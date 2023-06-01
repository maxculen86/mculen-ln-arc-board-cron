import React from 'react';
import CajaWebStories from '../../../../components/chains/LN10_Caja_WebStories/default';
import { render } from '@testing-library/react';
import getDynamicBanners from '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners';
import Consumer from 'fusion:consumer';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock(
    '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners',
    () => jest.fn()
);

describe('Componentes - Chains - LN10_Caja_WebStories', () => {
    getDynamicBanners.mockReturnValue({
        bannerMob: <div class="bannerMob"></div>
    });
    const { container } = render(
        <CajaWebStories
            id={'fhjksa7128jsk'}
            customFields={{ hideCaja: false }}
            renderables={[
                {
                    collection: 'sections',
                    children: [
                        {
                            type: 'LN10_Caja_Manual',
                            children: [],
                            props: {
                                id: '1'
                            }
                        },
                        {
                            type: 'LN10_Caja_WebStories',
                            children: [],
                            props: {
                                id: '2'
                            }
                        }
                    ]
                }
            ]}
            children={[{ children: [] }]}
        />
    );

    it('should match snapshot', () => {
        expect(container).toMatchSnapshot();
    });

    it('should have dynamic banners mobile', () => {
        expect(container.querySelector('div.banner')).toBeDefined();
    });

    it('should have data-... attributes', () => {
        expect(
            container.querySelector('data-module="tema_webstories')
        ).toBeDefined();
        expect(
            container.querySelector('div[data-block-name="n_webstories"]')
        ).toBeDefined();
        expect(
            container.querySelector('section[data-diagramacion-id="0"]')
        ).toBeDefined();
        expect(
            container.querySelector('section[data-is-block="true"]')
        ).toBeDefined();
    });

    it('should not show chain if hideCaja is true', () => {
        const { container } = render(
            <CajaWebStories
                id={'fhjksa7128jsk'}
                customFields={{ hideCaja: true }}
                renderables={[
                    {
                        collection: 'sections',
                        children: [
                            {
                                type: 'LN10_Caja_Manual',
                                children: [],
                                props: {
                                    id: '1'
                                }
                            },
                            {
                                type: 'LN10_Caja_WebStories',
                                children: [],
                                props: {
                                    id: '2'
                                }
                            }
                        ]
                    }
                ]}
                children={[{ children: [] }]}
            />
        );
        expect(
            container.querySelector('data-module="tema_webstories')
        ).toBeNull();
    });
});
