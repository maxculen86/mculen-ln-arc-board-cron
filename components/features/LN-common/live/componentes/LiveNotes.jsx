import React from 'react';
import PropTypes from 'prop-types';

function LiveNotes({ children, ...r }) {
    return (
        <ul className="live-list inline-flex --bullet-list_8 ai-center" {...r}>
            {children}
        </ul>
    );
}
LiveNotes.propTypes = {
    children: PropTypes.node.isRequired
};

export default LiveNotes;
