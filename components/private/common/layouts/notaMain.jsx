import React from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import Header from '../../LN/common/header';
import Footer from '../../LN/common/footer';

const NotaMain = ({ children }) => {
    return (
        <>
            <Header />
            <main id="content">
                {children[1]}
                <div className="lay --apertura">
                    <div className="row">
                        <div className="col-12">
                            {/* Titulo (breadcrumb, logo+titulo) */}
                            {children[2]}
                        </div>
                    </div>
                </div>
                <div className="lay-sidebar">
                    {/* Cuerpo */}
                    <div className="sidebar__main">
                        <div className="row">
                            <div className="col-12 ">
                                {/* Bajada y autor fecha más apertura */}
                                {children[3]}
                            </div>
                        </div>
                        <section className="cuerpo__nota">
                            <div className="row">
                                <div className="col-12 col-desksm-1">
                                    {/* hlp-mobile-show */}
                                    {/* Left-Cuerpo Shared */}
                                    {children[4]}
                                </div>
                                <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                    <div className="row">
                                        <div className="col-12">
                                            {/* Pos-Apertura */}
                                            {children[5]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* Tercera */}
                    <div className="sidebar__aside hlp-tabletlm-none">
                        {children[6]}
                    </div>
                </div>
                {/* Newsletter */}
                <div className="lay">{children[8]}</div>
                <div className="lay-sidebar">
                    <div className="sidebar__main">
                        {/* Bottom */}
                        {children[9]}
                    </div>
                    <div className="sidebar__aside hlp-tabletlm-none">
                        {/* Bottom-Tercera */}
                        {children[10]}
                    </div>
                </div>
            </main>
            <Static id="StaticFooter">
                <Footer />
            </Static>
        </>
    );
};

NotaMain.propTypes = {
    children: PropTypes.node.isRequired
};

export default NotaMain;
