/**
 * Check if device is mobile or not.
 * @type {Object}
 */
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


/**
 * Check if an element is set.
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
var isset = function(element) {
    if (typeof(element) != "undefined") {
        return true;
    }
    return false;
};


/**
 * Add class custom.
 * @param  {[object]} el                [dom element]
 * @param  {[string]} classToAdd        [class to add]
 * @return {[type]}                     [description]
 */
var addClass = function(el, classToAdd){

    if (el.classList) el.classList.add(classToAdd);
    else el.className += ' ' + classToAdd;
};


/**
 * Remove class custom.
 * @param  {[object]} el                [dom element]
 * @param  {[string]} classToRemove     [class to remove]
 * @return {[type]}                     [description]
 */
var removeClass = function(el, classToRemove){

    if(el.classList) el.classList.remove(classToRemove);
    else{
        el.className = el.className.replace(new RegExp('(^|\\b)' + classToRemove.split(' ').join('|') + '(\\b|$)', 'gi'), '');
    
        var posLastCar = el.className.length-1;
        if(el.className[posLastCar] == ' ') el.className = el.className.substring(0, posLastCar);
    }    
};


/**
 * Get random number.
 * @param  {[number]} min [min value]
 * @param  {[number]} max [max value]
 * @return {[type]}     [description]
 */
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


/**
 * Get random integer.
 * @param  {[int]} min [min value]
 * @param  {[int]} max [max value]
 * @return {[type]}     [description]
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
 * Avoid `console` errors in browsers that lack a console.
 * @return {[type]} [description]
 */
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/**
 * Replace placeholder for non-HTML5 compatible browsers.
 * @return {[type]} [description]
 */
var replacePlaceholder = function() {

    if(!Modernizr.input.placeholder){

        $('[placeholder]').focus(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
          }
        }).blur(function() {
          var input = $(this);
          if (input.val() === '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
          }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
          $(this).find('[placeholder]').each(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
              input.val('');
            }
          });
        });
        
    }

};


/**
 * JS / jQuery helper & plugins
 */

// --- jQuery Spamless --- //
(function($){$.fn.dcSpamless=function(options){var defaults={reverse:true,splitDomain:'[dot]',splitName:'[at]',mailto:true};var options=$.extend(defaults,options);return this.each(function(options){var domain=defaults.splitDomain,name=defaults.splitName;var email=$(this).is('a')?$(this).attr('href').replace('mailto:','').replace(domain,'.').replace(name,'@'):$(this).text().replace(domain,'.').replace(name,'@');email=defaults.reverse == true?email.split('').reverse().join(''):email;if($(this).is('a')){$(this).attr('href','mailto:'+email)}else{if(defaults.mailto===true){email='<a href="mailto:'+email+'">'+email+'</a>'}$(this).html(email)}})}})(jQuery);
