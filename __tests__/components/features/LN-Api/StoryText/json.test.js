import * as storyText from '../../../../../components/features/LN-Api/StoryText/json';
import resultsArticle from '../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNI.json';
import storyWithAudio from '../../../../../__mocks__/data/articles/UK57ZJT3DJGPRFTACPR7KTFUWA.json';

jest.mock('fusion:consumer', component => {
    return function (component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
                this.state = {};
            }
            fetchContent(param) {}
        };
    };
});

describe('components - features - LN-Api - StoryText - json.js', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        children: [],
        collection: 'features',
        id: 'f0fbqPGS59PM2x',
        outputType: 'json',
        globalContent: resultsArticle,
        requestUri:
            '/api/mobile/v1/notas/text/byId/2MS5BHNGQ5EC7NWW6FZX5ZDQF4/?_website=la-nacion-ar&outputType=json'
    };

    describe('Check props', () => {
        it('When article load props Ok', () => {
            const objArticle = new storyText.default(props);
            expect(objArticle.props).toMatchObject(props);
            expect(Object.keys(objArticle).sort()).toEqual(
                ['apiData', 'props', 'state', 'audio'].sort()
            );
        });
        it('When article load props null', () => {
            try {
                new storyText.default(null);
            } catch (err) {
                expect(err.message).toBe(
                    'Params prop cant be null or undefined'
                );
            }
        });
    });

    describe('Check render', () => {
        it('When result is Ok', () => {
            const objArticle = new storyText.default(props);

            const result = objArticle.render();
            expect(Object.keys(result).sort()).toEqual(
                [
                    'authors',
                    'autores',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );
            expect(result.contenido).toMatch(
                /(Lorem ipsum dolor sit amet consectetur adipiscing elit nostra sapien sociosqu|Esto es otro párrafo.\n\n)/i
            );
        });

        it('When content_elements is null', () => {
            props.globalContent.content_elements = [];
            const objArticle = new storyText.default(props);
            const result = objArticle.render();
            expect(result).toEqual({});
        });
    });

    describe('Check audionews field and audio_custom_voice', () => {
        it('when is listenable and audioData in note is empty but audionewsSource is present', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                children: [],
                collection: 'features',
                id: 'f0fbqPGS59PM2x',
                outputType: 'json',
                globalContent: storyWithAudio,
                requestUri:
                    '/api/mobile/v1/notas/text/byId/UK57ZJT3DJGPRFTACPR7KTFUWA/?_website=la-nacion-ar&outputType=json'
            };

            const objArticle = new storyText.default(props);
            objArticle.state.audionewsSource = {
                audio_status: 7,
                audio_url: 'url',
                audio_id: 'id',
                voice: 1,
                audio_custom_voice: true
            };

            const result = objArticle.render();

            expect(Object.keys(result).sort()).toEqual(
                [
                    'audio_id',
                    'audio_custom_voice',
                    'audio_url',
                    'authors',
                    'autores',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );

            expect(result.audio_url).toEqual('url');
            expect(result.audio_id).toEqual('id');
            expect(result.audio_custom_voice).toBeTruthy();
        });

        it('when is listenable and audioData is in promo_items', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                children: [],
                collection: 'features',
                id: 'f0fbqPGS59PM2x',
                outputType: 'json',
                globalContent: {
                    ...storyWithAudio,
                    promo_items: {
                        audio_nota: {
                            embed: {
                                config: {
                                    audio_id: 'id',
                                    audio_status: 7,
                                    audio_url: 'url',
                                    audio_summary_url: 'audio_summary_url',
                                    voice: 1
                                }
                            }
                        }
                    }
                },
                requestUri:
                    '/api/mobile/v1/notas/text/byId/UK57ZJT3DJGPRFTACPR7KTFUWA/?_website=la-nacion-ar&outputType=json'
            };

            const objArticle = new storyText.default(props);

            const result = objArticle.render();

            expect(Object.keys(result).sort()).toEqual(
                [
                    'audio_id',
                    'audio_custom_voice',
                    'audio_url',
                    'audio_summary_url',
                    'authors',
                    'autores',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );

            expect(result.audio_url).toEqual('url');
            expect(result.audio_id).toEqual('id');
            expect(result.audio_custom_voice).toBeTruthy();
        });

        it('when is listenable and audio_custom_voice is false', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                children: [],
                collection: 'features',
                id: 'f0fbqPGS59PM2x',
                outputType: 'json',
                globalContent: {
                    ...storyWithAudio,
                    promo_items: {
                        audio_nota: {
                            embed: {
                                config: {
                                    audio_id: 'id',
                                    audio_status: 7,
                                    audio_url: 'url',
                                    audio_summary_url: 'audio_summary_url'
                                }
                            }
                        }
                    }
                },
                requestUri:
                    '/api/mobile/v1/notas/text/byId/UK57ZJT3DJGPRFTACPR7KTFUWA/?_website=la-nacion-ar&outputType=json'
            };

            const objArticle = new storyText.default(props);

            const result = objArticle.render();

            expect(Object.keys(result).sort()).toEqual(
                [
                    'audio_id',
                    'audio_custom_voice',
                    'audio_url',
                    'audio_summary_url',
                    'authors',
                    'autores',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );

            expect(result.audio_url).toEqual('url');
            expect(result.audio_id).toEqual('id');
            expect(result.audio_custom_voice).toBeFalsy();
        });

        it('when is not listenable', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                children: [],
                collection: 'features',
                id: 'f0fbqPGS59PM2x',
                outputType: 'json',
                globalContent: storyWithAudio,
                requestUri:
                    '/api/mobile/v1/notas/text/byId/UK57ZJT3DJGPRFTACPR7KTFUWA/?_website=la-nacion-ar&outputType=json'
            };

            props.globalContent.isListenable = false;

            const objArticle = new storyText.default(props);
            objArticle.state.audionewsSource = {
                audio_url: undefined
            };

            const result = objArticle.render();

            expect(Object.keys(result).sort()).toEqual(
                [
                    'authors',
                    'autores',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );

            expect(result.audio_url).toBeUndefined();
        });
    });

    describe('check termica hide_listening_articles behavior', () => {
        it('should show the audio_url property if hide_listening_articles is set to false', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                children: [],
                collection: 'features',
                id: 'f0fbqPGS59PM2x',
                outputType: 'json',
                globalContent: storyWithAudio,
                requestUri:
                    '/api/mobile/v1/notas/text/byId/UK57ZJT3DJGPRFTACPR7KTFUWA/?_website=la-nacion-ar&outputType=json'
            };

            const objArticle = new storyText.default(props);
            objArticle.state.audionewsSource = {
                audio_status: 6,
                audio_url: 'url',
                audio_id: 'id',
                audio_summary_url: 'audio_summary_url'
            };

            objArticle.state.navigationTreeSource = {
                Termicas: {
                    hide_listening_articles: 'false'
                }
            };

            const result = objArticle.render();

            expect(Object.keys(result).sort()).toEqual(
                [
                    'audio_url',
                    'audio_summary_url',
                    'audio_id',
                    'audio_custom_voice',
                    'authors',
                    'autores',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );

            expect(result.audio_url).toEqual('url');
        });

        it('should hide the audio_url property if hide_listening_articles is set to true', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                children: [],
                collection: 'features',
                id: 'f0fbqPGS59PM2x',
                outputType: 'json',
                globalContent: {
                    ...storyWithAudio,
                    promo_items: {
                        audio_nota: {
                            embed: {
                                config: {
                                    audio_id: 'id',
                                    audio_status: 7,
                                    audio_url: 'url'
                                }
                            }
                        }
                    }
                },
                requestUri:
                    '/api/mobile/v1/notas/text/byId/UK57ZJT3DJGPRFTACPR7KTFUWA/?_website=la-nacion-ar&outputType=json'
            };

            const objArticle = new storyText.default(props);

            objArticle.state.navigationTreeSource = {
                Termicas: {
                    hide_listening_articles: 'true'
                }
            };

            const result = objArticle.render();

            expect(Object.keys(result).sort()).toEqual(
                [
                    'authors',
                    'autores',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );

            expect(result.audio_url).toEqual(undefined);
            expect(result.audio_id).toEqual(undefined);
        });
    });

    describe('check termica hide_listening_articles_summary behavior', () => {
        it('should show the audio_url property if hide_listening_articles_summary is set to false', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                children: [],
                collection: 'features',
                id: 'f0fbqPGS59PM2x',
                outputType: 'json',
                globalContent: storyWithAudio,
                requestUri:
                    '/api/mobile/v1/notas/text/byId/UK57ZJT3DJGPRFTACPR7KTFUWA/?_website=la-nacion-ar&outputType=json'
            };

            const objArticle = new storyText.default(props);
            objArticle.state.audionewsSource = {
                audio_status: 6,
                audio_url: 'url',
                audio_summary_url: 'audio_summary_url',
                audio_id: 'id'
            };

            objArticle.state.navigationTreeSource = {
                Termicas: {
                    hide_listening_articles_summary: 'false'
                }
            };

            const result = objArticle.render();

            expect(Object.keys(result).sort()).toEqual(
                [
                    'audio_url',
                    'audio_summary_url',
                    'audio_id',
                    'audio_custom_voice',
                    'authors',
                    'autores',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );

            expect(result.audio_url).toEqual('url');
            expect(result.audio_summary_url).toEqual('audio_summary_url');
        });

        it('should hide the audio_url_summary property if hide_listening_articles_summary is set to true', () => {
            const props = {
                arcSite: 'la-nacion-ar',
                children: [],
                collection: 'features',
                id: 'f0fbqPGS59PM2x',
                outputType: 'json',
                globalContent: storyWithAudio,
                requestUri:
                    '/api/mobile/v1/notas/text/byId/UK57ZJT3DJGPRFTACPR7KTFUWA/?_website=la-nacion-ar&outputType=json'
            };

            const objArticle = new storyText.default(props);
            objArticle.state.audionewsSource = {
                audio_url: 'url',
                audio_summary_url: 'audio_summary_url'
            };

            objArticle.state.navigationTreeSource = {
                Termicas: {
                    hide_listening_articles_summary: 'true'
                }
            };

            const result = objArticle.render();

            expect(Object.keys(result).sort()).toEqual(
                [
                    'authors',
                    'autores',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );

            expect(result.audio_summary_url).toEqual(undefined);
        });
    });
});
