$(function () {
    blog.init();
    blog.checkSidebarImage();
    blog.initEditormd();
    blog.initSortable();
    $sidebar = $('.sidebar');
    $sidebar_img_container=$sidebar.find(".sidebar-bg");

    $('.fixed-plugin .active-color li').click(function (event) {
        $(this).siblings().removeClass("active")
        $(this).addClass("active")

        var new_color=$(this).data("color");
        if($sidebar.length != 0){
            $sidebar.attr("data-active-color",new_color)
        }
    })
    $('.fixed-plugin .background-color li').click(function (event) {
        $(this).siblings().removeClass("active")
        $(this).addClass("active")

        var new_color=$(this).data("color");
        if($sidebar.length != 0){
            $sidebar.attr("data-background-color",new_color)
        }
    })
    $('.fixed-plugin .img-holder li').click(function (event) {
        $(this).siblings().removeClass("active")
        $(this).addClass("active")

        var new_image=$(this).find("img").attr("src");
        if($sidebar_img_container.length != 0 && $(".switch-sidebar-image input:checked").length!=0){
            $sidebar_img_container.fadeOut('fast', function(){
                $sidebar_img_container.css("background-image","url("+new_image+")");
                $sidebar_img_container.fadeIn('fast');
            })
        }
        if($(".switch-sidebar-image input:checked").length==0){
            $sidebar_img_container.css("background-image","url("+new_image+")");
        }
    })
    $(".switch-sidebar-image input").change(function(){
        $input = $(this);
        if($input.is(":checked")){
            if($sidebar_img_container.length != 0){
                $sidebar_img_container.fadeIn('fast')
                $sidebar.attr("data-image","#");
            }
        }else{
            $sidebar_img_container.fadeOut('fast')
            $sidebar.removeAttr("data-image","#");
        }
    })    
    $(".notes .note-info").click(function(){
        $(this).siblings().removeClass("active")
        $(this).addClass("active")
    })
    $(".nav li").click(function(){
        $(this).siblings().removeClass("active")
        $(this).addClass("active")
    })
})
blog={
    init:function(){
        new PerfectScrollbar(".sidebar-wrapper");
        new PerfectScrollbar(".notes");
        $(".sidenav").sidenav();
        $('.dropdown-trigger').dropdown({
            alignment: 'right',
            constrainWidth: false,
        });
        $('.show-dropdown').dropdown({
            alignment: 'right',
            constrainWidth: false,
            closeOnClick:false
    
        });
    },

    initEditormd:function(){
        var testEditor = editormd("my-editormd", { //注意1：这里的就是上面的DIV的id属性值
            width: "100%",
            height: 'calc(100% - 60px)',
            syncScrolling: "single",
            path: "/node_modules/editor.md/lib/", //注意2：你的路径
            saveHTMLToTextarea: true, //注意3：这个配置，方便post提交表单
    
            toolbarIcons: function () {
                return [
                    "bold",
                    "del",
                    "italic",
                    "quote",
                    "uppercase",
                    // "h1",
                    // "h2",
                    // "h3",
                    // "h4",
                    // "h5",
                    // "h6",
                    "|",
                    "list-ul",
                    "list-ol",
                    "hr",
                    "|",
                    "link",
                    "reference-link",
                    "image",
                    "code",
                    "preformatted-text",
                    "code-block",
                    "table",
                    "datetime",
                    // "emoji",
                    // "html-entities",
                    "pagebreak",
                    "|",
                    "goto-line",
                   
                    "clear",
                    "search",
                    "|",
                    "watch",
                    "preview",
                    "fullscreen",
                    
                    // "help",
                    // "info"
                    "||",
                    "undo",
                    "redo",
                    
                    "save",
                    "push"
                ]
            },
            toolbarIconsClass: {
                save: 'fa-floppy-o'
            },
            toolbarCustomIcons:{
                push:'<a href="javascript:;" title="发布文章" unselectable="on" style="padding:0 10px;" class="editormd-push"><i class="fa fa-mail-forward" unselectable="on" style="display:inline-block"></i>发布文章</a>'
            },
            toolbarHandlers: {
                save:function(cm, icon, cursor, selection){
                    alert("存储")
                },
            },
            onload : function() {
                $(".editormd-menu .editormd-push").click(function(){
                    alert("发布")

                })
            }
    
        });
        $('#btn').click(function () {
            var content = testEditor.getMarkdown();
            $.ajax({
                type: "POST",
                url: "/publishArticle",
                contentType: "application/json",
                data: content,
                success: function (data) {
                    if (data == "publish_succ") {
                        window.location.href = "/published";
                    }
                }
            });
    
        })
        // testEditor.getMarkdown();       // 获取 Markdown 源码
        // testEditor.getHTML();           // 获取 Textarea 保存的 HTML 源码
        // testEditor.getPreviewedHTML();  // 获取预览窗口里的 HTML，在开启 watch 且没有开启 saveHTMLToTextarea 时使用
    },
    checkSidebarImage:function(){
        $sidebar=$(".sidebar");
        var image_src=$sidebar.data("image");
        if(image_src!==undefined){
            var sidebar_container = '<div class="sidebar-bg" style="background-image: url(' + image_src + ') "/>';
            $sidebar.append(sidebar_container);
        }
    },
    initSortable:function(){
        var notes = document.getElementsByClassName('notes')[0];
        Sortable.create(notes,{
            animation: 150, 
        });
    }
}