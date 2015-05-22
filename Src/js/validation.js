(function ($) {
    $.fn.validation = function (options) {
        var content = String(this.selector);
        var settings = $.extend({
            button: '',
            onSubmit: function () {
                return true;
            },
            onCompleted: function () {
                return true;
            },
            onError: function () {
                return true;
            }
        }, options);
        $("" + settings.button + "").click(function () {
            settings.onSubmit.call();
            if ($("" + content + " [data-status='0']").val() != undefined) {
                $.each($("" + content + " [data-status]"), function () {
                    if ($(this).attr('data-status') == 0) {
                        $(this).parent().children(':last').text($(this).attr('data-error-message'));
                        $(this).next(".control-label").show("slow");
                    } else {
                        $(this).next(".control-label").hide("slow");
                    }
                });
                settings.onError.call();
            }
            else {
                settings.onCompleted.call();
            }
        });
        $.each($("" + content + " [data-status]"), function () {
            $(this).parent().append('<label class="control-label"></label>');
        });
        $("" + content + " [data-status]").on('change blur', function () {
            var min = $(this).attr('data-min-text-value');
            if (min != undefined) {
                var val = $(this).val();
                if (min > val.length) {
                    $(this).attr({ 'data-status': '0' });
                    $(this).parent().children(':last').text($(this).attr('data-error-message'));
                    $(this).next(".control-label").show();
                } else {
                    $(this).attr({ 'data-status': '1' });
                    $(this).parent().children(':last').text('');
                    $(this).next(".control-label").hide();
                }
            }
        });
        $("" + content + " [data-type='number']").on('keypress', function (evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        });
        $("" + content + " [data-type='email']").on('change blur', function (evt) {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test($(this).val()) == false) {
                $(this).attr({ 'data-status': '0' });
                $(this).parent().children(':last').text($(this).attr('data-error-message'));
                $(this).next(".control-label").show();
            } else {
                $(this).attr({ 'data-status': '1' });
                $(this).parent().children(':last').text('');
                $(this).next(".control-label").hide();
            }
        });
        var date = /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/;
        $("" + content + " [data-type='date']").on('keypress blur', function (evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode == 46) {
                return false;
            }
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            if (Number($(this).val()) >= 32) {
                $(this).val("31.");
            } else if (Number(String($(this).val()).split('.')[1]) > 12) {
                $(this).val(String($(this).val()).split('.')[0] + ".12.");
            }
            if (String($(this).val()).length == 2) {
                $(this).val($(this).val() + '.');
            } else if (String($(this).val()).length == 5) {
                $(this).val($(this).val() + '.');
            } else if (String($(this).val()).length == 10 && date.test($(this).val()) == false) {
                $(this).attr({ 'data-status': '0' });
                $(this).parent().children(':last').text($(this).attr('data-error-message'));
                $(this).next(".control-label").show();
                return false;
            } else if (String($(this).val()).length == 10 && date.test($(this).val()) == true) {
                $(this).attr({ 'data-status': '1' });
                $(this).parent().children(':last').text('');
                $(this).next(".control-label").hide();
                return false;
            }

            if ($(this).attr('data-status') != undefined) {
                if (date.test($(this).val()) == false) {
                    $(this).attr({ 'data-status': '0' });
                    $(this).parent().children(':last').text($(this).attr('data-error-message'));
                    $(this).next(".control-label").show();
                } else {
                    $(this).attr({ 'data-status': '1' });
                    $(this).parent().children(':last').text('');
                    $(this).next(".control-label").hide();
                }
            }
            return true;
        });
        var time = /^([0-9]{2})\:([0-9]{2})$/;
        $("" + content + " [data-type='time']").on('keypress blur', function (evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            if (Number($(this).val()) >= 24) {
                $(this).val("00:");
            } else if (Number(String($(this).val()).split(':')[1]) >= 6) {
                $(this).val(String($(this).val()).split(':')[0] + ":0");
            }

            if (String($(this).val()).length == 2) {
                $(this).val($(this).val() + ':');
            } else if (String($(this).val()).length == 5 && time.test($(this).val()) == false) {
                $(this).attr({ 'data-status': '0' });
                $(this).parent().children(':last').text($(this).attr('data-error-message'));
                $(this).next(".control-label").show();
                return false;
            } else if (String($(this).val()).length == 5 && time.test($(this).val()) == true) {
                $(this).attr({ 'data-status': '1' });
                $(this).parent().children(':last').text('');
                $(this).next(".control-label").hide();
                return false;
            }

            if ($(this).attr('data-status') != undefined) {
                if (time.test($(this).val()) == false) {
                    $(this).attr({ 'data-status': '0' });
                    $(this).parent().children(':last').text($(this).attr('data-error-message'));
                    $(this).next(".control-label").show();
                } else {
                    $(this).attr({ 'data-status': '1' });
                    $(this).parent().children(':last').text('');
                    $(this).next(".control-label").hide();
                }
            }
            return true;
        });

    };
})(jQuery);


