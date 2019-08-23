import React from 'react';
import '../../../../../assets/bundles/css/ln/components/ordered.css';
import PropTypes from 'fusion:prop-types';

const ordered = ({ list }) => {
    return (
        <ul className="com-ordered">
            {list && list.map(item => <li className="com-item">{item}</li>)}
        </ul>
    );
};

ordered.propTypes = {
    list: PropTypes.object.required
};

ordered.defaultProps = {
    list: {}
};

export default ordered;
