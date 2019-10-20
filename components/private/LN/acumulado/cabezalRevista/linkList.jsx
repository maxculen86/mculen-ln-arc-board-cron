import React from 'react';
import PropTypes from 'fusion:prop-types';

const LinkList = ({ links }) => {
    const linksAnchors = links.map(el => (
        <a className="com-link" href={el.url}>
            {el.text}
        </a>
    ));
    return (
        <div className="links">
            {/* MAXIMO 5 */}
            {linksAnchors}
        </div>
    );
};

LinkList.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired
};

export default LinkList;
