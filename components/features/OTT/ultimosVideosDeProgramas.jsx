import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import LastVideosByProgram from '../../private/OTT/features/lastVideosByProgram/containers/lastVideosByProgram';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

class UltimosVideosDeProgramas extends Component {
    render() {
        const sectionId = get(
            this.props,
            'globalContent.taxonomy.sections[0].name',
            null
        );
        console.log(
            'this.props.customFields.sectionId',
            this.props.customFields.sectionId
        );
        if (sectionId && !this.props.customFields.sectionId)
            return <LastVideosByProgram sectionId={sectionId} />;
        else
            return (
                <LastVideosByProgram
                    sectionId={this.props.customFields.sectionId}
                />
            );
    }
}

UltimosVideosDeProgramas.propTypes = {
    customFields: PropTypes.shape({
        sectionId: PropTypes.string.tag({
            name: 'Id de Programa Ej: terapia-noticias'
        })
    })
};

export default Consumer(UltimosVideosDeProgramas);
