import React from 'react';
import PropTypes from 'fusion:prop-types';

const TypeList = ({ listNumeric, children }) =>
    listNumeric ? <ol>{children}</ol> : <ul>{children}</ul>;

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
    listNumeric: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
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
