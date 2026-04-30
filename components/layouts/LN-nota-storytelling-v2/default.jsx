import React from 'react';
import Consumer from 'fusion:consumer';
import Opening from './components/opening/default';
import BaseLayout from '../../features/LN/common/baseLayout/default';
import GlobalProvider from '../../private/common/context/globalContext';
import { WrapperBody } from '../../features/LN/common/wrapperBody/default';
import Breadcrumb from '../../features/LN/common/breadcrumb/default';
import StorytellingSignature from './components/StorytellingSignature';
import DateAndReadingTime from '../../features/LN/common/dateAndReadingTime/default';
import Divider from '../../features/ui/ln/divider/default';

function LnNotaStorytellingV2({
    children,
    globalContent,
    layout,
    siteProperties
}) {
    return (
        <GlobalProvider>
            <BaseLayout>
                <div data-tw style={{ display: 'contents' }}>
                    {/* Banners */}
                    {children[0]}
                    {/* Apertura */}
                    <Opening globalContent={globalContent} layout={layout}>
                        {children[1]}
                    </Opening>
                    {/* ---- Grid wrapper para Pre-Cuerpo y Cuerpo ---- */}
                    <div className="grid grid-cols-8 md:grid-cols-12 xl:grid-cols-16 w-full justify-items-center gap-x-16 md:gap-x-24 xl:gap-x-32 gap-y-16">
                        {/* Pre-Cuerpo - DS */}
                        <WrapperBody id="cuerpo__nota" className="mb-24">
                            <div className="flex flex-col ai-center gap-8 mb-40">
                                <StorytellingSignature
                                    globalContent={globalContent}
                                />
                                <DateAndReadingTime
                                    globalContent={globalContent}
                                />
                            </div>
                            <div className="flex flex-col gap-40 w-full">
                                {children[2]}
                                <Divider />
                                <Breadcrumb
                                    globalContent={globalContent}
                                    siteProperties={siteProperties}
                                />
                            </div>
                        </WrapperBody>
                        {/* Cuerpo - DS-Body */}
                        {children[3]}
                    </div>
                </div>
                {/* Post-Cuerpo, pendiente a migrar al DS */}
                <div className="grid grid-cols-16_xl w-100 gap-x-16 md:gap-x-24 xl:gap-x-32">
                    <div className="col-span-3-center_xl">{children[4]}</div>
                </div>
                <div className="w-100 flex">
                    {/* Bottom, pendiente a migrar al DS */}
                    <div className="sidebar__main">{children[5]}</div>
                    {/* Bottom-Tercera, pendiente a migrar al DS */}
                    <div className="sidebar__aside hlp-tabletlm-none">
                        {children[6]}
                    </div>
                </div>
            </BaseLayout>
        </GlobalProvider>
    );
}

const pageBuilderSections = [
    'Banners',
    'Apertura',
    'Pre-Cuerpo',
    'Cuerpo',
    'Post-Cuerpo',
    'Bottom',
    'Bottom-Tercera'
];

LnNotaStorytellingV2.sections = pageBuilderSections;

export default Consumer(LnNotaStorytellingV2);
