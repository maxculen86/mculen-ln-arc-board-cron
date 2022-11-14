import * as storyText from '../../../../../components/features/LN-Api/StoryText/json';
import resultsArticle from '../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNI.json';
import storyWithAudio from '../../../../../__mocks__/data/articles/UK57ZJT3DJGPRFTACPR7KTFUWA.json';

jest.mock('fusion:consumer', component => {
    return function(component) {
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
                ['apiData', 'props', 'state'].sort()
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
                    'audio_url',
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

    describe('Check audionews field', () => {
        it('when is listenable', () => {
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
                audio_url: 'url'
            };

            const result = objArticle.render();

            expect(Object.keys(result).sort()).toEqual(
                [
                    'audio_url',
                    'bajada',
                    'categoria',
                    'contenido',
                    'titulo',
                    'tituloMobile'
                ].sort()
            );

            expect(result.audio_url).toEqual('url');
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
                    'audio_url',
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
});
