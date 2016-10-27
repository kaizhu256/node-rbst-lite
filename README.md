rbst-lite
=========
this package will provide a javascript implementation of randomized-binary-search-tree derived from http://kukuruku.co/hub/cpp/randomized-binary-search-trees with zero npm-dependencies

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-rbst-lite.svg)](https://travis-ci.org/kaizhu256/node-rbst-lite)

[![NPM](https://nodei.co/npm/rbst-lite.png?downloads=true)](https://www.npmjs.com/package/rbst-lite)

[![package-listing](https://kaizhu256.github.io/node-rbst-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-rbst-lite)



# documentation
#### api-doc
- [https://kaizhu256.github.io/node-rbst-lite/build/doc.api.html](https://kaizhu256.github.io/node-rbst-lite/build/doc.api.html)

[![api-doc](https://kaizhu256.github.io/node-rbst-lite/build/screen-capture.docApiCreate.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-rbst-lite_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-rbst-lite/build/doc.api.html)

#### todo
- none

#### change since 4fb90e68
- npm publish 2016.10.10
- add api-doc
- add testCase_rbst_default
- fix sizeUpdate
- none



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-rbst-lite.svg)](https://travis-ci.org/kaizhu256/node-rbst-lite)
[![build commit status](https://kaizhu256.github.io/node-rbst-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-rbst-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-rbst-lite/tree/master) | [beta](https://github.com/kaizhu256/node-rbst-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-rbst-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-report : | [![test-report](https://kaizhu256.github.io/node-rbst-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-rbst-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-rbst-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-rbst-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-rbst-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-rbst-lite/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul coverage](https://kaizhu256.github.io/node-rbst-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-rbst-lite/build..master..travis-ci.org/coverage.html/index.html) | [![istanbul coverage](https://kaizhu256.github.io/node-rbst-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-rbst-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![istanbul coverage](https://kaizhu256.github.io/node-rbst-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-rbst-lite/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-rbst-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-rbst-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-rbst-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-rbst-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-rbst-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-rbst-lite/tree/gh-pages/build..alpha..travis-ci.org)|

#### master branch
- stable branch
- HEAD should be tagged, npm-published package

#### beta branch
- semi-stable branch
- HEAD should be latest, npm-published package

#### alpha branch
- unstable branch
- HEAD is arbitrary
- commit history may be rewritten



# quickstart example
```javascript
/*
 * rbst-lite.js
 * https://github.com/kaizhu256/node-rbst-lite
 *
 * this package will provide a javascript implementation of randomized-binary-search-tree
 * derived from http://kukuruku.co/hub/cpp/randomized-binary-search-trees
 * with zero npm-dependencies
 *
 * quickstart example:
 *     copy and paste this entire script into the browser or nodejs console and press <enter>
 */



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
    local = {};
    // globally export local
    /* istanbul ignore next */
    if (typeof global === 'object' && global) {
        global.rbst_lite = local;
    }
    /* istanbul ignore next */
    if (typeof module === 'object' && module) {
        module.exports = local;
    }
    /* istanbul ignore next */
    if (typeof window === 'object' && window) {
        window.rbst_lite = local;
    }



    // run shared js-env code - lib.rbst.js
    (function (local) {
        var compare,
            create,
            find,
            findInKeyRange,
            insert,
            insertAsRoot,
            join,
            print,
            remove,
            rotateLeft,
            rotateRight,
            sizeUpdate;

        compare = function (aa, bb) {
        /*
         * this function will compare aa vs bb and return:
         * -1 if aa < bb
         *  0 if aa === bb
         *  1 if aa > bb
         * the priority for comparing different typeof's is:
         * number < boolean < string < object < undefined
         */
            var typeof1, typeof2;
            if (aa === bb) {
                return 0;
            }
            // handle undefined case
            if (aa === undefined) {
                return 1;
            }
            if (bb === undefined) {
                return -1;
            }
            typeof1 = typeof aa;
            typeof2 = typeof bb;
            if (typeof1 === typeof2) {
                return typeof1 === 'object'
                    ? 0
                    : aa < bb
                    ? -1
                    : 1;
            }
            if (typeof1 === 'number') {
                return -1;
            }
            if (typeof2 === 'number') {
                return 1;
            }
            if (typeof1 === 'boolean') {
                return -1;
            }
            if (typeof2 === 'boolean') {
                return 1;
            }
            if (typeof1 === 'string') {
                return -1;
            }
            if (typeof2 === 'string') {
                return 1;
            }
            return 0;
        };

        create = function (key, data) {
        /*
         * this function will create a tree with the given key and data
         */
            return {
                key: key,
                data: data,
                left: null,
                right: null,
                size: 1
            };
        };

        find = function (tree, key) {
        /*
         * this function will find the node in the tree with the given key
         */
            var node, tmp;
            node = tree;
            tmp = node && compare(node.key, key);
            while (tmp) {
                node = tmp === -1
                    ? node.right
                    : node.left;
                tmp = node && compare(node.key, key);
            }
            return node;
        };

        findInKeyRange = function (tree, aa, bb, fnc) {
        /*
         * this function will iteratively call fnc on all nodes in the tree,
         * with keys in the inclusive key-range [aa, bb]
         */
            var node, sentinel, stack, tmp, traversedList;
            if (!tree) {
                return;
            }
            // find first node with key >= aa
            node = tree;
            stack = [node];
            tmp = node && compare(node.key, aa);
            while (node) {
                stack.push(node);
                node = tmp === -1
                    ? node.right
                    : node.left;
                tmp = node && compare(node.key, aa);
            }
            traversedList = stack.slice();
            // find last node with key <= bb
            sentinel = null;
            node = tree;
            tmp = compare(node.key, bb);
            while (node) {
                sentinel = node;
                node = tmp === 1
                    ? node.left
                    : node.right;
                tmp = node && compare(node.key, bb);
            }
            sentinel = node || sentinel;
            // begin traversal with first node with key >= aa
            while (stack.length) {
                node = stack.pop();
                tmp = compare(node.key, bb);
                if (compare(node.key, aa) >= 0 && compare(node.key, bb) <= 0) {
                    fnc(node);
                }
                // end traversal with last node with key <= bb
                if (node === sentinel) {
                    return;
                }
                node = node.right;
                if (traversedList.indexOf(node) < 0) {
                    while (node) {
                        stack.push(node);
                        node = node.left;
                    }
                }
            }
        };

        insert = function (tree, key, data) {
        /*
         * this function will insert a new node in the tree with the given key and data,
         * with random re-balancing
         */
            if (!tree) {
                return create(key, data);
            }
            if (Math.floor(Math.random() * 0x10000000000000) % (tree.size + 1) === 0 &&
                    typeof key !== 'object') {
                return insertAsRoot(tree, key, data);
            }
            if (compare(key, tree.key) === -1) {
                tree.left = insert(tree.left, key, data);
            } else {
                tree.right = insert(tree.right, key, data);
            }
            sizeUpdate(tree);
            return tree;
        };

        insertAsRoot = function (tree, key, data) {
        /*
         * this function will insert a new node in the tree with the given key and data,
         * and rebalance it as the root node
         */
            if (!tree) {
                return create(key, data);
            }
            if (compare(key, tree.key) === -1) {
                tree.left = insertAsRoot(tree.left, key, data);
                return rotateRight(tree);
            }
            tree.right = insertAsRoot(tree.right, key, data);
            return rotateLeft(tree);
        };

        join = function (left, right) {
        /*
         * this function will join the left and right trees after deleting their parent tree
         */
            if (!left) {
                return right;
            }
            if (!right) {
                return left;
            }
            // left is heavy, so move it up
            if (left.size > right.size) {
                left.right = join(left.right, right);
                sizeUpdate(left);
                return left;
            }
            // right is heavy, so move it up
            right.left = join(left, right.left);
            sizeUpdate(right);
            return right;
        };

        print = function (tree) {
        /*
         * this function will print the tree
         */
            var height, ii, recurse;
            recurse = function (tree, depth) {
                if (!tree) {
                    return;
                }
                recurse(tree.left, depth + '* ');
                ii += 1;
                if (depth > height) {
                    height = depth;
                }
                console.log('(' + ii + ',' + (depth.length / 2) + ',' + tree.size + ') ' +
                    depth + JSON.stringify(tree.key));
                recurse(tree.right, depth + '* ');
            };
            height = '';
            ii = -1;
            console.log('\ntree\n(ii,depth,size) key');
            recurse(tree, '');
            console.log('height = ' + height.length / 2);
        };

        remove = function (tree, key) {
        /*
         * this function will remove the node in the tree with the given key
         */
            if (!tree) {
                return tree;
            }
            if (tree.key === key) {
                return join(tree.left, tree.right);
            }
            if (compare(key, tree.key) === -1) {
                tree.left = remove(tree.left, key);
            } else {
                tree.right = remove(tree.right, key);
            }
            sizeUpdate(tree);
            return tree;
        };

        rotateLeft = function (tree) {
        /*
         * this function will rotate-left tree.right up to its parent tree's position
         */
            var right;
            right = tree.right;
            tree.right = right.left;
            sizeUpdate(tree);
            right.left = tree;
            sizeUpdate(right);
            return right;
        };

        rotateRight = function (tree) {
        /*
         * this function will rotate-right tree.left up to its parent tree's position
         */
            var left;
            left = tree.left;
            tree.left = left.right;
            sizeUpdate(tree);
            left.right = tree;
            sizeUpdate(left);
            return left;
        };

        sizeUpdate = function (tree) {
        /*
         * this function will update tree.size
         */
            tree.size = 1 +
                ((tree.left && tree.left.size) || 0) +
                ((tree.right && tree.right.size) || 0);
        };

        // init local
        local.rbstCompare = compare;
        local.rbstCreate = create;
        local.rbstFind = find;
        local.rbstFindInKeyRange = findInKeyRange;
        local.rbstInsert = insert;
        local.rbstPrint = print;
        local.rbstRemove = remove;
    }(local));



    // run browser js-env code - test
    (function (local) {
        var assert, testCase_rbst_default;

        assert = function (passed, data) {
        /*
         * this function will, if passed is falsey, throw an error with the given data
         */
            if (!passed) {
                throw new Error(JSON.stringify(data));
            }
        };

        testCase_rbst_default = function (options, onError) {
            options = options || {};
            // create tree
            options.tree = local.rbstCreate(null, null);
            [
                -1, -0.5, 0, 0, 1, 2, 3,
                false, true,
                '-1', '0', '1', 'a', 'b',
                null, undefined, {}, []
            ]
                // shuffle list
                .sort(function () {
                    return Math.floor(Math.random() * 3) - 1;
                })
                .forEach(function (key, data) {
                    // insert
                    options.tree = local.rbstInsert(options.tree, key, data);
                });
            // find
            console.log('\nfind 0');
            options.data = local.rbstFind(options.tree, 0);
            console.log(options.data);
            assert(options.data.key === 0, options.data);
            console.log('\nfind undefined');
            options.data = local.rbstFind(options.tree, 'undefined');
            console.log(options.data);
            assert(options.data === null, options.data);
            // findInKeyRange
            console.log('\nfindInKeyRange [0, Infinity]');
            options.data = [];
            local.rbstFindInKeyRange(options.tree, 0, Infinity, function (node) {
                options.data.push(node.key);
            });
            console.log(options.data);
            assert(JSON.stringify(options.data) === '[0,0,1,2,3]', options.data);
            // print
            local.rbstPrint(options.tree);
            // output:
            // options.tree
            // (ii,depth) key
            // (0,3) * * * -1
            // (1,2) * * -0.5
            // (2,5) * * * * * 0
            // (3,4) * * * * 0
            // (4,3) * * * 1
            // (5,1) * 2
            // (6,3) * * * 3
            // (7,2) * * false
            // (8,0) true
            // (9,3) * * * "-1"
            // (10,5) * * * * * "0"
            // (11,4) * * * * "1"
            // (12,2) * * "a"
            // (13,1) * "b"
            // (14,2) * * null
            // (15,3) * * * []
            // (16,4) * * * * null
            // (17,6) * * * * * * {}
            // (18,5) * * * * * undefined
            // height = 6
            // remove
            options.tree = local.rbstRemove(options.tree, true);
            // print
            local.rbstPrint(options.tree);
            // coverage-hack - assert
            try {
                assert(false);
            } catch (ignore) {
            }
            // coverage-hack - compare
            options.symbolCreate = Symbol;
            options.data = local.rbstCompare({}, options.symbolCreate());
            assert(options.data === 0, options.data);
            // coverage-hack - remove
            options.tree = local.rbstRemove();
            local.rbstFindInKeyRange(null, null, null, console.log);
            for (options.ii = 0; options.ii < 0x100; options.ii += 1) {
                // coverage-hack - insert
                if (Math.random() >= 0.5) {
                    options.tree = local.rbstInsert(
                        options.tree,
                        options.ii,
                        'options.data' + options.ii
                    );
                }
                // coverage-hack - find
                local.rbstFind(options.tree, 'options.data' + options.ii);
                local.rbstFindInKeyRange(options.tree, -Infinity, undefined, assert);
            }
            options.data = [];
            local.rbstFindInKeyRange(options.tree, 0.5, 256.5, function (node) {
                options.data.push(node);
            });
            options.data.forEach(function (node) {
                // remove
                if (Math.random() >= 0.5) {
                    options.tree = local.rbstRemove(options.tree, node.key);
                }
            });
            // print
            // local.rbstPrint(options.tree);
            onError();
        };

        // run test
        testCase_rbst_default(null, function (error) {
            // validate no error occurred
            console.assert(!error, error);
        });
    }(local));
}());
```



# package.json
```json
{
    "package.json": true,
    "author": "kaizhu256@gmail.com",
    "description": "{{packageJson.description}}",
    "devDependencies": {
        "electron-lite": "kaizhu256/node-electron-lite#alpha",
        "utility2": "kaizhu256/node-utility2#alpha"
    },
    "homepage": "https://github.com/kaizhu256/node-rbst-lite",
    "keywords": [
        "binary-search-tree", "bst",
        "heap",
        "randomized-binary-search-tree", "rbst",
        "self-balancing",
        "treap"
    ],
    "license": "MIT",
    "name": "rbst-lite",
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-rbst-lite.git"
    },
    "scripts": {
        "build-ci": "utility2 shRun shReadmeBuild",
        "start": "utility2 start index.js",
        "test": "export PORT=$(utility2 shServerPortRandom) && utility2 test test.js"
    },
    "version": "2016.10.10"
}
```



# internal build-script
- build.sh
```shell
# build.sh

# this shell script will run the build for this package

shBuildCiTestPre() {(set -e
# this function will run the pre-test build
    # test published-package
    (export MODE_BUILD=npmTestPublished &&
        shRunScreenCapture shNpmTestPublished) || return $?
)}

shBuildCiTestPost() {(set -e
# this function will run the post-test build
    # if running legacy-node, then return
    [ "$(node --version)" \< "v5.0" ] && return || true
    export NODE_ENV=production
)}

shBuild() {(set -e
# this function will run the main build
    # init env
    . node_modules/.bin/utility2 && shInit
    # cleanup github-gh-pages dir
    # export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build"
    # init github-gh-pages commit-limit
    export COMMIT_LIMIT=16
    # if branch is alpha, beta, or master, then run default build
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        shBuildCiDefault
    fi
)}
shBuild
```
