/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global browser, describe, it */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('fluxible', function () {
    it('should have a title', function () {
        browser.get(browser.baseUrl);
        expect(browser.getTitle()).to.eventually.match(/Fluxible/);
    });

    it('follows nav links', function () {
        browser.get(browser.baseUrl).then(function () {
            expect(browser.getTitle()).to.eventually.match(/Fluxible/);

            var navLinks = browser.$$('.pure-menu a');
            var h1;

            navLinks.get(0).click().then(function () {
                navLinks = browser.$$('.pure-menu a');
                h1 = browser.$('h1');
                expect(h1.getText()).to.eventually.match(/Quick Start/);
                expect(browser.getCurrentUrl()).to.eventually.match(/quick-start.html/);
                expect(browser.getTitle()).to.eventually.match(/Quick Start/);
            }).then(function () {
                navLinks.get(1).click().then(function () {
                    navLinks = browser.$$('.pure-menu a');
                    h1 = browser.$('h1');
                    expect(h1.getText()).to.eventually.match(/Fluxible/);
                    expect(browser.getCurrentUrl()).to.eventually.match(/api\/fluxible.html/);
                    expect(browser.getTitle()).to.eventually.match(/Fluxible API/);
                });
            });
        });
    });

    it('follows doc links', function () {
        browser.get(browser.baseUrl + 'quick-start.html').then(function () {
            expect(browser.getTitle()).to.eventually.match(/Quick Start/);

            var menuLinks = browser.$$('.doc-menu ul a');
            var h1;

            // we skip the first two links since the first one is the page we're on
            // and the second one has the slideshare embed, which takes longer than 2 seconds
            // to load and causes the test to timeout
            menuLinks.get(2).click().then(function () {
                menuLinks = browser.$$('.doc-menu ul a');
                h1 = browser.$('h1');
                expect(h1.getText()).to.eventually.match(/TestUtils/);
                expect(browser.getCurrentUrl()).to.eventually.match(/guides\/test-utils.html/);
                expect(browser.getTitle()).to.eventually.match(/TestUtils/);
            }).then(function () {
                menuLinks.get(3).click().then(function () {
                    menuLinks = browser.$$('.doc-menu ul a');
                    h1 = browser.$('h1');
                    expect(h1.getText()).to.eventually.match(/Stores/);
                    expect(browser.getCurrentUrl()).to.eventually.match(/api\/stores.html/);
                    expect(browser.getTitle()).to.eventually.match(/Stores/);
                });
            }).then(function () {
                menuLinks.get(4).click().then(function () {
                    menuLinks = browser.$$('.doc-menu ul a');
                    h1 = browser.$('h1');
                    expect(h1.getText()).to.eventually.match(/Actions/);
                    expect(browser.getCurrentUrl()).to.eventually.match(/api\/actions.html/);
                    expect(browser.getTitle()).to.eventually.match(/Actions/);
                });
            });
        });
    });

    it('follows api links', function () {
        browser.get(browser.baseUrl + 'api/fluxible.html').then(function () {
            expect(browser.getTitle()).to.eventually.match(/Fluxible API/);

            var menuLinks = browser.$$('.doc-menu ul a');
            var h1;

            // we skip the first link since it's the page we're currently on
            menuLinks.get(1).click().then(function () {
                menuLinks = browser.$$('.doc-menu ul a');
                h1 = browser.$('h1');
                expect(h1.getText()).to.eventually.match(/FluxibleContext/);
                expect(browser.getCurrentUrl()).to.eventually.match(/api\/fluxible-context.html/);
                expect(browser.getTitle()).to.eventually.match(/Fluxible Context/);
            }).then(function () {
                menuLinks.get(2).click().then(function () {
                    menuLinks = browser.$$('.doc-menu ul a');
                    h1 = browser.$('h1');
                    expect(h1.getText()).to.eventually.match(/Fetchr Plugin API/);
                    expect(browser.getCurrentUrl()).to.eventually.match(/api\/fetchr-plugin.html/);
                    expect(browser.getTitle()).to.eventually.match(/Fetchr Plugin API/);
                });
            }).then(function () {
                menuLinks.get(3).click().then(function () {
                    menuLinks = browser.$$('.doc-menu ul a');
                    h1 = browser.$('h1');
                    expect(h1.getText()).to.eventually.match(/Routr Plugin API/);
                    expect(browser.getCurrentUrl()).to.eventually.match(/api\/routr-plugin.html/);
                    expect(browser.getTitle()).to.eventually.match(/Routr Plugin/);
                });
            });
        });
    });
});
