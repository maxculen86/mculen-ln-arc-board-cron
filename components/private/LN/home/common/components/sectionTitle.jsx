import React from 'react';

export default function SectionTitle(props) {
    return (
        <h3 className="titulo-section">
            <a>{props.title}</a>
        </h3>
    );
}
