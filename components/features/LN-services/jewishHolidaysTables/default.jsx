import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import Table from '../../../private/LN/nota/cuerpo/table';
import ModheaderSection from '../../../private/common/mod-headerSection';

const JewishHolidaysTable = ({ id: _featureId = {} }) => {
    const jewishTable = get(
        useAppContext(),
        'globalContent.dataService.tables.Judio',
        {}
    );

    return Object.keys(jewishTable).length ? (
        <>
            <ModheaderSection
                tag="h2"
                font="sueca"
                title="Feriados judíos"
                line
            />
            <Table data={jewishTable} extraClass="--holidays" />
        </>
    ) : (
        <></>
    );
};

JewishHolidaysTable.label = 'LN Tabla Feriados Judíos';
JewishHolidaysTable.lazy = true;
JewishHolidaysTable.propTypes = {
    id: PropTypes.string.isRequired
};

export default JewishHolidaysTable;
