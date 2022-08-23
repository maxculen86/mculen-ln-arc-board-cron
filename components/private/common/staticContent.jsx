/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';

function StaticContent({ children, Tag = 'div', ...attrs }) {
    const { className = 'hidden' } = attrs;
    const ref = useRef(null);
    const [render, setRender] = useState(typeof window === 'undefined');

    useEffect(() => {
        const isEmpty = ref.current.innerHTML === '';
        if (isEmpty) {
            setRender(true);
        }
    }, []);

    if (render) {
        return (
            <Tag className={className} {...attrs}>
                {children}
            </Tag>
        );
    }

    // avoid re-render on the client
    return (
        <Tag
            className={className}
            {...attrs}
            ref={ref}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: '' }}
        />
    );
}

export default StaticContent;
