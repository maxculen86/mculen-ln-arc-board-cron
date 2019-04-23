'use strict';

import React, { PureComponent } from 'react';
import TitleComponent from '../components/title';

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
