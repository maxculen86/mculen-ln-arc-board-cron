import Consumer from 'fusion:consumer';

const pageBuilderSections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Pre-Apertura',
    'Breadcrumb/Titulo',
    'Apertura',
    'Links',
    'Notas',
    'Aside',
    'Bottom'
];
const LNAcumuladosLayout = props => {
    const propsHome = {
        children: props.children,
        renderables: props.renderables,
        arcSite: props.arcSite
    };
    return propsHome;
};
LNAcumuladosLayout.sections = pageBuilderSections;
export default Consumer(LNAcumuladosLayout);
