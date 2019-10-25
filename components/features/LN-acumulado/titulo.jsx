import PropTypes from 'fusion:prop-types';
import Title from '../../private/LN/acumulado/acumuladoTitle';

Title.label = 'LN-Acumulado-Titulo';

Title.propTypes = {
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({ label: 'Id de collection' })
    })
};

Title.defaultProps = {
    customFields: {
        idCollection: undefined
    }
};

export default Title;
