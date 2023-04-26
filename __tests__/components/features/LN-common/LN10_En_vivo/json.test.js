import * as fusionConsumer from 'fusion:consumer';
import * as FeatureLNENVIVO from '../../../../../components/features/LN-common/LN10_En_Vivo/json';
import articles from '../../../../../__mocks__/data/acuArticlesSourcebyIds/articleswithIncudeFields3Notes.json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        const newComponent = component;
        // Mock fetchContent
        newComponent.prototype.fetchContent = jest.fn();
        return newComponent;
    };
});
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

jest.mock(
    '../../../../../components/features/LN-10/article/common/_helper-WebApi.js',
    () => {
        return {
            __esModule: true,
            typeBadge: {
                0: 'POSITIVE',
                1: 'NEGATIVE',
                2: 'LIVE',
                3: 'EXCLUSIVE_LN'
            }
        };
    }
);

describe('components - features - LN-common - LN10_En_Vivo - json.js', () => {
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
        type: 'LN-common/LN10_En_Vivo',
        id: 'f0fmW4FQNhmg6iv',
        name: null,
        customFields: {
            noteId1: 'R6Z45LVDINBSHPNAWBMRVI446Y',
            title1: 'Titulo 1',
            noteId2: 'IIOOB62LINHMRPCMRV7VM3EVCM',
            title2: 'Titulo 2',
            noteId3: 'RBRWKWRQVNCZHHXIVWRNKBII7U',
            title3: 'Titulo 3',
            chapitaStyle: 2,
            chapita: 'Vivo'
        }
    };
    describe('Check props', () => {
        it('When articles load props Ok', () => {
            const objArticle = new FeatureLNENVIVO.default(props);
            expect(objArticle.props).toMatchObject(props);
        });
        it('When article load props null', () => {
            try {
                const objArticle = new FeatureLNENVIVO.default(null);
                expect(objArticle).toBe(null);
            } catch (err) {
                expect(err.message).toBe(
                    `Cannot read property 'customFields' of null`
                );
            }
        });
    });

    describe('Check render', () => {
        it('When results is Ok', () => {
            const objArticle = new FeatureLNENVIVO.default(props);
            objArticle.state.acuArticlesENVIVO = articles;
            const result = objArticle.render();
            expect(Object.keys(result.information).sort()).toEqual(
                ['chapita', 'chapitaStyle', 'hideCaja'].sort()
            );
            expect(result.information).toMatchObject({
                hideCaja: false,
                chapita: 'Vivo',
                chapitaStyle: 'LIVE'
            });

            expect(result.articles).toHaveLength(3);
        });

        it('When fetch articleSourceNota is null', () => {
            try {
                const objArticle = new FeatureLNENVIVO.default(props);
                objArticle.state.acuArticlesENVIVO = null;
                const result = objArticle.render();
                expect(result).toBe(null);
            } catch (err) {
                expect(err.message).toBe(
                    `Cannot read property 'additionalProperties' of null`
                );
            }
        });

        it('When fetch this.state is null', () => {
            const objArticle = new FeatureLNENVIVO.default(props);
            objArticle.state = null;
            const result = objArticle.render();
            expect(result).toBe(null);
        });

        it('When chapita or chapitaStyle is null', () => {
            const newProps = props;
            const customFields = Object.assign({}, props.customFields);
            customFields.chapitaStyle = null;
            customFields.chapita = null;
            newProps.customFields = customFields;
            const objArticle = new FeatureLNENVIVO.default(newProps);
            objArticle.state.acuArticlesENVIVO = articles;

            const result = objArticle.render();

            expect(result.information).toMatchObject({
                hideCaja: false,
                chapita: 'VIVO',
                chapitaStyle: 'LIVE'
            });
        });

        it('When customFields show is true', () => {
            const newProps = props;
            const customFields = Object.assign({}, props.customFields);
            customFields.show = true;
            newProps.customFields = customFields;

            const objArticle = new FeatureLNENVIVO.default(newProps);
            objArticle.state.acuArticlesENVIVO = articles;
            const result = objArticle.render();
            expect(Object.keys(result.information).sort()).toEqual(
                ['chapita', 'chapitaStyle', 'hideCaja'].sort()
            );
            expect(result.information).toMatchObject({
                hideCaja: true,
                chapita: 'VIVO',
                chapitaStyle: 'LIVE'
            });

            expect(result.articles).toHaveLength(3);
        });

        it('When articles is null', () => {
            const objArticle = new FeatureLNENVIVO.default(props);
            objArticle.state.acuArticlesENVIVO = {};
            const result = objArticle.render();
            expect(Object.keys(result.information).sort()).toEqual(
                ['chapita', 'chapitaStyle', 'hideCaja'].sort()
            );
            expect(result.information).toMatchObject({
                hideCaja: true,
                chapita: 'VIVO',
                chapitaStyle: 'LIVE'
            });

            expect(result.articles).toHaveLength(0);
        });
    });
});
