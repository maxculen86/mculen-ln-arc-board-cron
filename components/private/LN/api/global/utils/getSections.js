import rulesLNHomeMain from '../../../../../layouts/config/LN-Home.config';
import rulesLNHomeSports from '../../../../../layouts/config/rules-LN-Home_Sports.config';
import rulesLNAcumulado from '../../../../../layouts/config/rules-LN-Acumulado.config';
import sectionsPageMainFront from '../../../../../layouts/config/LN-PageBuilder.config.json';
import sectionsPageAcumuladosFront from '../../../../../layouts/config/LN-Acumulado-PageBuilder.config.json';
import sectionsPageSportFront from '../../../../../layouts/config/LN-Home_Sports-PageBuilder.config.json';

const getSections = layout => {
    const sectionsMerge = {
        'LN-acumulado': {
            front: sectionsPageAcumuladosFront,
            mobile: sectionsPageAcumuladosFront,
            rules: rulesLNAcumulado
        },
        'LN-Home_Main': {
            front: sectionsPageMainFront,
            mobile: [
                'Anticipo',
                'AnexoMobile',
                'Bomba',
                'Apertura',
                'Apertura',
                'Multimedia',
                'AnexoMobile',
                'Tema1',
                'Tema2',
                'Tema3',
                'AnexoMobile',
                'Opinion',
                'Tema4',
                'Tema5',
                'Tema6',
                'Comercial',
                'Tema7',
                'Comercial',
                'Tema8',
                'Tema9',
                'Tema10',
                'Tema11',
                'Tema12',
                'Tema13',
                'Anexo',
                'Anexo'
            ],
            rules: rulesLNHomeMain
        },
        'LN-Home_Sports': {
            front: sectionsPageSportFront,
            mobile: sectionsPageSportFront,
            rules: rulesLNHomeSports
        }
    };
    const pageMergeSections = {};
    pageMergeSections.sections = sectionsMerge[layout]?.front.map((e, i) => {
        return {
            sectionWeb: e,
            sectionMobile: sectionsMerge[layout]?.mobile[i]
        };
    });
    pageMergeSections.rules = sectionsMerge[layout].rules;
    return pageMergeSections;
};

export default getSections;
