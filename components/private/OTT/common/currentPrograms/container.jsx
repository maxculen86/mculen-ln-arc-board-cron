import React, { PureComponent } from 'react';
import CurrentProgramsComponent from './component';

export default class CurrentPrograms extends PureComponent {
    render() {
        return <CurrentProgramsComponent items={this.props.items} />;
    }
}
