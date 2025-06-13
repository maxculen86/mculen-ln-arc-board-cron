import React from 'react';
import PropTypes from 'prop-types';
import PreLiveblog from './BodyPre';

function BodyTop({ children }) {
    return (
        <div className="pb-40">
            <div className="row">
                <div className="flex flex-column">{children}</div>
            </div>
        </div>
    );
}

BodyTop.PreLiveblog = PreLiveblog;
BodyTop.propTypes = {
    children: PropTypes.node.isRequired
};

export default BodyTop;
