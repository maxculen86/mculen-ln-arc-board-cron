import React from 'react';
import { render, mount } from 'enzyme';
import SnippetLiveblog from '../../../../../../components/private/LN/nota/snippet/liveblog';
import article from '../../../../../../__mocks__/data/articles/YODTB72QWJCR7AAC3AHCCV46CM';
import {
    addMinutes,
    differenceInMinutes,
    formatDateTreeHoursMore
} from '../../../../../../components/private/common/utils/dateAndTimeUtil';

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
                headlines: { basic: title },
                credits: { by },
                first_publish_date: firstPublishDate,
                last_updated_date: lastUpdatedDate
            },
            contextPath,
            deployment
        } = props;

        const {
            '@context': context,
            '@type': type,
            name,
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
        expect(name).toBe(title);
        expect(url).toBe(`${host}${canonical_url}`);
        expect(coverageStartTime).toBe(
            formatDateTreeHoursMore(new Date(firstPublishDate)).toISOString()
        );
        expect(coverageEndTime).toBe(
            formatDateTreeHoursMore(new Date(lastUpdatedDate)).toISOString()
        );
        //expect(mainEntityOfPage).toBe(`${host}${path}/`);
        //expect(author).toStrictEqual(['Redacción LA NACION']);
        expect(publisherType).toBe('Organization');
        expect(publisherName).toBe('');
        expect(publisherUrl).toBe(host);
        expect(logoContext).toBe('https://schema.org');
        expect(logoType).toBe('ImageObject');
        expect(logoUrl).toBe(
            'https://arc-static.glanacion.com/resources/images/placeholderLN.jpg$LATEST'
        );
        expect(height).toBe(41);
        expect(width).toBe(391);
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
        const newDate = addMinutes(
            new Date(props.globalContent.first_publish_date),
            minutes1
        );
        expect(newDate.toISOString()).toEqual('2020-06-25T19:41:44.527Z');
    });

    it('Difference in minutes between last_updated_date and first_publish_date in Liveblog', () => {
        const minutes = differenceInMinutes(
            props.globalContent.first_publish_date,
            props.globalContent.last_updated_date
        );

        expect(minutes).toEqual(60);
    });
});
