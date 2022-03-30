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

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
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

const globalContent = {
    content_elements,
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
        { desktop: 'caja1_amp', position: 3 },
        { desktop: 'caja2_amp', position: 5 },
        { mobile: 'caja1_mob', position: 1 },
        { mobile: 'caja2_mob', position: 4, background: true },
        { mobile: 'caja3_mob', position: 7 },
        { mobile: 'caja4_mob', position: 9 },
        { mobile: 'caja5_mob', position: 11 }
    ];

    it('deberia renderizar todos los elementos del cuerpo para default', () => {
        const { container, getAllByText, getByText } = render(
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
            'com-paragraph  --capital --s'
        );
        expect(
            container.querySelectorAll(`p[class*="com-paragraph"]`)
        ).toHaveLength(57);
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
            container.querySelectorAll(`h2[class*="com-title --l"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`h3[class*="com-title --m"]`)
        ).toHaveLength(3);
        expect(
            container.querySelectorAll(`h4[class*="com-title --twoxs --arial"]`)
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
        /* interstitial_link */
        expect(
            container.querySelectorAll(`div[class*="com-container --button"]`)
        ).toHaveLength(1);
        //expect(getAllByText('Dólar blue hoy: a cuánto cotiza el lunes 8 de junio')).toHaveLength(1);
        /* gallery */
        expect(container.querySelectorAll(`div[class*="slide"]`)).toHaveLength(
            3
        );
        expect(container.querySelectorAll(`amp-carousel`)).toHaveLength(0);
        /* image */
        expect(
            container.querySelectorAll(`img[class*="com-image"]`)
        ).toHaveLength(13);
        expect(container.querySelectorAll(`amp-img`)).toHaveLength(0);
        /* video */
        expect(
            container.querySelectorAll(`div[class*="mod-video"]`)
        ).toHaveLength(2);
        /* blockquiote */
        expect(
            container.querySelectorAll(`blockquote[class*="mod-paragraph"]`)
        ).toHaveLength(2);
        /* pullquote */
        expect(
            container.querySelectorAll(`section[class*="com-cita autor"]`)
        ).toHaveLength(1);
        /* raw_html */
        expect(
            container.querySelectorAll(`div[class*="com-embed"]`)
        ).toHaveLength(17);
        /* banner */
        expect(
            container.querySelectorAll(`div[class*="mod-banner"]`)
        ).toHaveLength(9);
        /* powerup receta */
        expect(
            container.querySelectorAll(`div[class*="--ingredients"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="--preparation"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="--nutrition"]`)
        ).toHaveLength(1);
        /* divider */
        expect(
            container.querySelectorAll(`div[class*="divider"]`)
        ).toHaveLength(1);

        expect(container.firstChild).toMatchSnapshot(`<p 
        class="com-paragraph  --capital --s"
      >
        Lorem ipsum dolor sit amet consectetur adipiscing elit nostra sapien sociosqu, facilisis mattis imperdiet suscipit sodales pharetra posuere penatibus turpis, fusce viverra metus euismod 
        <strong>
          egestas natoque primis bibendum accumsan
        </strong>
        . Class 
        <em>
          cursus tristique
        </em>
         parturient 
        <u>
          himenaeos pharetra litora ut natoque
        </u>
         mauris, lacus feugiat nibh pulvinar nostra vestibulum turpis urna, netus nullam rhoncus dictumst viverra tincidunt in enim. Euismod phasellus nascetur duis eget molestie curabitur aliquet ornare, 
        <em>
          <strong>
            natoque interdum magna
          </strong>
        </em>
         suscipit dictum
        <em>
          <u>
             potenti cum ullamcorper
          </u>
        </em>
        , vestibulum 
        <em>
          <u>
            <strong>
              arcu gravida tincidunt aenean at sollicitudin
            </strong>
          </u>
        </em>
        .
      </p>`);
    });

    it('deberia renderizar todos los elementos del cuerpo para AMP', () => {
        const { container, getAllByText, getByText } = render(
            BuildBody({
                banners,
                outputType: 'amp',
                globalContent
            })
        );

        expect(container).toBeTruthy();
        expect(container).toMatchSnapshot();
        /* paragraph */
        expect(container.querySelector(`p`).getAttribute('class')).toEqual(
            'com-paragraph  --capital --s'
        );
        expect(
            container.querySelectorAll(`p[class*="com-paragraph"]`)
        ).toHaveLength(57);
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
            container.querySelectorAll(`h2[class*="com-title --l"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`h3[class*="com-title --m"]`)
        ).toHaveLength(3);
        expect(
            container.querySelectorAll(`h4[class*="com-title --twoxs --arial"]`)
        ).toHaveLength(1);
        /* oembed_response */
        expect(container.querySelectorAll(`amp-facebook`)).toHaveLength(1);
        expect(container.querySelectorAll(`amp-instagram`)).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="com-embed --spotify"]`)
        ).toHaveLength(1);
        //expect(container.querySelectorAll(`div[class*="com-embed --twitter"]`)).toHaveLength(3);
        expect(container.querySelectorAll(`amp-twitter`)).toHaveLength(3);
        expect(container.querySelectorAll(`amp-youtube`)).toHaveLength(1);
        expect(container.querySelectorAll(`amp-dailymotion`)).toHaveLength(1);
        expect(container.querySelectorAll(`amp-iframe`)).toHaveLength(4);
        expect(
            container.querySelectorAll(`div[class*="com-embed --tiktok"]`)
        ).toHaveLength(1);
        /* interstitial_link */
        expect(
            container.querySelectorAll(`div[class*="com-container --button"]`)
        ).toHaveLength(1);
        //expect(getAllByText('Dólar blue hoy: a cuánto cotiza el lunes 8 de junio')).toHaveLength(1);
        /* gallery */
        expect(container.querySelectorAll(`amp-carousel`)).toHaveLength(3);
        expect(container.querySelectorAll(`div[class*="slide"]`)).toHaveLength(
            0
        );
        /* image */
        expect(container.querySelectorAll(`amp-img`)).toHaveLength(18);
        expect(
            container.querySelectorAll(`img[class*="com-image"]`)
        ).toHaveLength(0);
        /* video */
        expect(
            container.querySelectorAll(`div[class*="mod-video"]`)
        ).toHaveLength(2);
        /* blockquiote */
        expect(
            container.querySelectorAll(`blockquote[class*="mod-paragraph"]`)
        ).toHaveLength(2);
        /* pullquote */
        expect(
            container.querySelectorAll(`section[class*="com-cita autor"]`)
        ).toHaveLength(1);
        /* raw_html */
        expect(
            container.querySelectorAll(`div[class*="com-embed"]`)
        ).toHaveLength(11);
        /*powerup receta */
        expect(
            container.querySelectorAll(`div[class*="--ingredients"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="--preparation"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`div[class*="--nutrition"]`)
        ).toHaveLength(1);
        /* divider */
        expect(
            container.querySelectorAll(`div[class*="divider"]`)
        ).toHaveLength(1);
    });

    it('deberia renderizar solo los elementos del cuerpo permitidos para FOTO al 100', () => {
        const { container, getAllByText, getByText } = render(
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
        ).toHaveLength(2);
        expect(
            container.querySelectorAll(`ol[class*="com-ordered"]`)
        ).toHaveLength(0);
        /* subtitles */
        expect(
            container.querySelectorAll(`h2[class*="com-title --l"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`h3[class*="com-title --m"]`)
        ).toHaveLength(1);
        expect(
            container.querySelectorAll(`h4[class*="com-title --twoxs --arial"]`)
        ).toHaveLength(1);
        /* oembed_response */
        expect(
            container.querySelectorAll(`div[class*="com-embed --facebook"]`)
        ).toHaveLength(0);
        expect(
            container.querySelectorAll(`div[class*="com-embed --instagram"]`)
        ).toHaveLength(0);
        expect(
            container.querySelectorAll(`div[class*="com-embed --spotify"]`)
        ).toHaveLength(0);
        expect(
            container.querySelectorAll(`div[class*="com-embed --twitter"]`)
        ).toHaveLength(0);
        expect(
            container.querySelectorAll(`div[class*="com-embed --youtube"]`)
        ).toHaveLength(0);
        expect(
            container.querySelectorAll(`div[class*="com-embed --dailymotion"]`)
        ).toHaveLength(0);
        expect(
            container.querySelectorAll(`div[class*="com-embed --tiktok"]`)
        ).toHaveLength(0);
        /* interstitial_link */
        expect(
            container.querySelectorAll(`div[class*="com-container --button"]`)
        ).toHaveLength(1);
        //expect(getAllByText('Dólar blue hoy: a cuánto cotiza el lunes 8 de junio')).toHaveLength(1);
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
        /* blockquiote no renderiza porque no matchea subtype en las rules */
        expect(
            container.querySelectorAll(`blockquote[class*="mod-paragraph"]`)
        ).toHaveLength(0);
        /* pullquote no renderiza porque no matchea subtype en las rules */
        expect(
            container.querySelectorAll(`section[class*="com-cita autor"]`)
        ).toHaveLength(0);
        /* raw_html */
        expect(
            container.querySelectorAll(`div[class*="com-embed"]`)
        ).toHaveLength(0);
        /* banner */
        expect(
            container.querySelectorAll(`div[class*="mod-banner"]`)
        ).toHaveLength(9);
        /* powerup receta no renderiza porque no matchea subtype en las rules */
        expect(
            container.querySelectorAll(`div[class*="--ingredients"]`)
        ).toHaveLength(0);
        expect(
            container.querySelectorAll(`div[class*="--preparation"]`)
        ).toHaveLength(0);
        expect(
            container.querySelectorAll(`div[class*="--nutrition"]`)
        ).toHaveLength(0);
        /* divider */
        expect(
            container.querySelectorAll(`div[class*="divider"]`)
        ).toHaveLength(1);
    });
});
