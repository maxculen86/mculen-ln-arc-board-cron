import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Header from '../../components/private/LN/common/header';
import AcuTitle from '../../components/private/LN/acumulado/acumuladoTitle';

const layoutItems = ['Apertura', 'Links', 'Notas', 'Aside'];

class LNAcumuladoLayout extends Component {
    render() {
        console.log(this.props);
        return (
            <div id="wrap">
                <Header />
                <main>
                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            <div className="row">
                                <AcuTitle
                                    title={this.props.globalContent.name}
                                />
                                {/* LUGAR PARA UN ANEXO */}
                                {this.props.children[0]}
                            </div>
                            <div className="row">
                                {/* LINKS DE NAVEGACION */}
                                {this.props.children[1]}
                            </div>
                            <section className="row-gap-tablet-2 row-gap-desksm-3">
                                {/* NOTAS */}
                                {this.props.children[2]}
                            </section>
                        </div>

                        <div className="sidebar__aside">
                            {/* RANKING DE NOTAS */}
                            {this.props.children[3]}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

LNAcumuladoLayout.sections = layoutItems;

export default Consumer(LNAcumuladoLayout);
