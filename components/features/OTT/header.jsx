import React, { Component } from 'react';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import HeaderContainer from '../../private/OTT/common/header';

class Header extends Component {
    constructor(props) {
        super(props);
        const siteVars = getProperties(props.arcSite);
        this.headerHierarchy = siteVars.header.hierarchy;
    }

    render() {
        return <HeaderContainer hierarchy={this.headerHierarchy} />;
    }
}
Header.static = true;

export default Context(Header);
