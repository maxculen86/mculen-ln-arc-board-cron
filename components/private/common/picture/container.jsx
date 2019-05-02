'use strict';

import React, { PureComponent } from 'react';
import PictureComponent from './component';

export default class Picture extends PureComponent {
    render() {
        return (
            <PictureComponent {...this.props}>
                {this.props.children}
            </PictureComponent>
        );
    }
}
