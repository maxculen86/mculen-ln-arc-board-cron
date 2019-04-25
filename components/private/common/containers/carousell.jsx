import React, { PureComponent } from 'react';
import CarousellComponent from '../components/carousell';
import CarousellNextButton from './carousellNextButton';
import CarousellPrevButton from './carousellPrevButton';
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
