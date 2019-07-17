import React, { Component } from 'react';
import Consumer from 'fusion:consumer';

import Breadcrumb from '../../private/LN/nota/breadcrumb';

class AperturaReceta extends Component {
    render() {
        return (
            <div>
                <Breadcrumb
                    siteProperties={this.props.siteProperties}
                    globalContent={this.props.globalContent}
                />
            </div>
        );
    }
}

export default Consumer(AperturaReceta);
