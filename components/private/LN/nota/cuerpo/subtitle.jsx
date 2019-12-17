import React from 'react';
import PropTypes from 'fusion:prop-types';

const Subtitle = props => {
    const { data, capital } = props;
    switch (data.level) {
        case 1: {
            return (
                <h2
                    className="com-subtitle-nota-1"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            );
        }
        case 2: {
            return (
                <h2
                    className="com-subtitle-nota-1"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            );
        }
        case 3: {
            return (
                <h3
                    className="com-subtitle-nota-2"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            );
        }
        case 4: {
            return (
                <h4
                    className="com-subtitle-nota-3"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            );
        }
        case 5: {
            return (
                <h5
                    className="com-subtitle-nota-3"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            );
        }
        case 6: {
            return (
                <h6
                    className="com-subtitle-nota-3"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            );
        }
        default:
            return (
                <p className={`text${capital ? ` capital` : ''}`}>
                    {data.content}
                </p>
            );
    }
    /* return <h2>{data.content}</h2>; */
};

Subtitle.arcType = 'text';

Subtitle.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    capital: PropTypes.boolean
};

export default Subtitle;
