/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';

// eslint-disable-next-line react/prop-types
const TypeList = ({ listNumeric, children }) =>
    listNumeric ? <ol>{children}</ol> : <ul>{children}</ul>;

// eslint-disable-next-line camelcase
const ListItemsFactory = ({ list, titleList, listNumeric }) => (
    <div>
        <h3>{titleList}</h3>
        <TypeList ol={listNumeric}>
            {list.map((item, key) => (
                <li key={key}>{item}</li>
            ))}
        </TypeList>
    </div>
);

TypeList.propTypes = {
    listNumeric: PropTypes.bool.isRequired
};

ListItemsFactory.propTypes = {
    list: PropTypes.array.isRequired,
    titleList: PropTypes.string.isRequired,
    listNumeric: PropTypes.bool
};

ListItemsFactory.defaultProps = {
    listNumeric: false
};

export default ListItemsFactory;
