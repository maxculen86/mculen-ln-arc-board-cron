'use strict';

import React, { PureComponent } from 'react';
import IosButtonButtonComponent from './component';

export default class IosButton extends PureComponent {
    handleButtonClick = () => {
        window.open(this.props.href);
    };

    render() {
        return <IosButtonButtonComponent onClick={this.handleButtonClick} />;
    }
}
