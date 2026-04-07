/* eslint-disable react/no-danger */
import React from 'react';
import { DATADOG_CONFIG } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import handleCookie from '../../LN/common/utils/handleCookie';

function Datadog() {
    const {
        deployment,
        arcSite = 'la-nacion-ar',
        globalContent,
        template,
        outputType,
        globalContentConfig,
        layout,
        contextPath
    } = useAppContext();
    const { getCookie } = handleCookie();

    const {
        clientTokenLogs,
        clientTokenRum,
        applicationId,
        site,
        forwardErrorsToLogs,
        sampleRateLog,
        sampleRateRum,
        service,
        env,
        sessionReplaySampleRate,
        trackResources,
        trackLongTasks,
        trackUserInteractions,
        trackSessionAcrossSubdomains,
        defaultPrivacyLevel
    } = DATADOG_CONFIG[arcSite] || {};

    const scriptLog = `
    const getMyCookie = ${getCookie};

    const gaIdCookie = getMyCookie('_ga');
    const googleAnalyticsId =  gaIdCookie && gaIdCookie.split('.').splice(2,2).join('.');
    const usuarioEmail = getMyCookie('usuarioemail');

    (function (h, o, u, n, d) {
        h = h[d] = h[d] || {
          q: [],
          onReady: function (c) {
            h.q.push(c);
          },
        };
        d = o.createElement(u);
        d.async = 1;
        d.src = n;
        n = o.getElementsByTagName(u)[0];
        n.parentNode.insertBefore(d, n);
      })(
        window,
        document,
        "script",
        "https://www.datadoghq-browser-agent.com/datadog-logs-v5.js",
        "DD_LOGS"
      );
      DD_LOGS.onReady(function () {
        DD_LOGS.init({
          clientToken: "${clientTokenLogs}",
          site: "${site}",
          forwardErrorsToLogs: ${forwardErrorsToLogs},
          sessionSampleRate: ${sampleRateLog},
          service: "${service}",
          env: "${env}",
          version: "${deployment}",
          trackSessionAcrossSubdomains: ${trackSessionAcrossSubdomains},
        });

        googleAnalyticsId && DD_LOGS.logger.setContextProperty('user.gaId', googleAnalyticsId);
        usuarioEmail && DD_LOGS.logger.setContextProperty('user.email', usuarioEmail);
        
        if ("${env}" !== "prod")
          console.log(
            \`Datadog initialized. Version: ${deployment}, sampleRate: ${sampleRateLog}, env: ${env}\`
          );
      });
    `;

    const scriptRum = `
    (function (h, o, u, n, d) {
        h = h[d] = h[d] || {
          q: [],
          onReady: function (c) {
            h.q.push(c);
          },
        };
        d = o.createElement(u);
        d.async = 1;
        d.src = n;
        n = o.getElementsByTagName(u)[0];
        n.parentNode.insertBefore(d, n);
      })(
        window,
        document,
        "script",
        "https://www.datadoghq-browser-agent.com/datadog-rum-v5.js",
        "DD_RUM"
      );
      
      DD_RUM.onReady(function () {
        DD_RUM.init({
          clientToken: "${clientTokenRum}",
          applicationId: "${applicationId}",
          site: "${site}",
          service: "${service}",
          env: "${env}",
          version: "${deployment}",
          sessionSampleRate: ${sampleRateRum},
          sessionReplaySampleRate: ${sessionReplaySampleRate},
          trackResources: ${trackResources},
          trackLongTasks: ${trackLongTasks}, 
          trackUserInteractions: ${trackUserInteractions},
          trackSessionAcrossSubdomains: ${trackSessionAcrossSubdomains},
          defaultPrivacyLevel: "${defaultPrivacyLevel}",
        });
      
        DD_RUM.startSessionReplayRecording();

        if (googleAnalyticsId || usuarioEmail) {
          DD_RUM.setUser({
            ...(googleAnalyticsId && { gaId: googleAnalyticsId }),
            ...(usuarioEmail && { email: usuarioEmail })
          });
        }
        
        if ("${env}" !== "prod")
            console.log(
              \`Datadog RUM initialized. Version: ${deployment}, sampleRate: ${sampleRateRum}, env: ${env}\`
            );
      });`;

    const obj = {
        layout,
        contentSource: globalContentConfig && globalContentConfig.source,
        outputType,
        subtype: globalContent && globalContent.subtype,
        template,
        nodeType: globalContent && globalContent.node_type
    };

    return (
        <>
            <script
                async
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: scriptLog }}
            />
            <script
                async
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: scriptRum }}
            />
            <script
                async
                id="script-configure-datadog-context"
                data-obj={JSON.stringify(obj)}
                defer
                type="text/javascript"
                src={deployment(
                    `${contextPath}/resources/js/LN/configureDatadogContext.min.js`
                )}
            />
        </>
    );
}

export default Datadog;
