import { cva } from '@ln/ds-cva';

// Los tokens tipográficos del DS rompen los overrides responsive: ver el README
// de LN_DS_CajaPromo antes de reemplazar estas utilities por un token.

export const cardRootVariants = cva(
    'ds-card relative w-full h-full border border-neutral-50 shadow-[0_8px_16px_0_rgba(16,16,16,0.06)] @container transition-opacity hover:opacity-80',
    {
        variants: {
            size: { 18: '', 24: '', 32: '' },
            orientation: {
                vertical: 'flex flex-col',
                horizontal: 'grid grid-cols-2'
            }
        },
        compoundVariants: [
            {
                size: 18,
                orientation: 'horizontal',
                className: 'grid-cols-[96px_1fr] gap-0'
            }
        ],
        defaultVariants: { size: 24, orientation: 'vertical' }
    }
);

export const cardMediaVariants = cva(
    'ds-card-media relative overflow-hidden my-auto',
    {
        variants: {
            size: { 18: '', 24: '', 32: '' },
            orientation: {
                vertical: 'aspect-1/1',
                horizontal: ''
            }
        },
        compoundVariants: [
            {
                size: 18,
                orientation: 'horizontal',
                className: 'w-96 h-96'
            },
            {
                size: 24,
                orientation: 'horizontal',
                className: 'h-full @[410px]:aspect-1/1 @[410px]:h-auto'
            },
            {
                size: 32,
                orientation: 'horizontal',
                className: 'h-full @[410px]:aspect-1/1 @[410px]:h-auto'
            }
        ],
        defaultVariants: { size: 24, orientation: 'vertical' }
    }
);

export const cardContentVariants = cva('ds-card-content flex flex-1', {
    variants: {
        size: { 18: '', 24: '', 32: '' },
        orientation: {
            vertical: 'flex-col',
            horizontal: ''
        }
    },
    compoundVariants: [
        {
            size: 18,
            orientation: 'horizontal',
            className: 'flex-row py-12 px-12 gap-8 items-center justify-start'
        },
        {
            size: 24,
            orientation: 'horizontal',
            className:
                'flex-col py-24 pl-16 pr-12 gap-8 items-start justify-center'
        },
        {
            size: 18,
            orientation: 'vertical',
            className: 'pt-12 pb-16 px-8 gap-8 items-center'
        },
        {
            size: 24,
            orientation: 'vertical',
            className: 'pt-12 pb-16 px-8 gap-8 items-center'
        },
        {
            size: 32,
            orientation: 'vertical',
            className: 'pt-24 pb-32 px-16 gap-8 items-center'
        },
        {
            size: 32,
            orientation: 'horizontal',
            className:
                'flex-col py-24 pl-16 pr-12 gap-8 items-start justify-center'
        }
    ],
    defaultVariants: { size: 24, orientation: 'vertical' }
});

export const cardTitleVariants = cva(
    'ds-card-title font-primary font-w-semibold text-base-default',
    {
        variants: {
            size: { 18: '', 24: '', 32: '' },
            orientation: {
                vertical: 'text-center flex-[0_1_auto]',
                horizontal: 'text-start flex-[0_1_auto]'
            },
            clamp: { true: 'line-clamp-2 break-words', false: '' }
        },
        compoundVariants: [
            {
                size: 18,
                orientation: 'vertical',
                className: 'text-18 leading-[130%]'
            },
            {
                size: 18,
                orientation: 'horizontal',
                className: 'text-18 leading-[130%] flex-[1_0_0]'
            },
            {
                size: 24,
                orientation: 'vertical',
                className: 'text-24 leading-[110%] tracking-[-0.3px] opsz-50'
            },
            {
                size: 24,
                orientation: 'horizontal',
                className: 'text-24 leading-[110%] tracking-[-0.3px] opsz-50'
            },
            {
                size: 32,
                orientation: 'vertical',
                className:
                    'text-24 md:text-28 xl:text-32 leading-[110%] tracking-[-0.6px] opsz-50'
            },
            {
                size: 32,
                orientation: 'horizontal',
                className:
                    'text-24 md:text-28 xl:text-32 leading-[110%] tracking-[-0.6px] opsz-50'
            }
        ],
        defaultVariants: { size: 24, orientation: 'vertical', clamp: false }
    }
);

