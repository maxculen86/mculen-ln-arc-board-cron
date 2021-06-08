import * as fusionConsumer from 'fusion:consumer';
import * as FeatureArticle from '../../../../../components/features/LN-common/articulo/json';
import article from '../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
                this.state.articleSourceNota = null;
            }
            fetchContent(param) {}
        };
    };
});
describe('components - features - LN-common - articulo - json.js', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        children: [],
        collection: 'features',
        customFields: { noteId: '2KOBND62KNFVVBFQZOADNN6WNY', title: 'Nota1' },
        id: 'f0f9g3fKOoHW25c',
        isAdmin: false,
        key: 0,
        layout: 'LN-Home_Main',
        outputType: 'json'
    };
    describe('Check props', () => {
        it('When article load props Ok', () => {
            const objArticle = new FeatureArticle.default(props);
            expect(objArticle.props).toMatchObject(props);
        });
        it('When article load props null', () => {
            try {
                const objArticle = new FeatureArticle.default(null);
                expect(objArticle).toBe(null);
            } catch (err) {
                expect(err.message).toBe(
                    `Cannot read property 'customFields' of null`
                );
            }
        });
    });

    describe('Check render', () => {
        it('When result is Ok', () => {
            const objArticle = new FeatureArticle.default(props);
            objArticle.state.articleSourceNota = {
                _id: '2KOBND62KNFVVBFQZOADNN6WNY',
                canonical_url:
                    '/deportes/prueba-ios-y-android-cuerpo-nid12052020/',
                type: 'story',
                website_url:
                    '/deportes/prueba-ios-y-android-cuerpo-nid12052020/'
            };
            const result = objArticle.render();
            expect(Object.keys(result.additionalProperties).sort()).toEqual(
                [
                    'authors',
                    'chapita',
                    'Image',
                    'lead',
                    'noteId',
                    'title'
                ].sort()
            );

            expect(result.additionalProperties).toEqual(
                expect.objectContaining({
                    noteId: '2KOBND62KNFVVBFQZOADNN6WNY',
                    title: 'Nota1'
                })
            );
        });

        it('When fetch articleSourceNota is null', () => {
            try {
                const objArticle = new FeatureArticle.default(props);
                objArticle.state.articleSourceNota = null;
                const result = objArticle.render();
                expect(result).toBe(null);
            } catch (err) {
                expect(err.message).toBe(
                    `Cannot read property 'additionalProperties' of null`
                );
            }
        });
    });
});
