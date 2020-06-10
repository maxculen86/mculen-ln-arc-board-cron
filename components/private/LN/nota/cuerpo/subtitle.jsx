import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComTitle from '../../../common/com-title';

const Subtitle = props => {
    const { data } = props;
    switch (data.level) {
        case 1:
            return <ComTitle tag="h2" size="l" data={data} />;
        case 2: {
            return <ComTitle tag="h3" size="m" data={data} />;
        }
        case 3:
        case 4: {
            return <ComTitle tag="h4" size="threexs" data={data} />;
        }
        case 5: {
            return <ComTitle tag="h4" size="threexs" data={data} />;
        }
        case 6: {
            return <ComTitle tag="h4" size="threexs" data={data} />;
        }
        default:
            return <ComTitle tag="h2" size="threexl" data={data} />;
    }
};

Subtitle.arcType = 'header';

Subtitle.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    capital: PropTypes.boolean
};

export default Subtitle;
