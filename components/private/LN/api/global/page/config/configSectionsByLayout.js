import rulesLNHomeMain from '../../../../../../layouts/config/LN-Home.config';
import rulesLNHomeSports from '../../../../../../layouts/config/rules-LN-Home_Sports.config';
import rulesLNAcumulado from '../../../../../../layouts/config/rules-LN-Acumulado.config';
import rulesLN10HomeMain from '../../../../../../layouts/config/LN10-Home.config';
import sectionsPageMainFront from '../../../../../../layouts/config/LN-PageBuilder.config.json';
import sectionsPageAcumuladosFront from '../../../../../../layouts/config/LN-Acumulado-PageBuilder.config.json';
import sectionsPageSportFront from '../../../../../../layouts/config/LN-Home_Sports-PageBuilder.config.json';
import sectionsPage10MainFront from '../../../../../../layouts/config/LN10-PageBuilder.config.json';

const configSectionsByLayout = layout => {
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
        },
        'LN10-Home_Main': {
            front: sectionsPage10MainFront,
            mobile: sectionsPage10MainFront,
            rules: rulesLN10HomeMain
        }
    };
    const pageMergeSections = {};
    pageMergeSections.sections =
        sectionsMerge[layout] &&
        sectionsMerge[layout].front &&
        sectionsMerge[layout].front.map((e, i) => {
            return {
                sectionWeb: e,
                sectionMobile: sectionsMerge[layout].mobile[i]
            };
        });
    pageMergeSections.rules = sectionsMerge[layout].rules;
    return pageMergeSections;
};

export default configSectionsByLayout;
