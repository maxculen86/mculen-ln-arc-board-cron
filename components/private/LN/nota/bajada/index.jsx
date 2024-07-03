import React from 'react';
import PropTypes from 'fusion:prop-types';
import Text from '../../../common/text';
import { VIDEO } from '../../../common/utils/subtypes/subtypeHelper';
import { isEmptyString } from '../../../common/utils/dataValidation';
import transformISODate from '../../../common/utils/transformISODate';

const BajadaNota = props => {
    const {
        globalContent: {
            subheadlines: { basic = '' },
            subtype,
            display_date: displayDate
        }
    } = props;

    const subtitle = basic || null;
    const subtitleVideo = !isEmptyString(basic)
        ? basic
        : `Video publicado por LA NACION el ${transformISODate(displayDate)}.`;
    return (
        <Text
            tag="h2"
            size="--m-xs-"
            extraClass="com-subhead --bajada"
            text={subtype === VIDEO ? subtitleVideo : subtitle}
        />
    );
};

BajadaNota.propTypes = {
    globalContent: PropTypes.shape({
        subheadlines: PropTypes.shape({
            basic: PropTypes.string
        }).isRequired
    }).isRequired
};

export default BajadaNota;
