import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';
import { sectionVariants } from '../styles/sectionStyle';

function LiveSection({ children, section, className, ...r }) {
    const sectionClassName = cx(sectionVariants({ section }), className);

    return (
        <div className={sectionClassName} {...r}>
            {children}
        </div>
    );
}
LiveSection.propTypes = {
    children: PropTypes.node.isRequired,
    section: PropTypes.string.isRequired,
    className: PropTypes.string
};

LiveSection.defaultProps = {
    className: ''
};

export default LiveSection;
