import React from 'react';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import WithNavigation from '../../../common/hocs/withNavigation';

// TODO: Evaluar uso de hoc WithNavigation

function LinkList({ navigations, id }) {
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
}

export default WithNavigation(LinkList, null, 'la-nacion-ar');
