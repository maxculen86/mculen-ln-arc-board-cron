import React from 'react';
import PropTypes from 'prop-types';
import Text from './text';
import '../../../../resources/dist/css/ln/components/last-update.css';

const LastUpdate = ({ time }) => {
    return <Text size="6xs" text={`Última actualización hace ${time} min.`} />;
};

LastUpdate.defaultProps = {
    time: ''
};

LastUpdate.propTypes = {
    time: PropTypes.string
};

export default LastUpdate;
