'use strict';

import React, { PureComponent } from 'react';
import PictureSourceComponent from '../components/pictureSource';

export default class PictureSource extends PureComponent {
    render() {
        return (
            <PictureSourceComponent
                media={this.props.media}
                srcset={this.props.srcset}
                className={this.props.className}
            />
        );
    }
}
