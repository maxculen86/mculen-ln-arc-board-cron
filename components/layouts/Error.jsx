import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Arc404 from '../../private/OTT/common/error404';

const ErrorPage = props => {
    console.log('props **********', props);
    return (
        /* this.props.arcSite;
        if (this.props.arcSite == 'ott') return <Arc404 />; */

        <div>ERROOOOOOOORRRR ..... !!!!</div>
    );
};

export default Consumer(ErrorPage);
