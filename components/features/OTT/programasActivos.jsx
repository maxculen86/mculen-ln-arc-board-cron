import React, { Component } from 'react';
import Context from 'fusion:context';
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

export default Context(ProgramasActivos);
