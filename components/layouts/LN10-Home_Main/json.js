import Consumer from 'fusion:consumer';
import pageBuilderSections from '../config/LN10-PageBuilder.config.json';
import getPageElements from '../../private/LN/api/global/page';

const LN10Home = props => {
    const propsHome = {
        children: props.children,
        renderables: props.renderables,
        arcSite: props.arcSite,
        layout: 'LN10-Home_Main'
    };
    // return propsHome;
    return getPageElements(propsHome);
};

LN10Home.sections = pageBuilderSections;

export default Consumer(LN10Home);
