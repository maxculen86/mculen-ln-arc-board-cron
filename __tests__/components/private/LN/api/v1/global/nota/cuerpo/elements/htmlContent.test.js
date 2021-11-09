import env from '../../../../../../../../../../__mocks__/fusion:environment';
import ArticleHtmlContent from '../../../../../../../../../../__mocks__/data/nota/cuerpo/htmlContent/htmlContent.json';
import HtmlContent from '../../../../../../../../../../components/private/LN/api/v1/global/nota/cuerpo/elements//htmlContent';
import getEmbedHref from '../../../../../../../../../../components/private/common/utils/getEmbedHref';

const dataNota = { _id: 'idnota' };

describe('Test de htmlContent en el cuepo de nota', () => {
    it('Verificar en caso que el contenido html sea null', () => {
        const resp = HtmlContent(null);
        expect(resp).toBe(null);
    });

    it('Verificar en caso que el contenido html sea null', () => {
        const resp = HtmlContent(ArticleHtmlContent[1], dataNota);
        expect(resp).toBe(null);
    });

    it('Verificar los valores del contenido html', () => {
        const resp = HtmlContent(ArticleHtmlContent[0], dataNota);
        expect(resp['_t']).toBe('p');
        expect(resp['valor']['_t']).toBe('ext');
        expect(resp['valor']['id']).toBe('html');
        expect(resp['valor']['src']).toBe(
            '<blockquote class="twitter-tweet"><p lang="es" dir="ltr">Me cuenta una persona que en su trabajo (multinacional) le avisaron que hasta fin de año nadie vuelve a la oficina. Le pagan internet, le dieron una notebook, la silla y el monitor que tenía en su escritorio. ¿A ustedes sus empleadores le dieron algo?</p>&mdash; Jason Mayne (@MayneJason) <a href="https://twitter.com/MayneJason/status/1268588829428060167?ref_src=twsrc%5Etfw">June 4, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
        );
    });

    it('Verificar los valores cuando el contenido html es un iframe', () => {
        const resp = HtmlContent(ArticleHtmlContent[2], dataNota);
        expect(resp['_t']).toBe('p');
        expect(resp['valor']['_t']).toBe('ext');
        expect(resp['valor']['id']).toBe('ifrme');
        expect(resp['valor']['src']).toBe(
            'https://www.espn.com.ar/core/video/iframe?id=7188899&endcard=true&adLevel=espn.latam.ar%2Fsyndicated-player%2Flanacion&adEnv=prod&trackingName=LANACION'
        );
    });

    it('Verificar los valores cuando el contenido html es un iframe', () => {
        const resp = HtmlContent(ArticleHtmlContent[3], dataNota._id);
        expect(resp['_t']).toBe('p');
        expect(resp['valor']['_t']).toBe('ext');
        expect(resp['valor']['id']).toBe('html');
        expect(resp['valor']['src']).toEqual(
            expect.stringContaining(
                `opta-embed/${ArticleHtmlContent[3]._id}/${dataNota._id}`
            )
        );
    });

    it('Verificar Helper enviando una url no valida', () => {
        const resp = getEmbedHref('href', `<a src='www.google.com'>test</a>`);
        expect(resp).toBe(null);
    });
});
