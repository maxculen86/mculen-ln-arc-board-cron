import React, { Component } from 'react';
import HeaderContainer from './container';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';

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
// import container from './container';
// export default container;
