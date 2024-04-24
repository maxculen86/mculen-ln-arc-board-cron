import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Link } from '@ln/foodit-ui-link';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { useAppContext } from 'fusion:context';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

const FooterFoodit = () => {
    const { contextPath, deployment } = useAppContext();
    return (
        <div className="hidden">
            <footer className="container">
                <div className="grid grid-cols-12_md relative w-100 pb-32 pb-0_lg text-center border border-top border-thin border-light-100">
                    <section className="flex flex-column ai-center gap-16 text-16 col-span-6_md my-32 border border-thin border-light-100 border-right_md -mx-12">
                        <Text>
                            <strong className="roboto-bold">Seguinos</strong> en
                            nuestra redes
                        </Text>
                        <div className="flex gap-24 jc-center">
                            <Button
                                href="https://www.instagram.com/foodit_ar/"
                                title="Seguinos en Instagram"
                                iconOnly
                                size={32}
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="interaction"
                                data-dynamic-label={'social'}
                                data-dynamic-action={'instagram'}
                            >
                                <Icon size={16}>
                                    <IconSprite name="instagram" />
                                </Icon>
                            </Button>
                            <Button
                                href="https://twitter.com/FOODITAR"
                                title="Seguinos en X"
                                iconOnly
                                size={32}
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="interaction"
                                data-dynamic-label={'social'}
                                data-dynamic-action={'x'}
                            >
                                <Icon size={16}>
                                    <IconSprite name="twitter" />
                                </Icon>
                            </Button>
                            <Button
                                href="https://www.tiktok.com/@fooditar?lang=es "
                                title="Seguinos en TikTok"
                                iconOnly
                                size={32}
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="interaction"
                                data-dynamic-label={'social'}
                                data-dynamic-action={'tiktok'}
                            >
                                <Icon size={16}>
                                    <IconSprite name="tiktok" />
                                </Icon>
                            </Button>
                            <Button
                                href="https://ar.pinterest.com/foodit_ar/"
                                title="Seguinos en Pinterest"
                                iconOnly
                                size={32}
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="interaction"
                                data-dynamic-label={'social'}
                                data-dynamic-action={'pinterest'}
                            >
                                <Icon size={16}>
                                    <IconSprite name="pinterest" />
                                </Icon>
                            </Button>
                        </div>
                    </section>
                    <section className="flex flex-column ai-center gap-16 text-16 col-span-6_md py-32 border border-top border-thin border-light-100 border-0_md ">
                        <Text> Contenido y curaduría por</Text>
                        <Link
                            href="/"
                            unstyled
                            title="Ir a la página principal"
                            data-interaction="dataLayerInteraction"
                            data-event-data-layer="e_linkclick"
                            data-dynamic-category="footer"
                            data-dynamic-label={'pagina_principal'}
                            data-dynamic-action={'la_nacion'}
                        >
                            <img
                                width={151}
                                height={16}
                                src={getAssetsPath(contextPath)(deployment)(
                                    'logo-ln-black.webp'
                                )}
                                alt="La Nación"
                            />
                        </Link>
                    </section>
                    <section className="flex flex-column flex-row_lg jc-center ai-center gap-16 text-14 col-span-6_md py-32 border border-top border-thin border-light-100">
                        <Text>
                            © 2024 S.A. LA NACION. Todos los derechos reservados
                        </Text>
                        {/* TODO: actualizar link */}
                        <Link
                            href="https://serviciosweb.afip.gob.ar/clavefiscal/qr/GenericError.htm?aspxerrorpath=/clavefiscal/qr/publicInfoD.aspx"
                            unstyled
                            title="Data fiscal"
                            data-interaction="dataLayerInteraction"
                            data-event-data-layer="e_linkclick"
                            data-dynamic-category="footer"
                            data-dynamic-label={'legales'}
                            data-dynamic-action={'data_fiscal'}
                        >
                            <img
                                width={28}
                                height={38}
                                src={getAssetsPath(contextPath)(deployment)(
                                    'data-fiscal.webp'
                                )}
                            />
                        </Link>
                    </section>
                    <section className="flex flex-column flex-row_lg ai-center ai-start_lg jc-center_lg gap-4 gap-8_lg text-14 col-span-6_md py-32 border border-top border-thin border-light-100">
                        <Text className="block my-auto">
                            Protegido por re CAPTCHA:
                        </Text>
                        <div className="flex my-auto">
                            <Link
                                href="https://policies.google.com/terms?hl=es-419/"
                                uppercase
                                bold
                                title="Ir a condiciones"
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="footer"
                                data-dynamic-label={'legales'}
                                data-dynamic-action={'condiciones'}
                            >
                                CONDICIONES
                            </Link>
                            <Icon size={24}>
                                <IconSprite name="bullet-xs" />
                            </Icon>
                            <Link
                                href="https://policies.google.com/privacy?hl=es-419/"
                                uppercase
                                bold
                                title="Ir a privacidad"
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="footer"
                                data-dynamic-label={'legales'}
                                data-dynamic-action={'privacidad'}
                            >
                                PRIVACIDAD
                            </Link>
                        </div>
                    </section>
                </div>
            </footer>
        </div>
    );
};

export default FooterFoodit;
