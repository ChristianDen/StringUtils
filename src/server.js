var path = require('path')
    , url = require('url')
    , _ = require('underscore');

/**
 * Node.js server side
 */
module.exports = {

    /**
     * Returns a path based on month and year for a given file name
     */
    getPathByDate: function (fileName) {

        if (!fileName) return '';

        var today = new Date(),
            year = today.getFullYear().toString(),
            month = today.getMonth() + 1,
            monthAsStr;

        if (month < 10) {
            monthAsStr = '0' + month.toString();
        } else {
            monthAsStr = month.toString();
        }

        return path.join(year, monthAsStr, fileName.toString());
    },

    /**
     * Splits the url path into an array
     * @param url
     * @returns {Array}
     */
    splitUrlPath: function (url) {

        if (!url) return [];

        var res = [],
            parts = url.split(path.sep);

        _.each(parts, function (part) {
            if (part.length) {
                res.push(part);
            }
        });

        return res;
    },

    /**
     * Accepts a String containing carriage returns (\r\n) and returns nicely formatted HTML paragraphs
     * @param s
     * @returns {string}
     */
    toParagraph: function (s) {

        if (!s) return '';
        var res = '';

        _.each(s.split('\r\n'), function (paragraph) {

            if (paragraph.length) {
                res += '<p>' + paragraph + '</p>';
            }
        });

        return res;
    }
};