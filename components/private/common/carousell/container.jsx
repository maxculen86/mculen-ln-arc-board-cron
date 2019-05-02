import React, { PureComponent } from 'react';
import CarousellComponent from './component';
import CarousellNextButton from './carousellNextButton/container';
import CarousellPrevButton from './carousellPrevButton/container';
import Slider from '../../OTT/common/hocs/slider';

const DEFAULT_PAGESIZE = 4;

class Carousell extends PureComponent {
    render() {
        return (
            <CarousellComponent>
                {this.props.slider.hasPrevPage() && (
                    <CarousellPrevButton
                        onClick={this.props.slider.prevButtonHandler}
                    />
                )}
                {this.props.children}
                {this.props.slider.hasNextPage() && (
                    <CarousellNextButton
                        onClick={this.props.slider.nextButtonHandler}
                    />
                )}
            </CarousellComponent>
        );
    }
}

export default Slider(Carousell, DEFAULT_PAGESIZE);
