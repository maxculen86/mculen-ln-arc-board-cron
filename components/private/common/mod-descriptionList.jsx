import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';
import '../../../resources/dist/css/ln/modules/mod-descriptionlist.css';

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
            className={`mod-descriptionlist ${classCondition || ''} ${size ||
                ''}`}
        >
            <dt className={`com-subtitle --twoxs ${classCondition || ''}`}>
                {descriptionTitle}
            </dt>
            {listItem}
        </dl>
    );
};

ModDescriptionList.propTypes = {
    descriptionTitle: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.node),
    text: PropTypes.string,
    size: PropTypes.string,
    classCondition: PropTypes.string
};

ModDescriptionList.defaultProps = {
    size: '',
    classCondition: '',
    text: '',
    list: []
};

export default ModDescriptionList;
