import React from 'react';
import { Link } from '@ln/recetas-ui-link';
import { Icon } from '@ln/common-ui-icon';
import { Bookmark, Cart } from '@ln/recetas-ui-assets';

const ExtraOptions = ({ ...r }) => {
    return (
        <nav className="lg-only" {...r}>
            <ul className="flex ai-center gap-24">
                <li>
                    <Link
                        title="Ir a Recetario"
                        bold
                        href="/"
                        className="text-14"
                    >
                        <Icon size={16}>
                            <Bookmark />
                        </Icon>
                        RECETARIO
                    </Link>
                </li>
                <li>
                    <Link
                        title="Ir a Descubrir "
                        bold
                        href="/"
                        className="text-14"
                    >
                        <Icon size={16}>
                            <Cart />
                        </Icon>
                        LISTA DE COMPRAS
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default ExtraOptions;
