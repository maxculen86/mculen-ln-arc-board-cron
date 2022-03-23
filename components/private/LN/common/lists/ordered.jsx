import React from 'react';
import '../../../../../resources/dist/css/ln/components/com-ordered.css';
import PropTypes from 'fusion:prop-types';

const ordered = ({ children, extraClass }) => {
    return (
        <ol
            className={`com-ordered`.concat(extraClass ? ` ${extraClass}` : '')}
        >
            {children.length > 0 &&
                children.map((item, index) => (
                    <li className="com-item" key={index}>
                        {item}
                    </li>
                ))}
        </ol>
    );
};

ordered.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
        PropTypes.element
    ]).isRequired,
    extraClass: PropTypes.string
};

ordered.defaultProps = {
    extraClass: ''
};

export default ordered;
