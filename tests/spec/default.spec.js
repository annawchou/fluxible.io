/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global browser, describe, it */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var protractor = require('protractor');
var EC = protractor.ExpectedConditions;

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('fluxible', function () {
    it('should have a title', function () {
        browser.get(browser.baseUrl);
        expect(browser.getTitle()).to.eventually.match(/Fluxible/);
    });

    it('follows get started link', function () {
        browser.get(browser.baseUrl).then(function () {
            expect(browser.getTitle()).to.eventually.match(/Fluxible/);

            var splashLinks = browser.$$('#splash a');
            var link = splashLinks.get(0);

            link.click().then(function () {
                var h1 = browser.$('#main h1');
                var isPresent = EC.presenceOf(h1);
                browser.wait(isPresent, 500);

                expect(h1.getText()).to.eventually.match(/Quick Start/);

                expect(browser.getCurrentUrl()).to.eventually.match(/quick-start.html/);
                expect(browser.getTitle()).to.eventually.match(/Quick Start/);
            });
        });
    });

    it('follows doc links', function () {
        browser.get(browser.baseUrl + 'quick-start.html').then(function () {
            expect(browser.getTitle()).to.eventually.match(/Quick Start/);

            var menuLink = browser.$('#aside a.Actions');
            var h1;

            menuLink.click().then(function () {
                var h1 = browser.$('#main h1');
                var isPresent = EC.presenceOf(h1);
                browser.wait(isPresent, 500);

                expect(h1.getText()).to.eventually.match(/Actions/);
                expect(browser.getCurrentUrl()).to.eventually.match(/api\/actions.html/);
                expect(browser.getTitle()).to.eventually.match(/Actions/);

                menuLink = browser.$('#aside a.Components');
            }).then(function () {
                menuLink.click().then(function () {
                    var h1 = browser.$('#main h1');
                    var isPresent = EC.presenceOf(h1);
                    browser.wait(isPresent, 500);

                    expect(h1.getText()).to.eventually.match(/Components/);
                    expect(browser.getCurrentUrl()).to.eventually.match(/api\/components.html/);
                    expect(browser.getTitle()).to.eventually.match(/Components/);

                    menuLink = browser.$$('#aside a.Routing');
                });
            }).then(function () {
                menuLink.click().then(function () {
                    var h1 = browser.$('#main h1');
                    var isPresent = EC.presenceOf(h1);
                    browser.wait(isPresent, 500);

                    expect(h1.getText()).to.eventually.match(/Routing/);
                    expect(browser.getCurrentUrl()).to.eventually.match(/tutorials\/routing.html/);
                    expect(browser.getTitle()).to.eventually.match(/Routing/);
                });
            });
        });
    });
});
