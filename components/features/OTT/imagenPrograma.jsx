import React, { Component } from 'react';
import get from 'lodash.get';
import Consumer from 'fusion:consumer';
import ImagenProgramComponent from '../../private/OTT/programa/programImage';

class ImagenPrograma extends Component {
    constructor(props) {
        super(props);
        if (!Object.keys(this.props.globalContent).length)
            throw new Error(
                'El feature UltimosVideosDeProgramas debe ser utilizado en Templates'
            );

        this.imageId = get(
            this.props,
            'globalContent.OTT_Program.image_program_id',
            null
        );
    }

    render() {
        return <ImagenProgramComponent imageId={this.imageId} />;
    }
}
export default Consumer(ImagenPrograma);
