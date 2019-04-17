import React, { Component } from 'react';
import Carousell from '../private/common/containers/carousell';
export default class carrusel extends Component {
    render() {
        return <Carousell>{this.props.children}</Carousell>;
    }
}
