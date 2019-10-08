import React from 'react';

import '../../../../resources/dist/css/ln/components/title.css';
import '../../../../resources/dist/css/ln/components/tag.css';

const ItemSubSection = ({ id, navTitle, website }) => (
    <li key={id}>
        <h3><a href={`${id}?_website=${website}`} title={navTitle}>{navTitle}</a></h3>
    </li>
);

const AcumuladoTitle = ({ title, children, isPrimarySecton }) => (
    <div className="com-titleWithfollow with-categories">
        <h1 className="com-title-section-xl">{title}</h1>
        {children && isPrimarySecton && (
            <ul class="com-category">
                {children.map(({ _id, navigation, _website }) => (
                    <ItemSubSection
                        id={_id}
                        navTitle={navigation.nav_title}
                        website={_website}
                    />
                ))}
            </ul>
        )}
        {children && isPrimarySecton && <hr />}
    </div>
);

export default AcumuladoTitle;
