import React from 'react';
import Link from '../../../../ui/ln/link/default';
import Icon from '../../../../ui/ln/icon/default';

export function FooterCopyright({ footerImages, year }) {
    return (
        <div className="flex flex-col gap-10">
            <p className="text-center md:text-left text-body-sm leading-[110%] tracking-[-0.3px]">
                © Copyright {year} SA LA NACION | Todos los derechos
                reservados. Dirección Nacional del Derecho de Autor DNDA -
                EXPEDIENTE DNDA (renovación) RL-2023-95334553-APN-DNDA#MJ.
                <br />
                Queda prohibida la reproducción total o parcial del presente
                diario.
            </p>

            <div className="flex gap-12 flex-col md:flex-row items-center md:justify-between">
                <div className="flex flex-col gap-8 md:flex-row md:flex-wrap justify-start items-center lg:flex-[1_0_0]">
                    <b className="text-body-sm leading-[110%] tracking-[-0.3px] font-bold">
                        Protegido por re CAPTCHA:{' '}
                    </b>
                    <div className="flex gap-10 items-center">
                        <Link
                            href="https://policies.google.com/terms?hl=es-419"
                            title="Ir a Condiciones"
                        >
                            <span className="font-bold text-neutral-800 text-label-md leading-[100%] tracking-[-0.3px] font-normal">
                                Condiciones
                            </span>
                        </Link>
                        <span className="h-4 w-4 rounded-full bg-neutral-400" />
                        <Link
                            href="https://policies.google.com/privacy?hl=es-419"
                            title="Ir a Privacidad"
                        >
                            <span className="font-bold text-neutral-800 text-label-md leading-[100%] tracking-[-0.3px] font-normal">
                                Privacidad
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center lg:justify-end lg:flex-[1_0_0] items-center flex gap-8">
                    <p className="md:order-2 text-body-sm leading-[110%] text-center tracking-[-0.3px]">
                        Miembro de GDA. Grupo de Diarios América
                    </p>
                    <div className="flex items-start gap-8 md:contents">
                        <Link
                            title="GDA"
                            href="https://www.gda.com/"
                            target="_blank"
                            className="md:order-1"
                        >
                            <Icon width={37} size="auto">
                                {footerImages?.gdaXs}
                            </Icon>
                        </Link>
                        <Link
                            title="Data fiscal"
                            href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,,"
                            target="_blank"
                            className="md:order-3"
                        >
                            <Icon width={28} size="auto">
                                {footerImages?.dataFiscal}
                            </Icon>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
