import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import Copyright from '../private/LN/common/footer/copyright';
import PwaModal from '../features/LN-10-global/pwaModal/default';
import '../../resources/dist/css/ln/pages/sitemap.css';
import ComLogo from '../private/common/com-logo';
import Title from '../private/common/com-title';
import ListSection from '../private/common/utils/listSection';
import { siteMapListSectionLink } from '../private/common/siteMapList/siteMapList';

const LNMapaDelSitio = ({ children }) => {
    return (
        <>
            {children[0]}
            <div id="wrapper" className="sitemap">
                {/* <Header /> */}
                <header>
                    <div className="lay">
                        <ComLogo
                            logoName="la-nacion"
                            href={`${SITE_LANACION}/`}
                            title="LA NACION"
                        />
                    </div>
                </header>
                <main id="content">
                    <div className="lay">
                        <Title tag="h1" size="--l" content="Mapa del sitio" />
                        <div className="row">
                            {siteMapListSectionLink.map(
                                (sectionContainer, containerIndex) => (
                                    <div
                                        key={containerIndex}
                                        className={sectionContainer.className}
                                    >
                                        {sectionContainer.sections.map(
                                            (section, sectionIndex) => (
                                                <ListSection
                                                    key={sectionIndex}
                                                    title={section.title}
                                                    list={section.list}
                                                    titleSize={
                                                        section.titleSize
                                                    }
                                                    titleTag={section.titleTag}
                                                    mod={section.mod}
                                                />
                                            )
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </main>
                {/* <Footer /> */}
                <footer>
                    <div className="lay">
                        <Copyright />
                    </div>
                </footer>
            </div>
            <PwaModal />
        </>
    );
};

const pageBuilderSections = ['Cuerpo'];

LNMapaDelSitio.sections = pageBuilderSections;

LNMapaDelSitio.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default LNMapaDelSitio;
