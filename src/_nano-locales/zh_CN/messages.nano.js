// JSON does not allow comments, which makes things too painful
(() => {
    "use strict";
    return {
        // Dialog buttons
        "genericYes": {
            "message": "是",
            "description": "The word yes, used in dialogs"
        },
        "genericNo": {
            "message": "否",
            "description": "The word no, used in dialogs"
        },
        "genericOK": {
            "message": "确定",
            "description": "The word OK, used in dialogs"
        },
        // Generic ialog messages
        "genericUnsavedChange": {
            "message": "您确定要离开这个标签么？未保存的更改将会丢失。",
            "description": "A warning when the user is about to leave a tab without saving"
        },
        "genericFilterReadError": {
            "message": "# 未能读取数据，请刷新。",
            "description": "Message to show when filter data could not be loaded"
        },
        "genericDataSaveError": {
            "message": "未能保存数据，请重试。",
            "description": "Message to show when changes could not be saved"
        },
        "genericNothingToExport": {
            "message": "没有任何数据需要导出。",
            "description": "Message to show when the user clicked export to file button but there is nothing to export"
        },

        // New cloud UI
        "nanoCloudNoData": {
            "message": "没有云端数据。",
            "description": "English: No cloud data"
        },
        "nanoCloudLastSync": {
            "message": "上次同步： {{device}} 在 {{time}}",
            "description": "English: Last sync: {{device}} at {{time}}"
        },
        "nanoCloudSyncFailed": {
            "message": "出现了一些问题：\n{{error}}",
            "description": "English: Something went wrong:\n{{error}}"
        },

        // Dashboard dialog messages
        "dashboardMutexError": {
            "message": "未能获取互斥锁，您是否已经打开一个控制面板了？",
            "description": "Message to show when mutex lock is held by another instance of the dashboard"
        },

        // Settings groups
        "settingGeneralGroup": {
            "message": "基本",
            "description": "Settings tab general group name"
        },
        "settingUserInterfaceGroup": {
            "message": "界面",
            "description": "Settings tab user interface group name"
        },
        "settingOtherGroup": {
            "message": "其他",
            "description": "Settings tab other group name"
        },
        // Settings prompts
        "settingsDashboardAllowSelectionPrompt": {
            "message": "允许在控制面板中选择文字",
            "description": "English: Allow text selection in dashboard"
        },
        "settingsEditorWordWrapPrompt": {
            "message": "在规则编辑器中启用自动换行（ soft warp ）",
            "description": "English: Soft wrap long lines in filter editor"
        },
        "settingsViewerWordWrapPrompt": {
            "message": "在规则查看器中启用自动换行（ soft warp ）",
            "description": "English: Soft wrap long lines in filter viewer"
        },
        // Extra strings for new dashboard
        "settingDiskUsage": {
            "message": "占用空间： ",
            "description": "Disk usage prompt"
        },
        "settingMebibyte": {
            "message": " MiB",
            "description": "Symbol for mebibyte"
        },
        "settingsLastBackedupFilePrompt": {
            "message": "上次备份文件名： ",
            "description": "Last backed up file name prompt"
        },
        "settingsLastRestoredFilePrompt": {
            "message": "上次恢复文件名： ",
            "description": "Last restored file name prompt"
        },

        // The tab name of advanced settings
        "advancedPageName": {
            "message": "高级",
            "description": "Advanced settings tab name"
        },

        // Extra help messages for user filters
        "1pResourcesReference": {
            "message": "Nano 拥有两套资源，",
            "description": "English: Nano Adblocker comes with two sets of resources,"
        },
        "1pResourcesOriginal": {
            "message": "uBlock Origin 的资源",
            "description": "English: uBlock Origin Resources"
        },
        "1pResourcesAnd": {
            "message": "和",
            "description": "English: and"
        },
        "1pResourcesNano": {
            "message": "Nano 的额外资源",
            "description": "English: Nano Extra Resources"
        },
        "1pResourcesPeriod": {
            "message": "。",
            "description": "Period symbol"
        },
        "1pFilterEditorHelp": {
            "message": "Nano 规则编辑器是由 Ace 驱动的，大部分快捷键都一样。",
            "description": "Explain the similarity between Nano Filter Editor and Ace in terms of shortcut keys"
        },

        // Whitelist linter limit warning
        "whitelistLinterAborted": {
            "message": "Nano 没有验证剩下的规则，因为已经有过多的错误。",
            "description": "Warning message to show when the whitelist validator aborted because there are too many errors"
        },
        "whitelistLinterTooManyWarnings": {
            "message": "Nano 没有检查剩下的规则，因为已经有过多的警告。",
            "description": "Warning message to show when Nano Whitelist Linter aborted because there are too many warnings"
        },
        // Whitelist linter error messages
        "whitelistLinterInvalidHostname": {
            "message": "这个主机名称无效。",
            "description": "Error message to show when a hostname whitelist is not valid"
        },
        "whitelistLinterInvalidRegExp": {
            "message": "这个正则表达式有语法错误。",
            "description": "Error message to show when a regular expression whitelist has syntax errors"
        },
        "whitelistLinterInvalidURL": {
            "message": "这个路径无效。",
            "description": "Error message to show when a URL whitelist is not valid"
        },
        // Whitelist linter warning messages
        "whitelistLinterSuspeciousRegExp": {
            "message": "这行被解析成了正则表达式，您确定这是正确的么？",
            "description": "Warning message to show when a whitelist is parsed as a regular expression whitelist but it is unlikely to be the intention"
        },

        // Tab name of hosts matrix
        "matrixPageName": {
            "message": "主机矩阵",
            "description": "Hosts matrix tab name"
        },

        // Title of filter viewer
        "filterViewerPageName": {
            "message": "Nano — 规则查看器",
            "description": "Title of the filter viewer"
        },

        // Based on message of about page
        "aboutBasedOn": {
            "message": "基于 uBlock Origin {{@version}}",
            "description": "English: Based on uBlock Origin {{@version}}"
        }
    };
})();
