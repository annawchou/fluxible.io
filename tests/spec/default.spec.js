/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global browser, describe, it */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('fluxible homepage', function() {
    it('should have a title', function() {
        browser.driver.get(browser.baseUrl);
        expect(browser.driver.getTitle()).to.eventually.match(/Fluxible/);
    });
});
