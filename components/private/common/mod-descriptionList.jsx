import React from 'react';
import ComLink from './com-link';
import '../../../resources/dist/css/ln/modules/mod-descriptionlist.css';

function ModDescriptionList({
    classCondition = '',
    size = '',
    descriptionTitle,
    list = [],
    text = ''
}) {
    const listItem =
        text ||
        list.map(item => (
            <dd className={`com-itemlist ${classCondition} ${size}`}>
                {item.url && (
                    <ComLink
                        link={item.url}
                        textname={item.name || item.title}
                    />
                )}
                {!item.url && (item.name || item.title)}
                {item.publisher && `, ${item.publisher}`}
            </dd>
        ));
    return (
        <dl
            className={`mod-descriptionlist ${classCondition || ''} ${
                size || ''
            }`}
        >
            <dt className={`com-subtitle --twoxs ${classCondition || ''}`}>
                {descriptionTitle}
            </dt>
            {listItem}
        </dl>
    );
}

export default ModDescriptionList;
