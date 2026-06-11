import React from 'react';

/**
 * Componente `renderSource` para `<Thread>` de `@ln/ds-blocks-thread`.
 *
 * La lib detecta las ocurrencias exactas de `fuentes[].titulo` dentro de
 * `descripcion` (case-insensitive, accent-insensitive y con bordes de palabra)
 * y, una vez completada la animación de tipeo, reemplaza cada ocurrencia por
 * este componente. El texto del link conserva lo que vino en la respuesta
 * (`children`); el título canónico (`titulo`) viaja como metadata para el
 * tooltip. Shape: `SourceLinkProps = { titulo, url, children }`.
 */
const isSafeUrl = url => /^https?:\/\//i.test(url);

export function SourceLink({ titulo, url, children }) {
    // La `url` viene del backend sin sanitizar: solo linkeamos esquemas
    // http(s) para evitar inyección de `javascript:` u otros vectores.
    if (!isSafeUrl(url)) return children;

    // <a> plano (no el Link del DS, que es inline-flex y no parte en prosa).
    // Tokens replicados del variant accent/bold del DS; el size hereda del párrafo.
    return (
        <a
            href={url}
            title={titulo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-accent-default no-underline transition-colors hover:text-accent-light"
        >
            {children}
        </a>
    );
}
