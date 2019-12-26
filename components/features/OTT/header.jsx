import React, { Component } from 'react';
import Context from 'fusion:context';
import Static from 'fusion:static';
import getProperties from 'fusion:properties';
import HeaderContainer from '../../private/OTT/common/header';

class Header extends Component {
    constructor(props) {
        super(props);
        const siteVars = getProperties(props.arcSite);
        this.headerHierarchy = siteVars.header.hierarchy;
    }

    render() {
        const { id: featureId } = this.props;

        return (
            // <Static id={featureId}>
            <HeaderContainer hierarchy={this.headerHierarchy} />
            // </Static>
        );
    }
}

export default Context(Header);
