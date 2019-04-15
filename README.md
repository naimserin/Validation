# Validation
HTML Form Element Validation
<div class="well">
            CSS<br />
            &lt;link href=&quot;~/Src/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot; /&gt;<br />
            <br />
            JS<br />
            &lt;script src=&quot;~/Src/js/jquery-1.11.3.min.js&quot;&gt;&lt;/script&gt;<br />
            &lt;script src=&quot;~/Src/js/bootstrap.min.js&quot;&gt;&lt;/script&gt;<br />
            &lt;script src=&quot;~/Src/js/validation.js&quot;&gt;&lt;/script&gt;<br />

            <h4>Start Function</h4>
            <pre>&lt;script&gt;
           $("#validationForm").validation({
                button: "#btnGonder",
                onSubmit: function () {
                    $("#btnGonder").attr({ 'disabled': true });
                },
                onCompleted: function () {
                    alert("onCompleted");
                    $("#btnGonder").attr({ 'disabled': true });
                },
                onError: function () {
                    $("#btnGonder").attr({ 'disabled': false });
                }
           });<br />&lt;/script&gt;</pre>
        </div>
<br>
<a href="http://um.lk/validation">CLICK TO DEMO</a>
