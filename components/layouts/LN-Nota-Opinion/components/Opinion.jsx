import React from 'react';
import { useAppContext } from 'fusion:context';
import { Divider } from '@ln/ds-common-divider';
import Opening from './apertura/Opening';

function Opinion({ children }) {
    const { globalContent, siteProperties } = useAppContext();
    return (
        <>
            <Opinion.Opening className="w-full flex flex-col gap-40">
                <Opening.Breadcrumb
                    globalContent={globalContent}
                    siteProperties={siteProperties}
                />
                <div className="flex flex-col items-center gap-40">
                    <div className="w-full flex flex-col items-center gap-16 md:grid md:justify-items-center md:grid-cols-12 md:gap-x-24 lg:grid-cols-16 lg:gap-x-31">
                        <div className="flex flex-col items-center gap-4 md:col-span-12 lg:col-span-16">
                            <span className="font-primary font-w-bold text-18 text-center leading-[130%]">
                                OPINIÓN
                            </span>
                            <span className="font-primary font-w-medium text-18 text-center leading-[130%]">
                                JOAQUÍN MORALES SOLÁ
                            </span>
                        </div>
                        <div className="mt-1 w-64 md:col-span-12 lg:col-span-16">
                            <Divider />
                        </div>
                        <div className="flex flex-col items-center gap-8 md:col-span-10 md:col-start-2 lg:col-span-16 max-w-636">
                            <Opening.Title
                                content={globalContent.headlines.basic}
                            />
                            <h2 className="font-secondary text-base-light font-w-bold text-18 text-center leading-[140%] tracking-[-0.6px]">
                                El republicano se metió sin pedir permiso en la
                                política interna argentina; también salvó tres
                                veces al gobierno de Milei, desde abril a esta
                                parte, de amenazad oras crisis financieras
                            </h2>
                        </div>
                    </div>
                    <div className="w-full md:grid md:justify-items-center md:grid-cols-12 md:gap-x-24 lg:grid-cols-16 lg:gap-x-31">
                        <figure className="w-full max-w-750 flex flex-col md:col-span-12 lg:col-start-4 lg:col-span-10">
                            <div className="border-1 border-muted aspect-3/2 -mx-16 md:mx-0 w-[calc(100%+2rem)] md:w-full max-md:max-w-none">
                                inserte foto aqui
                            </div>
                            <figcaption className="py-8">
                                <span className="font-normal text-base-default text-16 text-center leading-[110%] tracking-[-0.3px]">
                                    Javier Milei y Donald Trump.
                                </span>
                                <span className="pl-8 font-normal text-base-light text-16 text-center leading-[110%] tracking-[-0.3px]">
                                    Alfredo Sábat
                                </span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </Opinion.Opening>
            {children}
        </>
    );
}

Opinion.Opening = Opening;

export default Opinion;
