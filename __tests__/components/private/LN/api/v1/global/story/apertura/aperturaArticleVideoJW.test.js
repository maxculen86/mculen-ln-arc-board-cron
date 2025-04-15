import Apertura from '../../../../../../../../../components/private/LN/api/v1/global/story/apertura/aperturaArticle';
import articleWithVideoJW from '../../../../../../../../../__mocks__/data/articles/FJ5DHWYC2BEKFOFGFBJI5WWUCA.json';

describe('Test apetura con videoJW === private-LN-api-v1-global-story-apertura-aperturaArticle.js', () => {
    it('Render de atributos de apertura', () => {
        const resp = Apertura(articleWithVideoJW);
        expect(Object.keys(resp).sort()).toEqual(
            ['titulo', 'tituloMobile', 'bajada', 'multimedio', 'distributor'].sort()
        );

        expect(resp).toMatchObject({
            titulo: 'Test power up',
            tituloMobile: '',
            bajada: 'subtitulo copado',
            multimedio: {
                _t: 'vid',
                id: 'I7RTBP0c',
                duracion: 87000,
                tituloHome:
                    'Youtubers realizan un experimento social en el barrio de Palermo',
                multimedioFile: {
                    _t: 'mmf',
                    width: 1920,
                    height: 1080,
                    url: 'https://cdn.jwplayer.com/videos/I7RTBP0c-SomplJdm.mp4'
                }
            }
        });
    });
});
