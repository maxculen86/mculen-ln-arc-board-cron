import React from 'react';
import { render, mount } from 'enzyme';
import SnippetNoticia from '../../../../../../components/private/LN/nota/snippet/noticia';
import article from '../../../../../../__mocks__/data/articles/YODTB72QWJCR7AAC3AHCCV46CM';
import toJson from 'enzyme-to-json';

jest.mock('fusion:environment', () => {
    return {
        IS_SANDBOX: 'true',
        API_ENV: 'sandbox',
        LANACIONAR_URLASSETS:
            'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com',
        SITE_LANACION:
            'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com'
    };
});

describe('Private - LN - nota - snippet - noticia ', () => {
    const props = {
        siteProperties: {
            host: 'https://www.lanacion.com.ar'
        },
        deployment: props => {
            return `${props}$LATEST`;
        },
        contextPath: '',
        requestUri:
            '/arquitectura/nota-de-prueba-foto-al-100-nid25062020/?_website=la-nacion-ar',
        globalContent: article
    };
    const component = mount(<SnippetNoticia {...props} />);

    it('<SnippetNoticia/> definido', () => {
        const component = render(<SnippetNoticia {...props} />);
        expect(component).toBeDefined();
        expect(component.find('script')).toBeDefined();
    });

    it('Validar props enviadas', () => {
        expect(component.props()).toEqual(props);
    });

    it('Validar squema NewsArticle', () => {
        expect(component.find('script').props().id).toBe('Schema_NewsArticle');
        expect(component.find('script').props().type).toBe(
            'application/ld+json'
        );
    });

    it('Validar valores del squema', () => {
        const {
            dangerouslySetInnerHTML: { __html: data }
        } = component.find('script').props();

        const {
            requestUri,
            siteProperties: { host, titleSite },
            globalContent: {
                canonical_url,
                headlines: { basic: title },
                taxonomy: {
                    primary_section: { path, name },
                    tags
                },
                promo_items: promoItems,
                credits: { by },
                created_date: createdDate,
                first_publish_date: firstPublishDate,
                display_date: displayDate,
                content_restrictions: { content_code: contentCode }
            },
            contextPath,
            deployment
        } = props;

        const {
            '@context': context,
            '@type': type,
            headline,
            url,
            dateCreated,
            datePublished,
            dateModified,
            mainEntityOfPage,
            articleSection,
            isAccessibleForFree,
            hasPart: {
                '@type': hasPartType,
                isAccessibleForFree: hasPartIsAccessibleForFree,
                cssSelector
            },
            isPartOf: { '@type': isPartType, name: isPartOfName, productID },
            author,
            creator,
            keywords,
            publisher: {
                '@type': publisherType,
                name: publisherName,
                url: publisherUrl,
                logo: {
                    '@context': logoContext,
                    '@type': logoType,
                    url: logoUrl,
                    height,
                    width
                }
            },
            thumbnailUrl,
            image
        } = JSON.parse(data);

        expect(context).toBe('https://schema.org');
        expect(type).toBe('NewsArticle');
        expect(headline).toBe(title);
        expect(url).toBe(`${host}${canonical_url}`);
        expect(dateCreated).toBe(`${new Date(createdDate).toUTCString()}`);
        expect(datePublished).toBe(
            `${new Date(firstPublishDate).toUTCString()}`
        );
        expect(dateModified).toBe(`${new Date(displayDate).toUTCString()}`);
        expect(mainEntityOfPage).toBe(`${host}${path}`);
        expect(articleSection).toBe(name);
        expect(isAccessibleForFree).toBe(`${contentCode === 'abierta'}`);
        expect(hasPartType).toBe('WebPageElement');
        expect(hasPartIsAccessibleForFree).toBe(`${contentCode === 'abierta'}`);
        expect(cssSelector).toBe('.nota');
        expect(isPartType).toStrictEqual(['CreativeWork', 'Product']);
        expect(isPartOfName).toBe('Acceso Digital Monthly Test');
        expect(productID).toBe('lanacion.com.ar:acceso_digital');
        expect(author).toStrictEqual(['Redacción LA NACION']);
        expect(creator).toStrictEqual(['Redacción LA NACION']);
        expect(keywords).toStrictEqual([]);
        expect(publisherType).toBe('Organization');
        expect(publisherName).toBe('');
        expect(publisherUrl).toBe(host);
        expect(logoContext).toBe('https://schema.org');
        expect(logoType).toBe('ImageObject');
        expect(logoUrl).toBe(
            'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com/resources/images/logo-ln-amp.png$LATEST'
        );
        expect(height).toBe(41);
        expect(width).toBe(391);
        expect(thumbnailUrl).toBe(
            'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com/resources/images/placeholderLN.jpg$LATEST'
        );
        expect(image).toStrictEqual({
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            height: '564',
            url:
                'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com/resources/images/placeholderLN.jpg$LATEST',
            width: '1080'
        });
    });

    it('Snapshot Snippet Noticia', () => {
        expect(component.find('script')).toMatchSnapshot();
    });
});
