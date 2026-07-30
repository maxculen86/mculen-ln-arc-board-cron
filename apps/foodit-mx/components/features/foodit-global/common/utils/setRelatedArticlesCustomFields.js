import PropTypes from 'fusion:prop-types';
import { LAYOUTS } from '../../../../chains/foodit-global/common/utils/helper-WebApi';

const { CAROUSEL, BN_12_GRID } = LAYOUTS;

const customFieldsRules = {
    filterBy: {
        relatedArticles: 'Ultimas recetas o notas',
        section: 'Sección',
        author: 'Autor'
    },
    defaultFilterBy: 'relatedArticles',
    layouts: {
        [CAROUSEL]: 'Carrusel',
        [BN_12_GRID]: 'Grilla'
    },
    defaultLayout: BN_12_GRID,
    groupName: 'Ajuste Notas Relacionadas'
};

const setRelatedArticlesCustomFields = () => ({
    layout: PropTypes.oneOf(Object.keys(customFieldsRules.layouts)).tag({
        label: 'Diagramación',
        defaultValue: customFieldsRules.defaultLayout,
        description: 'Cambiar la diagramación',
        group: customFieldsRules.groupName,
        labels: customFieldsRules.layouts
    }).isRequired,
    customMaxArticles: PropTypes.number.tag({
        label: 'Cantidad de Notas',
        group: customFieldsRules.groupName
    }),
    customTitle: PropTypes.string.tag({
        name: 'Título manual',
        description: 'Ingrese aqui el título manual',
        defaultValue: '',
        group: customFieldsRules.groupName
    }),
    filterBy: PropTypes.oneOf(Object.keys(customFieldsRules.filterBy)).tag({
        label: 'Filtrar por',
        defaultValue: customFieldsRules.defaultFilterBy,
        description: 'Cambiar tipo de filtro',
        group: customFieldsRules.groupName,
        labels: customFieldsRules.filterBy
    }).isRequired,
    idSectionOrAuthor: PropTypes.string.tag({
        label: 'ID seccion o autor',
        description:
            'ID de la seccion o autor segun "Filtrar por" seleccionado',
        defaultValue: '',
        group: customFieldsRules.groupName
    }).isRequired
});

export default setRelatedArticlesCustomFields;
