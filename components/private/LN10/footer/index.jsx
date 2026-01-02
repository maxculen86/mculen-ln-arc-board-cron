/* eslint-disable react/require-default-props */
import React from 'react';
import { Footerhome } from '@ln/contenidos-ui-footerhome';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { Text } from '@ln/contenidos-ui-text';
import { Link } from '@ln/common-ui-link';
import { Icon } from '@ln/common-ui-icon';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import {
    masInformacion,
    productos,
    revistas,
    secciones,
    optionsIcons,
    getEditionDetails
} from './_helper';
import FooterEventsScript from '../../common/scriptManager/FooterEventsScript';

function Footer() {
    const { contextPath, deployment, layout } = useAppContext();
    const { layoutsName = {} } = siteConfig || {};
    const editionDetails = getEditionDetails();

    const isHome = layout === layoutsName.HomeLN10;
    const footerIcons = optionsIcons(contextPath, deployment);

    return (
        <Static id="LN-footer">
            <Footerhome
                listFooterMasInformacion={masInformacion}
                listFooterProductos={productos}
                listFooterRevistas={revistas}
                listFooterSecciones={secciones}
                optionsIcons={optionsIcons(contextPath, deployment)}
            >
                {isHome && (
                    <div className="flex flex-column gap-32 text-center flex-row_m jc-between_m gap-80_lg">
                        <div className="flex flex-column gap-32 text-initial_m flex-row_l jc-between_l flex-grow-1_l">
                            <Text
                                size="xs"
                                as="p"
                                className="flex flex-column gap-9"
                            >
                                <span>
                                    <b className="--font-bold">Director: </b>
                                    Fernán Saguier.
                                </span>
                                <span>ISSN (lanacion.com.ar) 2469-0597</span>
                            </Text>
                            <Text
                                size="xs"
                                as="p"
                                className="flex flex-column gap-9"
                            >
                                <span>
                                    <b className="--font-bold">
                                        Fecha de Edición:{' '}
                                    </b>
                                    {editionDetails?.edDate?.date}
                                </span>
                                <span>
                                    <b className="--font-bold">
                                        Número de Edición:{' '}
                                    </b>
                                    {editionDetails.edNumber}
                                </span>
                            </Text>
                        </div>
                        <div className="flex flex-column gap-32 text-center text-initial_m flex-row_l jc-between_l flex-grow-1_l">
                            <Text size="xs" as="p">
                                <span>
                                    <b className="--font-bold">Propietario: </b>
                                    S.A. LA NACION -
                                    <br />
                                    Av. del Libertador 8630, Piso 15, Oficinas
                                    03/04,
                                    <br />
                                    Cda. de Bs. As. C1429BNT | Tel. 54 11
                                    5500-1800
                                </span>
                            </Text>
                            <Text size="xs" as="p">
                                <span>
                                    <b className="--font-bold">Oficinas: </b>
                                    Av. del Libertador 101, Vte. López,
                                    <br />
                                    Prov. de Bs. As. Arg. - B1638BEA | Tel. 54
                                    11 6090-5000
                                </span>
                            </Text>
                        </div>
                    </div>
                )}
                <div className="grid gap-12 text-center text-initial_m">
                    <Text size="xs" as="p">
                        © Copyright {editionDetails?.edDate?.year} SA LA NACION
                        | Todos los derechos reservados. Dirección Nacional del
                        Derecho de Autor DNDA - EXPEDIENTE DNDA (renovación)
                        RL-2023-95334553-APN-DNDA#MJ.
                        <br />
                        Queda prohibida la reproducción total o parcial del
                        presente diario.
                    </Text>

                    <div className="flex flex-column flex-row_m jc-between_m ai-center_m">
                        <Text
                            size="xs"
                            as="p"
                            className="flex flex-column gap-4 flex-row_m"
                        >
                            <b className="--font-bold">
                                Protegido por reCAPTCHA:{' '}
                            </b>
                            <span className="--inline-block">
                                <Link
                                    text="Condiciones"
                                    href="https://policies.google.com/terms?hl=es-419"
                                    unstyled
                                />
                                <span className="dot w-4 h-4 rounded-circle bg-light-400 inline-block my-3 ml-7 mr-8" />
                                <Link
                                    text="Privacidad"
                                    href="https://policies.google.com/privacy?hl=es-419"
                                    unstyled
                                />
                            </span>
                        </Text>

                        <div className="flex gap-8 ai-center jc-center">
                            <Link
                                title="GDA"
                                href="https://www.gda.com/"
                                target="_blank"
                            >
                                <Icon width={37}>{footerIcons?.gdaXs}</Icon>
                            </Link>
                            <Text size="xs" as="p">
                                Miembro de GDA. Grupo de Diarios América
                            </Text>
                            <Link
                                title="Data fiscal"
                                href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,,"
                                target="_blank"
                            >
                                <Icon size={32}>{footerIcons?.dataFiscal}</Icon>
                            </Link>
                        </div>
                    </div>
                </div>
            </Footerhome>
            <FooterEventsScript />
        </Static>
    );
}

export default Footer;
