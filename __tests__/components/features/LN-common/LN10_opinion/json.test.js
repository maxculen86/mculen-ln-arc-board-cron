import * as fusionConsumer from 'fusion:consumer';
import * as LN10Opinion from '../../../../../components/features/LN-common/LN10_opinion/json';
import articles from '../../../../../__mocks__/data/acuArticlesSourcebyIds/articleswithIncudeFields3Notes.json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        const newComponent = component;
        // Mock fetchContent
        newComponent.prototype.fetchContent = jest.fn();
        return newComponent;
    };
});

jest.mock(
    '../../../../../components/private/LN/api/global/components/features/opinion/LN10/getOpinionCollection',
    component => {
        return {
            __esModule: true,
            default: (props, typeChain) => {
                return this;
            }
        };
    }
);

jest.mock(
    '../../../../../components/features/LN-common/LN10_opinion/_helper-WebApi.js',
    () => {
        return {
            __esModule: true,

            validateFeatureOpinion: params => {
                if (params.layout === 'error') {
                    return { message: 'error lalala' };
                }
                return null;
            }
        };
    }
);

jest.mock('../../../../../components/private/common/utils/get.js', () => {
    return {
        __esModule: true,
        default: (element, key, defaultValue) => {
            if (element[key]) {
                return element[key];
            }

            return null;
        }
    };
});

describe('components - features - LN-common - LN10_Opinion - json.js', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        contextPath: '/pf',
        isAdmin: false,
        layout: 'LN10-Home_Main',
        outputType: 'json',
        requestUri: '/homepage-LN10/?_website=la-nacion-ar&outputType=json',
        siteProperties: {},
        key: 3,
        collection: 'features',
        type: 'LN-common/LN10_opinion',
        id: 'f0fmW4FQNhmg6iv',
        name: null,
        customFields: {
            idCollectionOpinion: 'VVPBSCDUKVCX3ILAF6752UK5PU',
            idCollectionEditorial: 'KPYCGTLLQJBM5FIWYYES4RIDNI',
            idCollection: '',
            layout: 'opinion4',
            initialPosition: 1,
            url: '',
            imageId: '',
            title: 'Opinion',
            hideTitle: false,
            navigator: ''
        }
    };
    const articlesOpinon = [
        {
            information: {
                idCollectionOpinion: 'VVPBSCDUKVCX3ILAF6752UK5PU',
                idCollectionEditorial: 'KPYCGTLLQJBM5FIWYYES4RIDNI'
            },
            articles: []
        },
        { _id: 'AA' },
        { _id: 'BB' },
        { _id: 'CC' },
        { _id: 'DD' }
    ];
    describe('LN10_Opinion Check props', () => {
        it('When load props Ok', () => {
            const objOpinion = new LN10Opinion.default(props);
            expect(Object.keys(objOpinion).sort()).toEqual(['validate'].sort());
        });
        it('When  load props null', () => {
            const objOpinion = new LN10Opinion.default(null);
            expect(Object.keys(objOpinion).sort()).toEqual(['validate'].sort());
        });
    });

    describe('LN10_Opinion Check render', () => {
        it('When results is Ok', () => {
            const objOpinion = new LN10Opinion.default(props);
            objOpinion.props = props;
            objOpinion.state = {};
            objOpinion.state.articleListOpinion = articles;
            objOpinion.state.articleListEditorial = articles;
            objOpinion.state.containerImageOpinion = null;
            objOpinion.renderResponse = jest
                .fn()
                .mockImplementation(
                    (
                        props,
                        articlesOpinion,
                        articlesEditorial,
                        containerImageOpinion
                    ) => {
                        return {
                            information: { ...props.customFields },
                            articles: articlesOpinon
                        };
                    }
                );

            const result = objOpinion.render();
            expect(Object.keys(result.information).sort()).toEqual(
                Object.keys(props.customFields).sort()
            );
            expect(result.articles).toHaveLength(5);
        });

        it('When fetch articlesOpinion and articlesEditorial is null', () => {
            const objOpinion = new LN10Opinion.default(props);
            objOpinion.props = props;
            objOpinion.state = {};
            objOpinion.state.articleListOpinion = null;
            objOpinion.state.articleListEditorial = null;
            objOpinion.state.containerImageOpinion = null;
            const result = objOpinion.render();
            expect(result).toBeNull();
        });
        it('When validate is Error', () => {
            const newProps = Object.assign({}, props);
            const customFields = Object.assign({}, props.customFields);
            customFields.layout = 'error';
            newProps.customFields = customFields;

            const objOpinion = new LN10Opinion.default(newProps);

            objOpinion.props = newProps;
            objOpinion.state = {};
            objOpinion.state.articleListOpinion = articles;
            objOpinion.state.articleListEditorial = articles;
            objOpinion.state.containerImageOpinion = null;
            const result = objOpinion.render();
            expect(result).toBeNull();
        });

        it('When  is throw Error', () => {
            const objOpinion = new LN10Opinion.default(props);

            objOpinion.props = props;
            objOpinion.state = {};
            objOpinion.state.articleListOpinion = articles;
            objOpinion.state.articleListEditorial = articles;
            objOpinion.state.containerImageOpinion = null;
            objOpinion.renderResponse = jest
                .fn()
                .mockImplementation(
                    (
                        props,
                        articlesOpinion,
                        articlesEditorial,
                        containerImageOpinion
                    ) => {
                        throw new Error('Error');
                    }
                );

            const result = objOpinion.render();
            expect(result.Message).toBe('Error');
            expect(result.Success).toBe(false);
        });
    });
});
