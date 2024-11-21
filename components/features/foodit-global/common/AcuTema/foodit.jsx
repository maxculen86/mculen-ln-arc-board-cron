import React from 'react';
import PropTypes from 'fusion:prop-types';
import GridTemaServer from './helpers/gridTemaServer';
import GridTemaClient from './helpers/gridTemaClient';

function AcuTema({ globalContent }) {
    const { articles } = globalContent;
    return (
        <>
            <GridTemaServer articles={articles} />
            <GridTemaClient globalContent={globalContent} />
        </>
    );
}
AcuTema.propTypes = {
    globalContent: PropTypes.object.isRequired
};

export default AcuTema;
