import React from 'react';
import WithAcuArticlesData from '../common/hocs/WithAcuArticlesData';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';

import '../../../../resources/dist/css/ln/components/title.css';

const ItemSubSection = ({ id, navTitle, website }) => (
    <li key={id}>
        <a href={`${id}?_website=${website}`}>{navTitle}</a>
    </li>
);

const AcumuladoTitle = ({
    title,
    children,
    isPrimarySecton,
    orderAndCountTags
}) => (
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
        {children && isPrimarySecton && <br />}
        {children && orderAndCountTags && isPrimarySecton && (
            <ol>
                {orderAndCountTags.map(tag => (
                    <li key={tag}>
                        <a
                            href={`${children[0]._id}/${tag.slug}?_website=${children[0]._website}`}
                        >
                            {tag.text}
                        </a>
                    </li>
                ))}
            </ol>
        )}
    </div>
);

export default WithAcuArticlesData(AcumuladoTitle, filter, 'notaM');
