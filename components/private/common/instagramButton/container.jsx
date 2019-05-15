'use strict';

import React, { PureComponent } from 'react';
import InstagramButtonComponent from './component';

export default class InstagramButton extends PureComponent {
    handleButtonClick = () => {
        window.open(this.props.href);
    };

    render() {
        return <InstagramButtonComponent onClick={this.handleButtonClick} />;
    }
}
