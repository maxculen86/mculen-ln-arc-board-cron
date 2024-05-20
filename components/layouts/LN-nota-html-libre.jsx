import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import classNames from 'classnames';
import Header from '../features/LN-10-global/header/default';
import HtmlLibre from '../private/LN/nota/cuerpo/htmlLibre';

import GlobalProvider from '../private/common/context/globalContext';
import getBannerMegatop from '../private/common/utils/getBannerMegatop';
import LoadBannersSSR from '../private/common/banners/LoadBannersSSR';

const lnNotaNoticia = ({
    children: [bannerMegatop, bottom, bottomTercera],
    outputType,
    tree,
    isAdmin
}) => {
    const amp = outputType === 'amp' ? 'amp' : '';

    const classNameWrapper = classNames(
        'wrapper',
        '--top-fixed',
        'nota',
        'html-libre',
        amp
    );

    return (
        <GlobalProvider>
            {/* Banner Megatop */}
            {getBannerMegatop(bannerMegatop, amp, tree, isAdmin)}

            <div id="wrapper" className={classNameWrapper}>
                <Header />
                <main id="content" className="--header-fixed-margin">
                    <div
                        className="lay --apertura"
                        style={{ maxWidth: '100%', padding: '0rem' }}
                    >
                        <div className="row">
                            <div className="col-12">
                                {/* Html libre */}
                                <HtmlLibre />
                            </div>
                        </div>
                    </div>

                    <div className="lay-sidebar">
                        <div className="sidebar__main">
                            {/* Bottom */}
                            {bottom}
                        </div>
                        <div className="sidebar__aside">
                            {/* Bottom-Tercera */}
                            {bottomTercera}
                        </div>
                    </div>
                </main>
            </div>
            <LoadBannersSSR />
        </GlobalProvider>
    );
};

lnNotaNoticia.sections = ['Banner-Megatop', 'Bottom', 'Bottom-Tercera'];

lnNotaNoticia.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    outputType: PropTypes.string.isRequired,
    tree: PropTypes.arrayOf(PropTypes.node).isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Consumer(lnNotaNoticia);
