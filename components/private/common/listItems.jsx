/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const TypeList = ({ ol, children }) =>
    ol ? <ol>{children}</ol> : <ul>{children}</ul>;

// TODO: Agregar className para los ul o ol de ser necesario
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
    ol: PropTypes.bool,
    children: PropTypes.node.isRequired
};

TypeList.defaultProps = {
    ol: false
};

ListItemsFactory.propTypes = {
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
    titleList: PropTypes.string.isRequired,
    listNumeric: PropTypes.bool
};

ListItemsFactory.defaultProps = {
    listNumeric: false
};

export default ListItemsFactory;
