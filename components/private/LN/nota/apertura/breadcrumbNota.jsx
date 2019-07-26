import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import BreadcrumbComponent from '../../common/breadcrumbBase';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
        this.allSections = [];
        if (this.props.globalContent.taxonomy.primary_section) {
            this.getPrimaryTree(
                this.props.globalContent.taxonomy.primary_section
            );
        }
        this.allSections.push({
            name: this.props.siteProperties.title,
            path: '/',
            type: 'site'
        });
        this.allSections = this.allSections.reverse();
    }

    getPrimaryTree(section) {
        this.allSections.push({
            name: section.name,
            path: section.path,
            type: 'category'
        });
        if (section.parent_id && section.parent_id !== '/') {
            this.getPrimaryTree(
                this.props.globalContent.taxonomy.sections.find(
                    parent => parent._id === section.parent_id
                )
            );
        }
    }

    render() {
        return <BreadcrumbComponent sections={this.allSections.slice(0, 3)} />;
    }
}

export default Consumer(Breadcrumb);
