import React from 'react';
import PropTypes from 'fusion:prop-types';

const HeaderBase = props => {
    const { id, className, children } = props;
    return (
        <header id={id} className={className}>
            <div className="lay">
                <div className="row">{children}</div>
            </div>
        </header>
    );
};

HeaderBase.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default HeaderBase;
