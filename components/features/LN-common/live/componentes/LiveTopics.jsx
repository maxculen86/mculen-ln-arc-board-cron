import React from 'react';

function LiveTopics({ children }) {
    return (
        <div className="topics-container lg-only flex ai-center pl-16">
            <nav className="topics flex ai-center">
                <ul className="tag-list inline-flex text-light-800 --bullet-list_4">
                    {children}
                </ul>
            </nav>
        </div>
    );
}

export default LiveTopics;
