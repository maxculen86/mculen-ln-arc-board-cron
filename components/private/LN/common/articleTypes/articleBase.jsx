import React from 'react';
import TitleAcu from '../titles/titleAcu';

// TODO: test pendiente. PorpTypes pendiente
export default ({
    extraClasses,
    articleData: { headlines, website_url, label },
    mediaComponent,
    children,
    border
}) => {
    const volanta = label && label.volanta && label.volanta.text;
    return (
        <article
            className={`mod-caja-nota ${border && '--border '}${extraClasses ||
                ''}`}
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
