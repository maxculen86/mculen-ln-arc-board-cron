'use strict';

import React, { PureComponent } from 'react';
import FacebookButtonComponent from './component';

export default class FacebookButton extends PureComponent {
    render() {
        return <FacebookButtonComponent href={this.props.href} />;
    }
}
