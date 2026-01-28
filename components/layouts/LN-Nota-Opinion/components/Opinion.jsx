import React from 'react';
import { useAppContext } from 'fusion:context';
import { Divider } from '@ln/ds-common-divider';
import Opening from './apertura/Opening';
import PreBody from './preBody/PreBody';
import get from '../../../private/common/utils/get';
import formatAuthorList from '../helpers/formatAuthorList';
import { getMediaData } from '../../_helpers/mediaHelper';
import getMediaFigCaption from '../helpers/getMediaFigCaption';

function Opinion({ children }) {
    const { globalContent, siteProperties } = useAppContext();

    const authors = get(globalContent, 'credits.by', []);
    const authorsConcat = formatAuthorList(authors);

    const promoItems = get(globalContent, 'promo_items', {});
    const mediaData = getMediaData(promoItems);
    const { text, attribution } = getMediaFigCaption(mediaData);

    return (
        <>
            {/* ---- APERTURA ---- */}
            <Opinion.Opening className="w-full flex flex-col gap-40">
                <div className="flex flex-col items-center gap-40">
                    <div className="w-full flex flex-col items-center gap-16 md:grid md:justify-items-center md:grid-cols-12 md:gap-x-24 lg:grid-cols-16 lg:gap-x-31">
                        <div className="flex flex-col items-center gap-4 md:col-span-12 lg:col-span-16">
                            <span className="font-primary font-w-bold text-18 text-center leading-[130%]">
                                OPINIÓN
                            </span>
                            {/* TODO para front: revisar espaciados cuando una nota no tiene autor */}
                            <span className="font-primary font-w-medium text-18 text-center leading-[130%]">
                                {authorsConcat}
                            </span>
                        </div>
                        <div className="mt-1 w-64 md:col-span-12 lg:col-span-16">
                            <Divider />
                        </div>
                        <div className="flex flex-col items-center gap-8 md:col-span-10 md:col-start-2 lg:col-span-16 max-w-636">
                            <Opening.Title
                                content={globalContent.headlines.basic}
                            />
                            <Opening.Subtitle
                                content={globalContent.subheadlines.basic}
                            />
                        </div>
                    </div>
                    <Opening.Media
                        data={{ mediaData, caption: text, attribution }}
                    />
                </div>
            </Opinion.Opening>
            {/* ---- Wrapper con grilla y ancho maximo ---- */}
            <div className="grid grid-cols-8 md:grid-cols-12 xl:grid-cols-16 w-full">
                <div className="col-span-8 md:col-span-10 md:col-start-2 xl:col-span-8 xl:col-start-5 max-w-550 md:max-w-635 relative left-1/2 -translate-x-1/2 flex flex-col gap-24">
                    {/* ---- PRE-CUERPO ---- */}
                    <Opinion.PreBody>
                        <PreBody.Breadcrumb
                            globalContent={globalContent}
                            siteProperties={siteProperties}
                        />
                    </Opinion.PreBody>
                    {/* ---- CUERPO ---- */}
                    {children[2]}
                </div>
            </div>

            {/* ---- BOTTOM ---- */}
            {children[3]}
            {/* ---- BOTTOM-TERCERA ---- */}
            {children[4]}
        </>
    );
}

Opinion.Opening = Opening;
Opinion.PreBody = PreBody;

export default Opinion;
