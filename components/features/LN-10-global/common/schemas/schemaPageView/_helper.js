import { isHomeLN10 } from '../../../../../private/common/utils/image/getDataToLinkImage/_helper/common/helper-WebApi';
import get from '../../../../../private/common/utils/get';
import { countWords, getWordsAndReadingTime } from '../../readingTime/_helpers';

export const layoutsListWithPageview = [
    'LN-nota-receta',
    'LN-nota-noticia',
    'LN-nota-storytelling',
    'LN-nota-storytelling-v2',
    'LN-nota-infografia',
    'LN-nota-html-libre',
    'LN-nota-foto-al-100',
    'LN-nota-opta',
    'LN-nota-video',
    'LN-Home_Sports',
    'LN-Home_Main',
    'LN10-Home_Main',
    'LN-acumulado',
    'LN-Nota-Liveblog_Editorial',
    'LN-Nota-Video-100',
    'LN-Nota-Cards'
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

const DEFAULT_VALOR_COMUN = 'comun';

export const getObjectSchema = (globalContent, pagetype) => {
    const subheadline = get(globalContent, 'subheadlines.basic', '');
    const headline = get(globalContent, 'headlines.basic', '');

    const subheadlineWordCount = countWords(subheadline);
    const headlineWordCount = countWords(headline);
    const bodyWordCount = get(
        globalContent,
        'planning.story_length.word_count_actual',
        ''
    );
    const totalWordCount =
        subheadlineWordCount + headlineWordCount + bodyWordCount;

    const { words, readingTime } = getWordsAndReadingTime(totalWordCount);

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
            valor: get(
                globalContent,
                'content_restrictions.content_code',
                DEFAULT_VALOR_COMUN
            ),
            subtype: get(globalContent, 'subtype'),
            nota_id: get(globalContent, '_id'),
            isListenable: get(globalContent, 'isListenable', false)
                ? 'si'
                : 'no',
            palabras: words,
            lectura: readingTime
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
