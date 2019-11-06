import React from 'react';
import PropTypes from 'fusion:prop-types';

const Subtitle = props => {
    const { element } = props;
    switch (element.level) {
        case 1: {
            return <h2>{element.content}</h2>;
        }
        case 2: {
            return <h2>{element.content}</h2>;
        }
        case 3: {
            return <h3>{element.content}</h3>;
        }
        case 4: {
            return <h4>{element.content}</h4>;
        }
        case 5: {
            return <h5>{element.content}</h5>;
        }
        case 6: {
            return <h6>{element.content}</h6>;
        }
        default:
            return null;
    }
    /* return <h2>{element.content}</h2>; */
};

Subtitle.propTypes = {
    element: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default Subtitle;
