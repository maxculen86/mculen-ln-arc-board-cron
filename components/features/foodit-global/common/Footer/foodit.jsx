import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Link } from '@ln/foodit-ui-link';
import { Icon } from '@ln/common-ui-icon';
import { useAppContext } from 'fusion:context';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import { Twitter, Facebook, Instagram, BulletXs } from '@ln/foodit-ui-assets';
import StaticContent from '../../../../private/common/staticContent';

const FooterFoodit = () => {
    const { contextPath, deployment } = useAppContext();
    return (
        <StaticContent>
            <footer className="container mb-64">
                <div className="grid grid-cols-12_md relative w-100 pb-72 text-center border border-top border-thin border-light-100">
                    <section className="flex flex-column ai-center gap-16 text-16 col-span-6_md my-32 border border-thin border-light-100 border-right_md -mx-12">
                        <Text>
                            <strong className="roboto-bold">Seguinos</strong> en
                            nuestra redes
                        </Text>
                        <div className="flex gap-24 jc-center">
                            <Link
                                href="https://www.facebook.com/lanacion/"
                                title="Seguinos en Facebook"
                            >
                                <Icon
                                    size={32}
                                    color="inherit"
                                    className="p-8 bg-primary-positive text-light-1 rounded-4"
                                >
                                    <Facebook />
                                </Icon>
                            </Link>
                            <Link
                                href="https://www.twitter.com/lanacion/"
                                title="Seguinos en X"
                            >
                                <Icon
                                    size={32}
                                    color="inherit"
                                    className="p-8 bg-primary-positive text-light-1 rounded-4"
                                >
                                    <Twitter />
                                </Icon>
                            </Link>
                            <Link
                                href="https://www.instagram.com/lanacioncom/"
                                title="Seguinos en Instagram"
                            >
                                <Icon
                                    size={32}
                                    color="inherit"
                                    className="p-8 bg-primary-positive text-light-1 rounded-4"
                                >
                                    <Instagram />
                                </Icon>
                            </Link>
                        </div>
                    </section>
                    <section className="flex flex-column ai-center gap-16 text-16 col-span-6_md py-32 border border-top border-thin border-light-100 border-0_md ">
                        <Text> Contenido y curaduría por</Text>
                        <Link
                            href="/"
                            unstyled
                            title="Ir a la página principal"
                        >
                            <Icon width={151} height={16}>
                                <img
                                    src={getAssetsPath(contextPath)(deployment)(
                                        'logo-ln-black.svg'
                                    )}
                                />
                            </Icon>
                        </Link>
                    </section>
                    <section className="flex flex-column flex-row_lg jc-center ai-center gap-16 text-14 col-span-6_md py-32 border border-top border-thin border-light-100">
                        <Text>
                            © 2023 S.A. LA NACION. Todos los derechos reservados
                        </Text>
                        {/* TODO: actualizar link */}
                        <Link
                            href="https://serviciosweb.afip.gob.ar/clavefiscal/qr/GenericError.htm?aspxerrorpath=/clavefiscal/qr/publicInfoD.aspx"
                            unstyled
                            title="Data fiscal"
                        >
                            <Icon width={28} height={38.5}>
                                <img
                                    src={getAssetsPath(contextPath)(deployment)(
                                        'data-fiscal.svg'
                                    )}
                                />
                            </Icon>
                        </Link>
                    </section>
                    <section className="flex flex-column flex-row_lg ai-center ai-start_lg jc-center_lg gap-16 text-14 col-span-6_md pt-32 border border-top border-thin border-light-100">
                        <Text className="block mb-4">
                            Protegido por re CAPTCHA:
                        </Text>
                        <div className="flex ai-center ai-start_lg">
                            <Link
                                href="https://policies.google.com/terms?hl=es-419/"
                                uppercase
                                bold
                                title="Ir a condiciones"
                            >
                                CONDICIONES
                            </Link>
                            <Icon size={24}>
                                <BulletXs />
                            </Icon>
                            <Link
                                href="https://policies.google.com/privacy?hl=es-419/"
                                uppercase
                                bold
                                title="Ir a privacidad"
                            >
                                PRIVACIDAD
                            </Link>
                        </div>
                    </section>
                </div>
            </footer>
        </StaticContent>
    );
};

export default FooterFoodit;
