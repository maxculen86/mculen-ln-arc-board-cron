import React from 'react';
import PropTypes from 'fusion:prop-types';

const ListOrderedOrUnordered = ({ data }) => {
    switch (data.list_type) {
        case 'ordered':
            return (
                <ul className="com-ordered">
                    {data.items.map((element, i) => (
                        <li
                            className="com-item"
                            dangerouslySetInnerHTML={{
                                __html: element.content
                            }}
                        />
                    ))}
                </ul>
            );
        case 'unordered': {
            return (
                <ul className="com-unordered">
                    {data.items.map((element, i) => (
                        <li
                            className="com-item"
                            dangerouslySetInnerHTML={{
                                __html: element.content
                            }}
                        />
                    ))}
                </ul>
            );
        }
        default:
            return (
                <ul className="com-unordered">
                    {data.items.map((element, i) => (
                        <li
                            className="com-item"
                            dangerouslySetInnerHTML={{
                                __html: element.content
                            }}
                        />
                    ))}
                </ul>
            );
    }
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
