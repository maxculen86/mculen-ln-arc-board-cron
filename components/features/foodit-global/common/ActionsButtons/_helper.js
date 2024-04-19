import React from 'react';
import get from '../../../../private/common/utils/get';

import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import ShareFoodit from '../ShareFoodit/foodit';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from '../../../../private/LN/common/utils/addEventToDataLayer';

const buttonCopy = () => {
    navigator.clipboard.writeText(window.location.href);
};
const buttonShare = article => {
    navigator.share({
        title: get(article, 'headlines.basic', ''),
        text: get(article, 'subheadlines.basic', ''),
        url: window.location.href
    });
};
const buttonComment = () => {
    const commentsBox = document.querySelector('#viafoura-comments');
    commentsBox && commentsBox.scrollIntoView({ behavior: 'smooth' });
};
const buttonPrint = () => {
    window.print();
};

export const addActionToDataLayer = (article, action) => {
    const TYPES_LABEL = {
        7: 'receta',
        4: 'nota'
    };

    addEventToDataLayer({
        event: 'e_linkclick',
        category: 'interaction',
        label: TYPES_LABEL[get(article, 'subtype', '')] || '',
        action,
        title: get(article, 'headlines.basic', ''),
        articleId: get(article, '_id', '')
    });
};

export const buttonConfig = [
    {
        type: 'copy',
        enabled: true,
        handleClick: article => {
            addActionToDataLayer(article, 'copiar');
            buttonCopy();
        },
        description: 'Copiar',
        IconButton: <IconSprite name="copy" />
    },
    {
        type: 'print',
        enabled: true,
        handleClick: article => {
            addActionToDataLayer(article, 'imprimir');
            buttonPrint();
        },
        description: 'Imprimir',
        IconButton: <IconSprite name="printer" />
    },
    {
        type: 'share',
        enabled: true,
        handleClick: shareData => {
            addActionToDataLayer(shareData, 'compartir');
            buttonShare(shareData);
        },
        description: 'Compartir',
        IconButton: <IconSprite name="share" />
    },
    {
        type: 'comment',
        enabled: true,
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
export const renderAction = ({
    IconButton,
    description,
    handleClick,
    type,
    article
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
        default: renderRegularButton({
            IconButton,
            description,
            handleClick,
            type,
            article
        })
    };

    return Object.values(options).find(Boolean);
};
