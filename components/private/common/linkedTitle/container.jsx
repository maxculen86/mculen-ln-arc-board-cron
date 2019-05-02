'use strict';

import React, { PureComponent } from 'react';
import LinkedTitleComponent from './component';

export default class LinkedTitle extends PureComponent {
    render() {
        return (
            <LinkedTitleComponent
                href={this.props.href}
                title={this.props.title}
            />
        );
    }
}
