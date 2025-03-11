const ICON_VARIANTS = {
    danger: {
        icon: 'system-danger',
        fill: 'var(--feedback-danger-500)'
    },
    success: {
        icon: 'system-check',
        fill: 'var(--feedback-success-700)'
    }
};

export const getIconProps = ({ variant }) =>
    ICON_VARIANTS[variant] || {
        icon: 'warning',
        fill: 'currentColor'
    };
