import React, { PureComponent } from 'react'
import CarousellNextButtonComponent from '../components/carousellNextButton'
export default class CarousellNextButton extends PureComponent {

  render() {
    return (
      <CarousellNextButtonComponent onClick={this.props.onClick} />
    )
  }
}
