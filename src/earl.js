/**
 * Earl: A URL utility library
 * @author Matt Gerton
 * @requires jQuery
 */
;(function(window, document, $, undefined) {
    var Earl = {
        url: unescape(document.location.href)
    };

    /**
     * Creates a new URL
     * @param url
     */
    Earl.create = function create(url) {
        this.url = unescape(url);
        console.log(this.url);
    };

    /**
     * @private
     * Gets the URL's query string
     * @returns {String}
     */
    Earl.queryString = function queryString() {
        var qs = this.url.split('?')[1];

        if (qs) {
            qs = '?' + qs;
        } else {
            qs = '';
        }

        return qs;
    };

    /**
     * Gets the URL's query string parameters
     * @returns {Object} a key-value map of query string parameters and values
     */
    Earl.queryParameters = function queryParameters() {
        var params = this.url.split('?')[1].split('&');
        var map = {};
        var whitespace = /[-\s]/g;
        var param;

        var cleanParams = function (param) {
            return (param.search(whitespace) > -1) ? param.replace(whitespace, '_').toLowerCase() : param.toLowerCase();
        };
    
        // TODO intelligently choose method for iteration (Array.forEach, $, _, etc)
        // Alternately, a regex on the entire string is probably faster, but this is fun to play with :)
        $.each(params, function(i) {
            param = params[i].split('=');
 
            // clean up the parameter in case of undesirable characters (whitespace, dashes, etc.)
            param[0] = cleanParams(param[0]);
            
            // build the object map
            map[param[0]] = param[1];
        });
 
        return map;
    };

    /**
     * Gets the protocol of the URL
     * @returns {String} the protocol
     */
    Earl.protocol = function protocol() {
        return this.url.split(':')[0].toUpperCase();
    };
 
    /**
     * Gets the extension of the current page, if any
     * @returns {String} the pages extension
     */
    Earl.extension = function extension() {
        var ext = this.url.match(/\.(shtml|dhtml|html|aspx|cfml|shtm|htm|asp|jsp|gsp|cfm|php)/)[0] || '';
        return ext;
    };
     
    /**
     * Infers the site's backend type based on URL extension
     * @returns {String} the formalized name of the technology related to the extension
     */
    Earl.pageType = function pageType() {
        var extension = this.extension();
        var type;
 
        switch (extension) {
            case '.shtml':
            case '.dhtml':
            case '.shtm':
            case '.html':
            case '.htm':
                type = 'HTML';
                break;
            case '.asp':
                type = 'ASP';
                break;
            case '.aspx':
                type = 'ASP.Net';
                break;
            case '.jsp':
                type = 'Java';
                break;
            case '.php':
                type = 'PHP';
                break;
            case 'cfml':
            case 'cfm':
                type = 'ColdFusion';
                break;
            case 'gsp':
                type = 'Groovy';
                break;
            default:
                type = '';
                break;
        }
 
        return type;
    };
     
    /**
     * Returns a URL's top level domain
     * @returns {String}
     */
    Earl.tld = function tld() {
        // TODO add more TLDs
        var tld = this.url.match(/\.(co.uk|com|net|biz|org|xxx|de|me|ly|fm|co|tv)/);
        return tld;
    };
 
    // bind Earl to the global namespace
    window.Earl = Earl;
}(window, document, jQuery));
