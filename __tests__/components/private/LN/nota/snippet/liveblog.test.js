import React from 'react';
import { render, mount } from 'enzyme';
import SnippetLiveblog from '../../../../../../components/private/LN/nota/snippet/liveblog';
import article from '../../../../../../__mocks__/data/articles/YODTB72QWJCR7AAC3AHCCV46CM';
import {
    restMinutes,
    differenceInMinutes,
    formatDateTreeHoursMore,
    addHours
} from '../../../../../../components/private/common/utils/dateAndTimeUtil';
import {
    generatePostObject,
    generatePostObjectWithoutPowerUp
} from '../../../../../../components/private/common/utils/schema/liveBlog/generatePostObject';
import articleWithLiveBlogPowerUp from '../../../../../../__mocks__/data/articles/6IDQHDUT6RB6XEHG2F424TMNXI.json';
jest.mock('fusion:environment', () => {
    return {
        IS_SANDBOX: 'true',
        API_ENV: 'sandbox',
        LANACIONAR_URLASSETS:
            'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com',
        SITE_LANACION:
            'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com',
        ARC_STATIC: 'https://arc-static.glanacion.com'
    };
});

describe('Private - LN - nota - snippet - liveblog ', () => {
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
    const component = mount(<SnippetLiveblog {...props} />);

    it('<SnippetLiveblog/> definido', () => {
        const component = render(<SnippetLiveblog {...props} />);
        expect(component).toBeDefined();
        expect(component.find('script')).toBeDefined();
    });

    it('Validar props enviadas', () => {
        expect(component.props()).toEqual(props);
    });

    it('Validar squema NewsArticle', () => {
        expect(component.find('script').props().id).toBe('Schema_LiveBlog');
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
            siteProperties: { host },
            globalContent: {
                canonical_url,
                headlines: { basic: title, meta_title: metaTitle },
                credits: { by },
                first_publish_date: firstPublishDate,
                display_date: displayDate
            },
            contextPath,
            deployment
        } = props;

        const {
            '@context': context,
            '@type': type,
            headline,
            url,
            coverageStartTime,
            coverageEndTime,
            mainEntityOfPage,
            author,
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
            liveBlogUpdate
        } = JSON.parse(data);

        expect(context).toBe('https://schema.org');
        expect(type).toBe('LiveBlogPosting');
        expect(headline).toBe(metaTitle);
        expect(url).toBe(`${host}${canonical_url}`);
        expect(coverageStartTime).toBe(
            new Date(firstPublishDate).toISOString()
        );
        expect(coverageEndTime).toBe(addHours(12, displayDate).toISOString());
        //expect(mainEntityOfPage).toBe(`${host}${path}/`);
        //expect(author).toStrictEqual(['Redacción LA NACION']);
        expect(publisherType).toBe('Organization');
        expect(publisherName).toBe('');
        expect(publisherUrl).toBe(host);
        expect(logoContext).toBe('https://schema.org');
        expect(logoType).toBe('ImageObject');
        expect(logoUrl).toBe(
            'https://arc-static.glanacion.com/resources/images/placeholderLN-600_amp.jpg$LATEST'
        );
        expect(height).toBe(60);
        expect(width).toBe(600);
        // expect(image).toStrictEqual({
        //     '@context': 'https://schema.org',
        //     '@type': 'ImageObject',
        //     height: '564',
        //     url:
        //         'https://arc-static.glanacion.com/resources/images/placeholderLN.jpg$LATEST',
        //     width: '1080'
        // });
    });

    it('Snapshot Snippet Liveblog', () => {
        expect(component.find('script')).toMatchSnapshot();
    });

    it('Add minutes to first_publish_date in Liveblog', () => {
        const minutes1 = 2;
        const newDate = restMinutes(
            new Date(props.globalContent.last_updated_date),
            minutes1
        );
        expect(newDate.toISOString()).toEqual('2020-06-25T20:37:38.448Z');
    });

    it('Difference in minutes between last_updated_date and first_publish_date in Liveblog', () => {
        const minutes = differenceInMinutes(
            props.globalContent.first_publish_date,
            props.globalContent.last_updated_date
        );

        expect(minutes).toEqual(60);
    });
});

describe('Liveblog Snippet with liveblog power up', () => {
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
        globalContent: articleWithLiveBlogPowerUp
    };
    const component = mount(<SnippetLiveblog {...props} />);

    it('Check render of liveblog posting object schema', () => {
        expect(component.find('script')).toMatchSnapshot();
    });
});
