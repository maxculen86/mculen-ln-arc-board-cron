'use strict';

import React, { PureComponent } from 'react';
import TitleComponent from './component';

export default class Title extends PureComponent {
    render() {
        return (
            <TitleComponent
                className={this.props.className}
                title={this.props.title}
            />
        );
    }
}
