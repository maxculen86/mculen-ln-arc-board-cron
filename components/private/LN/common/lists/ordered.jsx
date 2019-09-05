import React from 'react';
import '../../../../../resources/dist/css/ln/components/ordered.css';
import PropTypes from 'fusion:prop-types';

const ordered = ({ children }) => {
    return (
        <ul className="com-ordered">
            {children.length > 0 &&
                children.map((item, index) => (
                    <li className="com-item" key={index}>
                        {item}
                    </li>
                ))}
        </ul>
    );
};

ordered.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
        PropTypes.element
    ]).isRequired
};

export default ordered;
