import React from 'react';
import Consumer from 'fusion:consumer';

import '../../../../../../../resources/dist/css/ln/modules/mod-warning.css';
import { getClass, getTitle } from './getData';

function PageBuilderMessage({ type, message }) {
    const className = getClass(type);
    const title = getTitle(type);
    return (
        <div className={`mod-warning ${className}`}>
            <h2 className="title">{title}</h2>
            <p className="text">{message}</p>
        </div>
    );
}

export default Consumer(PageBuilderMessage);
