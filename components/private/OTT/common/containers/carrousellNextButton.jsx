import React, { PureComponent } from 'react'
import CarrousellNextButtonComponent from '../components/carrousellNextButton'
export default class CarrousellNextButton extends PureComponent {

  render() {
    return (
      <CarrousellNextButtonComponent onClick={this.props.onClick} />
    )
  }
}
