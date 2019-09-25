import React from 'react';
import TitleAcu from '../titles/titleAcu';

import '../../../../../resources/dist/css/ln/modules/caja-nota.css';

// TODO: test pendiente. PorpTypes pendiente
export default ({
    extraClasses,
    articleData: { headlines, website_url, label },
    mediaComponent,
    children,
    border,
    dataSection
}) => {
    const volanta = label && label.volanta && label.volanta.text;
    const borderClass = border ? '--border ' : '';
    const extraOpts = {};
    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    return (
        <article
            className={`mod-caja-nota ${borderClass} ${extraClasses || ''}`}
            {...extraOpts}
        >
            {mediaComponent}
            <div className="mod-caja-nota__descrip">
                <TitleAcu
                    headlines={headlines}
                    volanta={volanta}
                    href={website_url}
                />
                {children}
            </div>
        </article>
    );
};
