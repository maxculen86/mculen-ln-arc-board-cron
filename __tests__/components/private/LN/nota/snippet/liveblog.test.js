import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SnippetLiveblog from '../../../../../../components/private/LN/nota/snippet/liveblog';
import article from '../../../../../../__mocks__/data/articles/YODTB72QWJCR7AAC3AHCCV46CM.json';
import articleWithLiveBlogPowerUp from '../../../../../../__mocks__/data/articles/noDateArticleWithLiveBlogPowerUp.json';
import {
    restMinutes,
    differenceInMinutes,
    addHours
} from '../../../../../../components/private/common/utils/dateAndTimeUtil';

jest.mock(
    '../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/body/authorBox/hook/useLiveblogAuthors',
    () => ({
        useLiveblogAuthors: () => ({
            authors: [{ name: 'Redacción LA NACION' }],
            shouldShow: true
        })
    })
);

jest.mock('fusion:environment', () => ({
    IS_SANDBOX: 'true',
    API_ENV: 'sandbox',
    LANACIONAR_URLASSETS:
        'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com',
    SITE_LANACION: 'https://www.lanacion.com.ar',
    ARC_STATIC: 'https://arc-static.glanacion.com'
}));

describe('Schema LiveBlogPosting - SnippetLiveblog', () => {
    const baseProps = {
        siteProperties: { host: 'https://www.lanacion.com.ar' },
        deployment: assetPath => `${assetPath}$LATEST`,
        contextPath: '',
        requestUri:
            '/arquitectura/nota-de-prueba-foto-al-100-nid25062020/?_website=la-nacion-ar',
        globalContent: {
            ...article,
            canonical_url: article.canonical_url || '/nota-prueba',
            headlines: article.headlines || {
                basic: 'Título de prueba',
                meta_title: 'Meta título de prueba'
            },
            first_publish_date:
                article.first_publish_date || '2024-03-01T12:00:00Z',
            display_date: article.display_date || '2024-03-01T12:00:00Z'
        }
    };

    test('Should render the <SnippetLiveblog/> component with a script tag', () => {
        render(<SnippetLiveblog {...baseProps} />);
        const scriptTag = document.head.querySelector('script');
        expect(scriptTag).toBeDefined();
    });

    test('Should validate the NewsArticle schema', () => {
        render(<SnippetLiveblog {...baseProps} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');

        expect(schemaScript).toBeInTheDocument();
        expect(schemaScript).toHaveAttribute('type', 'application/ld+json');
    });

    test('Should validate main schema properties', () => {
        render(<SnippetLiveblog {...baseProps} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');
        const jsonData = JSON.parse(schemaScript.textContent);

        const {
            '@context': context,
            '@type': type,
            headline,
            url,
            coverageStartTime,
            coverageEndTime,
            publisher
        } = jsonData;

        const publisherId = publisher['@id'];

        const {
            siteProperties: { host },
            globalContent: {
                canonical_url: canonicalUrl,
                headlines: { meta_title: metaTitle },
                first_publish_date: firstPublishDate,
                display_date: displayDate
            }
        } = baseProps;

        expect(context).toBe('https://schema.org');
        expect(type).toBe('LiveBlogPosting');
        expect(headline).toBe(metaTitle);
        expect(url).toBe(`${host}${canonicalUrl}`);
        expect(coverageStartTime).toBe(
            new Date(firstPublishDate).toISOString()
        );
        expect(coverageEndTime).toBe(addHours(12, displayDate).toISOString());

        expect(publisherId).toBe(`${host}/#organization`);

        expect(jsonData).toMatchSnapshot();
    });

    it('should normalize a trailing slash in the canonical host for schema urls', () => {
        const propsWithTrailingSlashHost = {
            ...baseProps,
            siteProperties: { host: 'https://www.lanacion.com.ar/' }
        };

        render(<SnippetLiveblog {...propsWithTrailingSlashHost} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');
        const jsonData = JSON.parse(schemaScript.textContent);

        expect(jsonData.url).toBe(
            `https://www.lanacion.com.ar${propsWithTrailingSlashHost.globalContent.canonical_url}`
        );
        expect(jsonData.about.organizer.url).toBe(
            'https://www.lanacion.com.ar/'
        );
        expect(jsonData.about.performer.url).toBe(
            'https://www.lanacion.com.ar/'
        );
    });

    it('should use the canonical host source for organizer and performer urls', () => {
        const propsWithSandboxHost = {
            ...baseProps,
            siteProperties: { host: 'https://sandbox.lanacion.com.ar/' }
        };

        render(<SnippetLiveblog {...propsWithSandboxHost} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');
        const jsonData = JSON.parse(schemaScript.textContent);

        expect(jsonData.url).toBe(
            `https://sandbox.lanacion.com.ar${propsWithSandboxHost.globalContent.canonical_url}`
        );
        expect(jsonData.about.organizer.url).toBe(
            'https://sandbox.lanacion.com.ar/'
        );
        expect(jsonData.about.performer.url).toBe(
            'https://sandbox.lanacion.com.ar/'
        );
    });

    test('Add minutes to first_publish_date in Liveblog', () => {
        const minutes1 = 2;
        const newDate = restMinutes(
            new Date(baseProps.globalContent.last_updated_date),
            minutes1
        );
        expect(newDate.toISOString()).toEqual('2020-06-25T20:37:38.448Z');
    });

    test('Difference in minutes between last_updated_date and first_publish_date in Liveblog', () => {
        const minutes = differenceInMinutes(
            baseProps.globalContent.first_publish_date,
            baseProps.globalContent.last_updated_date
        );
        expect(minutes).toEqual(60);
    });

    test('Should use subheadline if present for the description', () => {
        const propsWithSubheadline = {
            ...baseProps,
            globalContent: {
                ...baseProps.globalContent,
                subheadlines: {
                    basic: 'Las imágenes, compartidas por un exejecutivo de la cadena NBC, muestran al líder del Kremlin en una actitud extraña mientras recita un discurso en el marco de una ceremonia de premios'
                }
            }
        };

        render(<SnippetLiveblog {...propsWithSubheadline} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');
        const jsonData = JSON.parse(schemaScript.textContent);

        expect(jsonData.description).toBe(
            'Las imágenes, compartidas por un exejecutivo de la cadena NBC, muestran al líder del Kremlin en una actitud extraña mientras recita un discurso en el marco de una ceremonia de premios'
        );
    });

    test('Should use the location label in the LiveBlog schema when it is present', () => {
        const propsWithLocation = {
            ...baseProps,
            globalContent: {
                ...baseProps.globalContent,
                label: {
                    ...baseProps.globalContent.label,
                    location: {
                        text: 'US | Washington'
                    }
                }
            }
        };

        render(<SnippetLiveblog {...propsWithLocation} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');
        const jsonData = JSON.parse(schemaScript.textContent);

        expect(jsonData.about.location.address.addressRegion).toBe('US');
        expect(jsonData.about.location.address.addressLocality).toBe(
            'Washington'
        );
    });

    test('Should not include location in the LiveBlog schema when the label is empty', () => {
        const propsWithoutLocation = {
            ...baseProps,
            globalContent: {
                ...baseProps.globalContent,
                label: {
                    ...baseProps.globalContent.label,
                    location: {
                        text: ''
                    }
                }
            }
        };

        render(<SnippetLiveblog {...propsWithoutLocation} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');
        const jsonData = JSON.parse(schemaScript.textContent);

        expect(jsonData.about).not.toHaveProperty('location');
    });

    test('Should not include location in the LiveBlog schema when the location label is missing', () => {
        render(<SnippetLiveblog {...baseProps} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');
        const jsonData = JSON.parse(schemaScript.textContent);

        expect(jsonData.about).not.toHaveProperty('location');
    });

    test('Should use the single author fallback headline when the post title is empty', () => {
        const propsWithSingleAuthorHeadline = {
            ...baseProps,
            globalContent: {
                ...baseProps.globalContent,
                headlines: {
                    basic: 'Titulo base',
                    meta_title: 'Meta title base'
                },
                content_elements: [
                    {
                        type: 'custom_embed',
                        subtype: 'custom-liveblog',
                        embed: {
                            config: {
                                date: '2024-01-01',
                                time: '10:00:00',
                                title: '',
                                authors: [{ name: '  Ana Gomez ' }]
                            }
                        }
                    },
                    {
                        type: 'text',
                        content: '<p>Contenido de la actualización</p>'
                    }
                ]
            }
        };

        render(<SnippetLiveblog {...propsWithSingleAuthorHeadline} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');
        const jsonData = JSON.parse(schemaScript.textContent);

        expect(jsonData.liveBlogUpdate).toHaveLength(1);
        expect(jsonData.liveBlogUpdate[0].headline).toBe(
            'Opinión en vivo de Ana Gomez'
        );
    });

    test('Should use the first paragraph if no subheadline is present for the description', () => {
        const propsWithoutSubheadline = {
            ...baseProps,
            globalContent: {
                ...baseProps.globalContent,
                subheadlines: {
                    basic: ''
                },
                content_elements: [
                    {
                        embed: {
                            config: {
                                title: 'Ucrania espera retomar sus exportaciones “esta semana” pese al ataque al puerto de Odesa del sábado',
                                typeList: 'liveblog'
                            }
                        },
                        type: 'custom_embed'
                    },
                    {
                        content:
                            'El último convenio, firmado bajo auspicios de la ONU, prevé “<b>corredores seguros</b>” para que los navíos mercantes puedan transitar por el mar Negro y que se permita la <b>exportación de entre 20 y 25 millones de toneladas</b> <b>de grano</b> bloqueados en Ucrania. También permitirá facilitar los envíos agrícolas rusos y ayudar a mitigar el hambre que, según la ONU, enfrentan 345 millones de personas en el mundo.',
                        type: 'text'
                    },
                    {
                        content: 'Este es el segundo párrafo de prueba',
                        type: 'text'
                    }
                ]
            }
        };

        render(<SnippetLiveblog {...propsWithoutSubheadline} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');
        const jsonData = JSON.parse(schemaScript.textContent);

        expect(jsonData.description).toBe(
            'El último convenio, firmado bajo auspicios de la ONU, prevé “corredores seguros” para que los navíos mercantes puedan transitar por el mar Negro y que se permita la exportación de entre 20 y 25 millones de toneladas de grano bloqueados en Ucrania. También permitirá facilitar los envíos agrícolas rusos y ayudar a mitigar el hambre que, según la ONU, enfrentan 345 millones de personas en el mundo.'
        );
    });
});

describe('Liveblog Snippet with liveblog power up', () => {
    const props = {
        siteProperties: { host: 'https://www.lanacion.com.ar' },
        deployment: assetPath => `${assetPath}$LATEST`,
        contextPath: '',
        requestUri:
            '/arquitectura/nota-de-prueba-foto-al-100-nid25062020/?_website=la-nacion-ar',
        globalContent: articleWithLiveBlogPowerUp
    };

    test('Should render the schema correctly with LiveBlog Power Up', () => {
        const { container } = render(<SnippetLiveblog {...props} />);
        const schemaScript = document.getElementById('Schema_LiveBlog');

        expect(schemaScript).not.toBeNull();
        expect(container).toMatchSnapshot();
    });
});
