import React from 'react';
import { useAppContext } from 'fusion:context';
import { Divider } from '@ln/ds-common-divider';
import Opening from './apertura/Opening';
import PreBody from './preBody/PreBody';
import get from '../../../private/common/utils/get';
import formatAuthorList from '../helpers/formatAuthorList';
import { getMediaData } from '../../_helpers/mediaHelper';
import getMediaFigCaption from '../helpers/getMediaFigCaption';
import { WrapperBody } from '../../../features/LN/common/wrapperBody/default';

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
            {/* Componentes con tailwind - DS */}
            <div data-tw className="contents">
                <Opinion.Opening className="w-full flex flex-col gap-40">
                    <div className="flex flex-col items-center gap-40">
                        <div className="w-full flex flex-col items-center gap-16 md:grid md:justify-items-center md:grid-cols-12 lg:grid-cols-16 md:gap-x-24 xl:gap-x-32">
                            <div className="flex flex-col items-center gap-4 md:col-span-12 lg:col-span-16">
                                <span className="font-primary font-w-bold text-18 text-center leading-[130%]">
                                    OPINIÓN
                                </span>
                                <Opening.Authors
                                    className="max-w-636"
                                    authorsConcat={authorsConcat}
                                />
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
                <div className="grid grid-cols-8 md:grid-cols-12 xl:grid-cols-16 w-full justify-items-center gap-x-16 md:gap-x-24 xl:gap-x-32 gap-y-40">
                    {/* ---- PRE-CUERPO ---- */}
                    <WrapperBody id="cuerpo__nota">
                        <Opinion.PreBody>
                            {children[1]}
                            <PreBody.Breadcrumb
                                globalContent={globalContent}
                                siteProperties={siteProperties}
                            />
                        </Opinion.PreBody>
                    </WrapperBody>
                    {/* ---- CUERPO ---- */}
                    {children[2]}
                </div>
            </div>

            {/* //TODO: migrar estructura a tailwind cuando se migre la estructura de la nota */}
            {/* ---- Post-Cuerpo ---- */}
            <div className="grid grid-cols-16_xl w-100 gap-x-16 md:gap-x-24 xl:gap-x-32">
                <div className="col-span-3-center_xl">{children[3]}</div>
            </div>
            <div className="w-100 flex">
                {/* ---- BOTTOM ---- */}
                <div className="w-100 sidebar__main">{children[4]}</div>
                {/* ---- BOTTOM-TERCERA ---- */}
                <div className="sidebar__aside">{children[5]}</div>
            </div>
        </>
    );
}

Opinion.Opening = Opening;
Opinion.PreBody = PreBody;

export default Opinion;
