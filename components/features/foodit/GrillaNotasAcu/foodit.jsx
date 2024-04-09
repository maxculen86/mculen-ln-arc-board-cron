import React, { useState } from 'react';
import Consumer from 'fusion:consumer';
import GridFooditServer from './helpers/gridFooditServer';
import GridFooditClient from './helpers/gridFooditClient';

const GrillaNotasFoodit = ({
    globalContent: { _id: id = '' },
    layout = ''
}) => {
    const [showButton, setShowButton] = useState(true);
    const maxArticles = 24;
    const haveShowButton = () => {
        setShowButton(false);
    };
    return (
        <>
            <GridFooditServer
                id={id}
                layout={layout}
                maxArticles={maxArticles}
                haveShowButton={haveShowButton}
            />
            <GridFooditClient
                id={id}
                layout={layout}
                maxArticles={maxArticles}
                showButton={showButton}
            />
        </>
    );
};

export default Consumer(GrillaNotasFoodit);
