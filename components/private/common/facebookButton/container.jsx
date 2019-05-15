'use strict';

import React, { PureComponent } from 'react';
import FacebookButtonComponent from './component';

export default class FacebookButton extends PureComponent {
    handleButtonClick = () => {
        window.open(this.props.href);
    };

    render() {
        return <FacebookButtonComponent onClick={this.handleButtonClick} />;
    }
}
