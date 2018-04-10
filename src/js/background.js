/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2014-2018 Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/


/* global objectAssign */

'use strict';

/******************************************************************************/

var µBlock = (function() { // jshint ignore:line

    var oneSecond = 1000,
        oneMinute = 60 * oneSecond;

    // Patch 2018-01-21: Update default values
    var hiddenSettingsDefault = {
        assetFetchTimeout: 60,
        autoUpdateAssetFetchPeriod: 300,
        autoUpdatePeriod: 4,
        ignoreRedirectFilters: false,
        ignoreScriptInjectFilters: false,
        streamScriptInjectFilters: false,
        manualUpdateAssetFetchPeriod: 1,
        popupFontSize: 'unset',
        suspendTabsUntilReady: false,
        userResourcesLocation: 'unset',
        
        // Patch 2017-12-25: Add more advanced settings
        _nanoDisableHTMLFiltering: false,
        _nanoDisconnectFrom_jspenguincom: false,
        _nanoIgnoreThirdPartyWhitelist: false,
        _nanoIgnorePerformanceAuditing: false,
        _nanoMakeUserFiltersPrivileged: false
    };

    return {
        firstInstall: false,

        onBeforeStartQueue: [],
        onStartCompletedQueue: [],

        userSettings: {
            advancedUserEnabled: false,
            alwaysDetachLogger: false,
            autoUpdate: true,
            cloudStorageEnabled: false,
            collapseBlocked: true,
            colorBlindFriendly: false,
            contextMenuEnabled: true,
            dynamicFilteringEnabled: false,
            externalLists: [],
            firewallPaneMinimized: true,
            hyperlinkAuditingDisabled: true,
            ignoreGenericCosmeticFilters: false,
            largeMediaSize: 50,
            parseAllABPHideFilters: true,
            prefetchingDisabled: true,
            requestLogMaxEntries: 1000,
            showIconBadge: true,
            tooltipsDisabled: false,
            webrtcIPAddressHidden: false,
            
            // Patch 2017-12-19: Add UI configuration
            nanoDashboardAllowSelection: true,
            nanoEditorWordSoftWrap: false,
            nanoViewerWordSoftWrap: true
        },

        hiddenSettingsDefault: hiddenSettingsDefault,
        hiddenSettings: (function() {
            var out = objectAssign({}, hiddenSettingsDefault),
                json = vAPI.localStorage.getItem('immediateHiddenSettings');
            if ( typeof json === 'string' ) {
                try {
                    var o = JSON.parse(json);
                    if ( o instanceof Object ) {
                        for ( var k in o ) {
                            if ( out.hasOwnProperty(k) ) {
                                out[k] = o[k];
                            }
                        }
                    }
                }
                catch(ex) {
                }
            }
            // Remove once 1.15.12+ is widespread.
            vAPI.localStorage.removeItem('hiddenSettings');
            return out;
        })(),

        // Features detection.
        privacySettingsSupported: vAPI.browserSettings instanceof Object,
        cloudStorageSupported: vAPI.cloud instanceof Object,
        canFilterResponseBody: vAPI.net.canFilterResponseBody === true,

        // https://github.com/chrisaljoudi/uBlock/issues/180
        // Whitelist directives need to be loaded once the PSL is available
        netWhitelist: {},
        netWhitelistModifyTime: 0,
        netWhitelistDefault: [
            'about-scheme',
            'chrome-extension-scheme',
            'chrome-scheme',
            'moz-extension-scheme',
            'opera-scheme',
            'vivaldi-scheme',
            ''
        ].join('\n'),

        localSettings: {
            blockedRequestCount: 0,
            allowedRequestCount: 0
        },
        localSettingsLastModified: 0,
        localSettingsLastSaved: 0,

        // read-only
        systemSettings: {
            compiledMagic: 'ba1bul74dvkp',
            selfieMagic: 'ba1bul74dvkp'
        },

        restoreBackupSettings: {
            lastRestoreFile: '',
            lastRestoreTime: 0,
            lastBackupFile: '',
            lastBackupTime: 0
        },

        // Allows to fully customize uBO's assets, typically set through admin
        // settings. The content of 'assets.json' will also tell which filter
        // lists to enable by default when uBO is first installed.
        assetsBootstrapLocation: 'assets/assets.json',

        userFiltersPath: 'user-filters',
        // Patch 2017-12-25: Add a special asset key for partial user filters
        nanoPartialUserFiltersKey: 'nano-partial-user-filters',
        pslAssetKey: 'public_suffix_list.dat',

        selectedFilterLists: [],
        availableFilterLists: {},

        selfieAfter: 17 * oneMinute,

        pageStores: new Map(),
        pageStoresToken: 0,

        storageQuota: vAPI.storage.QUOTA_BYTES,
        storageUsed: 0,

        noopFunc: function(){},

        apiErrorCount: 0,

        mouseEventRegister: {
            tabId: '',
            x: -1,
            y: -1,
            url: ''
        },

        epickerTarget: '',
        epickerZap: false,
        epickerEprom: null,

        scriptlets: {
        },

        // so that I don't have to care for last comma
        dummy: 0
    };

})();

/******************************************************************************/

// Patch 2017-12-07: Make debugging less painful
var nano = µBlock;

/******************************************************************************/

// Patch 2018-01-25: Add a flag to disable HTML filtering.
// Reading hidden settings is currently synchronous, must update this logic if
// hidden settings handling have changed.
// If the new logic is asynchronous, then must test the effect of the potential
// race condition
if ( nano.hiddenSettings._nanoDisableHTMLFiltering ) {
    nano.canFilterResponseBody = false;
}

/******************************************************************************/
