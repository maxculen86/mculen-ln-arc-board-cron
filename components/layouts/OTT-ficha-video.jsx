import React, { PureComponent } from 'react';
import Footer from '../private/OTT/layouts/footer/containers/footer';

const layoutItems = ['header', 'main'];

class OTTFichaVideoLayout extends PureComponent {
    render() {
        return (
            <>
                {this.props.children[0]}
                {this.props.children[1]}
                <Footer />
            </>
        );
    }
}

export default OTTFichaVideoLayout;

OTTFichaVideoLayout.sections = layoutItems;
