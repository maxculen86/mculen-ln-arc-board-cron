import React, { Component } from 'react';
import Arc404 from '../../private/OTT/common/error404';
import Consumer from 'fusion:consumer';

@Consumer
export default class Error404 extends Component {
    render() {
        this.props.arcSite;
        if (this.props.arcSite == 'ott') return <Arc404 />;
        else {
            return <div>este sitio no tiene un error 404</div>;
        }
    }
}
