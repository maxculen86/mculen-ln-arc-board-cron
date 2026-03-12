import React from 'react';
import { BaseLayout } from '../../../features/LN-10-global/common/baseLayout/default';
import AperturaVideo100 from './apertura/default';

function NotaVideo100({ children }) {
    return (
        <BaseLayout className="liveblog-editorial">
            <main id="content" className="--header-fixed-margin">
                <AperturaVideo100>{children[2]}</AperturaVideo100>
                <div className="lay-sidebar">
                    {/* Cuerpo */}
                    <div className="sidebar__main">
                        <section id="cuerpo__nota" className="cuerpo__nota">
                            <div className="row">
                                <div className="col-12 col-desksm-1">
                                    {/* hlp-mobile-show */}
                                    {/* Left-Cuerpo Shared */}
                                    {children[3]}
                                </div>
                                <div className="col-deskxl-10 offset-deskxl-1 col-desksm-11">
                                    <div className="row">
                                        <div className="col-12">
                                            {children[4]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* Tercera */}
                    <div className="sidebar__aside hlp-tabletlm-none">
                        {children[5]}
                    </div>
                </div>
                {/* Newsletter */}
                <div className="lay">{children[7]}</div>
                <div className="lay-sidebar">
                    <div className="sidebar__main">
                        {/* Bottom */}
                        {children[8]}
                    </div>
                    <div className="sidebar__aside hlp-tabletlm-none">
                        {/* Bottom-Tercera */}
                        {children[9]}
                    </div>
                </div>
            </main>
        </BaseLayout>
    );
}

export default NotaVideo100;
