import React from 'react';
import PropTypes from 'fusion:prop-types';

const Subtitle = props => {
    const { element } = props;
    switch (element.level) {
        case 1: {
            return <h2 dangerouslySetInnerHTML={{ __html: element.content }} />;
        }
        case 2: {
            return <h2 dangerouslySetInnerHTML={{ __html: element.content }} />;
        }
        case 3: {
            return <h3 dangerouslySetInnerHTML={{ __html: element.content }} />;
        }
        case 4: {
            return <h4 dangerouslySetInnerHTML={{ __html: element.content }} />;
        }
        case 5: {
            return <h5 dangerouslySetInnerHTML={{ __html: element.content }} />;
        }
        case 6: {
            return <h6 dangerouslySetInnerHTML={{ __html: element.content }} />;
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
