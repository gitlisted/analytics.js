// Google Analytics
// ----------------
// [Documentation](https://developers.google.com/analytics/devguides/collection/gajs/).

analytics.addProvider('Google Analytics', {

    settings : {
        anonymizeIp             : false,
        enhancedLinkAttribution : false,
        siteSpeedSampleRate     : null,
        trackingId              : null
    },


    // Initialize
    // ----------

    // Changes to the Google Analytics snippet:
    //
    // * Added `trackingId`.
    // * Added optional support for `enhancedLinkAttribution`
    // * Added optional support for `siteSpeedSampleRate`
    // * Added optional support for `anonymizeIp`
    initialize : function (settings) {
        settings = analytics.utils.resolveSettings(settings, 'trackingId');
        analytics.utils.extend(this.settings, settings);

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', this.settings.trackingId]);
        if (this.settings.enhancedLinkAttribution) {
            var pluginUrl = (('https:' == document.location.protocol) ? 'https://www.' : 'http://www.') + 'google-analytics.com/plugins/ga/inpage_linkid.js';
            _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
        }
        if (analytics.utils.isNumber(this.settings.siteSpeedSampleRate)) {
            _gaq.push(['_setSiteSpeedSampleRate', this.settings.siteSpeedSampleRate]);
        }
        if(this.settings.anonymizeIp) {
            _gaq.push(['_gat._anonymizeIp']);
        }
        _gaq.push(['_trackPageview']);
        window._gaq = _gaq;

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    },


    // Track
    // -----

    track : function (event, properties) {
        window._gaq.push(['_trackEvent', 'All', event]);
    },


    // Pageview
    // --------

    pageview : function () {
        window._gaq.push(['_trackPageview']);
    }

});


