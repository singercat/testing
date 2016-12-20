/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('every feed has a URL defined and the URL is not empty', function() {
           // Loop addFeeds item ensures that URL is defined and not empty.
           allFeeds.forEach(function(item, index) {
               expect(item.url).toBeDefined();
               expect(item.url).not.toBe('');
           });
        });

        it('every feed has a name and the name is not empty', function() {
           // Loop addFeeds item ensures that URL is defined and not empty.
           allFeeds.forEach( function(item, index) {
               expect(item.name).toBeDefined();
               expect(item.name).not.toBe('');
           });
        });
    });

    describe('The menu', function() {
        // making sure the body has the class of menu-hidden to make it hidden by default
        it('is hidden', function() {
            expect($("body").hasClass('menu-hidden')).toBeTruthy();
        });
        // Test when the click, the menu is displayed, when once again, when the menu is hidden.
        it('Switch to hide / show sidebar', function() {
            $('.menu-icon-link').click();
            expect($("body").hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($("body").hasClass('menu-hidden')).toBeTruthy();
            $('.menu-icon-link').click();
            expect($("body").hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($("body").hasClass('menu-hidden')).toBeTruthy();
        });
    });
        
    describe('Initial Entries', function() {
        var originalTimeout;
        beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            // Modify the default Jasmine timeout
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
            loadFeed(0,done);
        });
        it('have entry in feed container', function(done) {
            // making sure .entry h2 has content in container
            // console.log($(".feed .entry").length);
            expect($(".feed .entry").length).not.toBe(0);
        });
    });
        
    describe('New Feed Selection', function () {
        var oldfeed;
        var newFeed;
        var originalTimeout;
        beforeEach(function (done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            // Modify the default Jasmine timeout
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
            loadFeed(0, function () {
                oldfeed = $('.feed').html();
                loadFeed(1, function () {
                    newFeed = $('.feed').html();
                });
            });
        });
        // Check whether the feed container is the same after the asynchronous loading
        it('content changes when add feed', function (done) {
            expect(oldfeed).not.toBe(newFeed);
            done();
        });
    });
}());
