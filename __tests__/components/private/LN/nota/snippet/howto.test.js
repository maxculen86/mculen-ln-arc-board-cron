import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SnippetHowTo from '../../../../../../components/private/LN/nota/snippet/howTo';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com',
    API_ENV: 'sandbox',
    IS_STAGING: 'false'
}));

jest.mock('fusion:properties', () => () => ({
    host: 'https://www.lanacion.com.ar'
}));

describe('Schema HowTo - SnippetHowTo', () => {
    const mainImage = {
        type: 'image',
        url: 'https://sandbox-resizer.glanacion.com/resizer/v2/trucos-infalibles-para-que-la-ropa-H24GG3QQW5HDRGOCO3J47SSIHI.jpg?auth=7a24f315ff0594117de65452390274be7b51170a66ac5b275eef1352935cb7f8&width=880&height=586&quality=70&smart=true',
        resized_urls: [
            {
                resizedUrl:
                    'https://sandbox-resizer.glanacion.com/resizer/v2/trucos-infalibles-para-que-la-ropa-H24GG3QQW5HDRGOCO3J47SSIHI.jpg?auth=7a24f315ff0594117de65452390274be7b51170a66ac5b275eef1352935cb7f8&width=880&height=586&quality=70&smart=true',
                option: {
                    width: 880,
                    height: 586
                }
            }
        ]
    };

    const globalContent = {
        canonical_url: '/autos/nota-de-prueba-para-how-to-nid10092025/',
        headlines: { basic: 'Nota de prueba para How to' },
        subheadlines: { basic: 'Bajada de la nota' },
        content_elements: [
            { type: 'text', content: 'Intro breve' },
            {
                type: 'custom_embed',
                subtype: 'custom-how-to',
                embed: { config: { step: 1, title: 'Acceder a ChatGPT' } }
            },
            {
                type: 'text',
                content:
                    'Se necesita una cuenta en la plataforma de OpenAI con acceso a la función de <i>generación</i> de imágenes.'
            },
            {
                type: 'custom_embed',
                subtype: 'custom-how-to',
                embed: { config: { step: 2, title: 'Describir la escena' } }
            },
            {
                type: 'text',
                content:
                    'Ingresar un prompt detallado marcando el tipo de imagen y la atmósfera.'
            }
        ],
        promo_items: {
            basic: mainImage
        }
    };

    test('Should render the schema script ', () => {
        render(<SnippetHowTo globalContent={globalContent} />);

        const script = document.getElementById('Schema_HowTo');
        expect(script).toBeInTheDocument();
        expect(script).toHaveAttribute('type', 'application/ld+json');
    });

    test('Should validate main schema fields and steps', () => {
        render(<SnippetHowTo globalContent={globalContent} />);
        const script = document.getElementById('Schema_HowTo');
        const json = JSON.parse(script.textContent);

        expect(json['@context']).toBe('https://schema.org');
        expect(json['@type']).toBe('HowTo');
        expect(json.name).toBe('Nota de prueba para How to');
        expect(json.description).toBe('Bajada de la nota');

        expect(json.image).toBeDefined();
        expect(Array.isArray(json.image)).toBe(true);
        expect(json.image).toHaveLength(3);
        expect(json.image[0]['@type']).toBe('ImageObject');

        const firstImageUrl = new URL(json.image[0].url);
        expect(`${firstImageUrl.origin}${firstImageUrl.pathname}`).toBe(
            'https://www.lanacion.com.ar/resizer/v2/trucos-infalibles-para-que-la-ropa-H24GG3QQW5HDRGOCO3J47SSIHI.jpg'
        );
        expect(firstImageUrl.searchParams.get('width')).toBe('1200');
        expect(firstImageUrl.searchParams.get('height')).toBe('675');
        expect(json.image[0].width).toBe(1200);
        expect(json.image[0].height).toBe(675);

        json.image.forEach(imageObject => {
            expect(imageObject.url).not.toContain(
                'sandbox-resizer.glanacion.com'
            );
            expect(imageObject.url).toContain('www.lanacion.com.ar');
        });

        expect(Array.isArray(json.step)).toBe(true);
        expect(json.step).toHaveLength(2);

        expect(json.step[0]['@type']).toBe('HowToStep');
        expect(json.step[0].name).toBe('Acceder a ChatGPT');
        expect(json.step[0].text).toBe(
            'Se necesita una cuenta en la plataforma de OpenAI con acceso a la función de generación de imágenes.'
        );
        expect(json.step[0].url).toBe(
            'https://www.lanacion.com.ar/autos/nota-de-prueba-para-how-to-nid10092025/#step1'
        );

        expect(json.step[1].name).toBe('Describir la escena');
        expect(json.step[1].text).toBe(
            'Ingresar un prompt detallado marcando el tipo de imagen y la atmósfera.'
        );
        expect(json.step[1].url).toBe(
            'https://www.lanacion.com.ar/autos/nota-de-prueba-para-how-to-nid10092025/#step2'
        );
    });

    test('Should not include "step" field in the schema if there are no steps', () => {
        const globalContentWithoutSteps = {
            ...globalContent,
            content_elements: [
                { type: 'text', content: 'Solo texto, sin power-up how-to' }
            ]
        };

        render(<SnippetHowTo globalContent={globalContentWithoutSteps} />);
        const script = document.getElementById('Schema_HowTo');
        const json = JSON.parse(script.textContent);

        expect(json.step).toBeUndefined();
    });

    test('Should not include "description" if there is no subheadline', () => {
        const globalContentWithoutSubheadline = {
            ...globalContent,
            subheadlines: { basic: '' }
        };

        render(
            <SnippetHowTo globalContent={globalContentWithoutSubheadline} />
        );
        const script = document.getElementById('Schema_HowTo');
        const json = JSON.parse(script.textContent);

        expect(json.description).toBeUndefined();
    });

    test('Should render the schema correctly with How to Power Up', () => {
        const { container } = render(
            <SnippetHowTo globalContent={globalContent} />
        );
        const schemaScript = document.getElementById('Schema_HowTo');

        expect(schemaScript).not.toBeNull();
        expect(container).toMatchSnapshot();
    });

    test('Should not include "image" when there is no promo image', () => {
        const globalContentWithoutImage = {
            ...globalContent,
            promo_items: {}
        };

        render(<SnippetHowTo globalContent={globalContentWithoutImage} />);
        const script = document.getElementById('Schema_HowTo');
        const json = JSON.parse(script.textContent);

        expect(json.image).toBeUndefined();
    });
});
