/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';

export function CustomArticleFooditBox({
    targetButton,
    titleLink,
    buttonText = 'SUSCRIBITE A FOODIT',
    hrefButtonFoodit
}) {
    return (
        <div className="flex flex-column as-article jc-between pb-12 w-100 h-100 min-h-190">
            <Link
                href={titleLink}
                title="Ir a Foodit"
                target="_blank"
                className="flex m-none lowercase"
            >
                <Text className="foodit-text --prumo flex ai-end text-neutral-light-800 mt-32 max-w-165">
                    <span className="min-w-170">
                        recetas, menús y tips para cocinar
                        <Icon height={16.8} className="ml-4">
                            <svg
                                width="10"
                                height="18"
                                viewBox="0 0 10 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 16.335L8.04 8.89504V8.81504L0 1.29504V0.415039L9.88 8.53504V9.17504L0 17.215V16.335Z"
                                    fill="#5A5A5A"
                                />
                            </svg>
                        </Icon>
                    </span>
                </Text>
            </Link>
            {hrefButtonFoodit && (
                <Button
                    href={hrefButtonFoodit}
                    title="Suscribite a Foodit"
                    size={32}
                    id="btn-foodit-grid"
                    target={targetButton}
                    variant="secondary"
                    label={buttonText}
                />
            )}
        </div>
    );
}
