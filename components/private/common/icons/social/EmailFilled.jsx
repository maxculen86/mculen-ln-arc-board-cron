import React from 'react';

const EmailFilled = props => {
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
                d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM6.40996 6.88495C5.98909 6.52761 5.35826 6.57898 5.00075 6.99971C4.64305 7.42066 4.69444 8.05192 5.11554 8.40946L11.4196 13.7622C11.7956 14.0814 12.3482 14.0789 12.7212 13.7561L18.8982 8.41103C19.3157 8.04977 19.3614 7.41853 19.0003 7.00087C18.639 6.58292 18.0072 6.53717 17.5895 6.8987L12.061 11.683L6.40996 6.88495Z"
                fill="#272727"
            />
        </svg>
    );
};

export default EmailFilled;
