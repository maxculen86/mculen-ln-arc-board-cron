import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import {
    buildSpecialVideoCustomFields,
    getSpecialVideoCustomFields
} from '../../private/OTT/utils/CustomFieldsSpecialVideoHelper';
import SpecialVideoContainer from '../../private/OTT/specialVideo/containers/specialVideo';

const MAX_VIDEOS_COUNT = 8;

class SpecialVideo extends Component {
    constructor(props) {
        super(props);
        this.videoIdsCustomFields = getSpecialVideoCustomFields(
            MAX_VIDEOS_COUNT,
            this.props
        )
            .filter(elem => elem.idVideo != null)
            .map(elem => elem.idVideo);
    }

    render() {
        return <SpecialVideoContainer videoIds={this.videoIdsCustomFields} />;
    }
}

function getCustomFields() {
    const SpecialVideoCustomFields = buildSpecialVideoCustomFields(
        MAX_VIDEOS_COUNT
    );
    return PropTypes.shape(Object.assign(SpecialVideoCustomFields));
}

SpecialVideo.propTypes = {
    customFields: getCustomFields()
};

export default SpecialVideo;
