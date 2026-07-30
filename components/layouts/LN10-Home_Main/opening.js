import Consumer from 'fusion:consumer';
import home from '../../private/LN/api/v2/mobile/home';
import transform from '../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform';
import getPageElements from '../../private/LN/api/global/page';
import pageBuilderSections from '../config/LN10-PageBuilder.config.json';

const OPENING_SECTION_NAMES = ['apertura', 'pre_apertura'];

const openingFilter = item =>
    item.tipoSeccion &&
    (item.tipoSeccion === 'apertura' || item.tipoSeccion === 'bombita');

async function LN10Home(props) {
    const { children, renderables, arcSite } = props;
    const propsHome = {
        children,
        renderables,
        arcSite,
        layout: 'LN10-Home_Main',
        sectionNames: OPENING_SECTION_NAMES
    };
    const pageElements = getPageElements(propsHome);

    const params = {
        website: propsHome.arcSite,
        information: pageElements.information
    };

    const resultHome = home(await transform(pageElements, params), params);

    return Array.isArray(resultHome)
        ? {
              items: resultHome[0].items.filter(openingFilter)
          }
        : null;
}

LN10Home.sections = pageBuilderSections;

export default Consumer(LN10Home);
