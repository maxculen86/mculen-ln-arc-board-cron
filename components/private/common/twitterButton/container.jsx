'use strict';

import React, { PureComponent } from 'react';
import TwitterButtonComponent from './component';

export default class TwitterButton extends PureComponent {
    handleButtonClick = () => {
        window.open(this.props.href);
    };

    render() {
        return <TwitterButtonComponent onClick={this.handleButtonClick} />;
    }
}
