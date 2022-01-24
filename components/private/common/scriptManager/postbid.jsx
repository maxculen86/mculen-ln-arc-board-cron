import React, { Component } from 'react';
import { IS_DEV, IS_SANDBOX } from 'fusion:environment';
import getSectionName from '../../LN/common/utils/getSectionName';
export default class PostBid extends Component {
    constructor(props) {
        super(props);

        const { config, location = 'head' } = props;

        this.location = location;
        this.config = config;
    }

    render() {
        const { globalContent } = this.props;
        const { type = '', node_type: nodeType = '' } = globalContent || {};

        const isTest =
            IS_DEV === 'true' && IS_SANDBOX === 'true' ? '_test' : '';

        return (
            ['nota', 'acumulado'].includes(
                getSectionName({ nodeType, type })
            ) && (
                <script
                    async
                    src={`https://ads.rubiconproject.com/prebid/20148_LaNacion_Desktop${isTest}.js`}
                />
            )
        );
    }
}
