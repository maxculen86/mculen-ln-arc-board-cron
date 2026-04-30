import React from 'react';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import Context from 'fusion:context';
import BuildBody from '../../../../../../components/features/LN-nota/body/_children/_buildBody';
import content_elements from '../../../../../../__mocks__/data/nota/body/contentElements.json';
import siteProperties from '../../../../../../__mocks__/data/nota/body/siteProperties.json';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as utils from '../../../../../../components/features/LN-nota/body/_utils/_embedHelper';
import { transformElementText } from '../../../../../../content/sources/utils/articleSourceNota/_configs';

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

useContent.mockImplementation(() => {});

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
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

const transformTextElements = elements =>
    elements.map(element => {
        if (element?.type === 'text') {
            return transformElementText({
                element,
                withSponsoredLink: false,
                articlePath: element?.website_url || '',
                baseOrigin: siteProperties?.host || ''
            });
        }
        return element;
    });

const globalContent = {
    content_elements: transformTextElements(content_elements),
    headlines: { basic: 'titulo de la nota' }
};

const deployment = deploymentValue => deploymentValue;

Context.useAppContext = jest.fn(() => ({
    globalContent,
    siteProperties,
    deployment
}));

describe('BuildBody', () => {
    window.dataLayer = [];

    const banners = [
        { desktop: 'middle_1_dsk', position: 3, sticky: true },
        { desktop: 'middle_2_dsk', position: 6 },
        { mobile: 'caja1_mob', position: 1 },
        { mobile: 'caja2_mob', position: 4, background: true },
        { mobile: 'caja3_mob', position: 7 },
        { mobile: 'caja4_mob', position: 9 },
        { mobile: 'caja5_mob', position: 11 }
    ];

    it('should render all body elements for default', () => {
        const { container } = render(
            BuildBody({
                banners,
                outputType: 'default',
                globalContent
            })
        );
        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
        /* paragraph */
        expect(container.querySelector(`p`).getAttribute('class')).toEqual(
            'com-paragraph --capital --s'
        );
        expect(
            container.querySelectorAll(`p[class*="com-paragraph"]`)
        ).toHaveLength(55);
        /* blockquote */
        const blockquoteDiv = screen.getByText('Esto es un destacado');
        expect(blockquoteDiv).toBeInTheDocument();
        /* pullquote */
        const pullquoteDiv = screen.getByText('Esto es una cita');
        expect(pullquoteDiv).toBeInTheDocument();
        /* interstitial */
        const interstitial = screen.getByText(
            'Dólar blue hoy: a cuánto cotiza el lunes 8 de junio'
        );
        expect(interstitial).toBeInTheDocument();
        /* order and unorder list */
        expect(
            container.querySelectorAll(`ul[class*="com-ordered"]`)
        ).toHaveLength(2);
        expect(
            container.querySelectorAll(`ul[class*="com-unordered"]`)
        ).toHaveLength(4);
        expect(
            container.querySelectorAll(`ol[class*="com-ordered"]`)
        ).toHaveLength(1);
        /* subtitles */
        expect(
            container.querySelectorAll(
                `h2[class*="com-title --font-primary --xl --font-extra"]`
            )
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(
                `h3[class*="com-title --font-primary --l --font-medium"]`
            )
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(
                `h4[class*="com-title --font-primary --m --font-extra"]`
            )
        ).toHaveLength(1);
        /* oembed_response */
        expect(
            container.querySelectorAll(`div[class*="com-embed --facebook"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --instagram"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --spotify"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --twitter"]`)
        ).toHaveLength(3);
        expect(
            container.querySelectorAll(`div[class*="com-embed --youtube"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --dailymotion"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --tiktok"]`)
        ).toHaveLength(1);
        expect(container.querySelectorAll(`div[class*="slide"]`)).toHaveLength(
            3
        );
        /* image */
        expect(
            container.querySelectorAll(`img[class*="com-image"]`)
        ).toHaveLength(13);
        /* raw_html */
        expect(
            container.querySelectorAll(`div[class*="com-embed"]`)
        ).toHaveLength(17);
        /* banner */
        expect(
            container.querySelectorAll(`div[class*="ln-banner"]`)
        ).toHaveLength(14);
        /* powerup receta */
        expect(
            container.querySelectorAll(`div[class*="--ingredients"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="--preparation"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`table[class*="table"]`)
        ).toHaveLength(1);
        /* divider */
        expect(
            container.querySelectorAll(`div[class*="divider"]`)
        ).toHaveLength(1);
    });

    it('should render only allowed body elements for FOTO al 100', () => {
        const { container } = render(
            BuildBody({
                banners,
                outputType: 'default',
                globalContent: {
                    ...globalContent,
                    subtype: '8'
                }
            })
        );
        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
        /* paragraph */
        expect(
            container.querySelectorAll(`p[class*="com-paragraph"]`)
        ).toHaveLength(55);
        /* order and unorder list */
        expect(
            container.querySelectorAll(`ul[class*="com-ordered"]`)
        ).toHaveLength(2);
        expect(
            container.querySelectorAll(`ul[class*="com-unordered"]`)
        ).toHaveLength(4);
        expect(
            container.querySelectorAll(`ol[class*="com-ordered"]`)
        ).toHaveLength(1);
        /* subtitles */
        expect(
            container.querySelectorAll(
                `h2[class*="com-title --font-primary --xl --font-extra"]`
            )
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(
                `h3[class*="com-title --font-primary --l --font-extra"]`
            )
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(
                `h4[class*="com-title --font-primary --m --font-extra"]`
            )
        ).toHaveLength(1);
        /* oembed_response */
        expect(
            container.querySelectorAll(`div[class*="com-embed --facebook"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --instagram"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --spotify"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --twitter"]`)
        ).toHaveLength(3);
        expect(
            container.querySelectorAll(`div[class*="com-embed --youtube"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --dailymotion"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --tiktok"]`)
        ).toHaveLength(1);
        /* interstitial */
        const interstitial = screen.getByText(
            'Dólar blue hoy: a cuánto cotiza el lunes 8 de junio'
        );
        expect(interstitial).toBeInTheDocument();
        /* gallery */
        expect(container.querySelectorAll(`div[class*="slide"]`)).toHaveLength(
            3
        );
        /* image */
        expect(
            container.querySelectorAll(`img[class*="com-image"]`)
        ).toHaveLength(13);
        /* video */
        expect(
            container.querySelectorAll(`div[class*="mod-video"]`)
        ).toHaveLength(0);
        /* blockquote */
        const blockquoteDiv = screen.getByText('Esto es un destacado');
        expect(blockquoteDiv).toBeInTheDocument();
        /* pullquote */
        const pullquoteDiv = screen.getByText('Esto es una cita');
        expect(pullquoteDiv).toBeInTheDocument();
        /* raw_html */
        expect(
            container.querySelectorAll(`div[class*="com-embed"]`)
        ).toHaveLength(17);
        /* banner */
        expect(
            container.querySelectorAll(`div[class*="ln-banner"]`)
        ).toHaveLength(14);
        /* powerup receta */
        expect(
            container.querySelectorAll(`div[class*="--ingredients"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="--preparation"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`table[class*="table"]`)
        ).toHaveLength(1);
        /* divider */
        expect(
            container.querySelectorAll(`div[class*="divider"]`)
        ).toHaveLength(1);
        expect(container).toMatchSnapshot();
    });

    it('should execute function to transform oembedScript', () => {
        jest.spyOn(utils, 'transformEmbedScript').mockImplementation(() =>
            jest.fn()
        );

        render(
            BuildBody({
                banners,
                outputType: 'default',
                globalContent
            })
        );

        expect(utils.transformEmbedScript).toBeCalledTimes(13);
    });
});
