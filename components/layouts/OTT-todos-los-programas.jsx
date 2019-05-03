import React, { Component } from 'react';
import Footer from '../private/OTT/common/footer';
import '../../resources/OTT/styles-grid/ott/ott.css';

const layoutItems = ['Header', 'Grilla de Programas', 'Bloque-1'];

class OTTTodosLosProgramasLayout extends Component {
    render() {
        return (
            <div className={'wrapper'}>
                {this.props.children[0]}
                <main className={'main'}>
                    <section className={'programas'}>
                        {this.props.children[1]}
                    </section>
                    {this.props.children[2]}
                </main>
                <Footer />
            </div>
        );
    }
}

export default OTTTodosLosProgramasLayout;

OTTTodosLosProgramasLayout.sections = layoutItems;
