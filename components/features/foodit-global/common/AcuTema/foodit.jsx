import React from 'react';
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

export default AcuTema;
