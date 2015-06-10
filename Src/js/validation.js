//https://github.com/naimserin/Validation
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

        var items = [];
        $.each($("" + content + " [data-status]"), function () {
            $(this).parent().append('<label class="control-label"></label>');
            items.push({
                item: $(this),
                datatype: $(this).attr("data-type"),
                datamintextvalue: $(this).attr("data-min-text-value"),
                dataerrormessage: $(this).attr("data-error-message")
            });
        });

        $("" + content + " " + settings.button + "").click(function () {
            settings.onSubmit.call();
            var totalError = 0;
            $.each(items, function (i, val) {

                if (val.item.attr('data-status') == undefined || val.item.attr('data-status') != 0 || val.item.attr('data-status') != 1) val.item.attr({ 'data-status': '0' });
                if (val.item.attr('data-type') == undefined || val.item.attr('data-type') != val.datatype) val.item.attr({ 'data-type': val.datatype });
                if (val.item.attr('data-min-text-value') == undefined || val.item.attr('data-min-text-value') != val.datamintextvalue) val.item.attr({ 'data-min-text-value': val.datamintextvalue });
                if (val.item.attr('data-error-message') == undefined || val.item.attr('data-error-message') != val.dataerrormessage) val.item.attr({ 'data-error-message': val.dataerrormessage });

                if (val.datatype == 'email') {
                    if ($.datatypeemail(val.item) == false) {
                        totalError += 1;
                    }
                }

                if (val.datatype == 'text') {
                    if ($.datatypetext(val.item) == false) {
                        totalError += 1;
                    }
                }
                if (val.datatype == 'number') {
                    if ($.datatypenumber(val.item) == false) {
                        totalError += 1;
                    }
                }
                if (val.datatype == 'date') {
                    if ($.datatypedate(val.item) == false) {
                        totalError += 1;
                    }
                }
                if (val.datatype == 'time') {
                    if ($.datatypetime(val.item) == false) {
                        totalError += 1;
                    }
                }
            });

            if (totalError > 0) {
                settings.onError.call();
            }
            else {
                settings.onCompleted.call();
            }
        });
        $.datatypetext = function (item) {
            var status = false;
            var min = $(item).attr('data-min-text-value');
            if (min != undefined) {
                var val = $(item).val();
                if (min > val.length) {
                    status = false;
                    $(item).attr({ 'data-status': '0' });
                    $(item).parent().children(':last').text($(item).attr('data-error-message'));
                    $(item).next(".control-label").show("slow");
                } else {
                    status = true;
                    $(item).attr({ 'data-status': '1' });
                    $(item).parent().children(':last').text('');
                    $(item).next(".control-label").hide("slow");
                }
            }
            return status;
        };
        $("" + content + " [data-type='text']").on('change blur', function () {
            $.datatypetext(this);
        });
        var number = /^\d+$/;
        $.datatypenumber = function (item) {
            var status = false;
            if (number.test($(item).val()) == false) {
                var status = false;
                $(item).attr({ 'data-status': '0' });
                $(item).parent().children(':last').text($(item).attr('data-error-message'));
                $(item).next(".control-label").show("slow");
            } else {
                var status = true;
                $(item).attr({ 'data-status': '1' });
                $(item).parent().children(':last').text('');
                $(item).next(".control-label").hide("slow");
            }
            return status;
        };
        $("" + content + " [data-type='number']").on('keypress blur', function (evt) {
            $.datatypenumber(this);
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        });
        var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        $.datatypeemail = function (item) {            
            var status = false;
            if (email.test($(item).val()) == false) {
                status = false;
                $(item).attr({ 'data-status': '0' });
                $(item).parent().children(':last').text($(item).attr('data-error-message'));
                $(item).next(".control-label").show("slow");
            } else {
                status = true;
                $(item).attr({ 'data-status': '1' });
                $(item).parent().children(':last').text('');
                $(item).next(".control-label").hide("slow");
            }
            return status;
        };
        $("" + content + " [data-type='email']").on('change blur', function (evt) {
            $.datatypeemail(this);
        });
        var date = /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/;
        $.datatypedate = function (item) {
            var status = false;
            if (date.test($(item).val()) == false) {
                status = false;
                $(item).attr({ 'data-status': '0' });
                $(item).parent().children(':last').text($(item).attr('data-error-message'));
                $(item).next(".control-label").show("slow");
            } else if (date.test($(item).val()) == true) {
                status = true;
                $(item).attr({ 'data-status': '1' });
                $(item).parent().children(':last').text('');
                $(item).next(".control-label").hide("slow");
            }
            return status;
        };
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
                    $(this).next(".control-label").show("slow");
                } else {
                    $(this).attr({ 'data-status': '1' });
                    $(this).parent().children(':last').text('');
                    $(this).next(".control-label").hide("slow");
                }
            }
            return true;
        });
        var time = /^([0-9]{2})\:([0-9]{2})$/;
        $.datatypetime = function (item) {
            var status = false;
            if (time.test($(item).val()) == false) {
                $(item).attr({ 'data-status': '0' });
                $(item).parent().children(':last').text($(item).attr('data-error-message'));
                $(item).next(".control-label").show("slow");
            } else if (time.test($(item).val()) == true) {
                status = true;
                $(item).attr({ 'data-status': '1' });
                $(item).parent().children(':last').text('');
                $(item).next(".control-label").hide("slow");
            }
            return status;
        };
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
                    $(this).next(".control-label").show("slow");
                } else {
                    $(this).attr({ 'data-status': '1' });
                    $(this).parent().children(':last').text('');
                    $(this).next(".control-label").hide("slow");
                }
            }
            return true;
        });

    };
})(jQuery);


