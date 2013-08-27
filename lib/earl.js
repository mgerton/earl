/**
 * Earl: A URL utility library
 * @author Matt Gerton
 * @requires jQuery
 */
;(function(window, document, $, undefined) {
    var Earl = {
        url: unescape(document.location.href);
    };
 
    /**
     * Creates a new URL
     * @param url
     */
    Earl.create = function create(url) {
        this.url = unescape(url);
    };
 
    Earl.queryString = function queryString() {
        return this.url.split('?');
    };
 
    /**
     * Generic get method that calls a matching function to retrieve
     * a specific URL property
     */
    // TODO add support for callbacks
    Earl.get = function get(fn) {
        // all "private" getters are of course prepended with get
        var fnName = '_get' + fn.charAt(0).toUpperCase() + fn.slice(1);
 
        // Call me, maybe?
        Earl[fnName];
    };
 
    /**
     * Gets the URL's querystring parameters
     * @returns {Object} a key-value map of querystring parameters
     */
    Earl._getParameters = function getParameters() {
        var params = this.url.split('?')[1].split('&');
        var map = {};
        var param;
    
        // TODO intelligently choose method for iteration (Array.forEach, $, _, etc)
        $.each(params, function(i) {
            param = params[i].split('=');
 
            // convert any whitespace or dash character into an underscore
            param[0] = param[0].replace(/[-\s]/g, '_');
            param[0] = param.toLowerCase();
 
            map[pair[0]] = param[1];
        });
 
        return map;
    };
 
    Earl._getProtocol = function getProtocol() {
        return this.url.split(':')[0].toUpperCase;
    };
 
    /**
     * Gets the extension of the current page, if any
     * @returns {String} the pages extension
     */
    Earl._getExtension = function getExtension() {
        return this.url.find(/(html|htm|asp|aspx|jsp)/) || '';
    };
 
    /**
     * Infers the page type based on URL extension
     * @returns
     */
    Earl._getPageType = function getPageType() {
        var extension = Earl.extension;
        var type;
 
        switch(extension) {
            case 'html':
            case 'htm':
                type = 'HTML';
                break;
            case 'asp':
                type = 'ASP';
                break;
            case 'aspx':
                type = 'ASP.Net';
                break;
            case 'jsp':
                type = 'Java';
                break;
            default:
                type = '';
                break;
        }
 
        return type;
    };
 
    /**
     * Returns a URL's top level domain
     * @return {String}
     */
    Earl._getTld = function getTld() {
        var tld = this.url.find(/[.(com|net|biz|me|ly|biz|fm|co.uk)]/);
 
        return '.' + tld;
    };
}(window, document, jQuery));
