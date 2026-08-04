import React from 'react';
import { Progress } from '@ln/ds-common-progress';
import { cx } from '@ln/ds-cva';
import { addEventToDataLayerV2 } from '../../../../../../private/LN/common/utils/addEventToDataLayer';
import Image from '../../../../../ui/foodit/image/default';
import Icon from '../../../../../ui/foodit/icon/default';
import Button from '../../../../../ui/foodit/button/foodit';

function sanitizeHtml(html) {
    if (typeof html !== 'string') return '';
    return html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/on\w+\s*=\s*\S+/gi, '');
}

export function Steps({ steps = [], audio }) {
    const {
        segmentIndex = 0,
        isMuted = false,
        goToNext = () => {},
        goToPrev = () => {},
        toggleMute = () => {},
        replayCurrent = () => {},
        totalSegments = 0
    } = audio || {};

    const totalSteps = steps.length;

    const segmentOffset = Math.max(0, totalSegments - totalSteps);
    const calculatedStep = segmentIndex - segmentOffset + 1;

    const currentStep = Math.max(
        1,
        totalSteps > 0 ? Math.min(calculatedStep, totalSteps) : 1
    );

    const progress =
        totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;
    const isFirst = currentStep <= 1;
    const isLast = currentStep >= totalSteps;

    const handleNext = () => {
        addEventToDataLayerV2({
            event: 'e_linkclick',
            category: 'interaction',
            label: 'next',
            action: 'cook_mode'
        });
        if (!isLast) goToNext();
    };

    const handlePrev = () => {
        addEventToDataLayerV2({
            event: 'e_linkclick',
            category: 'interaction',
            label: 'back',
            action: 'cook_mode'
        });
        if (!isFirst) goToPrev();
    };

    const stepData = steps.find(({ step }) => step === currentStep);

    const handleButton = [
        {
            direction: 'prev',
            disabled: isFirst,
            onClick: handlePrev
        },
        {
            direction: 'next',
            disabled: isLast,
            onClick: handleNext
        }
    ];

    if (totalSteps === 0 || !stepData) {
        return null;
    }

    return (
        <div className="flex flex-col flex-1 min-h-0 md:w-292 justify-center">
            <div className="flex-1 min-h-0 overflow-y-auto">
                {stepData && (
                    <div className="flex flex-col gap-8 w-full text-body-lg">
                        {stepData.title && (
                            <p className="font-bold">{stepData.title}</p>
                        )}
                        <p
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(stepData.description)
                            }}
                        />
                        {stepData.image && (
                            <div className="aspect-3/2 w-full overflow-hidden">
                                <Image
                                    key={stepData.step}
                                    className="object-cover"
                                    src={stepData.image}
                                    alt={`Paso ${stepData.step}`}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="bg-neutral-1 pt-16 border-t border-muted">
                <div className="w-full flex gap-24 pb-12">
                    <div className="w-full">
                        <Progress color="black" value={progress} />
                        <p className="pt-8 text-secondary-light text-label-lg">
                            Paso{' '}
                            <span className="font-bold">{currentStep}</span> de{' '}
                            {totalSteps}
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <Button
                            size="custom"
                            variant="ghost"
                            type="button"
                            className="hover:bg-transparent px-0"
                            onClick={replayCurrent}
                        >
                            <Icon size={24} name="replay" />
                        </Button>
                        <Button
                            size="custom"
                            variant="ghost"
                            type="button"
                            className="hover:bg-transparent px-0"
                            onClick={toggleMute}
                        >
                            <Icon
                                size={24}
                                name={isMuted ? 'megaphone-off' : 'megaphone'}
                            />
                        </Button>
                    </div>
                </div>
                <div className="w-full flex gap-24">
                    {handleButton.map(({ direction, disabled, onClick }) => {
                        const isPrev = direction === 'prev';
                        return (
                            <Button
                                key={direction}
                                rounded="custom"
                                color="black"
                                variant={isPrev ? 'outline' : 'solid'}
                                className={cx(
                                    'rounded-4 w-full',
                                    isPrev &&
                                        'text-accent-default hover:text-primary-light'
                                )}
                                disabled={disabled}
                                onClick={onClick}
                            >
                                {isPrev && <Icon size={16} name="arrow-left" />}
                                {isPrev ? 'anterior' : 'siguiente'}
                                {!isPrev && (
                                    <Icon size={16} name="arrow-right" />
                                )}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