export const cardDescriptionVariants = cva(
    'ds-card-description text-base-default',
    {
        variants: {
            size: { 18: '', 24: '', 32: '' },
            orientation: { vertical: '', horizontal: '' }
        },
        compoundVariants: [
            { size: 18, orientation: 'vertical', className: 'hidden' },
            { size: 24, orientation: 'vertical', className: 'hidden' },
            {
                size: 32,
                orientation: 'vertical',
                className:
                    'line-clamp-3 text-18 leading-[140%] tracking-[-0.6px] text-center'
            },
            { size: 18, orientation: 'horizontal', className: 'hidden' },
            { size: 24, orientation: 'horizontal', className: 'line-clamp-3' },
            {
                size: 32,
                orientation: 'horizontal',
                className:
                    'line-clamp-3 text-16 leading-[140%] tracking-[-0.3px]'
            }
        ],
        defaultVariants: { size: 24, orientation: 'vertical' }
    }
);

export const cardActionVariants = cva('ds-card-action', {
    variants: {
        size: { 18: '', 24: '', 32: '' },
        orientation: { vertical: '', horizontal: '' }
    },
    compoundVariants: [
        { size: 18, orientation: 'vertical', className: 'mt-auto' },
        { size: 24, orientation: 'vertical', className: 'mt-auto' },
        { size: 32, orientation: 'vertical', className: 'mt-auto' },
        { size: 18, orientation: 'horizontal', className: '' },
        { size: 24, orientation: 'horizontal', className: 'mt-8' },
        { size: 32, orientation: 'horizontal', className: 'mt-8' }
    ],
    defaultVariants: { size: 24, orientation: 'vertical' }
});

export const cardRibbonVariants = cva(
    'ds-card-ribbon absolute z-10 flex items-center justify-center bg-warning-default rounded-tl-2 rounded-tr-2 rounded-bl-24 rounded-br-24 right-[-3px] top-[-5px] pt-12 pb-8 px-8',
    {
        variants: {
            size: {
                18: 'w-28 h-32',
                24: 'w-40 h-44',
                32: 'w-40 h-44'
            }
        },
        defaultVariants: { size: 24 }
    }
);

// ─── Responsive support ─────────────────────────────────────────────────────
// Literal Tailwind class strings — add combos via /cardpromo-responsive skill.
// Keys: CARD_RESPONSIVE[component][bp][`${size}_${orientation}`]

