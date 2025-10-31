import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { useDisclosure } from '@ln/hooks';
import { Tooltip } from '@ln/common-ui-tooltip';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import useTooltipVisibility from '../../../../features/LN-common/shareV2/hooks/useTooltipVisibility';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { copyToClipboard } from '../../_helpers/liveblogEditorialBody';
import PostExpandable from './PostExpandable';
import PostHeader from './PostHeader';
import PostPinned from './PostPinned';
import '../../../../../resources/packages/css/@ln/common-ui-accordion/index.css';
import { borderPostVariant, wrapperPostVariant } from './styles';

function BodyPost({
    id,
    isPinned,
    children,
    outputType,
    globalContent,
    isExpandable = false,
    headerProps = {},
    expandableProps = {}
}) {
    const { isOpen, onToggle } = useDisclosure();
    const { isTooltipVisible, handleTooltipVisibility } =
        useTooltipVisibility();

    const label = isOpen ? 'Mostrar menos' : 'Mostrar más';

    const tooltipConfig = {
        position: 'top-center',
        disableTrigger: true,
        content: <span className="text-12">Link copiado</span>,
        visible: Boolean(isTooltipVisible[id]),
        className: 'flex ai-center h-32 rounded-4 p-8 bg-blue-500 text-light-50'
    };

    const postExpandableProps = {
        ...expandableProps,
        isOpen,
        onToggle,
        label,
        outputType,
        globalContent
    };

    const { title } = headerProps;
    const wrapperClassName = wrapperPostVariant({ isPinned });
    const borderClassName = borderPostVariant({ isPinned });

    return (
        <div className={wrapperClassName} id={id}>
            <div className={borderClassName}>
                {isPinned && <PostPinned />}
                <PostHeader {...headerProps}>
                    <Tooltip {...tooltipConfig}>
                        <Button
                            className="bg-neutral-light-100 rounded-circle"
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
                            title="Copiar link de este posteo"
                            iconOnly
                        >
                            <Icon size={24}>
                                <IconSprite
                                    name="fileCopy"
                                    fill="var(--light-neutral-700)"
                                />
                            </Icon>
                        </Button>
                    </Tooltip>
                </PostHeader>
                <div className="body-post px-16 pb-32 px-40_m pb-40_m">
                    {children}
                    {isExpandable && (
                        <PostExpandable {...postExpandableProps} />
                    )}
                </div>
                {isPinned && (
                    <span className="bg-danger-600 block h-2 w-100 --mobile-only" />
                )}
            </div>
        </div>
    );
}

BodyPost.propTypes = {
    id: PropTypes.string.isRequired,
    isPinned: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    outputType: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({}).isRequired,
    isExpandable: PropTypes.bool.isRequired,
    headerProps: PropTypes.shape({}).isRequired,
    expandableProps: PropTypes.shape({}).isRequired
};

export default BodyPost;
