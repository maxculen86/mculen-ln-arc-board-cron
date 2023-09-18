import React from 'react';
import PropTypes from 'fusion:prop-types';
import RoofRugby from './RoofRugby';

const RugbyWidget = ({ customFields = {} }) => {
    const { id1, id2, id3, id4 } = customFields;
    if ([id1, id2, id3, id4].some(id => typeof id !== 'number')) {
        return <></>;
    }

    return (
        <RoofRugby>
            <opta-widget
                widget="fixtures"
                competition="210"
                season="2024"
                match={`${id1},${id2},${id3},${id4}`}
                template="grid"
                live="true"
                show_venue="false"
                match_status="all"
                grouping="date"
                show_grouping="false"
                navigation="none"
                default_nav="1"
                start_on_current="true"
                sub_grouping="date"
                order_by="date_ascending"
                show_crests="true"
                date_format="L"
                month_date_format="MMMM"
                competition_naming="full"
                team_naming="full"
                pre_match="false"
                show_live="true"
                show_logo="false"
                show_title="false"
                breakpoints="400"
                sport="rugby"
            />
        </RoofRugby>
    );
};

RugbyWidget.label = 'LN-common rugbyWidget';

RugbyWidget.propTypes = {
    customFields: PropTypes.shape({
        id1: PropTypes.number.tag({
            label: 'Id 1',
            description: 'Ingrese el id del partido',
            default: 0
        }).isRequired,
        id2: PropTypes.number.tag({
            label: 'Id 2',
            description: 'Ingrese el id del partido',
            default: 0
        }).isRequired,
        id3: PropTypes.number.tag({
            label: 'Id 3',
            description: 'Ingrese el id del partido',
            default: 0
        }).isRequired,
        id4: PropTypes.number.tag({
            label: 'Id 4',
            description: 'Ingrese el id del partido',
            default: 0
        }).isRequired
    })
};

export default RugbyWidget;
