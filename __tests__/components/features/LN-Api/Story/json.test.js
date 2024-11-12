import * as story from '../../../../../components/features/LN-Api/Story/json';
import ATLC5WVL4NH5HAHU2BWJXTSATY from '../../../../../__mocks__/data/articles/ATLC5WVL4NH5HAHU2BWJXTSATY.json';

const propsComponent = ({
    arcSite = '',
    children = [],
    globalContent,
    requestUri
}) => {
    return {
        arcSite,
        children,
        collection: 'features',
        id: 'f0fbqPGS59PM2x',
        outputType: 'json',
        globalContent,
        requestUri
    };
};

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

describe('components - features - LN-Api - Story - json.js', () => {
    const props = propsComponent({
        arcSite: 'la-nacion-ar',
        children: [],
        globalContent: ATLC5WVL4NH5HAHU2BWJXTSATY,
        requestUri:
            '/api/mobile/v1/notas/byId/ATLC5WVL4NH5HAHU2BWJXTSATY/?_website=la-nacion-ar&outputType=json'
    });

    it('When article load props Ok', () => {
        const objArticle = new story.default(props);
        expect(objArticle.props).toMatchObject(props);
        expect(
            Object.keys(objArticle).sort((a, b) => a.localeCompare(b))
        ).toEqual(
            ['apiData', 'props', 'state'].sort((a, b) => a.localeCompare(b))
        );
    });
    it('When content_elements is null', () => {
        props.globalContent.content_elements = [];
        const objArticle = new story.default(props);
        const result = objArticle.render();
        expect(result.cotenido).toEqual(undefined);
    });
    it('When audio news source contains voice id', () => {
        const objArticle = new story.default(props);

        objArticle.state.audionewsSource = {
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3',
            audio_id: 'audio_id',
            audio_status: 7,
            audio_url: 'audio_url',
            audio_summary_url: 'audio_summary_url',
            voice: 1234,
            audio_custom_voice: true
        };

        props.globalContent = ATLC5WVL4NH5HAHU2BWJXTSATY;
        const result = objArticle.render();
        expect(result.id).toBe('QAZ7BVHG5BCNFN7S67XCBP6PA4');
        expect(result.audio_custom_voice).toBeTruthy();
    });
    it('When audio news source not contains voice id', () => {
        const objArticle = new story.default(props);

        objArticle.state.audionewsSource = {
            _id: '6ab4c6fbd7a33de3058066487fc4a3b1291b066e47ed979b9385a228e04a23c3',
            audio_id: 'audio_id',
            audio_status: 7,
            audio_url: 'audio_url',
            audio_summary_url: 'audio_summary_url'
        };

        props.globalContent = ATLC5WVL4NH5HAHU2BWJXTSATY;
        const result = objArticle.render();
        expect(result.id).toBe('QAZ7BVHG5BCNFN7S67XCBP6PA4');
        expect(result.audio_custom_voice).toBeFalsy();
    });
});
