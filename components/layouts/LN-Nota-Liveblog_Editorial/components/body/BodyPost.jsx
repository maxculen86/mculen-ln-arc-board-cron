import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Accordion } from '@ln/common-ui-accordion';
import { useDisclosure } from '@ln/hooks';
import { Tooltip } from '@ln/common-ui-tooltip';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import SignatureWithAuthors from '../../../../features/LN-nota/signature/signatureWithAuthors';
import '../../../../../resources/packages/css/@ln/common-ui-accordion/index.css';
import useTooltipVisibility from '../../../../features/LN-common/shareV2/hooks/useTooltipVisibility';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { copyToClipboard } from '../../_helpers/liveblogEditorialBody';
import BuildLiveblogBody from './BuildLiveblogBody';

function BodyPost({
    id,
    isPinned,
    children,
    time,
    relative,
    date,
    title,
    author,
    authors,
    hasAuthors,
    position,
    isExpandable = false,
    hiddenTextItems,
    customTimeOrText,
    outputType,
    globalContent
}) {
    // TO-DO: PENDIENTE DE COMPONETIZAR

    const { isOpen, onToggle } = useDisclosure();
    const { isTooltipVisible, handleTooltipVisibility } =
        useTooltipVisibility();

    const label = isOpen ? 'Mostrar menos' : 'Mostrar más';
    const dataAuthor = {
        author,
        authors,
        showSignatureWithAuthors: hasAuthors,
        position,
        size: 12,
        photo: author?.photo || null
    };

    const tooltipConfig = {
        position: 'top-center',
        disableTrigger: true,
        content: <span className="text-12">Copiado</span>,
        visible: Boolean(isTooltipVisible[id]),
        className: 'flex ai-center h-32 rounded-4 p-8 bg-blue-500 text-light-50'
    };

    const displayTime = relative || time || customTimeOrText;

    return (
        <>
            <div className="-ml-16 -mr-16 ml-0_m mr-0_m liveBlog_post" id={id}>
                <div className="relative border border-all border-thin_m border-neutral-light-100_m rounded-8_m shadow-post-md">
                    {isPinned && (
                        <>
                            <Icon
                                className="absolute w-40"
                                style={{
                                    left: '15px',
                                    top: '-6px'
                                }}
                            >
                                <IconSprite name="pinColor" color />
                            </Icon>
                            <span className="bg-danger-600 block h-6 w-100" />
                        </>
                    )}
                    <div className="flex flex-column pt-32 px-16 px-40_m">
                        <div
                            className="row ai-center text-14 gap-8 flex jc-between"
                            style={{ marginBottom: '16px' }}
                        >
                            <div className="flex gap-8 ai-center">
                                {displayTime && (
                                    <time className="text-danger-600 font-bold">
                                        {displayTime}
                                    </time>
                                )}
                                {date && (
                                    <>
                                        <div className="separator w-2 h-30 bg-light-400" />
                                        <time className="text-neutral-light-600">
                                            {date}
                                        </time>
                                    </>
                                )}
                            </div>
                            <Tooltip {...tooltipConfig}>
                                <Button
                                    className="bg-light-400 rounded-circle"
                                    onClick={() => {
                                        handleTooltipVisibility(id);
                                        addEventToDataLayerV2({
                                            event: 'share_note',
                                            title,
                                            rest: {
                                                nota_id_arc: id,
                                                tags: 'post'
                                            }
                                        });
                                        copyToClipboard(id);
                                    }}
                                    variant="custom"
                                    iconOnly
                                >
                                    <Icon size={24}>
                                        <IconSprite
                                            name="fileCopy"
                                            fill="#333333"
                                        />
                                    </Icon>
                                </Button>
                            </Tooltip>
                        </div>
                        <Text
                            className="prumo prumo-semibold text-24 text-neutral-light-800 mb-16"
                            as="h2"
                        >
                            {title}
                        </Text>
                        <SignatureWithAuthors {...dataAuthor} />
                    </div>
                    <div className="px-16 pb-32 px-40_m pb-40_m">
                        {children}
                        {isExpandable && (
                            <Accordion
                                visible={isOpen}
                                className="flex flex-column-reverse border-secondary-positive__hover"
                            >
                                <Accordion.Header
                                    onClick={onToggle}
                                    iconProps={{
                                        color: 'inherit',
                                        size: 20
                                    }}
                                    className="text-blue-500"
                                    style={{
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text className="text-16 " weight="bold">
                                        {label}
                                    </Text>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <BuildLiveblogBody
                                        groupedElements={hiddenTextItems}
                                        outputType={outputType}
                                        globalContent={globalContent}
                                    />
                                </Accordion.Body>
                            </Accordion>
                        )}
                    </div>
                </div>
            </div>
            <span className="w-100 h-1 bg-neutral-light-100 block --mobile-only" />
        </>
    );
}

BodyPost.propTypes = {
    id: PropTypes.string.isRequired,
    isPinned: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    time: PropTypes.string.isRequired,
    relative: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        link: PropTypes.string,
        photo: PropTypes.string
    }).isRequired,
    authors: PropTypes.shape({}).isRequired,
    hasAuthors: PropTypes.bool.isRequired,
    position: PropTypes.string.isRequired,
    isExpandable: PropTypes.bool.isRequired,
    hiddenTextItems: PropTypes.shape({}).isRequired,
    customTimeOrText: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({}).isRequired
};

export default BodyPost;
