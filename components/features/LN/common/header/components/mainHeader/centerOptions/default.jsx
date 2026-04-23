import React from 'react';
import { centerOptionsVariants } from '../../../styles';
import { useHeaderContext } from '../../../context';
import Link from '../../../../../../ui/ln/link/default';
import Logo from './Logo';

function CenterOptions() {
    const { position, isHome } = useHeaderContext();

    // TODO: aplicar el bannerLogo de la home cuando se migre este componente
    const Component = isHome ? 'h1' : 'div';
    return (
        <Link
            href="/"
            className={centerOptionsVariants({
                position
            })}
        >
            <Component>
                {isHome && (
                    <span className="invisible absolute">LA NACION</span>
                )}
                <Logo />
            </Component>
        </Link>
    );
}

export default CenterOptions;
