import React, { PureComponent } from 'react';
import Component from './component';
import withSections from '../../../common/hocs/withSections';
import filter from '../../../../../content/filters/OTT/allProgramsSections';

class Container extends PureComponent {
    constructor(props) {
        super(props);
        this.items = this.getProgramsItems(props);
    }

    componentWillUpdate(nextProps) {
        this.items = this.getProgramsItems(nextProps);
    }

    getProgramsItems = ({ sections = [] }) => {
        return sections
            .filter(section => {
                return (
                    section.parent &&
                    section.parent.ActivePrograms &&
                    section.parent.ActivePrograms === '/'
                );
            })
            .map(elem => {
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

    render() {
        return <Component items={this.items} />;
    }
}

export default withSections(Container, filter, 'ott');
