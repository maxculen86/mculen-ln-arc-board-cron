/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from '@ln/contenidos-ui-text';

const SummaryNote = ({ paragraphs = [] }) => {
    if (!paragraphs.length) return <></>;
    return (
        <section
            className="pl-16_l --border-l-left-gray w-100 mb-24"
            data-testid="summary-note"
        >
            <Text
                as="h2"
                className="--font-primary --font-medium --l --text-neutral-light-900 mb-16"
                text="Lo que tenés que saber"
            />
            <ul className="flex flex-column --gap-24 mb-24 pl-24 --list-inherit">
                {paragraphs.map((paragraph, i) => {
                    return (
                        <li
                            className="--font-m"
                            key={i}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                    );
                })}
            </ul>
            <Text
                text="Este resumen fue realizado por inteligencia artificial bajo supervisión de editores de LA NACION"
                className="--text-neutral-light-600 --font-2xs"
            />
        </section>
    );
};

export default SummaryNote;
