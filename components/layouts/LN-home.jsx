/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
import '../../resources/dist/css/ln/components/hour.css';

const layoutItems = ['BloqueBomba', 'BloqueCuerpo'];

// eslint-disable-next-line react/prefer-stateless-function
class LNHomeLayout extends Component {
    render() {
        return (
            <>
                <Header />
                <main>
                    <div id="content-main" className="lay-sidebar">
                        <div className="row">
                            {this.props.children[0]}
                            {this.props.children[1]}
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }
}

LNHomeLayout.sections = layoutItems;

export default LNHomeLayout;
