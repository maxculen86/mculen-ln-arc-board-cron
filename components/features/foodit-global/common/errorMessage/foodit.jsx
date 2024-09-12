import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';

export const ErrorMessage = ({ message = '' }) => {
    if (!message) return <></>;

    return (
        <div className="flex gap-8 text-danger-600">
            {/* TODO: Replace Svg with IconSprite */}
            <Icon size={16}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="currentColor"
                >
                    <path d="M12 22.7134C6.477 22.7134 2 18.2364 2 12.7134C2 7.19038 6.477 2.71338 12 2.71338C17.523 2.71338 22 7.19038 22 12.7134C22 18.2364 17.523 22.7134 12 22.7134ZM12 20.7134C14.1217 20.7134 16.1566 19.8705 17.6569 18.3702C19.1571 16.8699 20 14.8351 20 12.7134C20 10.5916 19.1571 8.55682 17.6569 7.05652C16.1566 5.55623 14.1217 4.71338 12 4.71338C9.87827 4.71338 7.84344 5.55623 6.34315 7.05652C4.84285 8.55682 4 10.5916 4 12.7134C4 14.8351 4.84285 16.8699 6.34315 18.3702C7.84344 19.8705 9.87827 20.7134 12 20.7134ZM11 15.7134H13V17.7134H11V15.7134ZM11 7.71338H13V13.7134H11V7.71338Z" />
                </svg>
            </Icon>
            <Text className="text-12">{message}</Text>
        </div>
    );
};
