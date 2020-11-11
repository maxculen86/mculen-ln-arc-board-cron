import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './com-text';
import ComLink from './com-link';
import ComContainer from './com-container';
import ListSocialIcons from './list-socialicons';
import ModImage from './mod-image';
import ComTitle from './com-title';
import ComParagraph from './com-paragraph';

const list = [
    {
        textlink: 'Carlos Pagni en Odisea Argentina',
        textname: ', Editorial.',
        link: '#'
    },
    {
        textlink: 'Carlos Pagni en Odisea Argentina',
        textname: ', Editorial.',
        link: '#'
    }
];

const ModDescriptionList = props => {
    const {
        classesNames,
        classCondition,
        size,
        descriptionTitle,
        descriptionItems,
        link
    } = props;
    const listItem = list.map(item => (
        <dd className={`com-descriptionilist ${classCondition || ''} ${size}`}>
            <>
                <a className="com-link" href={item.link}>
                    {item.textlink}
                </a>
                {item.textname}
            </>
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
