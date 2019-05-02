'use strict';

import React, { PureComponent } from 'react';
import PictureSourceComponent from './component';

export default class PictureSource extends PureComponent {
    render() {
        return (
            <PictureSourceComponent
                media={this.props.media}
                srcSet={this.props.srcSet}
                className={this.props.className}
                alt={this.props.alt}
            />
        );
    }
}
