'use strict';

import React, { PureComponent } from 'react';
import NavComponent from './component';

export default class Nav extends PureComponent {
    render() {
        return (
            <NavComponent {...this.props}>{this.props.children}</NavComponent>
        );
    }
}
