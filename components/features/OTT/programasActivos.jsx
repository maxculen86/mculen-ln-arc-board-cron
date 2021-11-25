import React, { Component } from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import getProperties from 'fusion:properties';
import ActiveProgramsContainer from '../../private/OTT/common/activePrograms';

class ProgramasActivos extends Component {
    constructor(props) {
        super(props);
        const siteVars = getProperties(props.arcSite);
        this.activeProgramsHierarchy = siteVars.activeProgramsHierarchy;
    }

    render() {
        return (
            <ActiveProgramsContainer hierarchy={this.activeProgramsHierarchy} />
        );
    }
}

ProgramasActivos.propTypes = {
    customFields: PropTypes.shape({
        style: PropTypes.string.tag({
            label: 'Style',
            description: 'Seleccione un estilo',
            defaultValue: 'Carousel'
        }).isRequired
    }).isRequired
};

export default Context(ProgramasActivos);
