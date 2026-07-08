import React, { Component } from 'react';
import { IS_DEV, IS_SANDBOX } from 'fusion:environment';
import getSectionName from '../../LN/common/utils/getSectionName';

export default class PostBid extends Component {
    render() {
        const { globalContent } = this.props;
        const { type = '', node_type: nodeType = '' } = globalContent || {};

        const isTest =
            IS_DEV === 'true' && IS_SANDBOX === 'true' ? '_test' : '';

        return (
            ['nota', 'acumulado'].includes(
                getSectionName({ nodeType, type })
            ) && (
                <>
                    <script
                        async
                        src={`https://micro.rubiconproject.com/prebid/dynamic/20148${isTest}.js`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            var pbjs = pbjs || {};
                            pbjs.que = pbjs.que || [];`
                        }}
                    />
                </>
            )
        );
    }
}
