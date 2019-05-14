import React, { Component } from 'react';
import ImagenProgramComponent from '../../private/OTT/programa/programImage';
import get from 'lodash.get';
import Consumer from 'fusion:consumer';

@Consumer
class ImagenPrograma extends Component {
    constructor(props) {
        super(props);
        if (!Object.keys(this.props.globalContent).length)
            throw new Error(
                'El feature UltimosVideosDeProgramas debe ser utilizado en Templates'
            );

        console.log('props imagen programa', props);

        this.imageId = get(
            this.props,
            'globalContent.OTT_Program.image_program_id',
            null
        );
    }
    render() {
        if (!this.imageId) return null;
        return <ImagenProgramComponent imageId={this.imageId} />;
    }
}
export default ImagenPrograma;
