import * as fusionConsumer from 'fusion:consumer';
import * as FeatureBomba from '../../../../../components/features/LN-common/bomba/json';
import * as FeatureArticle from '../../../../../components/features/LN-common/articulo/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
                this.state.articleSourceNota = null;
                this.state.articleImage = null;
            }
            fetchContent(param) {}
        };
    };
});

const mockRender = jest.fn();
jest.mock('../../../../../components/features/LN-common/articulo/json', () => {
    return jest.fn().mockImplementation(props => {
        return { render: mockRender };
    });
});

describe('components - features - LN-common - bomba - json.js', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        children: [],
        collection: 'features',
        customFields: {
            noteId: 'AQCXKYK4XJCVFNFNZ2IQ7SUCA4',
            title: 'Bomba',
            lead: 'abc',
            imageId: 'TRSC3LYYI5AANJSVUL3ZJJG324'
        },
        id: 'f0f4znzzg8A44HF',
        isAdmin: false,
        key: 0,
        layout: 'LN-Home_Main',
        outputType: 'json'
    };
    describe('Check props', () => {
        it('When article Bomba loads props Ok', () => {
            const objBomba = new FeatureBomba.default(props);
            const result = objBomba.render();
            expect(result).toBe(null);
        });
        it('When Bomba article loads props null and render results', () => {
            try {
                const objBomba = new FeatureBomba.default(null);
                const result = objBomba.render();
                expect(result.Message).toBe(
                    `Cannot read property 'customFields' of null`
                );
            } catch (err) {
                expect(err.message).toBe(
                    `Cannot read property 'customFields' of null`
                );
            }
        });
    });
});
