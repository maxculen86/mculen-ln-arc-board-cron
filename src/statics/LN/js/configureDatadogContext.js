(function () {
    'use strict';

    function configureDatadogContext() {
        try {
            const el = document.getElementById(
                'script-configure-datadog-context'
            );
            if (!el) {
                console.warn(
                    '[Datadog] Elemento de configuración no encontrado'
                );
                return;
            }

            const raw = el.getAttribute('data-obj');
            if (!raw) {
                console.warn('[Datadog] Atributo data-obj ausente');
                return;
            }

            let obj;
            try {
                obj = JSON.parse(raw);
            } catch (err) {
                console.warn('[Datadog] Error al parsear data-obj', err);
                return;
            }

            const attName = 'fusion_info';

            if (window.DD_LOGS?.onReady) {
                try {
                    window.DD_LOGS.onReady(() => {
                        window.DD_LOGS.logger.setContextProperty(attName, obj);
                    });
                } catch (err) {
                    console.warn('[Datadog] Error al configurar DD_LOGS', err);
                }
            } else {
                console.warn('[Datadog] DD_LOGS no disponible');
            }

            if (window.DD_RUM?.onReady) {
                try {
                    window.DD_RUM.onReady(() => {
                        window.DD_RUM.setGlobalContextProperty(attName, obj);
                    });
                } catch (err) {
                    console.warn('[Datadog] Error al configurar DD_RUM', err);
                }
            } else {
                console.warn('[Datadog] DD_RUM no disponible');
            }
        } catch (err) {
            console.warn('[Datadog] Error inesperado en configuración', err);
        }
    }

    // Ejecución inmediata pero asíncrona para no bloquear render
    setTimeout(configureDatadogContext, 0);
})();
