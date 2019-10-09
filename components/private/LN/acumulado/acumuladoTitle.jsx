import React from 'react';
import Consumer from 'fusion:consumer';

import '../../../../resources/dist/css/ln/components/title.css';

function AcumuladoTitle({ globalContent }) {
    let title = '';
    if (globalContent.Payload) {
        const tag = globalContent.Payload.items[0];
        title = tag.name;
    }
    if (globalContent.node_type === 'section') title = globalContent.name;
    if (globalContent.byline) title = globalContent.byline;
    return (
        <div className="com-titleWithfollow">
            <h1 className="com-title-section-xl">{title}</h1>
        </div>
    );
}

export default Consumer(AcumuladoTitle);
