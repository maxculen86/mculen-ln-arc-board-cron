/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from '@ln/contenidos-ui-text';

const SummaryNote = ({ paragraphs = [] }) => {
    if (!paragraphs.length) return <></>;
    return (
        <section className="--pl-l-sm --border-l-left-gray --w-100 --mb-md">
            <Text
                as="h2"
                className="--font-primary --font-medium --l --text-neutral-light-900 --mb-sm"
                text="Lo que tenés que saber"
            />
            <ul className="--d-flex --flex-col --gap-24 --mb-md --pl-md --list-inherit">
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
