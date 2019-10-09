import React from 'react';
import WithAcuArticlesData from '../common/hocs/WithAcuArticlesData';
import filter from '../../../../content/filters/LN/acumulado/articleAcu';

import '../../../../resources/dist/css/ln/components/title.css';
import '../../../../resources/dist/css/ln/components/tag.css';

const ItemSubSection = ({ id, navTitle, website }) => (
    <li key={id}>
        <h3>
            <a href={`${id}?_website=${website}`} title={navTitle}>
                {navTitle}
            </a>
        </h3>
    </li>
);

const AcumuladoTitle = ({
    title,
    children,
    isPrimarySecton,
    orderAndCountTags
}) => (
    <div className="com-titleWithfollow">
        <div class="with-category">
            <h1 className="com-title-section-xl">{title}</h1>
            {children && isPrimarySecton && (
                <ol class="com-category">
                    {children.map(({ _id, navigation, _website }) => (
                        <ItemSubSection
                            id={_id}
                            navTitle={navigation.nav_title}
                            website={_website}
                        />
                    ))}
                </ol>
            )}
        </div>
        {children && isPrimarySecton && <br />}
        {children && orderAndCountTags && isPrimarySecton && (
            <ol class="cont_tags com-secondary-tag">
                {orderAndCountTags.map(tag => (
                    <li key={tag}>
                        <a
                            href={`${children[0]._id}/${tag.slug}?_website=${children[0]._website}`}
                            title={tag.text}
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
