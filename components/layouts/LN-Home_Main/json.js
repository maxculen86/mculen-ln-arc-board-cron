import Consumer from 'fusion:consumer';
import getHomeElements from '../../private/LN/api/v1/global/pages';
import home from '../../private/LN/api/v1/global/home';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';

const LNMainHome = props => {
    const propsHome = {
        children: props.children,
        renderables: props.renderables,
        arcSite: props.arcSite
    };
    const homeSections = getHomeElements(propsHome);
    return home(homeSections) || [];
};

LNMainHome.sections = pageBuilderSections;

export default Consumer(LNMainHome);
