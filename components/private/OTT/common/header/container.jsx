import React, { Component } from 'react';
import HeaderComponent from './component';
import withNavigation from '../../../common/hocs/withNavigation';
import filter from '../../../../../content/filters/OTT/headerNavigations';

class Header extends Component {
    constructor(props) {
        super(props);
        this.data = { 'data-event': 'LinkClick', 'data-section': 'HeaderOTT' };
        this.headerItems = this.getHeaderItems(props);
    }

    getHeaderItems(props) {
        return props.navigations.map(elem => {
            if (elem.node_type === 'link')
                return {
                    href: elem.url,
                    description: elem.display_name,
                    alt: elem.display_name
                };
            if (elem.node_type === 'section') {
                const href = elem.site ? elem.site.site_url : '/';
                return { href: href, description: elem.name, alt: elem.name };
            }
        });
    }

    componentWillUpdate(nextProps, nextState) {
        this.headerItems = this.getHeaderItems(nextProps);
    }

    render() {
        return <HeaderComponent items={this.headerItems} data={this.data} />;
    }
}

export default withNavigation(Header, filter, 'ott');
