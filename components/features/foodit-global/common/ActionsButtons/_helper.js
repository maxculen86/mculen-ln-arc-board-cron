import React, { useEffect } from 'react';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Tooltip } from '@ln/common-ui-tooltip';
import { useDisclosure } from '@ln/hooks';
import { Dialog } from '@ln/common-ui-dialog';
import get from '../../../../private/common/utils/get';

import { ShareFoodit } from '../ShareFoodit/foodit';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import addActionToDataLayer from '../utils/addActionToDataLayer';
import { PrintButton } from '../PrintButton/foodit';
import EmptyState from '../emptyState/foodit';
import { getVariantBarrier } from '../emptyState/helpers';
import useGetUserConfig from '../../hooks/useGetUserConfig';

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
}) => (
    <Button
        key={type}
        title={description}
        variant="link"
        onClick={() => handleClick(article)}
    >
        <Icon size={24}>{IconButton}</Icon>
    </Button>
);

const printButton = ({
    handleChange,
    IconButton,
    description,
    handleClick,
    type,
    article
}) => {
    const { isOpen, onClose } = useDisclosure();
    const { isSubscribed, userType } = useGetUserConfig();

    return isSubscribed ? (
        <PrintButton
            handleChange={handleChange}
            IconButton={IconButton}
            description={description}
            handleClick={handleClick}
            type={type}
            article={article}
        />
    ) : (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            position="center"
            classnames={{
                base: 'p-16 p-24_md p-32_lg max-w-328 min-w-720_md min-w-944_lg bg-positive rounded-4',
                wrapper: 'flex flex-column gap-12'
            }}
            overlay
            closeOnClickOutside
        >
            <Dialog.Header className="flex flex-column ai-end">
                <Button
                    onClick={onClose}
                    variant="link"
                    title="Cerrar"
                    aria-label="Cerrar"
                >
                    <Icon>
                        <IconSprite name="close" />
                    </Icon>
                </Button>
            </Dialog.Header>
            <Dialog.Body>
                <EmptyState
                    variant={getVariantBarrier(userType)}
                    className="pt-4 pt-12_md pt-20_lg"
                    direction="column"
                />
            </Dialog.Body>
        </Dialog>
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
