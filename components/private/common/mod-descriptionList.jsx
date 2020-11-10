import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComText from './com-text';
import ComLink from './com-link';
import ComContainer from './com-container';
import ListSocialIcons from './list-socialicons';
import ModImage from './mod-image';
import ComTitle from './com-title';
import ComParagraph from './com-paragraph';

const descriptionItems = [
    {
        textlink: 'Carlos Pagni en Odisea Argentina',
        textname: 'Editorial.',
        link: '#'
    },
    {
        textlink: 'Carlos Pagni en Odisea Argentina',
        textname: 'Editorial.',
        link: '#'
    }
];

const ModDescriptionList = props => {
    const { classesNames, classCondition, size, descriptionItems } = props;
    const listItem = descriptionItems.map(item => (
        <dd className={`com-descriptionilist ${classCondition || ''} ${size}`}>
            <>
                {link ? (
                    <>
                        <ComLink link={link}>{item.textlink}</ComLink>
                        {item.textname}
                    </>
                ) : (
                    item.textname
                )}
            </>
        </dd>
    ));
    return (
        <dl className={`mod-descriptionilist ${classCondition || ''} ${size}`}>
            <dt className={`com-title ${classCondition || ''} ${size}`}>
                {descriptionTitle}
            </dt>
            {listItem}
        </dl>
    );
};

export default ModDescriptionList;
