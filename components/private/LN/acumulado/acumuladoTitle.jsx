import React from 'react';

import '../../../../resources/dist/css/ln/components/title.css';
import '../../../../resources/dist/css/ln/components/tag.css';

const ItemSubSection = ({ id, navTitle, website }) => (
    //<li key={id}>
        <a href={`${id}?_website=${website}`} title={navTitle}>{navTitle}</a>
    //</li>
);

const AcumuladoTitle = ({ title, children, isPrimarySecton }) => (
    <div className="com-titleWithfollow">
        <h1 className="com-title-section-xl">{title}</h1>
        {children && isPrimarySecton && (
            <div class="cont_tags com-secondary-tag">
                {children.map(({ _id, navigation, _website }) => (
                    <ItemSubSection
                        id={_id}
                        navTitle={navigation.nav_title}
                        website={_website}
                    />
                ))}
            </div>
        )}
        {children && isPrimarySecton && <hr />}
    </div>
);

export default AcumuladoTitle;
