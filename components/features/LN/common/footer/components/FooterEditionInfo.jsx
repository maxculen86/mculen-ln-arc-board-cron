import React from 'react';

export function FooterEditionInfo({ editionDetails }) {
    return (
        <div className="flex flex-col md:flex-row gap-32">
            <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-32">
                <p className="flex-1 min-w-0 flex flex-col gap-8">
                    <span className="text-center md:text-left text-label-lg leading-[100%]">
                        <b className="font-bold text-body-sm leading-[110%] tracking-[-0.3px]">
                            Director:
                        </b>{' '}
                        Fernán Saguier.
                    </span>
                    <span className="text-center md:text-left text-label-lg leading-[100%]">
                        ISSN (lanacion.com.ar) 2469-0597
                    </span>
                </p>

                <p className="flex-1 min-w-0 flex flex-col gap-8">
                    <span className="text-center md:text-left text-label-lg leading-[100%]">
                        <b className="font-bold text-body-sm leading-[110%] tracking-[-0.3px]">
                            Fecha de Edición:
                        </b>{' '}
                        {editionDetails?.edDate?.date || 'N/A'}
                    </span>
                    <span className="text-center md:text-left text-label-lg leading-[100%]">
                        <b className="font-bold text-body-sm leading-[110%] tracking-[-0.3px]">
                            Número de Edición:
                        </b>{' '}
                        {editionDetails?.edNumber || 'N/A'}
                    </span>
                </p>
            </div>

            <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-32">
                <p className="flex-1 min-w-0 text-center md:text-left text-label-lg leading-[100%]">
                    <b className="font-bold text-body-sm leading-[110%] tracking-[-0.3px]">
                        Propietario:
                    </b>{' '}
                    S.A. LA NACION - Zepita 3251, Cda. de Bs. As. C1285ABG |
                    Tel. 54 11 5500-1800
                </p>
                <p className="flex-1 min-w-0 text-center md:text-left text-label-lg leading-[100%]">
                    <b className="font-bold text-body-sm leading-[110%] tracking-[-0.3px]">
                        Oficinas:
                    </b>{' '}
                    Av. del Libertador 101, Vte. López, Prov. de Bs. As. Arg. -
                    B1638BEA | Tel. 54 11 6090-5000
                </p>
            </div>
        </div>
    );
}
