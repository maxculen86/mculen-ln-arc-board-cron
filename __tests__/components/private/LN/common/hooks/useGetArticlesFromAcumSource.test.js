import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import useGetArticlesFromAcumSource from '../../../../../../components/private/LN/common/hooks/useGetArticlesFromAcumSource';
import articleListUrlNacion from '../../../../../../__mocks__/data/useGetArticlesFromAcumSource/articleListUrlNacion.json';
import articleListUrlResizer from '../../../../../../__mocks__/data/useGetArticlesFromAcumSource/articleListUrlResizer.json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
describe('Component - Private - LN - common - hooks - useGridArticles', () => {
    const globalContent = {
        _id: '/tema'
    };
    it('should return first article with urlNacion', () => {
        useContent.mockImplementation(data =>
            data.query.excludePreload
                ? articleListUrlResizer
                : articleListUrlNacion
        );
        Context.useAppContext = jest.fn(() => ({
            globalContent
        }));
        const { articles, moreArticles } = useGetArticlesFromAcumSource({
            typesOfQuery: {
                sectionId: null,
                authorId: null,
                tagId: 'aceto-balsamico-tid47121'
            },
            filter:
                '\n{\n    type\n    content_elements {\n        _id\n        subtype\n        promo_items {\n            basic {\n                \n    type\n    resized_urls {\n        \n    width\n    height\n    resizedUrl\n    option {\n        width\n        height\n        media\n        class\n        type\n        media_preload\n    }\n\n    }\n    url\n    subtitle\n    width\n    height\n\n            }\n        }\n        taxonomy {\n            tags {\n                text\n                slug\n            }\n            primary_section {\n                _id\n                name\n                path\n                additional_properties {\n                    original {\n                        style {\n                            section_style_name\n                        }\n                    }\n\n                }\n            }\n        }\n        content_restrictions {\n            content_code\n        }\n        credits {\n            by {\n                name\n                type\n                image {\n                    url\n                    resized_urls {\n                        \n    width\n    height\n    resizedUrl\n    option {\n        width\n        height\n        media\n        class\n        type\n        media_preload\n    }\n\n                    }\n                }\n                additional_properties {\n                    original {\n                        image\n                    }\n                }\n            }\n        }\n        headlines {\n            basic\n            mobile\n        }\n        subheadlines {\n            basic\n        }\n        content_elements {\n            type\n            content\n        }\n        display_date\n        publish_date\n        website_url\n        display_date\n        website_url\n        marquesina\n        label  {\n            recomendar {\n                text\n            }\n            volanta {\n                text\n                display\n            }\n            chapita {\n                text\n                display\n            }\n        }\n        related_content {\n            basic{\n                _id\n                type\n                referent {\n                    type\n                }\n            }\n        }\n    }\n    next\n}',
            imageConfig: 'boxArticles',
            size: 30,
            staticMode: false,
            withPagination: true,
            page: 1,
            hasCollectionApertura: null,
            sourceOrigin: '',
            excludePreload: false
        });
        expect(articles[0].promo_items.basic.url).toContain(
            'https://www.lanacion.com.ar'
        );
        articles.shift();
        articles.forEach(article => {
            expect(article.promo_items.basic.url).toContain(
                'https://resizer.glanacion.com'
            );
        });
    });
    it('should return all article with urlResizer', () => {
        useContent.mockImplementation(data =>
            data.query.excludePreload
                ? articleListUrlResizer
                : articleListUrlNacion
        );
        Context.useAppContext = jest.fn(() => ({
            globalContent
        }));
        const { articles, moreArticles } = useGetArticlesFromAcumSource({
            typesOfQuery: {
                sectionId: null,
                authorId: null,
                tagId: 'aceto-balsamico-tid47121'
            },
            filter:
                '\n{\n    type\n    content_elements {\n        _id\n        subtype\n        promo_items {\n            basic {\n                \n    type\n    resized_urls {\n        \n    width\n    height\n    resizedUrl\n    option {\n        width\n        height\n        media\n        class\n        type\n        media_preload\n    }\n\n    }\n    url\n    subtitle\n    width\n    height\n\n            }\n        }\n        taxonomy {\n            tags {\n                text\n                slug\n            }\n            primary_section {\n                _id\n                name\n                path\n                additional_properties {\n                    original {\n                        style {\n                            section_style_name\n                        }\n                    }\n\n                }\n            }\n        }\n        content_restrictions {\n            content_code\n        }\n        credits {\n            by {\n                name\n                type\n                image {\n                    url\n                    resized_urls {\n                        \n    width\n    height\n    resizedUrl\n    option {\n        width\n        height\n        media\n        class\n        type\n        media_preload\n    }\n\n                    }\n                }\n                additional_properties {\n                    original {\n                        image\n                    }\n                }\n            }\n        }\n        headlines {\n            basic\n            mobile\n        }\n        subheadlines {\n            basic\n        }\n        content_elements {\n            type\n            content\n        }\n        display_date\n        publish_date\n        website_url\n        display_date\n        website_url\n        marquesina\n        label  {\n            recomendar {\n                text\n            }\n            volanta {\n                text\n                display\n            }\n            chapita {\n                text\n                display\n            }\n        }\n        related_content {\n            basic{\n                _id\n                type\n                referent {\n                    type\n                }\n            }\n        }\n    }\n    next\n}',
            imageConfig: 'boxArticles',
            size: 30,
            staticMode: false,
            withPagination: true,
            page: 1,
            hasCollectionApertura: null,
            sourceOrigin: '',
            excludePreload: true
        });
        articles.forEach(article => {
            expect(article.promo_items.basic.url).toContain(
                'https://resizer.glanacion.com'
            );
        });
    });
});
