import React from 'react';
import PropTypes from 'fusion:prop-types';

const Subtitle = props => {
    console.log('props ****************-----************', props);
    const { data } = props;
    switch (data.level) {
        case 1: {
            return <h2 dangerouslySetInnerHTML={{ __html: data.content }} />;
        }
        case 2: {
            return <h2 dangerouslySetInnerHTML={{ __html: data.content }} />;
        }
        case 3: {
            return <h3 dangerouslySetInnerHTML={{ __html: data.content }} />;
        }
        case 4: {
            return <h4 dangerouslySetInnerHTML={{ __html: data.content }} />;
        }
        case 5: {
            return <h5 dangerouslySetInnerHTML={{ __html: data.content }} />;
        }
        case 6: {
            return <h6 dangerouslySetInnerHTML={{ __html: data.content }} />;
        }
        default:
            return <p>{data.content}</p>;
    }
    /* return <h2>{data.content}</h2>; */
};

Subtitle.arcType = 'text';

Subtitle.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default Subtitle;
