import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import BreadcrumbComponent from './component';

class Breadcrumb extends Component {
    render() {
        console.log(this.props);
        return <BreadcrumbComponent />;
    }
}

export default Consumer(Breadcrumb);
