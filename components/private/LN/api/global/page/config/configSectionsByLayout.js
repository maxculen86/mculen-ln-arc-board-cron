import rulesLNHomeMain from '../../../../../../layouts/config/LN-Home.config.json';
import rulesLNHomeSports from '../../../../../../layouts/config/rules-LN-Home_Sports.config.json';
import rulesLNAcumulado from '../../../../../../layouts/config/rules-LN-Acumulado.config.json';
import rulesLN10HomeMain from '../../../../../../layouts/config/LN10-Home.config.json';
import sectionsPageMainFront from '../../../../../../layouts/config/LN-PageBuilder.config.json';
import sectionsPageAcumuladosFront from '../../../../../../layouts/config/LN-Acumulado-PageBuilder.config.json';
import sectionsPageSportFront from '../../../../../../layouts/config/LN-Home_Sports-PageBuilder.config.json';
import sectionsPage10MainFront from '../../../../../../layouts/config/LN10-PageBuilder.config.json';

const configSectionsByLayout = layout => {
    const sectionsMerge = {
        'LN-acumulado': {
            front: sectionsPageAcumuladosFront,
            rules: rulesLNAcumulado
        },
        'LN-Home_Main': {
            front: sectionsPageMainFront,
            rules: rulesLNHomeMain
        },
        'LN-Home_Sports': {
            front: sectionsPageSportFront,
            rules: rulesLNHomeSports
        },
        'LN10-Home_Main': {
            front: sectionsPage10MainFront,
            rules: rulesLN10HomeMain
        }
    };
    const pageMergeSections = { title: 'Merge rules and sections' };
    pageMergeSections.sections =
        sectionsMerge[layout] && sectionsMerge[layout].front;

    pageMergeSections.rules =
        sectionsMerge[layout] && sectionsMerge[layout].rules;

    return pageMergeSections;
};

export default configSectionsByLayout;
