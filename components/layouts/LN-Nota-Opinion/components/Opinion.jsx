import React from 'react';
import { useAppContext } from 'fusion:context';
import { Divider } from '@ln/ds-common-divider';
import Opening from './apertura/Opening';
import PreBody from './preBody/PreBody';
import { WrapperBody } from '../../../features/LN/common/wrapperBody/default';
import DateAndReadingTime from '../../../features/LN/common/dateAndReadingTime/default';
import { buildOpinionData } from '../helpers/buildOpinionData';

function Opinion({ children }) {
    const { globalContent, siteProperties } = useAppContext();
    const {
        authorsConcat,
        media,
        headline,
        subheadline,
        label,
        showAuthorsInOpening
    } = buildOpinionData(globalContent);

    return (
        <>
            <div data-tw className="contents">
                {children[0]}
            </div>
            {/* ---- APERTURA ---- */}
            {/* Componentes con tailwind - DS */}
            <div data-tw className="contents">
                <Opinion.Opening className="w-full flex flex-col gap-40 mt-16 mb-16">
                    <div className="flex flex-col items-center gap-40">
                        <div className="w-full flex flex-col items-center gap-16 md:grid md:justify-items-center md:grid-cols-12 lg:grid-cols-16 md:gap-x-24 xl:gap-x-32">
                            <div className="flex flex-col items-center gap-4 md:col-span-12 lg:col-span-16">
                                <span className="font-primary font-w-bold text-18 text-center leading-[130%]">
                                    {label}
                                </span>
                                {showAuthorsInOpening && (
                                    <Opening.Authors
                                        className="max-w-636"
                                        authorsConcat={authorsConcat.toUpperCase()}
                                    />
                                )}
                            </div>
                            <div className="mt-1 w-64 md:col-span-12 lg:col-span-16">
                                <Divider />
                            </div>
                            <div className="flex flex-col items-center gap-8 md:col-span-10 md:col-start-2 lg:col-span-16 max-w-636">
                                <Opening.Title content={headline} />
                                <Opening.Subtitle content={subheadline} />
                            </div>
                        </div>
                        <DateAndReadingTime globalContent={globalContent} />
                        <Opening.Media data={{ ...media }} />
                    </div>
                </Opinion.Opening>
                {/* ---- Wrapper con grilla y ancho maximo ---- */}
                <div className="grid grid-cols-8 md:grid-cols-12 xl:grid-cols-16 w-full justify-items-center gap-x-16 md:gap-x-24 xl:gap-x-32 gap-y-16">
                    {/* ---- PRE-CUERPO ---- */}
                    <WrapperBody id="cuerpo__nota" className="mb-24">
                        <Opinion.PreBody>
                            {children?.[2] && (
                                <div className="flex flex-col gap-24 pb-16">
                                    {children[2]}
                                </div>
                            )}
                            <PreBody.Breadcrumb
                                globalContent={globalContent}
                                siteProperties={siteProperties}
                            />
                        </Opinion.PreBody>
                    </WrapperBody>
                    {/* ---- CUERPO ---- */}
                    {children[3]}
                </div>
            </div>

            {/* //TODO: migrar estructura a tailwind cuando se migre la estructura de la nota */}
            {/* ---- Post-Cuerpo ---- */}
            <div className="grid grid-cols-16_xl w-100 gap-x-16 md:gap-x-24 xl:gap-x-32">
                <div className="col-span-3-center_xl">{children[4]}</div>
            </div>
            <div className="w-100 flex">
                {/* ---- BOTTOM ---- */}
                <div className="sidebar__main">{children[5]}</div>
                {/* ---- BOTTOM-TERCERA ---- */}
                <div className="sidebar__aside hlp-tabletlm-none">
                    {children[6]}
                </div>
            </div>
        </>
    );
}

Opinion.Opening = Opening;
Opinion.PreBody = PreBody;

export default Opinion;
