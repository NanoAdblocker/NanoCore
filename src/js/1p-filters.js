/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2014-2016 Raymond Hill

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

/* global uDom, uBlockDashboard */

/******************************************************************************/

(function() {

'use strict';

/******************************************************************************/

var editor = nanoIDE.init('userFilters', true, false);
editor.commands.addCommand({
    name: "save",
    bindKey: {win: "Ctrl-S"},
    exec: function() {
        var btn = document.getElementById("userFiltersApply");
        btn.click();
    }
});

/******************************************************************************/

var messaging = vAPI.messaging;
var cachedUserFilters = '';

/******************************************************************************/

// Patch 2017-12-27: Show linting result in the editor
function renderLinterAnnotation() {
    var renderAnnotation = function(data) {
        editor.session.setAnnotations(data.errors.concat(data.warnings));
    };
    messaging.send(
        'dashboard',
        { 
            what: 'fetchUserFilterLintingResult'
        },
        renderAnnotation
    );
}

/******************************************************************************/

// This is to give a visual hint that the content of user blacklist has changed.

function userFiltersChanged(changed) {
    if ( typeof changed !== 'boolean' ) {
        changed = nanoIDE.getLinuxValue().trim() !== cachedUserFilters;
    }
    uDom.nodeFromId('userFiltersApply').disabled = !changed;
    uDom.nodeFromId('userFiltersRevert').disabled = !changed;
}

/******************************************************************************/

// TODO 2017-12-06: Find out what is the purpose of the parameter first
function renderUserFilters(first) {
    var onRead = function(details) {
        if ( details.error ) { return; }
        cachedUserFilters = details.content.trim();
        if ( first ) {
            nanoIDE.setValueFocus(details.content + '\n');
        } else {
            nanoIDE.setValueFocus(details.content);
        }
        userFiltersChanged(false);
        
        // Patch 2017-12-27: Render annotations
        renderLinterAnnotation();
    };
    messaging.send('dashboard', { what: 'readUserFilters' }, onRead);
}
// Patch 2018-01-01: Read line wrap settings
function loadLineWrapSettings() {
    var onLoad = function(lineWrap) {
        nanoIDE.setLineWrap(lineWrap === true);
        renderUserFilters(true);
    };
    vAPI.messaging.send(
        'dashboard',
        {
            what: 'userSettings',
            name: 'nanoEditorWordSoftWrap'
        },
        onLoad
    );
}

/******************************************************************************/

function allFiltersApplyHandler() {
    messaging.send('dashboard', { what: 'reloadAllFilters' });
    uDom('#userFiltersApply').prop('disabled', true );

    // Patch 2017-12-27: Render new annotations, need to wait a bit for filters
    // to be compiled
    setTimeout(renderLinterAnnotation, 500);
}

/******************************************************************************/

var handleImportFilePicker = function() {
    // https://github.com/chrisaljoudi/uBlock/issues/1004
    // Support extraction of filters from ABP backup file
    var abpImporter = function(s) {
        var reAbpSubscriptionExtractor = /\n\[Subscription\]\n+url=~[^\n]+([\x08-\x7E]*?)(?:\[Subscription\]|$)/ig;
        var reAbpFilterExtractor = /\[Subscription filters\]([\x08-\x7E]*?)(?:\[Subscription\]|$)/i;
        var matches = reAbpSubscriptionExtractor.exec(s);
        // Not an ABP backup file
        if ( matches === null ) {
            return s;
        }
        // 
        var out = [];
        var filterMatch;
        while ( matches !== null ) {
            if ( matches.length === 2 ) {
                filterMatch = reAbpFilterExtractor.exec(matches[1].trim());
                if ( filterMatch !== null && filterMatch.length === 2 ) {
                    out.push(filterMatch[1].trim().replace(/\\\[/g, '['));
                }
            }
            matches = reAbpSubscriptionExtractor.exec(s);
        }
        return out.join('\n');
    };

    var fileReaderOnLoadHandler = function() {
        var sanitized = abpImporter(this.result);
        nanoIDE.setValueFocus(nanoIDE.getLinuxValue().trim() + '\n' + sanitized);
        userFiltersChanged();
    };
    var file = this.files[0];
    if ( file === undefined || file.name === '' ) {
        return;
    }
    if ( file.type.indexOf('text') !== 0 ) {
        return;
    }
    var fr = new FileReader();
    fr.onload = fileReaderOnLoadHandler;
    fr.readAsText(file);
};

/******************************************************************************/

var startImportFilePicker = function() {
    var input = document.getElementById('importFilePicker');
    // Reset to empty string, this will ensure an change event is properly
    // triggered if the user pick a file, even if it is the same as the last
    // one picked.
    input.value = '';
    input.click();
};

/******************************************************************************/

var exportUserFiltersToFile = function() {
    // Just get value, not Linux value
    var val = editor.getValue().trim();
    if ( val === '' ) {
        return;
    }
    var filename = vAPI.i18n('1pExportFilename')
        .replace('{{datetime}}', uBlockDashboard.dateNowToSensibleString())
        .replace(/ +/g, '_');
    vAPI.download({
        'url': 'data:text/plain;charset=utf-8,' + encodeURIComponent(val + '\n'),
        'filename': filename
    });
};

/******************************************************************************/

var applyChanges = function() {
    var onWritten = function(details) {
        if ( details.error ) {
            return;
        }
        // TODO 2017-12-06: Maybe set the cursor back to its original position?
        nanoIDE.setValueFocus(details.content);
        cachedUserFilters = details.content.trim();
        // Patch 2017-12-06: Add false as I just set the value to be the same
        userFiltersChanged(false);
        allFiltersApplyHandler();
    };

    var request = {
        what: 'writeUserFilters',
        content: nanoIDE.getLinuxValue()
    };
    messaging.send('dashboard', request, onWritten);
};

var revertChanges = function() {
    nanoIDE.setValueFocus(cachedUserFilters + '\n');
    // Patch 2017-12-06: Add false as I just set the value to be the same
    userFiltersChanged(false);
};

/******************************************************************************/

var getCloudData = function() {
    return nanoIDE.getLinuxValue();
};

var setCloudData = function(data, append) {
    if ( typeof data !== 'string' ) {
        return;
    }
    if ( append ) {
        data = uBlockDashboard.mergeNewLines(nanoIDE.getLinuxValue(), data);
    }
    nanoIDE.setValueFocus(data);
    userFiltersChanged();
};

self.cloud.onPush = getCloudData;
self.cloud.onPull = setCloudData;

/******************************************************************************/

// Handle user interaction
uDom('#importUserFiltersFromFile').on('click', startImportFilePicker);
uDom('#importFilePicker').on('change', handleImportFilePicker);
uDom('#exportUserFiltersToFile').on('click', exportUserFiltersToFile);
uDom('#userFiltersApply').on('click', applyChanges);
uDom('#userFiltersRevert').on('click', revertChanges);
editor.session.on('change', userFiltersChanged);

// Patch 2018-01-01: Read line wrap settings
loadLineWrapSettings();

/******************************************************************************/

// https://www.youtube.com/watch?v=UNilsLf6eW4

})();
