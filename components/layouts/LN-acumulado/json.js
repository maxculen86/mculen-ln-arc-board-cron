import Consumer from 'fusion:consumer';
import pageBuilderSections from '../config/LN-Acumulado-PageBuilder.config.json';
import getPageElements from '../../private/LN/api/global/page';

const LNAcumuladoLayout = props => {
    const propsHome = {
        children: props.children,
        renderables: props.renderables,
        arcSite: props.arcSite,
        layout: 'LN-acumulado'
    };
    return getPageElements(propsHome);
};
LNAcumuladoLayout.sections = pageBuilderSections;
export default Consumer(LNAcumuladoLayout);
