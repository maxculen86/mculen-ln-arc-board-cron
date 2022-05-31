import React, { PureComponent } from 'react';
import Component from './component';
import withNavigation from '../../../common/hocs/withNavigation';
import filter from '../../../../../content/filters/OTT/activeProgramsNavigations';

class Container extends PureComponent {
    constructor(props) {
        super(props);
        const { customFields: { style = '' } = {} } = props || {};
        this.items = this.getActiveProgramsItems(props);
        this.style = style;
    }

    getActiveProgramsItems = ({ navigations = [] }) => {
        return navigations.map((elem, index) => {
            return {
                href: elem.site ? elem.site.site_url : '/',
                description: elem.name,
                alt: elem.name,
                imgId: elem.OTT_Program
                    ? elem.OTT_Program.small_image_program_id
                    : ''
            };
        });
    };

    componentWillUpdate(nextProps) {
        this.items = this.getActiveProgramsItems(nextProps);
    }

    render() {
        return <Component items={this.items} type={this.style} />;
    }
}

export default withNavigation(Container, filter, 'ott');
