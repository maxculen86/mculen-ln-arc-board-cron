import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Link } from '@ln/foodit-ui-link';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Logo } from '@ln/foodit-ui-logo';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

function FooterFoodit({ contextPath, deployment, layout, siteProperties }) {
    const { layoutsName } = siteProperties || {};

    if (
        [
            layoutsName.FooditRecipePaywall,
            layoutsName.FooditNotePaywall
        ].includes(layout)
    )
        return null;

    return (
        <div className="hidden print-hide">
            <footer className="container">
                <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg border border-top border-thin border-light-100">
                    <div className="col-span-8 col-span-12_md col-span-3-center_lg flex flex-column jc-center ai-center gap-16 py-32">
                        <Link href="/" title="Ir a Foodit">
                            <Logo
                                variant="row"
                                classNameSvgAnimated="h-32"
                                classNameSvgText="h-20"
                            />
                        </Link>
                        <Text className="roboto roboto-regular text-16 text-center text-light-800 col-span-3-center_lg">
                            Foodit es la plataforma que te ayuda a cocinar todos
                            los días. Recetas, guías de cocina, masterclasses
                            con chefs referentes y menús semanales. Encontrá las
                            mejores recetas para cocinar en Foodit: ideas para
                            platos rápidos, keto, veganos y vegetarianos,
                            recetas con carne y pollo, tortas, dulces y mucho
                            más.
                        </Text>
                    </div>
                </div>
                <div className="grid grid-cols-12_md relative w-100 pb-32 pb-0_lg text-center border border-top border-thin border-light-100">
                    <section className="flex flex-column ai-center gap-16 text-16 col-span-6_md my-32 border border-thin border-light-100 border-right_md -mx-12">
                        <Text>
                            <strong className="roboto-bold">Seguinos</strong> en
                            nuestras redes
                        </Text>
                        <div className="flex gap-24 jc-center">
                            <Button
                                data-test-id="footer-link-instagram"
                                href="https://www.instagram.com/foodit_ar/"
                                title="Seguinos en Instagram"
                                iconOnly
                                size={32}
                                target="_blank"
                                data-interaction="dataLayerInteraction"
                                data-event="e_linkclick"
                                data-category="interaction"
                                data-label="social"
                                data-action="instagram"
                            >
                                <Icon size={16}>
                                    <IconSprite name="instagram" />
                                </Icon>
                            </Button>
                            <Button
                                data-test-id="footer-link-twitter"
                                href="https://x.com/FOODIT_AR"
                                title="Seguinos en X"
                                iconOnly
                                size={32}
                                target="_blank"
                                data-interaction="dataLayerInteraction"
                                data-event="e_linkclick"
                                data-category="interaction"
                                data-label="social"
                                data-action="x"
                            >
                                <Icon size={16}>
                                    <IconSprite name="twitter" />
                                </Icon>
                            </Button>
                            <Button
                                data-test-id="footer-link-facebook"
                                href="https://www.facebook.com/profile.php?id=61558653507465"
                                title="Seguinos en Facebook"
                                iconOnly
                                size={32}
                                target="_blank"
                                data-interaction="dataLayerInteraction"
                                data-event="e_linkclick"
                                data-category="interaction"
                                data-label="social"
                                data-action="facebook"
                            >
                                <Icon size={16}>
                                    <IconSprite name="facebook" />
                                </Icon>
                            </Button>
                            <Button
                                data-test-id="footer-link-tiktok"
                                href="https://www.tiktok.com/@fooditar?lang=es"
                                title="Seguinos en TikTok"
                                iconOnly
                                size={32}
                                target="_blank"
                                data-interaction="dataLayerInteraction"
                                data-event="e_linkclick"
                                data-category="interaction"
                                data-label="social"
                                data-action="tiktok"
                            >
                                <Icon size={16}>
                                    <IconSprite name="tiktok" />
                                </Icon>
                            </Button>
                        </div>
                    </section>
                    <section className="flex flex-column ai-center gap-16 text-16 col-span-6_md py-32 border border-top border-thin border-light-100 border-0_md ">
                        <Text> Contenido y curaduría por</Text>
                        <Link
                            data-test-id="footer-link-lanacion"
                            href="https://www.lanacion.com.ar/"
                            unstyled
                            title="Ir a la página principal de LA NACION"
                            target="_blank"
                            data-interaction="dataLayerInteraction"
                            data-event="e_linkclick"
                            data-category="footer"
                            data-label="pagina_principal"
                            data-action="la_nacion"
                        >
                            <Adaptableimage
                                width={151}
                                height={16}
                                src={getAssetsPath(contextPath)(deployment)(
                                    'logo-ln-black.webp'
                                )}
                                alt="LA NACION"
                            />
                        </Link>
                    </section>
                    <section className="flex flex-column flex-row_lg jc-center ai-center gap-16 text-14 col-span-6_md py-32 border border-top border-thin border-light-100">
                        <Text>
                            © {new Date().getFullYear()} S.A. LA NACION. Todos
                            los derechos reservados
                        </Text>
                        <Link
                            data-test-id="footer-link-afip"
                            href="http://qr.afip.gob.ar/?qr=HJMakbCpenWNdXYfqXtEDQ,,"
                            unstyled
                            title="Data fiscal"
                            target="_blank"
                            data-interaction="dataLayerInteraction"
                            data-event-data-layer="e_linkclick"
                            data-dynamic-category="footer"
                            data-dynamic-label="legales"
                            data-dynamic-action="data_fiscal"
                        >
                            <Adaptableimage
                                width={28}
                                height={38}
                                src={getAssetsPath(contextPath)(deployment)(
                                    'data-fiscal.webp'
                                )}
                                alt="Data Fiscal"
                            />
                        </Link>
                    </section>
                    <section className="flex flex-column flex-row_lg ai-center ai-start_lg jc-center_lg gap-4 gap-8_lg text-14 col-span-6_md py-32 border border-top border-thin border-light-100">
                        <Text className="block my-auto">
                            Protegido por re CAPTCHA:
                        </Text>
                        <div className="flex my-auto">
                            <Link
                                data-test-id="footer-link-condiciones"
                                href="https://policies.google.com/terms?hl=es-419/"
                                uppercase
                                bold
                                title="Ir a condiciones"
                                target="_blank"
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="footer"
                                data-dynamic-label="legales"
                                data-dynamic-action="condiciones"
                            >
                                CONDICIONES
                            </Link>
                            <Icon size={24}>
                                <IconSprite name="bullet-xs" />
                            </Icon>
                            <Link
                                data-test-id="footer-link-privacidad"
                                href="https://policies.google.com/privacy?hl=es-419/"
                                uppercase
                                bold
                                title="Ir a privacidad"
                                target="_blank"
                                data-interaction="dataLayerInteraction"
                                data-event-data-layer="e_linkclick"
                                data-dynamic-category="footer"
                                data-dynamic-label="legales"
                                data-dynamic-action="privacidad"
                            >
                                PRIVACIDAD
                            </Link>
                        </div>
                    </section>
                </div>
            </footer>
        </div>
    );
}

export default FooterFoodit;
