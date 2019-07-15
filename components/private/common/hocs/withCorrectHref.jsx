import React, { PureComponent } from 'react';
import Context from 'fusion:context';
import hrefHelper from '../utils/hrefHelper';

function withCorrectHref(WrappedComponent) {
    return Context(
        class extends PureComponent {
            constructor(props) {
                super(props);

                const { arcSite, href, contextPath } = props;

                this.href = hrefHelper.createCorrectHref(
                    href,
                    arcSite,
                    contextPath
                );
            }

            render() {
                return <WrappedComponent {...this.props} href={this.href} />;
            }
        }
    );
}

export default withCorrectHref;
