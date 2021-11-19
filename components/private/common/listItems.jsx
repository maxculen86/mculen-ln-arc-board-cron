import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-ordered.css';
import '../../../resources/dist/css/ln/components/com-unordered.css';
import Text from './text';

const TypeList = ({ ol, children }) =>
    ol ? (
        <ol className="com-ordered">{children}</ol>
    ) : (
        <ul className="com-unordered">{children}</ul>
    );
const ListItemsFactory = ({ list, titleList, listNumeric }) => {
    return (
        <div>
            <Text size="2xs" weight="bold" tag="h4" text={titleList} />
            <TypeList ol={listNumeric}>
                {list.map((item, key) => (
                    <li key={key} className="com-item">
                        {item}
                    </li>
                ))}
            </TypeList>
        </div>
    );
};

TypeList.propTypes = {
    ol: PropTypes.bool,
    children: PropTypes.node.isRequired
};

ListItemsFactory.propTypes = {
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
    titleList: PropTypes.string.isRequired,
    listNumeric: PropTypes.bool
};

export default ListItemsFactory;
