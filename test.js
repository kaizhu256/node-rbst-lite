/* istanbul instrument in package rbst-lite */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run node js-env code - pre-init
    (function () {
        // init local
        local = require('./index.js');
        local.modeJs = 'node';
        // require modules
        local.fs = require('fs');
        local.utility2 = require('utility2');
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.testCase_build_doc = function (options, onError) {
        /*
         * this function will test build's doc handling-behavior
         */
            options = {};
            local.utility2.onNext(options, function (error) {
                switch (options.modeNext) {
                case 1:
                    options.moduleDict = {
                        'rbst-lite': {
                            exampleList: [],
                            exports: local
                        }
                    };
                    Object.keys(options.moduleDict).forEach(function (key) {
                        options.moduleDict[key].example = [
                            'README.md',
                            'test.js',
                            'index.js'
                        ]
                            .concat(options.moduleDict[key].exampleList)
                            .map(function (file) {
                                return '\n\n\n\n\n\n\n\n' +
                                    local.fs.readFileSync(file, 'utf8') +
                                    '\n\n\n\n\n\n\n\n';
                            }).join('');
                    });
                    // create doc.api.html
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/doc.api.html',
                        local.utility2.docApiCreate(options),
                        options.onNext
                    );
                    break;
                case 2:
                    local.utility2.browserTest({
                        modeBrowserTest: 'screenCapture',
                        url: 'file://' + local.utility2.envDict.npm_config_dir_build +
                            '/doc.api.html'
                    }, options.onNext);
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };
        break;
    }
    switch (local.modeJs) {



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        local.modeTest = 1;
        // run test-server
        local.utility2.testRun(local);
        break;
    }
}());
