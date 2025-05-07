import { isHomeLN10 } from '../../../../../private/common/utils/image/getDataToLinkImage/_helper/common/helper-WebApi';
import get from '../../../../../private/common/utils/get';

export const layoutsListWithPageview = [
    'LN-nota-receta',
    'LN-nota-noticia',
    'LN-nota-storytelling',
    'LN-nota-infografia',
    'LN-nota-html-libre',
    'LN-nota-foto-al-100',
    'LN-nota-opta',
    'LN-nota-video',
    'LN-Home_Sports',
    'LN-Home_Main',
    'LN10-Home_Main',
    'LN-acumulado'
];

const getPageType = (layout = '', section = '') => {
    if (isHomeLN10(layout)) return 'home';
    if (section === '/deportes') return 'Deportes';
    if (layout === 'LN-acumulado') return 'acumulado';
    if (layout === 'LN-nota-receta') {
        return 'receta';
    }
    return 'nota';
};

export const getObjectSchema = (globalContent, pagetype) => {
    const notAplly = 'N/A';
    return {
        home: {
            pagetype
        },
        Deportes: {
            pagetype
        },
        acumulado: {
            pagetype,
            metarefresh: notAplly
        },
        nota: {
            pagetype,
            valor: get(globalContent, 'content_restrictions.content_code'),
            subtype: get(globalContent, 'subtype'),
            nota_id: get(globalContent, '_id'),
            isListenable: get(globalContent, 'isListenable', false)
                ? 'si'
                : 'no'
        },
        // TODO: Eliminar cuando se elimine recetas de LN
        receta: {
            metarefresh: notAplly,
            pageType: notAplly,
            mainTag: notAplly,
            tags: notAplly,
            autor: notAplly,
            seccion: 'Recetas',
            longitud: notAplly,
            formato: notAplly,
            genero: notAplly,
            tematica: notAplly,
            valor: notAplly,
            age: notAplly,
            gender: notAplly,
            marital: notAplly,
            country: notAplly,
            city: notAplly,
            education: notAplly,
            career: notAplly,
            industry: notAplly,
            income: notAplly,
            interest: notAplly
        }
    };
};

export default getPageType;
