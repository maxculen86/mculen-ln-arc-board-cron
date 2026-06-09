import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import Link from '../../../features/ui/ln/link/default';
import Chip from '../../../features/ui/ln/chips/default';

const DEFAULT_POPULAR = [
    'Avisos fúnebres',
    'Horóscopo',
    'Dólar',
    'Clima',
    'Fútbol'
];

export default function PopularChips({
    items = DEFAULT_POPULAR,
    hideTitle = false
}) {
    if (!items.length) return null;

    return (
        <div className="flex flex-col gap-12">
            {!hideTitle && (
                <p className="text-body-sm font-secondary font-bold">
                    Populares
                </p>
            )}
            <div className="flex flex-wrap gap-8">
                {items.map(item => (
                    <Chip key={item} asChild size={24} variant="outline">
                        <Link
                            className="text-label-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-default focus-visible:ring-offset-1 rounded-sm"
                            href={`${SITE_LANACION}/buscador/?query=${encodeURIComponent(item)}`}
                            title={`Buscar ${item}`}
                            aria-label={`Buscar ${item}`}
                        >
                            {item}
                        </Link>
                    </Chip>
                ))}
            </div>
        </div>
    );
}
