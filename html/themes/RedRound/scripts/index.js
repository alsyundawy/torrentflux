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
            var cDiv = $(this).closest("div");
            cDiv.children("div").remove();
            if ($.browser.mozilla)
                cDiv.append('<div style="position:absolute;margin-left:2px;margin-top:-21px;">'+$(this).val()+'</div>');
            else//if ($.browser.webkit)
                cDiv.append('<div style="position:absolute;margin-left:2px;margin-top:-16px;">'+$(this).val()+'</div>');
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

    // turn unordened list into tabs
    $(function(){
    
        //tabs first, because droplisti use ul/li too
        $("#tabs").tabs({ panelTemplate: '<li></li>' });

        $("tr").live("mouseenter", function() {
            $(this).addClass('hover');
        })
        .live("mouseleave", function() {
            $(this).removeClass('hover');
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
        if ($.browser.msie) {
            $("#indexLinks ul li")
                .css('display', 'inline-block')
                .css('min-width', '240px')
                .css('margin-left', '1em');
            $("#indexLinks ul")
                .css('max-width', '800px');
        }
    
        $('tr').live("click", function(e) {
            var isRow = !~$.inArray(e.target.nodeName, ["A", "INPUT", "IMG"]), $row, active = false, cb;
            if (!isRow) return;
            $row = $(this);
            active = $row.hasClass("active");
            cb = $row.find('input[type="checkbox"]')[0];
            if (typeof(cb) !== "undefined") {
                cb.checked = !active;
                $row[(active?"remove":"add")+"Class"]("active");

                e.stopImmediatePropagation();
                e.preventDefault();
                return false;
            }
        }).live("mouseenter", function(e) {
            clearTimeout(indexTimer);
            $("#span_update").html("Update paused.");
        }).live("mouseleave", function(e) {
            updateTimeLeft = ajax_updateTimer / 1000;
            indexTimer = setTimeout(ajax_pageUpdate, 1000);
            ajax_pageUpdate();
        });
    });
})(jQuery, null);