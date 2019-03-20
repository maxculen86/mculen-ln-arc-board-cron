import React, { PureComponent } from 'react'
import CarrousellPrevButtonComponent from '../components/carrousellPrevButton'
export default class CarrousellPrevButton extends PureComponent {

  render() {
    return (
      <CarrousellPrevButtonComponent onClick={this.props.onClick} />
    )
  }
}
