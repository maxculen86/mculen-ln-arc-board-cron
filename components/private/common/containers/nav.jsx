'use strict';

import React, { PureComponent } from 'react';
import NavComponent from '../components/nav';

export default class Nav extends PureComponent {
    render() {
        return (
            <NavComponent {...this.props}>{this.props.children}</NavComponent>
        );
    }
}
