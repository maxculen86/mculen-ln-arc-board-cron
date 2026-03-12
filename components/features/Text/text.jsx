import PropTypes from 'fusion:prop-types';

function TextFile(props) {
    const {
        customFields: { text }
    } = props;
    return text || '';
}

TextFile.propTypes = {
    customFields: PropTypes.shape({
        text: PropTypes.richtext
    }).isRequired
};

export default TextFile;
