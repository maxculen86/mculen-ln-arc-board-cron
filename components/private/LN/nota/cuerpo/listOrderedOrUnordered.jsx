/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const ListOrderedOrUnordered = ({ data }) => {
    let classList = 'com-unordered';
    if (data.list_type === 'ordered') {
        classList = 'com-ordered';
    }
    return (
        <ul className={classList}>
            {data.items.map(element => (
                <li
                    key={element._id}
                    className="com-item"
                    dangerouslySetInnerHTML={{
                        __html: element.content
                    }}
                />
            ))}
        </ul>
    );
};

ListOrderedOrUnordered.arcType = 'list';

ListOrderedOrUnordered.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        list_type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default ListOrderedOrUnordered;
