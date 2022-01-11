import NotaIndex from '../../../../../../../../components/private/LN/api/v1/mobile/story';
import QAZ7BVHG5BCNFN7S67XCBP6PA4 from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';
import JMQ44OZHHBC5ZJ5TXTSIIPZMTI from '../../../../../../../../__mocks__/data/articles/JMQ44OZHHBC5ZJ5TXTSIIPZMTI.json';
import FUO2YR3EABBAFOMSI2BBS6J7FM from '../../../../../../../../__mocks__/data/articles/FUO2YR3EABBAFOMSI2BBS6J7FM.json';
import L47IICAOMVFW5MV343TJIHS4RY from '../../../../../../../../__mocks__/data/articles/L47IICAOMVFW5MV343TJIHS4RY.json';
import Q4P5KFEOLVHINB3Y5LIGK26SOU from '../../../../../../../../__mocks__/data/articles/Q4P5KFEOLVHINB3Y5LIGK26SOU.json';
import FO4F7BUAJZBDDLPEMSV5QYDCGM from '../../../../../../../../__mocks__/data/articles/FO4F7BUAJZBDDLPEMSV5QYDCGM.json';
import M3UNX7ATAZHEFJGPGFZX366ZAQ from '../../../../../../../../__mocks__/data/articles/M3UNX7ATAZHEFJGPGFZX366ZAQ.json';
import QAZ7BVHG5BCNFN7S67XCBP6PA2 from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA2.json';
import ArticleFourElements from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA5.json';
import ArticleSevenElements from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA7.json';
import ArticleNineElements from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA9.json';
import ArticleElevenElements from '../../../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA1.json';
import dateAndTimeUtil, {
    dateAndTimeForAppsUtil
} from '../../../../../../../../components/private/common/utils/dateAndTimeUtil';

