/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-subhead.css';

const ModBajada = ({
    link,
    subheadSize,
    subheadText,
    subheadTag,
    classCondition
}) => {
    const CustomTag = subheadTag || 'h3';

    return (
        <CustomTag
            className={`com-subhead ${classCondition || ''} ${subheadSize ||
                '--twoxs'}`}
        >
            {link ? (
                <a
                    href={link}
                    aria-label={subheadText}
                    className="com-link"
                    title={subheadText}
                    dangerouslySetInnerHTML={{ __html: subheadText }}
                />
            ) : (
                subheadText
            )}
        </CustomTag>
    );
};

ModBajada.propTypes = {
    tag: PropTypes.string,
    link: PropTypes.string,
    subheadSize: PropTypes.string,
    subheadText: PropTypes.string.isRequired
};

export default ModBajada;
