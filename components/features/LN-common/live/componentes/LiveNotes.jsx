import React from 'react';

function LiveNotes({ children, ...r }) {
    return (
        <ul className="live-list inline-flex --bullet-list_8 ai-center" {...r}>
            {children}
        </ul>
    );
}

export default LiveNotes;
