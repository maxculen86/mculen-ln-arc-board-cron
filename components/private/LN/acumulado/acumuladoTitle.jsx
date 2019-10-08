import React from 'react';

import '../../../../resources/dist/css/ln/components/title.css';

const ItemSubSection = ({ id, navTitle, website }) => (
    <li key={id}>
        <a href={`${id}?_website=${website}`}>{navTitle}</a>
    </li>
);

const AcumuladoTitle = ({ title, children, isPrimarySecton }) => (
    <div className="com-titleWithfollow">
        <h1 className="com-title-section-xl">{title}</h1>
        {children && isPrimarySecton && (
            <ul>
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
