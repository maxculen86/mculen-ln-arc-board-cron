import React from 'react';

const ArrowDown = props => {
    const { className, ...r } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={className}
            {...r}
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.364 4.95L10.607 0.707001C10.9975 0.316535 11.6305 0.316535 12.021 0.707V0.707C12.4115 1.09747 12.4115 1.73053 12.021 2.121L7.07111 7.07089C6.68058 7.46142 6.04742 7.46142 5.65689 7.07089L0.707 2.121C0.316535 1.73053 0.316535 1.09747 0.707 0.707V0.707C1.09747 0.316535 1.73053 0.316535 2.121 0.707L6.364 4.95Z"
                fill="#272727"
            />
        </svg>
    );
};

export default ArrowDown;
