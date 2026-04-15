import React, { useId } from 'react';
import Divider from '../../../ui/ln/divider/default';

function HowTo({ number, title }) {
    const headingId = useId();
    if (!number || !title) return null;

    return (
        <section
            className="flex flex-col gap-32 py-16"
            aria-labelledby={headingId}
        >
            <Divider />
            <div className="flex items-center gap-8 font-primary text-subheading-md">
                <div
                    className="w-40 flex items-center justify-center"
                    aria-hidden="true"
                >
                    <span className="font-w-semibold">{number}</span>
                </div>
                <svg
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="34"
                    viewBox="0 0 9 34"
                    fill="none"
                >
                    <path
                        d="M0.75 0V13.2727L6.75 17.2727L0.75 22V34"
                        stroke="#B2B2B2"
                        strokeWidth="1.5"
                    />
                </svg>
                <h3 id={headingId} className="font-w-bold pl-4">
                    {title}
                </h3>
            </div>
        </section>
    );
}

export default HowTo;
