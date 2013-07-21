/*
 *      index.js 5/5/2009
 *      Copyleft 2009 kanesodi <kanesodi@gmail.com>
 *      
 *      Fixed by epsylon3@gmail.com for tfb git
 *      
 *      This file is public domain;
 */
var bindFileInput, addUploadField, beforeAjaxUpdate, afterAjaxUpdate;
(function($,$$) {
    bindFileInput = function() {
        $('div.upload_file input[type="file"]').unbind('change').change(function() {
            $(this).closest("div").children("div").remove();
            if (jQuery.browser.mozilla)
            $(this).closest("div").append('<div style="position:absolute;margin-left:2px;margin-top:-21px;">'+$(this).val()+'</div>');
            else//if (jQuery.browser.webkit)
            $(this).closest("div").append('<div style="position:absolute;margin-left:2px;margin-top:-16px;">'+$(this).val()+'</div>');
        });
    };
    /**
     * addUploadField (override js/multiup.js)
     */
    addUploadField = function(e) {
        var fileContent = '</div><br /><div class="upload_file"><input type="file" name="upload_files[]" id="upload_files_first" width="250px" size="40" />';
    
        $("div.upload_file").last().after(fileContent);
        $("div#indexTorrentUpload").css('height','auto');
        
        bindFileInput();
    };

    beforeAjaxUpdate = function() {
        $("tr.gray, tr.white")
            .unbind('mouseenter')
            .unbind('mouseleave');
    };

    afterAjaxUpdate = function() {

        $("tr.gray")
            .mouseenter(function() {
                this.className='hover';
            })
            .mouseleave(function() {
                this.className='gray';
            });

        $("tr.white")
            .mouseenter(function() {
                this.className='hover';
            })
            .mouseleave(function() {
                this.className='white';
            });

    };
    
    // turn unordened list into tabs
    $(function(){
    
        //tabs first, because droplisti use ul/li too
        $("#tabs").tabs({ panelTemplate: '<li></li>' });
    
        $("tr.gray")
        .mouseenter(function() {
            this.className='hover';
        })
        .mouseleave(function() {
            this.className='gray';
        });
    
        $("tr.white")
        .mouseenter(function() {
            this.className='hover';
        })
        .mouseleave(function() {
            this.className='white';
        });
    
        //skin buttons
        $("input:submit").button()
            .css('padding','2px 8px');
    //		.css('height','22px')
    //		.css('line-height','20px')
    //		.css('vertical-align','bottom');
    
        bindFileInput();
    
        //text zones height
        $("input:text")
            .css('height','18px')
            .css('padding','1px')
            .css('vertical-align','bottom');
    
        //comboboxes
        $('select#searchEngine').droplist({width:120});
        $('#indexWget select').droplist({width:120});
        $('select[name!="action"]').not('#searchEngine').droplist({autoresize:true,slide:false,height:150});
    
    
        //multicolumn links
        if (jQuery.browser.msie) {
            $("#indexLinks ul li")
                .css('display', 'inline-block')
                .css('min-width', '240px')
                .css('margin-left', '1em');
            $("#indexLinks ul")
                .css('max-width', '800px');
        }
    
        //$('')
    });
})(jQuery, null);