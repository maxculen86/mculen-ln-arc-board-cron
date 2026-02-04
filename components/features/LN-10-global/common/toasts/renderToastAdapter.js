import renderToastLegacy from '../../../private-global/common/utils/renderToast';
import renderToastsDS from '../../../ui/ln/toastsContainer/renderToast';

// TODO: Eliminar este archivo junto a su test y usar el nuevo renderToast del DS cuando se complete la migración.

/**
 * Mapeo de variantes del sistema antiguo al nuevo DS
 * - danger → error
 * - success → success
 * - warning → warning
 * - info → info
 */
const VARIANT_TO_COLOR_MAP = {
    danger: 'error',
    success: 'success',
    warning: 'warning',
    info: 'info'
};

/**
 * Adapter para renderizar toasts con convivencia de dos sistemas de diseño.
 * Detecta automáticamente qué sistema usar basándose en el layout y adapta las propiedades.
 *
 * @param {Object} options - Opciones del toast
 * @param {string} options.variant - Variante del toast (danger, success, warning, info) - usado como fuente de verdad
 * @param {string} options.title - Título del toast
 * @param {string} options.message - Mensaje del toast
 * @param {Object} [options.buttonProps] - Props del botón de acción
 * @param {number} [options.duration=3000] - Duración del toast en ms (solo para DS)
 * @param {boolean} useDesignSystem - Si true, usa el nuevo sistema de diseño (renderToastsDS), si false usa el legacy
 * @returns {void}
 *
 * @example
 * // Uso con TOAST_CONFIG
 * renderToastAdapter({
 *   variant: TOAST_CONFIG.SUCCESS.VARIANT,
 *   title: TOAST_CONFIG.SUCCESS.TITLE,
 *   message: TOAST_CONFIG.SUCCESS.MESSAGE.ADD_NEWSLLETER,
 *   buttonProps: TOAST_CONFIG.BUTTON_PROPS.NEWSLETTER_BOX
 * }, isOpinion);
 */
export default function renderToastAdapter(
    { variant, title, message, buttonProps, duration = 3000 },
    useDesignSystem = false
) {
    if (useDesignSystem) {
        // Nuevo sistema de diseño (renderToastsDS)
        // Mapea variant → color
        const color = VARIANT_TO_COLOR_MAP[variant] || 'info';

        renderToastsDS({
            color,
            title,
            description: message,
            duration,
            ...buttonProps
        });
    } else {
        // Sistema legacy (renderToast)
        renderToastLegacy({
            duration,
            variant,
            title,
            message,
            ...buttonProps
        });
    }
}
