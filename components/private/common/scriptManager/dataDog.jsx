/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { DATADOG_CONFIG } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import handleCookie from '../../LN/common/utils/handleCookie';

function DataDog({ location = 'head' }) {
    const {
        clientToken,
        applicationId,
        site,
        forwardErrorsToLogs,
        sampleRateLog,
        sampleRateRum,
        service,
        env,
        trackInteractions,
        trackSessionAcrossSubdomains
    } = DATADOG_CONFIG;
    const { deployment: version } = useAppContext();
    const { getCookie } = handleCookie();

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
        "https://www.datadoghq-browser-agent.com/datadog-logs.js",
        "DD_LOGS"
      );
      DD_LOGS.onReady(function () {
        DD_LOGS.init({
          clientToken: "${clientToken}",
          site: "${site}",
          forwardErrorsToLogs: ${forwardErrorsToLogs},
          sampleRate: ${sampleRateLog},
          service: "${service}",
          env: "${env}",
          version: "${version}",
          trackSessionAcrossSubdomains: ${trackSessionAcrossSubdomains},
        });

        googleAnalyticsId && DD_LOGS.logger.addContext('user.gaId', googleAnalyticsId);
        usuarioEmail && DD_LOGS.logger.addContext('user.email', usuarioEmail);
        
        if ("${env}" !== "prod")
          console.log(
            \`Datadog initialized. Version: ${version}, sampleRate: ${sampleRateLog}, env: ${env}\`
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
        "https://www.datadoghq-browser-agent.com/datadog-rum.js",
        "DD_RUM"
      );
      
      DD_RUM.onReady(function () {
        DD_RUM.init({
          clientToken: "${clientToken}",
          applicationId: "${applicationId}",
          site: "${site}",
          service: "${service}",
          env: "${env}",
          version: "${version}",
          sampleRate: ${sampleRateRum},
          trackInteractions: ${trackInteractions},
          trackSessionAcrossSubdomains: ${trackSessionAcrossSubdomains},
        });

        if (googleAnalyticsId || usuarioEmail) {
          DD_RUM.setUser({
            ...(googleAnalyticsId && { gaId: googleAnalyticsId }),
            ...(usuarioEmail && { email: usuarioEmail })
          });
        }
        
        if ("${env}" !== "prod")
            console.log(
              \`Datadog RUM initialized. Version: ${version}, sampleRate: ${sampleRateRum}, env: ${env}\`
            );
      });`;

    return (
        location === 'head' && (
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
            </>
        )
    );
}

DataDog.propTypes = { location: PropTypes.string.isRequired };

export default DataDog;
