'use strict';

import React, { PureComponent } from 'react';
import LinkedTitleComponent from '../components/linkedTitle';

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
