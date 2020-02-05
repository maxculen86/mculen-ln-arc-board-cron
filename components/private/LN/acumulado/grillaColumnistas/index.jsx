import PropTypes from 'fusion:prop-types';
import GrillaColumnistas from './components/grilla';

GrillaColumnistas.propTypes = {
    customFields: PropTypes.shape({
        test: PropTypes.string
    })
};

export default GrillaColumnistas;
