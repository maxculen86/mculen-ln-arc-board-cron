import PropTypes from 'fusion:prop-types';
import { adjustByURL } from '../../../private/common/utils/propTypesHelper';

function AnexoFeature() {
    return null;
}

AnexoFeature.label = 'LN Anexo Mobile';

AnexoFeature.propTypes = {
    customFields: PropTypes.shape({
        url: PropTypes.url.tag({
            label: 'Url',
            group: adjustByURL,
            description: 'Ingrese aquí la URL del anexo',
            defaultValue: ''
        }),
        hideByUrl: PropTypes.bool.tag({
            label: 'Ocultar',
            group: adjustByURL,
            description: 'Marque para ocultar el anexo',
            defaultValue: false
        }),
        height: PropTypes.number.tag({
            label: 'Alto',
            group: adjustByURL,
            description: 'Ingrese aquí el alto fijo del anexo',
            defaultValue: 0
        })
    }).isRequired
};

export default AnexoFeature;
