import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';

import config from '../../properties/sites/la-nacion-ar';

const OptaLayout = ({ children }) => {
    return (
        <>
            <opta-widget
                sport="football"
                widget="standings"
                template="normal"
                live="false"
                competition="8"
                season="2015"
                match=""
                team=""
                team_padding=""
                navigation=""
                default_nav="1"
                side="combined"
                data_detail="default"
                dividers=""
                show_key="false"
                show_crests="false"
                points_in_first_column="false"
                show_form="6"
                group=""
                crop=""
                competition_naming="full"
                team_naming="full"
                team_link=""
                date_format="dddd D MMMM YYYY"
                sorting="false"
                show_logo="true"
                breakpoints="400"
            />
            <div
                style={{ width: '800px', padding: '20px' }}
                dangerouslySetInnerHTML={{ __html: children }}
            />
        </>
    );
};

OptaLayout.sections = [];

export default OptaLayout;
