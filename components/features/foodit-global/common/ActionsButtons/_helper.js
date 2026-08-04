import React, { useEffect } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useDisclosure } from '@ln/hooks';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/ds-cva';
import get from '../../../../private/common/utils/get';

import { ShareFoodit } from '../ShareFoodit/foodit';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import addActionToDataLayer from '../utils/addActionToDataLayer';
import { PrintButton } from '../PrintButton/foodit';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import { DialogFoodit } from '../DialogFoodit/foodit';

const buttonCopy = () => {
    navigator.clipboard.writeText(window.location.href);
};
const buttonShare = article => {
    const title = get(article, 'headlines.basic', '');
    const subTitle = get(article, 'subheadlines.basic', '');
    navigator.share({
        text: `${title}\n${subTitle}\n`,
        url: window.location.href
    });
};
const buttonComment = () => {
    const commentsBox = document.querySelector('#viafoura-comments');
    if (commentsBox) {
        commentsBox.scrollIntoView({ behavior: 'smooth' });
    }
};
const buttonPrint = () => {
    window.print();
};

export const buttonConfig = [
    {
        type: 'copy',
        isPrivateButton: false,
        handleClick: article => {
            addActionToDataLayer(article, 'copiar');
            buttonCopy();
        },
        description: 'Copiar',
        IconButton: <IconSprite name="copy" />
    },
    {
        type: 'print',
        isPrivateButton: true,
        handleClick: article => {
            addActionToDataLayer(article, 'imprimir');
            buttonPrint();
        },
        description: 'Imprimir',
        IconButton: <IconSprite name="printer" />
    },
    {
        type: 'share',
        isPrivateButton: false,
        handleClick: shareData => {
            addActionToDataLayer(shareData, 'compartir');
            buttonShare(shareData);
        },
        description: 'Compartir',
        IconButton: <IconSprite name="share" />
    },
    {
        type: 'comment',
        isPrivateButton: true,
        handleClick: article => {
            buttonComment();
            addActionToDataLayer(article, 'comentarios');
        },
        description: 'Comentarios',
        IconButton: <IconSprite name="chat" />
    }
];

const renderShareButton = ({
    IconButton,
    description,
    handleClick,
    type,
    article
}) => (
    <ShareFoodit
        key={type}
        type={type}
        article={article}
        onClickShare={handleClick}
        title={description}
        IconButton={IconButton}
    />
);

const renderRegularButton = ({
    IconButton,
    description,
    handleClick,
    type,
    article
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isSubscribed, userType } = useGetUserConfig();

    const handleButtonClick = () => {
        if (type === 'print' && !isSubscribed) {
            onOpen();
            return;
        }

        handleClick(article);
    };
    const classNamePrint = cx(type === 'print' && '--no-app');
    return (
        <>
            <Button
                className={classNamePrint}
                key={type}
                title={description}
                variant="link"
                onClick={handleButtonClick}
            >
                <Icon size={24}>{IconButton}</Icon>
            </Button>

            <DialogFoodit
                isOpen={isOpen}
                onClose={onClose}
                isSubscribed={false}
                userType={userType}
            />
        </>
    );
};

const printButton = ({
    handleChange,
    IconButton,
    description,
    handleClick,
    type,
    article
}) => {
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};

    const isLayoutPaywall = layout === layoutsName.FooditRecipePaywall;

    if (isLayoutPaywall) return null;

    return (
        <PrintButton
            handleChange={handleChange}
            IconButton={IconButton}
            description={description}
            handleClick={handleClick}
            printType={type}
            article={article}
        />
    );
};
const renderCopyButton = ({
    IconButton,
    description,
    handleClick,
    type,
    article
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        if (!isOpen) return;

        setTimeout(() => {
            onClose();
        }, 3000);
    }, [isOpen, onClose]);

    return (
        <div className="relative">
            <Tooltip
                toggleOn="click"
                content={<span className="text-12">Copiado</span>}
                className="flex rounded-4 shadow-center px-8 py-4 bg-secondary-positive text-light-1 text-12 border border-all border-thin border-light-100 z-5 w-max max-w-248"
                disableTrigger
                visible={isOpen}
            >
                <Button
                    key={type}
                    title={description}
                    variant="link"
                    onClick={() => {
                        onOpen();
                        handleClick(article);
                    }}
                >
                    <Icon size={24}>{IconButton}</Icon>
                </Button>
            </Tooltip>
        </div>
    );
};

export const renderAction = ({
    handleChange,
    IconButton,
    description,
    handleClick,
    type,
    article,
    printButtonType
}) => {
    const options = {
        share:
            type === 'share' &&
            renderShareButton({
                IconButton,
                description,
                handleClick,
                type,
                article
            }),
        copy:
            type === 'copy' &&
            renderCopyButton({
                IconButton,
                description,
                handleClick,
                type,
                article
            }),
        default:
            (type === 'comment' || printButtonType === 'regular') &&
            renderRegularButton({
                IconButton,
                description,
                handleClick,
                type,
                article
            }),
        print:
            type === 'print' &&
            printButton({
                handleChange,
                IconButton,
                description,
                handleClick,
                type,
                article
            })
    };

    return Object.values(options).find(Boolean);
};
