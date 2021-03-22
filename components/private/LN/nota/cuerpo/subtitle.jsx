import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComTitle from '../../../common/com-title';

const Subtitle = ({ data }) => {
    const { level, content } = data;
    switch (level) {
        case 1:
            return <ComTitle tag="h2" size="--l" content={content} />;
        case 2: {
            return <ComTitle tag="h3" size="--m" content={content} />;
        }
        case 3:
        case 4: {
            return (
                <ComTitle
                    tag="h4"
                    size="--twoxs"
                    classCondition="--arial"
                    content={content}
                />
            );
        }
        case 5: {
            return (
                <ComTitle
                    tag="h4"
                    size="--twoxs"
                    classCondition="--arial"
                    content={content}
                />
            );
        }
        case 6: {
            return (
                <ComTitle
                    tag="h4"
                    size="--twoxs"
                    classCondition="--arial"
                    content={content}
                />
            );
        }
        default:
            return <ComTitle tag="h2" size="--l" content={content} />;
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
