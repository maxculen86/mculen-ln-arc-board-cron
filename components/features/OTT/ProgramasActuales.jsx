import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import {
    buildCurrentProgramsCustomFields,
    getCurrentProgramsCustomFields
} from '../../private/OTT/utils/CustomFieldsCurrentProgramHelper';
import CurrentProgramContainer from '../../private/OTT/features/currentPrograms/containers/currentPrograms';

const MAX_PROGRAM_COUNT = 16;

class CurrentPrograms extends Component {
    constructor(props) {
        super(props);
        this.CurrentProgramsCustomFields = getCurrentProgramsCustomFields(
            MAX_PROGRAM_COUNT,
            this.props
        ).filter(elem => elem.description != null && elem.imgSrc != null);
    }
    render() {
        return (
            <CurrentProgramContainer items={this.CurrentProgramsCustomFields} />
        );
    }
}

function getCustomFields() {
    const CurrentProgramsCustomFields = buildCurrentProgramsCustomFields(
        MAX_PROGRAM_COUNT
    );
    return PropTypes.shape(Object.assign(CurrentProgramsCustomFields));
}

CurrentPrograms.propTypes = {
    customFields: getCustomFields()
};
export default CurrentPrograms;
