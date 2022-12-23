import Consumer from 'fusion:consumer';
import pageBuilderSections from '../config/LN-Acumulado-PageBuilder.config.json';

const LNAcumuladosLayout = props => {
    // limpieza de datos
    const propsHome = {
        children: props.children,
        renderables: props.renderables,
        arcSite: props.arcSite,
        pageSections: pageBuilderSections,
        layout: 'LN-acumulados'
    };
    return propsHome;
};
LNAcumuladosLayout.sections = pageBuilderSections;
export default Consumer(LNAcumuladosLayout);
