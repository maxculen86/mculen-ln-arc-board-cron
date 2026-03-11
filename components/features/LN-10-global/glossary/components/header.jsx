import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Dialog } from '@ln/common-ui-dialog';
import { cx } from '@ln/cva';
import capitalizeFirstLetter from '../../../../private/common/utils/capitalizeFirstLetter';
import { a11yAttrsDialogGlossary } from '../helpers';

function Header({ keyGlossary, className = '', isDialog }) {
    const capitalizeKeyGlossary = capitalizeFirstLetter(keyGlossary);

    return (
        <div className={cx('flex gap-4', className)}>
            <Icon size={24}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <rect
                        opacity="0.5"
                        x="4"
                        y="4.11182"
                        width="15"
                        height="18"
                        rx="3"
                        fill="url(#paint0_linear_13763_692)"
                    />
                    <path
                        d="M18.713 8.96752L19.0841 8.09748C19.4143 7.32326 20.0087 6.70693 20.7502 6.37003L21.7716 5.90592C22.0963 5.75838 22.0963 5.27479 21.7716 5.12724L20.782 4.67762C20.0215 4.33205 19.4165 3.69291 19.0919 2.89226L18.716 1.96508C18.5765 1.62101 18.1121 1.62101 17.9726 1.96508L17.5967 2.89225C17.2721 3.69291 16.667 4.33205 15.9065 4.67762L14.917 5.12724C14.5923 5.27479 14.5923 5.75838 14.917 5.90592L15.9384 6.37003C16.6799 6.70693 17.2743 7.32326 17.6045 8.09748L17.9756 8.96752C18.1182 9.30191 18.5703 9.30191 18.713 8.96752Z"
                        fill="#27D2BE"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.74484 6.72227C5.74484 6.22111 6.13544 5.81485 6.61726 5.81485H12.6249C13.1068 5.81485 13.5009 5.40858 13.5009 4.90742C13.5009 4.40627 13.1068 4 12.6249 4H6.61726C5.17179 4 4 5.2188 4 6.72227V19.0632C4 19.0855 4.00077 19.1075 4.00228 19.1294C4.00077 19.1674 4 19.2056 4 19.2441C4 20.7475 5.17179 21.9663 6.61726 21.9663H16.9118C17.7791 21.9663 18.4822 21.2351 18.4822 20.333V18.3373C18.964 18.3373 19.3546 17.931 19.3546 17.4299V11.1686C19.3546 10.6675 18.964 10.2612 18.4822 10.2612C18.0003 10.2612 17.6098 10.6675 17.6098 11.1686V16.5218H6.61726C6.59818 16.5218 6.57914 16.522 6.56016 16.5224H6.18105C6.02214 16.5224 5.87316 16.5666 5.74484 16.6438V6.72227ZM6.58431 18.3373H16.7373V20.1515H6.61726C6.13544 20.1515 5.74484 19.7452 5.74484 19.2441C5.74484 18.7544 6.11776 18.3553 6.58431 18.3373Z"
                        fill="#4D4D4D"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_13763_692"
                            x1="11.5"
                            y1="4.11182"
                            x2="11.5"
                            y2="29.1392"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="white" />
                            <stop offset="1" stopColor="#27D2BE" />
                        </linearGradient>
                    </defs>
                </svg>
            </Icon>
            {isDialog ? (
                <Dialog.Title
                    as="h3"
                    className="glossary-title --font-primary --font-bold as-flex-end"
                    id={a11yAttrsDialogGlossary['aria-labelledby']}
                >
                    {capitalizeKeyGlossary}
                </Dialog.Title>
            ) : (
                <Text
                    as="h3"
                    className="glossary-title --font-primary --font-bold as-flex-end"
                >
                    {capitalizeKeyGlossary}
                </Text>
            )}
        </div>
    );
}

export default Header;
