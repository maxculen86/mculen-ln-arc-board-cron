import React, { PureComponent } from 'react';
import CarousellNextButtonComponent from './component';
export default class CarousellNextButton extends PureComponent {
    render() {
        return <CarousellNextButtonComponent onClick={this.props.onClick} />;
    }
}
