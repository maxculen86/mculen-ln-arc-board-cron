import React, { PureComponent } from 'react';
import Component from './component';
import withSections from '../../../common/hocs/withSections';
import filter from '../../../../../content/filters/OTT/allProgramsSections';
class Container extends PureComponent {
    constructor(props) {
        super(props);
        this.items = this.getProgramsItems(props);
    }

    getProgramsItems = props => {
        return props.sections.map((elem, index) => {
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
        this.items = this.getProgramsItems(nextProps);
    }
    render() {
        return <Component items={this.items} />;
    }
}

export default withSections(Container, filter, 'ott');
