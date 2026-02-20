import { createStrictContext } from '@ln/ds-core-hooks';

/**
 * @typedef {Object} ToolbarContextValue
 * @property {boolean} isAudioPlaying - Si el audio está reproduciendo
 * @property {Function} setIsAudioPlaying - Función para cambiar el estado del audio
 */

/**
 * Context para el Toolbar que provee información del estado del audio
 * @type {[React.Provider<ToolbarContextValue>, () => ToolbarContextValue]}
 */
export const [ToolbarProvider, useToolbarContext] =
    createStrictContext('Toolbar');
