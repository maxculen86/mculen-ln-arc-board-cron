import Consumer from 'fusion:consumer';
import home from '../../private/LN/api/v2/mobile/home';
import transform from '../../../content/sources/utils/pageSource/pageHome/v1/mobile/transform';
import getPageElements from '../../private/LN/api/global/page';
import pageBuilderSections from '../config/LN10-PageBuilder.config.json';

async function LN10Home(props) {
    const { children, renderables, arcSite } = props;
    const propsHome = {
        children,
        renderables,
        arcSite,
        layout: 'LN10-Home_Main'
    };
    const pageElements = getPageElements(propsHome);
    const params = {
        website: propsHome.arcSite,
        information: pageElements.information
    };
    const resultHome = home(await transform(pageElements, params), params);
    const response = Array.isArray(resultHome)
        ? {
              ...resultHome[0],
              metadata: { ...resultHome[0].metadata, outputType: 'jsonv2' }
          }
        : null;

    return response;
}

LN10Home.sections = pageBuilderSections;

export default Consumer(LN10Home);
