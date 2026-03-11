import React from 'react';
import '../../../resources/dist/css/ln/components/com-ordered.css';
import '../../../resources/dist/css/ln/components/com-unordered.css';
import Text from './text';

function TypeList({ ol, children }) {
    return ol ? (
        <ol className="com-ordered">{children}</ol>
    ) : (
        <ul className="com-unordered">{children}</ul>
    );
}
function ListItemsFactory({ list, titleList, listNumeric }) {
    return (
        <div>
            <Text size="2xs" weight="bold" tag="h4" text={titleList} />
            <TypeList ol={listNumeric}>
                {list.map((item, key) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={key} className="com-item">
                        {item}
                    </li>
                ))}
            </TypeList>
        </div>
    );
}

export default ListItemsFactory;
