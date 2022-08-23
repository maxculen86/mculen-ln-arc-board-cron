import * as fusionConsumer from 'fusion:consumer';
import * as FeatureArticle from '../../../../../components/features/LN-common/articulo/json';
import article from '../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import getProperties from 'fusion:properties';

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

jest.mock('fusion:properties', () => () => ({
    getProperties: () => {
        return {
            cajaTemaConfig: {
                opinion4: {
                    className: '--opinion',
                    articles: {
                        0: {
                            titleSize: '--l',
                            withChapita: true,
                            imageConfig: 'featuredOpinion'
                        },
                        1: {
                            titleSize: '--xs',
                            authorSize: '--fourxs',
                            isRenderAuthorOpinion: true,
                            imageConfig: 'featuredOpinion'
                        },
                        2: {
                            titleSize: '--xs',
                            authorSize: '--fourxs',
                            isRenderAuthorOpinion: true,
                            imageConfig: 'featuredOpinion'
                        },
                        3: {
                            titleSize: '--l',
                            authorSize: '--fourxs',
                            isRenderAuthorOpinion: true,
                            imageConfig: 'featuredOpinion'
                        }
                    }
                }
            }
        };
    }
}));

describe('components - features - LN-common - articulo - json.js', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        children: [],
        collection: 'features',
        customFields: {
            noteId: '2KOBND62KNFVVBFQZOADNN6WNY',
            title: 'Nota1',
            html:
                '<iframe width="560" height="315" src="https://www.youtube.com/embed/mGcFszPShHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        },
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
                    'image',
                    'lead',
                    'noteId',
                    'opinion',
                    'html',
                    'title'
                ].sort()
            );

            expect(result.additionalProperties).toEqual(
                expect.objectContaining({
                    noteId: '2KOBND62KNFVVBFQZOADNN6WNY',
                    title: 'Nota1',
                    html:
                        '<iframe width="560" height="315" src="https://www.youtube.com/embed/mGcFszPShHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                })
            );

            result.additionalProperties.html = undefined;
            expect(result.additionalProperties).toEqual(
                expect.objectContaining({
                    html: undefined
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
