/**
 * Pure front-end vanilla JS methods without any dependencies
 */
var stringUtil = {

    /**
     * Returns true if String contains at least one number
     * @param s
     * @returns {boolean}
     */
    containsDigit : function(s){
        if(!s) return false;
        return new RegExp(/\d/).test(s);
    },

    /**
     * Returns true if input contains digits only
     * @param s
     * @returns {boolean}
     */
    isDigitOnly : function(s){
        if(!s) return false;
        return new RegExp(/^\d+$/).test(s);
    },

    /**
     * Capitalise all words
     * @param s
     * @returns {String}
     */
    toTitleCase : function(s) {
        if(!s) return '';

        return s.replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
        });
    },

    /**
     * Capitalise the first letter of the first word
     * @param s
     * @returns {String}
     */
    capitalizeFirst : function(s) {
        if(!s) return '';

        return s.charAt(0).toUpperCase() + s.slice(1);
    },

    /**
     * Returns number of words in a String
     * @param s
     * @returns {*}
     */
    wordCount : function(s){
        if(!s) return 0;
        return s.split(' ').length;
    },

    /**
     * Returns a String representation of an HTML element.
     * @param element       Element type like a or p
     * @param html          Inner HTML
     * @param attributes    Object containing attributes
     *
     * HTMLElementAsString('button', 'My Cool Button', {
     *     id : 'myButtonId',
     *     type: 'button',
     *     'class': 'btn btn-blue btn-sm',
     *     'data-venue-id' : 75,
     *     title : 'Click me'
     * }))
     *
     * Will produce:
     * <button id="myButtonId" type="button" class="btn btn-blue btn-sm" data-venue-id="75" title="Click me">My Cool Button</button>
     *
     * @returns {string}
     */
    HTMLElementAsString : function(element, html, attributes){

        /**
         * Void elements do not have closing tags />
         * @param element
         * @returns {boolean}
         */
        var isVoidElement = function(element){
            var voidElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
                res = false;

            for(var i = 0; i < voidElements.length; i++){
                if(element == voidElements[i]){
                    res = true;
                    break;
                }
            }

            return res;
        };

        var res,
            attr = '';

        if(!isVoidElement(element)){
            res = '<' + element +' @>' +  html + '</' + element + '>';
        } else{
            res = '<' + element +' @>';
        }

        for(var o in attributes) {
            attr += o + '="' + attributes[o] + '" ';
        }

        attr = attr.trim();

        return res.replace('@', attr || '');
    },

    /**
     * Replaces all spaces with dashes and lowercases the result
     * @param s
     * @returns {string}
     */
    dasherize : function(s){
        if(!s) return '';
        return s.replace(/[-\s]+/g, '-');
    },

    /**
     * Collapses multiple spaces into a single space. Not the same is trim as this also works in between words
     * @param s
     * @returns {*}
     */
    collapseSpaces: function(s) {
        if(!s) return '';
        return s.replace(/\s\s+/g, ' ');
    },

    /**
     * Strips all digits from a String
     * @param s
     * @returns {String}
     */
    stripDigits : function(s){
        if(!s) return '';
        return s.replace(/[0-9]/g, '');
    },

    /**
     * Returns all digits in a String
     * @param s
     * @returns {*}
     */
    getDigits : function (s) {
        if(!s) return '';
        return s.replace (/[^\d]/g, '');
    },

    /**
     * Converts a string to a boolean
     * @param s
     * @returns {boolean}
     */
    toBool : function(s){
        if(!s) return false;
        return s.trim().toLowerCase() == 'true' || s == '1';
    },

    /**
     * Replaces all text links with HTML <a> tags - but keeps the rest of the String intact
     * @param s
     * @param nofollow {Boolean} attr rel="nofollow"
     * @param blank {Boolean} attr target="_blank"
     * @returns {String}
     */
    linkify : function(s, nofollow, blank){

        if(!s) return '';

        s = s.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(url){

            var full_url = url;

            if(!full_url.match('^https?:\/\/')) {
                full_url = 'http://' + full_url;
            }

            var attr = '';

            if(nofollow) {
                attr = ' rel="nofollow"';
            }

            if(blank) {
                attr += ' target="_blank"';
            }

            return '<a' + attr + ' href="' + full_url + '">' + url + '</a>';
        });

        return s;
    },

    /**
     * Returns true if input is a filler word
     * @param s
     * @returns {boolean}
     */
    isFillerWord : function(s){

        if(!s) return false;

        var res = false;

        s = s.toLowerCase().trim();

        var words = ['a', 'an', 'and', 'as', 'at', 'before', 'but', 'by', 'for', 'from',
            'is', 'in', 'into', 'like', 'of', 'off', 'on', 'onto', 'per',
            'since', 'than', 'the', 'this', 'that', 'to', 'up', 'via',
            'with'
        ];

        for(var i = 0; i < words.length; i++){
            if(s == words[i]){
                res = true;
                break;
            }
        }

        return res;
    },

    /**
     * Returns true if string is contained in the list of reserved keywords.
     * Useful for restricting user names in signups
     * @param s
     * @returns {boolean}
     */
    isReservedKeyword : function(s){

        if(!s) return false;

        var reserved = [
            'about','access','account','accounts','add','address','adm','admin','administration','adult','advertising','affiliate','affiliates','ajax','analytics','android','anon','anonymous','api','app','apps','archive','atom','auth','authentication','avatar',
            'backup','banner','banners','bin','billing','blog','blogs','board','bot','bots','business',
            'chat','cache','cadastro','calendar','campaign','careers','cgi','client','cliente','code','comercial','compare','config','connect','contact','contest','create','code','compras','css',
            'dashboard','data','db','design','delete','demo','design','designer','dev','devel','dir','directory','doc','docs','domain','download','downloads',
            'edit','editor','email','ecommerce',
            'forum','forums','faq','favorite','feed','feedback','flog','follow','file','files','free','ftp',
            'gadget','gadgets','games','guest','group','groups',
            'help','home','homepage','host','hosting','hostname','html','http','httpd','https','hpg',
            'info','information','image','img','images','imap','index','invite','intranet','indice','ipad','iphone','irc',
            'java','javascript','job','jobs','js',
            'knowledgebase',
            'log','login','logs','logout','list','lists',
            'mail','mail1','mail2','mail3','mail4','mail5','mailer','mailing','mx','manager','marketing','master','me','media','message','microblog','microblogs','mine','mp3','msg','msn','mysql','messenger','mob','mobile','movie','movies','music','musicas','my',
            'name','named','net','network','new','news','newsletter','nick','nickname','notes','noticias','ns','ns1','ns2','ns3','ns4',
            'old','online','operator','order','orders',
            'page','pager','pages','panel','password','perl','pic','pics','photo','photos','photoalbum','php','plugin','plugins','pop','pop3','post','postmaster','postfix','posts','profile','project','projects','promo','pub','public','python',
            'random','register','registration','root','ruby','rss',
            'sale','sales','sample','samples','script','scripts','secure','send','service','shop','sql','signup','signin','search','security','settings','setting','setup','site','sites','sitemap','smtp','soporte','ssh','stage','staging','start','subscribe','subdomain','suporte','support','stat','static','stats','status','store','stores','system',
            'tablet','tablets','tech','telnet','test','test1','test2','test3','teste','tests','theme','themes','tmp','todo','task','tasks','tools','tv','talk',
            'update','upload','url','user','username','usuario','usage',
            'vendas','video','videos','visitor',
            'win','ww','www','www1','www2','www3','www4','www5','www6','www7','wwww','wws','wwws','web','webmail','website','websites','webmaster','workshop',
            'xxx','xpg',
            'you','yourname','yourusername','yoursite','yourdomain'];

        for(var i = 0; i < reserved.length; i++){
            if(s.trim().toLowerCase() == reserved[i]){
                return true;
            }
        }

        return false;
    },

    /**
     * Truncates text while preserving paragraphs.
     * Preserving paragraphs take preceding over the desired length of the resulting return string.
     *
     * @param s
     * @param size The desired approximate size of the result string
     * @returns {String}
     */
    excerpt : function(s, size){

        if(!s) return '';

        if(!size || s.length < size){
            return s;
        }

        var a = s.split('.'),
            res = a[0].trim() + '. ';

        for(var i = 0; i < a.length; i++){

            if(i < a.length - 1){

                var next = a[i + 1].trim();

                if(String(res + next).length < size){
                    res += next + '. ';
                } else{
                    break;
                }
            }
        }

        return res.trim();
    },

    /**
     * Replace all occurances of a string
     *
     * @param s
     * @param find
     * @param replace
     * @returns {String}
     */
    replaceAll : function(s, find, replace){
        if(!s) return '';
        return s.toString().replace(new RegExp(find, 'g'), replace);
    }
};