const CARD_RESPONSIVE = {
    root: {
        md: {
            '18_vertical': 'md:flex md:flex-col',
            '24_vertical': 'md:flex md:flex-col',
            '24_horizontal': 'md:grid md:grid-cols-2',
            '32_vertical': 'md:flex md:flex-col',
            '32_horizontal': 'md:grid md:grid-cols-2'
        }
    },
    media: {
        md: {
            '18_vertical': 'md:w-full md:h-auto md:aspect-1/1',
            '24_vertical': 'md:w-full md:h-auto md:aspect-1/1',
            '24_horizontal':
                'md:w-full md:h-full md:aspect-none @[410px]:aspect-1/1 @[410px]:h-auto',
            '32_vertical': 'md:w-full md:h-auto md:aspect-1/1',
            '32_horizontal':
                'md:w-full md:h-full md:aspect-none @[410px]:aspect-1/1 @[410px]:h-auto'
        }
    },
    content: {
        md: {
            '18_vertical':
                'md:flex-col md:pt-12 md:pb-16 md:px-8 md:gap-8 md:items-center',
            '24_vertical':
                'md:flex-col md:pt-12 md:pb-16 md:px-8 md:gap-8 md:items-center',
            '24_horizontal':
                'md:flex-col md:py-24 md:pl-16 md:pr-12 md:gap-8 md:items-start md:justify-center',
            '32_vertical':
                'md:flex-col md:pt-24 md:pb-32 md:px-16 md:gap-8 md:items-center',
            '32_horizontal':
                'md:flex-col md:py-24 md:pl-16 md:pr-12 md:gap-8 md:items-start md:justify-center'
        }
    },
    title: {
        md: {
            '18_vertical':
                'md:text-18 md:leading-[140%] md:tracking-[-0.6px] md:text-center md:flex-[0_1_auto]',
            '24_vertical':
                'md:text-24 md:leading-[110%] md:tracking-[-0.3px] md:opsz-50 md:text-center md:flex-[0_1_auto]',
            '24_horizontal':
                'md:text-24 md:leading-[110%] md:tracking-[-0.3px] md:opsz-50 md:text-start md:flex-[0_1_auto]',
            '32_vertical':
                'md:text-28 xl:text-32 md:leading-[110%] md:tracking-[-0.6px] md:opsz-50 md:text-center md:flex-[0_1_auto]',
            '32_horizontal':
                'md:text-28 xl:text-32 md:leading-[110%] md:tracking-[-0.6px] md:opsz-50 md:text-start md:flex-[0_1_auto]'
        }
    },
    description: {
        md: {
            '18_vertical': 'md:hidden',
            '24_vertical': 'md:hidden',
            '24_horizontal': 'md:line-clamp-3',
            '32_vertical':
                'md:line-clamp-3 md:text-18 md:leading-[140%] md:tracking-[-0.6px] md:text-center',
            '32_horizontal':
                'md:line-clamp-3 md:text-16 md:leading-[140%] md:tracking-[-0.3px] md:text-start'
        }
    },
    action: {
        md: {
            '18_vertical': 'md:mt-auto',
            '24_vertical': 'md:mt-auto',
            '24_horizontal': 'md:mt-8',
            '32_vertical': 'md:mt-auto',
            '32_horizontal': 'md:mt-8'
        }
    }
};

const CARD_RIBBON_RESPONSIVE = {
    md: {
        24: { container: 'md:w-40 md:h-44', icon: 'md:size-24' },
        32: { container: 'md:w-40 md:h-44', icon: 'md:size-24' }
    }
};

const BP_ORDER = ['sm', 'md', 'lg', 'xl'];

export function normalizeResponsive(value, defaultValue) {
    if (value === undefined || value === null) return { default: defaultValue };
    if (typeof value !== 'object' || Array.isArray(value))
        return { default: value };
    return {
        default: value.default ?? defaultValue,
        sm: value.sm,
        md: value.md,
        lg: value.lg,
        xl: value.xl
    };
}

function resolveAtBp(responsive, defaultValue, bp) {
    const result = BP_ORDER.slice(0, BP_ORDER.indexOf(bp) + 1).reduceRight(
        (acc, b) => (acc !== undefined ? acc : responsive?.[b]),
        undefined
    );
    return result !== undefined ? result : defaultValue;
}

export function getResponsiveCardClasses(
    component,
    responsiveSize,
    responsiveOrientation,
    defaultSize,
    defaultOrientation
) {
    return BP_ORDER.filter(
        bp => responsiveSize?.[bp] || responsiveOrientation?.[bp]
    )
        .map(bp => {
            const size = resolveAtBp(responsiveSize, defaultSize, bp);
            const ori = resolveAtBp(
                responsiveOrientation,
                defaultOrientation,
                bp
            );
            return CARD_RESPONSIVE[component]?.[bp]?.[`${size}_${ori}`];
        })
        .filter(Boolean)
        .join(' ');
}

export function getResponsiveRibbonClasses(responsiveSize, defaultSize) {
    const matched = BP_ORDER.filter(bp => responsiveSize?.[bp])
        .map(
            bp =>
                CARD_RIBBON_RESPONSIVE[bp]?.[
                    resolveAtBp(responsiveSize, defaultSize, bp)
                ]
        )
        .filter(Boolean);
    return {
        container: matched.map(cls => cls.container).join(' '),
        icon: matched.map(cls => cls.icon).join(' ')
    };
}
