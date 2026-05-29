import React from 'react';
import { centerOptionsVariants } from '../../../styles';
import { useHeaderContext } from '../../../context';
import Link from '../../../../../../ui/ln/link/default';
import Logo from './Logo';

function CenterOptions() {
    const { position } = useHeaderContext();

    return (
        <Link
            href="/"
            className={centerOptionsVariants({
                position
            })}
        >
            <span>
                <Logo />
            </span>
        </Link>
    );
}

export default CenterOptions;
