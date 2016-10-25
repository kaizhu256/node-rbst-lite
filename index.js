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



    // run shared js-env code - lib
    (function () {
        var compare,
            create,
            find,
            findInKeyRange,
            fixsize,
            getsize,
            insert,
            insertRoot,
            join,
            local,
            print,
            remove,
            rotateLeft,
            rotateRight;

        compare = function (aa, bb) {
        /*
         * this function will compare aa vs bb and return:
         * -1 if aa < bb
         *  0 if aa === bb
         *  1 if aa > bb
         * the priority for comparing different typeof's is:
         * number < boolean < string < (object or symbol)
         */
            var typeof1, typeof2;
            if (aa === bb) {
                return 0;
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
            // traverse tree starting at top of stack
            while (stack.length) {
                node = stack.pop();
                tmp = compare(node.key, bb);
                if (compare(node.key, aa) >= 0 && compare(node.key, bb) <= 0) {
                    fnc(node);
                }
                // reached end of key-range
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

        fixsize = function (tree) {
        //setting up a proper size of the tree
            tree.size = getsize(tree.left) + getsize(tree.right) + 1;
        };

        getsize = function (tree) {
        // a wrapper for size field. It operates with empty trees (tt=NULL)
            if (!tree) {
                return null;
            }
            return tree.size;
        };

        insert = function (tree, key, data) {
        /*
         * this function will randomly insert a new node into the tree
         * with the given key and data
         */
            if (!tree) {
                return create(key, data);
            }
            if (Math.floor(Math.random() * 0x10000000000000) % (tree.size + 1) === 0 &&
                    typeof key !== 'object') {
                return insertRoot(tree, key, data);
            }
            if (compare(key, tree.key) === -1) {
                tree.left = insert(tree.left, key, data);
            } else {
                tree.right = insert(tree.right, key, data);
            }
            fixsize(tree);
            return tree;
        };

        insertRoot = function (tree, key, data) {
        // inserting a new node with key in tree tree
            if (!tree) {
                return create(key, data);
            }
            if (compare(key, tree.key) === -1) {
                tree.left = insertRoot(tree.left, key, data);
                return rotateRight(tree);
            }
            tree.right = insertRoot(tree.right, key, data);
            return rotateLeft(tree);
        };

        join = function (pp, qq) {
        // joining two trees
            if (!pp) {
                return qq;
            }
            if (!qq) {
                return pp;
            }
            if (Math.floor(Math.random() * 0x10000000000000) % (pp.size + qq.size) < pp.size) {
                pp.right = join(pp.right, qq);
                fixsize(pp);
                return pp;
            }
            qq.left = join(pp, qq.left);
            fixsize(qq);
            return qq;
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
                console.log('(' + ii + ',' + (depth.length / 2) + ') ' + depth +
                    JSON.stringify(tree.key));
                recurse(tree.right, depth + '* ');
            };
            height = '';
            ii = -1;
            console.log('\ntree\n(ii,depth) key');
            recurse(tree, '');
            console.log('height = ' + height.length / 2);
        };

        remove = function (pp, key) {
        // deleting from pp tree the first found node with key
            var qq;
            if (!pp) {
                return pp;
            }
            if (pp.key === key) {
                qq = join(pp.left, pp.right);
                return qq;
            }
            if (compare(key, pp.key) === -1) {
                pp.left = remove(pp.left, key);
            } else {
                pp.right = remove(pp.right, key);
            }
            return pp;
        };

        rotateLeft = function (qq) {
        /*
         * this function will rotate-left qq with qq.right
         */
            var pp;
            pp = qq.right;
            qq.right = pp.left;
            pp.left = qq;
            pp.size = qq.size;
            fixsize(qq);
            return pp;
        };

        rotateRight = function (pp) {
        /*
         * this function will rotate-right pp with pp.left
         */
            var qq;
            qq = pp.left;
            pp.left = qq.right;
            qq.right = pp;
            qq.size = pp.size;
            fixsize(pp);
            return qq;
        };

        // init local
        local = {};
        local.compare = compare;
        local.create = create;
        local.find = find;
        local.findInKeyRange = findInKeyRange;
        local.insert = insert;
        local.print = print;
        local.remove = remove;

        // globall export local
        /* istanbul ignore next */
        if (typeof global === 'object' && global) {
            global.rbst_lite = local;
        }
        /* istanbul ignore next */
        if (typeof window === 'object' && window) {
            window.rbst_lite = local;
        }
    }());



    // run browser js-env code - test
    (function () {
        var assert, local, testRun;

        assert = function (passed, data) {
        /*
         * this function will, if passed is falsey, throw an error with the data
         */
            if (!passed) {
                throw new Error(JSON.stringify(data));
            }
        };

        testRun = function () {
            var data, ii, tree;
            // create tree
            tree = local.create(null, null);

            // insert
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
                    tree = local.insert(tree, key, data);
                });

            // find
            console.log('\nfind 0');
            data = local.find(tree, 0);
            console.log(data);
            assert(data.key === 0, data);

            console.log('\nfind undefined');
            data = local.find(tree, 'undefined');
            console.log(data);
            assert(data === null, data);

            // findInKeyRange
            console.log('\nfindInKeyRange [0, Infinity]');
            data = [];
            local.findInKeyRange(tree, 0, Infinity, function (node) {
                data.push(node.key);
            });
            console.log(data);
            assert(JSON.stringify(data) === '[0,0,1,2,3]', data);

            // print
            local.print(tree);
            // output:
            // tree
            // (ii,depth) key
            // (0,3) *   *   *   -1
            // (1,2) *   *   -0.5
            // (2,4) *   *   *   *   0
            // (3,3) *   *   *   0
            // (4,1) *   1
            // (5,2) *   *   2
            // (6,0) 3
            // (7,1) *   false
            // (8,4) *   *   *   *   true
            // (9,3) *   *   *   "-1"
            // (10,5) *   *   *   *   *   "0"
            // (11,4) *   *   *   *   "1"
            // (12,2) *   *   "a"
            // (13,3) *   *   *   "b"
            // (14,4) *   *   *   *   null
            // (15,6) *   *   *   *   *   *   []
            // (16,7) *   *   *   *   *   *   *   null
            // (17,8) *   *   *   *   *   *   *   *   {}
            // (18,5) *   *   *   *   *   undefined
            // height = 8

            // coverage-hack
            try {
                assert(false);
            } catch (ignore) {
            }
            local.findInKeyRange(null, null, null, console.log);
            for (ii = 0; ii < 0x100; ii += 1) {
                // insert
                if (Math.random() >= 0.5) {
                    tree = local.insert(tree, ii, 'data' + ii);
                }
                // remove
                if (Math.random() >= 0.5) {
                    tree = local.remove(tree, ii);
                }
                // find
                local.find(tree, 'data' + ii);
            }

            // print
            // local.print(tree);
            // output:
            // tree
            // (ii,depth) key
            // (0,3) * * * -1
            // (1,2) * * -0.5
            // (2,7) * * * * * * * 0
            // (3,8) * * * * * * * * 1
            // (4,6) * * * * * * 1
            // (5,5) * * * * * 2
            // (6,4) * * * * 2
            // (7,6) * * * * * * 5
            // (8,7) * * * * * * * 11
            // (9,5) * * * * * 18
            // (10,6) * * * * * * 20
            // (11,3) * * * 21
            // (12,8) * * * * * * * * 22
            // (13,11) * * * * * * * * * * * 23
            // (14,12) * * * * * * * * * * * * 30
            // (15,10) * * * * * * * * * * 37
            // (16,9) * * * * * * * * * 46
            // (17,10) * * * * * * * * * * 48
            // (18,7) * * * * * * * 53
            // (19,8) * * * * * * * * 56
            // (20,11) * * * * * * * * * * * 58
            // (21,10) * * * * * * * * * * 70
            // (22,9) * * * * * * * * * 71
            // (23,10) * * * * * * * * * * 81
            // (24,6) * * * * * * 82
            // (25,5) * * * * * 83
            // (26,4) * * * * 89
            // (27,7) * * * * * * * 91
            // (28,6) * * * * * * 92
            // (29,7) * * * * * * * 93
            // (30,5) * * * * * 94
            // (31,6) * * * * * * 95
            // (32,8) * * * * * * * * 99
            // (33,7) * * * * * * * 102
            // (34,1) * 103
            // (35,4) * * * * 106
            // (36,6) * * * * * * 115
            // (37,5) * * * * * 120
            // (38,6) * * * * * * 123
            // (39,7) * * * * * * * 125
            // (40,3) * * * 128
            // (41,4) * * * * 132
            // (42,5) * * * * * 144
            // (43,6) * * * * * * 147
            // (44,2) * * 152
            // (45,3) * * * 153
            // (46,4) * * * * 155
            // (47,0) 156
            // (48,4) * * * * 158
            // (49,6) * * * * * * 167
            // (50,7) * * * * * * * 169
            // (51,5) * * * * * 170
            // (52,7) * * * * * * * 177
            // (53,6) * * * * * * 179
            // (54,3) * * * 181
            // (55,2) * * 183
            // (56,6) * * * * * * 184
            // (57,7) * * * * * * * 187
            // (58,5) * * * * * 189
            // (59,4) * * * * 190
            // (60,5) * * * * * 191
            // (61,3) * * * 193
            // (62,9) * * * * * * * * * 196
            // (63,8) * * * * * * * * 199
            // (64,9) * * * * * * * * * 201
            // (65,7) * * * * * * * 202
            // (66,6) * * * * * * 222
            // (67,7) * * * * * * * 227
            // (68,5) * * * * * 229
            // (69,7) * * * * * * * 234
            // (70,8) * * * * * * * * 236
            // (71,6) * * * * * * 238
            // (72,7) * * * * * * * 243
            // (73,4) * * * * 245
            // (74,7) * * * * * * * false
            // (75,10) * * * * * * * * * * true
            // (76,9) * * * * * * * * * "-1"
            // (77,8) * * * * * * * * "0"
            // (78,6) * * * * * * "1"
            // (79,7) * * * * * * * "a"
            // (80,8) * * * * * * * * "b"
            // (81,5) * * * * * null
            // (82,6) * * * * * * []
            // (83,7) * * * * * * * null
            // (84,8) * * * * * * * * {}
            // (85,1) * undefined
            // height = 12
        };

        // globall import local
        /* istanbul ignore next */
        if (typeof global === 'object' && global) {
            local = global.rbst_lite;
        }
        /* istanbul ignore next */
        if (typeof window === 'object' && window) {
            local = window.rbst_lite;
        }

        // run test
        testRun();
    }());
}());
