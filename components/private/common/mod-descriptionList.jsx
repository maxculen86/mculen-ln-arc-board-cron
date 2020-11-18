import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';

const ModDescriptionList = props => {
    const {
        classCondition = '',
        size,
        descriptionTitle,
        list = [],
        text
    } = props;

    const listItem =
        text ||
        list.map(item => (
            <dd className={`com-descriptionilist ${classCondition} ${size}`}>
                {item.url && (
                    <ComLink
                        link={item.url}
                        textname={item.name || item.title}
                    />
                )}
                {!item.url && (item.name || item.title)}
            </dd>
    ));
    return (
        <dl className={`mod-descriptionilist ${classCondition || ''}`}>
            <dt className={`com-title --threexs ${classCondition || ''}`}>
                {descriptionTitle}
            </dt>
            {listItem}
        </dl>
    );
};

export default ModDescriptionList;
