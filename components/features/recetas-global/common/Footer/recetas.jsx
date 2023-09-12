import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Link } from '@ln/recetas-ui-link';
import { Icon } from '@ln/common-ui-icon';
import { Twitter, Facebook, Instagram, BulletXs } from '@ln/recetas-ui-assets';

const FooterRecetas = () => {
    return (
        <footer className="container flex flex-column flex-row_md ai-center jc-between gap-32 pb-32 relative bottom-0 w-100 mb-64 text-14 text-center">
            <div>
                <Text className="block mb-4">Protegido por re CAPTCHA:</Text>
                <div className="flex ai-center">
                    <Link href="/" uppercase bold>
                        CONDICIONES
                    </Link>
                    <Icon size={24}>
                        <BulletXs />
                    </Icon>
                    <Link href="/" uppercase bold>
                        PRIVACIDAD
                    </Link>
                </div>
            </div>
            <div>
                <Text>
                    Copyright 2023 SA LA NACION | Todos los derechos reservados
                </Text>
            </div>
            <div className="flex gap-24">
                <Link href="https://www.facebook.com/lanacion/">
                    <Icon size={24} hasWrapper bgColor="#414141">
                        <Facebook />
                    </Icon>
                </Link>
                <Link href="https://www.twitter.com/lanacion/">
                    <Icon size={24} hasWrapper bgColor="#414141">
                        <Twitter />
                    </Icon>
                </Link>
                <Link href="https://www.instagram.com/lanacioncom/">
                    <Icon size={24} hasWrapper bgColor="#414141">
                        <Instagram />
                    </Icon>
                </Link>
            </div>
        </footer>
    );
};

export default FooterRecetas;
