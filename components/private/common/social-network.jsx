import React from 'react';
import Icon from '../../features/ui/ln/icon/default';
import Link from '../../features/ui/ln/link/default';

function SocialNetwork({ href, icon, name }) {
    return (
        <Link
            color="secondary"
            href={href}
            target="_blank"
            title={`Ir a ${name}`}
            aria-label={`Ir a ${name} (abre en nueva pestaña)`}
            className="p-8"
        >
            <Icon name={icon} size={24} aria-hidden="true" />
        </Link>
    );
}

export default SocialNetwork;
