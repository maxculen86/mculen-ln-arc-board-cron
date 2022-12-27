import Consumer from 'fusion:consumer';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';

const LNMainHome = props => {
    // limpieza de datos
    const propsHome = {
        children: props.children,
        renderables: props.renderables,
        arcSite: props.arcSite,
        layout: 'LN-Home_Main'
    };

    return propsHome;
};

LNMainHome.sections = pageBuilderSections;

export default Consumer(LNMainHome);
