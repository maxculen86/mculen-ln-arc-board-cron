import React, { Component } from 'react'
import PropTypes from 'fusion:prop-types';
import LastVideosByProgram from '../../private/OTT/features/LastVideosByProgram/containers/LastVideosByProgram';

class UltimosVideosDeProgramas extends Component {

    
  render() {
    return <LastVideosByProgram sectionId={this.props.customFields.sectionId}/>
  }
}

UltimosVideosDeProgramas.propTypes = {
    customFields: {
        sectionId: PropTypes.string.tag({
            name: 'Id de Programa Ej: terapia-noticias'
        })
    }
}

export default UltimosVideosDeProgramas 