describe('Test de index en JSON de nota', () => {
    it('Test valores meta null o undefined', () => {
        const resp = NotaIndex(JMQ44OZHHBC5ZJ5TXTSIIPZMTI);
        expect(resp.id).toBe('JMQ44OZHHBC5ZJ5TXTSIIPZMTI');
        expect(resp.template).toBe('1');
        expect(resp.mostrarBanners).toBe(true);
        expect(resp.enviarApps).toBe(true);
        expect(resp.paywallStatus).toBe('comun');
        expect(resp.comentarios.abiertoComentarios).toBe(true);
        expect(resp.comentarios.permitirComentarios).toBe(true);
        expect(resp.fechaActualizacion).toBe(
            '29 de septiembre de 2020 • 06:09'
        );
        expect(resp.fecha).toBe('29 de septiembre de 2020 • 09:09');
    });

    it('Test paywallStatus cerrada', () => {
        const resp = NotaIndex(FO4F7BUAJZBDDLPEMSV5QYDCGM);
        expect(resp.paywallStatus).toBe('comun');
    });

    it('Test Paywall inexistente', () => {
        const resp = NotaIndex(M3UNX7ATAZHEFJGPGFZX366ZAQ);
        expect(resp.paywallStatus).toBe('comun');
    });

    it('Test valores meta con valores y siendo edicion impresa', () => {
        const resp = NotaIndex(FUO2YR3EABBAFOMSI2BBS6J7FM);
        expect(resp.id).toBe('FUO2YR3EABBAFOMSI2BBS6J7FM');
        expect(resp.template).toBe('1');
        expect(resp.url).toBe(
            '/comunidad/violencia-economica-deje-de-trabajar-porque-el-me-lo-pidio-y-fue-el-principio-del-fin-para-mi-nid29092020/'
        );
        expect(resp.mostrarBanners).toBe(false);
        expect(resp.enviarApps).toBe(false);
        expect(resp.paywallStatus).toBe('abierta');
        expect(resp.comentarios.abiertoComentarios).toBe(false);
        expect(resp.comentarios.permitirComentarios).toBe(true);
        expect(resp.fechaActualizacion).toBe('29 de septiembre de 2020');
        expect(resp.fecha).toBe('29 de septiembre de 2020');
    });

    it('Test valores meta con valores cerrada a comentarios', () => {
        const resp = NotaIndex(L47IICAOMVFW5MV343TJIHS4RY);
        expect(resp.id).toBe('L47IICAOMVFW5MV343TJIHS4RY');
        expect(resp.template).toBe('1');
        expect(resp.url).toBe(
            '/el-mundo/marcada-por-la-escasez-y-la-inflacion-la-semana-santa-no-escapo-al-calvario-cotidiano-nid2121866/'
        );
        expect(resp.mostrarBanners).toBe(true);
        expect(resp.enviarApps).toBe(true);
        expect(resp.paywallStatus).toBe('comun');
        expect(resp.fechaActualizacion).toBe('29 de septiembre de 2020');
        expect(resp.fecha).toBe('29 de septiembre de 2020');
        expect(resp.HTML).toBeUndefined();
    });

    it('Render de atributos meta para template Html', () => {
        const resp = NotaIndex(Q4P5KFEOLVHINB3Y5LIGK26SOU);
        expect(resp.id).toBe('Q4P5KFEOLVHINB3Y5LIGK26SOU');
        expect(resp.template).toBe('9');
        expect(resp.paywallStatus).toBe('comun');
        expect(resp.fechaActualizacion).toBeUndefined();
        expect(resp.fecha).toBeUndefined();
        expect(resp.apertura).toBeUndefined();
        expect(resp.contenido).toBeUndefined();
    });

    it('Render de atributos meta', () => {
        const resp = NotaIndex(QAZ7BVHG5BCNFN7S67XCBP6PA4);

        expect(resp.id).toBe('QAZ7BVHG5BCNFN7S67XCBP6PA4');
        expect(resp.template).toBe('7');
        expect(resp.url).toBe(
            '/recetas/platos-de-comida-principal/nota-recetas-para-api-test-nid24042020/'
        );
        expect(resp.mostrarBanners).toBe(true);
        expect(resp.paywallStatus).toBe('premium');
        expect(resp.fechaActualizacion).toBe('24 de abril de 2020 • 08:35');
        expect(resp.fecha).toBe('24 de abril de 2020 • 08:35');
        expect(resp.enviarApps).toBe(true);
    });

    it('Contenido de nota es null', () => {
        try {
            const resp = NotaIndex(null);
            expect(resp).toBe(null);
        } catch (err) {
            expect(err.message).toBe('La información de la nota esta vacia');
        }
    });

    it('Test fechas meses menores a 10', () => {
        const resp = dateAndTimeForAppsUtil('2020-12-06T18:04:25.254Z');
        expect(resp).toBe('2020-12-6 12:04:25');
    });

    test('Test Fecha del articulo dateAndTimeUtil', () => {
        const resp = JMQ44OZHHBC5ZJ5TXTSIIPZMTI;
        expect(dateAndTimeUtil(resp.display_date)).toEqual({
            date: '29 de septiembre de 2020',
            time: '06:09'
        });
    });

    it('Test fechas meses menores a 10', () => {
        const resp = dateAndTimeForAppsUtil(undefined);
        expect(resp).toBe(undefined);
    });
});
describe('Test json integracion Article', () => {
    it('Luego del primer elemento/párrafo. Se dibuja siempre.', () => {
        const resp = NotaIndex(ArticleFourElements);
        expect(resp.contenido.length).toBe(6);
        expect(resp.contenido[1]._t).toBe('banner');
    });
    it('Luego del 4to elemento/párrafo. Se dibuja si la nota tiene al menos 4 elementos.', () => {
        const resp = NotaIndex(ArticleFourElements);
        expect(resp.contenido.length).toBe(6);
        expect(resp.contenido[1]._t).toBe('banner');
        expect(resp.contenido[5]._t).toBe('banner');
    });
    it('Luego del 7mo elemento/párrafo. Se dibuja si la nota tiene al menos 7 elementos.', () => {
        const resp = NotaIndex(ArticleSevenElements);
        expect(resp.contenido.length).toBe(10);
        expect(resp.contenido[1]._t).toBe('banner');
        expect(resp.contenido[5]._t).toBe('banner');
        expect(resp.contenido[9]._t).toBe('banner');
    });
    it('Luego del 9no elemento/párrafo. Se dibuja si la nota tiene al menos 9 elementos.', () => {
        const resp = NotaIndex(ArticleNineElements);
        expect(resp.contenido.length).toBe(13);
        expect(resp.contenido[1]._t).toBe('banner');
        expect(resp.contenido[5]._t).toBe('banner');
        expect(resp.contenido[9]._t).toBe('banner');
        expect(resp.contenido[12]._t).toBe('banner');
    });
    it('Luego del 11no elemento/párrafo. Se dibuja si la nota tiene al menos 11 elementos.', () => {
        const resp = NotaIndex(ArticleElevenElements);
        expect(resp.contenido.length).toBe(16);
        expect(resp.contenido[1]._t).toBe('banner');
        expect(resp.contenido[5]._t).toBe('banner');
        expect(resp.contenido[9]._t).toBe('banner');
        expect(resp.contenido[12]._t).toBe('banner');
        expect(resp.contenido[15]._t).toBe('banner');
    });

    it('Mostrar the trust project', () => {
        const resp = NotaIndex(ArticleFourElements);
        expect(resp.trust).toBe(true);
    });
    it('No Mostrar the trust project', () => {
        const resp = NotaIndex(ArticleSevenElements);
        expect(resp.trust).toBe(false);
    });
    it('the trust project es null', () => {
        const resp = NotaIndex(ArticleNineElements);
        expect(resp.trust).toBe(true);
    });
    it('apertura_multimedia', () => {
        const resp = NotaIndex(QAZ7BVHG5BCNFN7S67XCBP6PA2);
        expect(resp.contenido[0]._t).toBe('ext');
    });
});
