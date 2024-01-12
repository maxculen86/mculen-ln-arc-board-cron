import React from 'react';
import Consumer from 'fusion:consumer';
import GridFooditServer from './helpers/gridFooditServer';
import GridFooditClient from './helpers/gridFooditClient';

const GrillaNotasFoodit = ({ globalContent: { _id: idSection = '' } }) => {
    return (
        <>
            <GridFooditServer idSection={idSection} />
            <GridFooditClient idSection={idSection} />
        </>
    );
};

export default Consumer(GrillaNotasFoodit);
