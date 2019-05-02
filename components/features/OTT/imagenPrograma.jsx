import React, { Component } from 'react';
import ImagenProgramComponent from '../../private/OTT/programa/programImage';
import PropTypes from 'fusion:prop-types';
class ImagenPrograma extends Component {
    render() {
        return (
            <ImagenProgramComponent imageId={this.props.customFields.imageId} />
        );
    }
}
ImagenPrograma.propTypes = {
    customFields: PropTypes.shape({
        imageId: PropTypes.string.tag({ label: 'Id Imagen' })
    })
};
export default ImagenPrograma;
