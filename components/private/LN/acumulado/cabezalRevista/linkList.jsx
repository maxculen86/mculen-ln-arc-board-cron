import React from 'react';
import PropTypes from 'fusion:prop-types';
import WithNavigation from '../../../common/hocs/withNavigation';

const LinkList = ({ navigations, id }) => {
    const nav = navigations.find(el => el._id === id);
    let links = [];
    if (nav) {
        links = nav.children.map(el => (
            <a className="com-link" href={el.url}>
                {el.display_name}
            </a>
        ));
    }
    return <div className="links">{links}</div>;
};

LinkList.propTypes = {
    navigations: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    display_name: PropTypes.string.isRequired,
                    url: PropTypes.string.isRequired
                })
            )
        })
    ).isRequired,
    id: PropTypes.string.isRequired
};

export default WithNavigation(LinkList, null, 'la-nacion-ar');
