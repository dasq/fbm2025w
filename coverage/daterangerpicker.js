(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Make globaly available as well
        define(['moment', 'jquery'], function (moment, jquery) {
            if (!jquery.fn) jquery.fn = {}; // webpack server rendering
            return (root.daterangepicker = factory(moment, jquery));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node / Browserify
        //isomorphic issue
        var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
        if (!jQuery) {
            jQuery = require('jquery');
            if (!jQuery.fn) jQuery.fn = {};
        }
        var moment = (typeof window != 'undefined' && typeof window.moment != 'undefined') ? window.moment : require('moment');
        module.exports = factory(moment, jQuery);
    } else {
        // Browser globals
        root.daterangepicker = factory(root.moment, root.jQuery);
    }
}(this, function(moment, $) {
    var DateRangePicker = function(element, options, cb) {
		 };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {},
		 setEndDate: function(endDate) { },

        isInvalidDate: function() {},

        isCustomDate: function() {},

        updateView: function() {},

        updateMonthsInView: function() { },

        updateCalendars: function() { },

        renderCalendar: function(side) {},

        show: function(e) {},

        hide: function(e) { },

        toggle: function(e) {},

        outsideClick: function(e) {},

        showCalendars: function() {},

        hideCalendars: function() {	},

        hoverRange: function(e) {},

        clickRange: function(e) {},

        clickPrev: function(e) {},

        clickNext: function(e) {},

        hoverDate: function(e) { },

        clickDate: function(e) { },

        calculateChosenLabel: function () { },

        clickApply: function(e) {},

        clickCancel: function(e) {},

        monthOrYearChanged: function(e) { },

        timeChanged: function(e) { },

        formInputsChanged: function(e) {},

        formInputsFocused: function(e) { },

        formInputsBlurred: function(e) {},

        elementChanged: function() {},

        keydown: function(e) { },

        updateElement: function() {},

        remove: function() {};

    $.fn.daterangepicker = function(options, callback) {
        this.each(function() { });
        return this;
    };

    return DateRangePicker;

}));
