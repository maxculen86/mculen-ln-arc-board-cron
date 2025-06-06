import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import { BaseLayout } from '../../../features/LN-10-global/common/baseLayout/default';
import { getLiveBlogEditorialDataApertura } from '../_helpers/liveblogEditorialApertura';
import LiveBlogOpening from './apertura/LiveBlogOpening';
import LiveBlogBody from './body/LiveBlogBody';

function LiveBlogEditorial({ children }) {
    const { globalContent } = useAppContext();
    const { dataMedia, dataDescripcion, dataEpigraph } =
        getLiveBlogEditorialDataApertura(globalContent, children);

    return (
        <BaseLayout className="liveblog-editorial">
            <main id="content" className="relative" style={{ paddingTop: '0' }}>
                {/* ---- APERTURA ---- */}
                <LiveBlogEditorial.Opening data={dataEpigraph}>
                    <LiveBlogOpening.Media data={dataMedia} />
                    <LiveBlogOpening.Description data={dataDescripcion} />
                </LiveBlogEditorial.Opening>
                <div className="lay-sidebar pt-32_m">
                    <div className="row">
                        {/* ---- CUERPO ---- */}
                        <LiveBlogEditorial.Body>
                            <LiveBlogBody.Top>{children[2]}</LiveBlogBody.Top>
                        </LiveBlogEditorial.Body>
                    </div>
                    {/* ---- TERCERA ---- */}
                    <div className="sidebar__aside hlp-tabletlm-none">
                        {children[3]}
                    </div>
                </div>
                {/* ---- BOTTOM ---- */}
                <div className="lay-sidebar">
                    <div className="sidebar__main">{children[4]}</div>
                    <div className="sidebar__aside hlp-tabletlm-none">
                        {children[5]}
                    </div>
                </div>
            </main>
        </BaseLayout>
    );
}

LiveBlogEditorial.Opening = LiveBlogOpening;
LiveBlogEditorial.Body = LiveBlogBody;

LiveBlogEditorial.propTypes = {
    children: PropTypes.node.isRequired
};

export default LiveBlogEditorial;
