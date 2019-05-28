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

    componentDidMount() {
        const header = document.querySelector('.header');
        const menuSticky = 'sticky';
        window.addEventListener('scroll', () => {
            window.pageYOffset > 0
                ? header.classList.add(menuSticky)
                : header.classList.remove(menuSticky);
        });
    }
}
Header.static = true;

export default Context(Header);
// import container from './container';
// export default container;
