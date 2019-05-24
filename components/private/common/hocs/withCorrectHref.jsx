'use strict';

import React, { PureComponent } from 'react';
import Context from 'fusion:context';
import hrefHelper from '../utils/hrefHelper';

function withCorrectHref(WrappedComponent) {
    return Context(
        class extends PureComponent {
            constructor(props) {
                super(props);
                this.href = props.href
                    ? hrefHelper.createCorrectHref(props, props.href)
                    : '';
            }

            render() {
                return <WrappedComponent {...this.props} href={this.href} />;
            }
        }
    );
}

export default withCorrectHref;
