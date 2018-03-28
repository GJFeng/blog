$(function () {

    new PerfectScrollbar(".sidebar-wrapper");
    new PerfectScrollbar(".notes");
    // new PerfectScrollbar(".perfect-scrollbar");
    $(".button-collapse").sideNav({
        menuWidth: 260, // Default is 240
        closeOnClick: true //
    });
    $('.dropdown-trigger').dropdown();


    var dataBgUrl = document.getElementsByClassName("sidebar")[0].dataset.image;
    var sideBg = document.getElementsByClassName("siderbar-bg")[0]
    sideBg.style.backgroundImage = "url(" + dataBgUrl + ")";


    var testEditor  = editormd("my-editormd", { //注意1：这里的就是上面的DIV的id属性值
        width: "100%",
        height: '100%',
        syncScrolling: "single",
        path: "/bower_components/editor.md/lib/", //注意2：你的路径
        saveHTMLToTextarea: true, //注意3：这个配置，方便post提交表单
        
        toolbarIcons: function () {
            return ["undo",
                "redo",
                "|",
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
                "watch",
                // "unwatch",
                "preview",
                "fullscreen",
                "clear",
                "search",
                // "help",
                // "info"
                "|",
                'save'
            ]
        },
        toolbarIconsClass  : {
            save: 'fa-star'
        },
        toolbarHandlers :{
            save:function(cm, icon, cursor, selection){
                console.log(cm)
                console.log(icon)
                console.log(cursor)
                console.log(selection)
                console.log(this.getHTML())
               $.ajax({
                   type:'POST',
                   url:"/aa",
                   data:{data:this.getHTML()},
                    success:function(data){
                        console.log(data)
                    }

               })
            }
        }


    });
    $('#btn').click(function(){
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
})