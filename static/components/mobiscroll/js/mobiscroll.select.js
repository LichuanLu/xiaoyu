(function ($, undefined) {

    var defaults = {
        inputClass: '',
        invalid: [],
        rtl: false,
        showInput: true,
        group: false,
        groupLabel: 'Groups',
        checkIcon: 'checkmark'
    };

    $.mobiscroll.presetShort('select');

    $.mobiscroll.presets.scroller.select = function (inst) {
        var change,
            grIdx,
            gr,
            group,
            input,
            optIdx,
            option,
            prev,
            prevent,
            timer,
            w,
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            layout = s.layout || (/top|bottom/.test(s.display) ? 'liquid' : ''),
            isLiquid = layout == 'liquid',
            elm = $(this),
            multiple = elm.prop('multiple'),
            id = this.id + '_dummy',
            lbl = $('label[for="' + this.id + '"]').attr('for', id),
            label = s.label !== undefined ? s.label : (lbl.length ? lbl.text() : elm.attr('name')),
            selectedClass = 'dw-msel mbsc-ic mbsc-ic-' + s.checkIcon,
            groupHdr = $('optgroup', elm).length && !s.group,
            invalid = [],
            origValues = [],
            main = {},
            roPre = s.readonly;

        function genValues(cont, keys, values) {
            $('option', cont).each(function () {
                values.push(this.text);
                keys.push(this.value);
                if (this.disabled) {
                    invalid.push(this.value);
                }
            });
        }

        function genWheels() {
            var cont,
                wheel,
                wg = 0,
                values = [],
                keys = [],
                w = [[]];

            if (s.group) {
                $('optgroup', elm).each(function (i) {
                    values.push(this.label);
                    keys.push(i);
                });

                wheel = {
                    values: values,
                    keys: keys,
                    label: s.groupLabel
                };

                if (isLiquid) {
                    w[0][wg] = wheel;
                } else {
                    w[wg] = [wheel];
                }

                cont = group;
                wg++;
            } else {
                cont = elm;
            }

            values = [];
            keys = [];

            if (groupHdr) {
                $('optgroup', elm).each(function (i) {
                    values.push(this.label);
                    keys.push('__group' + i);
                    invalid.push('__group' + i);
                    genValues(this, keys, values);
                });
            } else {
                genValues(cont, keys, values);
            }

            wheel = {
                multiple: multiple,
                values: values,
                keys: keys,
                label: label
            };

            if (isLiquid) {
                w[0][wg] = wheel;
            } else {
                w[wg] = [wheel];
            }

            return w;
        }

        function getOption(v) {
            var def = $('option', elm).attr('value');

            option = multiple ? (v ? v[0] : def) : (v === undefined || v === null ? def : v);
            
            if (s.group) {
                group = elm.find('option[value="' + option + '"]').parent();
                gr = group.index();
                //prev = gr;
            }
        }

        function setVal(v, fill, change) {
            var value = [];

            if (multiple) {
                var sel = [],
                    i = 0;

                for (i in inst._selectedValues) {
                    sel.push(main[i]);
                    value.push(i);
                }

                input.val(sel.join(', '));
            } else {
                input.val(v);
                value = fill ? inst.temp[optIdx] : null;
            }

            if (fill) {
                elm.val(value);
                if (change) {
                    prevent = true;
                    elm.change();
                }
            }
        }

        function onTap(li) {
            var val = li.attr('data-val'),
                selected = li.hasClass('dw-msel');

            if (multiple && li.closest('.dwwl').hasClass('dwwms')) {
                if (li.hasClass('dw-v')) {
                    if (selected) {
                        li.removeClass(selectedClass).removeAttr('aria-selected');
                        delete inst._selectedValues[val];
                    } else {
                        li.addClass(selectedClass).attr('aria-selected', 'true');
                        inst._selectedValues[val] = val;
                    }

                    if (inst.live) {
                        setVal(val, true, true);
                    }
                }
                return false;
            }
        }

        // If groups is true and there are no groups fall back to no grouping
        if (s.group && !$('optgroup', elm).length) {
            s.group = false;
        }

        if (!s.invalid.length) {
            s.invalid = invalid;
        }

        if (s.group) {
            grIdx = 0;
            optIdx = 1;
        } else {
            grIdx = -1;
            optIdx = 0;
        }

        $('option', elm).each(function () {
            main[this.value] = this.text;
        });
        
        getOption(elm.val());

        $('#' + id).remove();

        input = $('<input type="text" id="' + id + '" class="' + s.inputClass + '" placeholder="' + (s.placeholder || '') + '" readonly />');

        if (s.showInput) {
            input.insertBefore(elm);
        }

        inst.attachShow(input);

        var v = elm.val() || [],
            i = 0;

        for (i; i < v.length; i++) {
            inst._selectedValues[v[i]] = v[i];
        }

        setVal(main[option]);

        elm.off('.dwsel').on('change.dwsel', function () {
            if (!prevent) {
                inst.setValue(multiple ? elm.val() || [] : [elm.val()], true);
            }
            prevent = false;
        }).addClass('dw-hsel').attr('tabindex', -1).closest('.ui-field-contain').trigger('create');

        // Extended methods
        // ---

        if (!inst._setValue) {
            inst._setValue = inst.setValue;
        }

        inst.setValue = function (d, fill, time, temp, change) {
            var i,
                value,
                v = $.isArray(d) ? d[0] : d;

            option = v !== undefined && v !== null ? v : $('option', elm).attr('value');

            if (multiple) {
                inst._selectedValues = {};
                if (d) { // Can be null
                    for (i = 0; i < d.length; i++) {
                        inst._selectedValues[d[i]] = d[i];
                    }
                }
            }

            if (v === null) {
                value = null;
            } else if (s.group) {
                group = elm.find('option[value="' + option + '"]').parent();
                gr = group.index();
                value = [gr, option];
            } else {
                value = [option];
            }
            
            inst._setValue(value, fill, time, temp, change);

            // Set input/select values
            if (fill) {
                var changed = multiple ? true : option !== elm.val();
                setVal(main[option], changed, change === undefined ? fill : change);
            }
        };

        inst.getValue = function (temp, group) {
            var val = temp ? inst.temp : (inst._hasValue ? inst.values : null);
            return val ? (s.group && group ? val : val[optIdx]) : null;
        };

        // ---

        return {
            width: 50,
            wheels: w,
            layout: layout,
            headerText: false,
            anchor: input,
            formatResult: function (d) {
                return main[d[optIdx]];
            },
            parseValue: function (val) {
                var v = elm.val() || [],
                    i = 0;

                if (multiple) {
                    inst._selectedValues = {};
                    for (i; i < v.length; i++) {
                        inst._selectedValues[v[i]] = v[i];
                    }
                }

                getOption(val === undefined ? elm.val() : val);

                return s.group ? [gr, option] : [option];
            },
            onBeforeShow: function () {
                if (multiple && s.counter) {
                    s.headerText = function () {
                        var length = 0;
                        $.each(inst._selectedValues, function () {
                            length++;
                        });
                        return length + ' ' + s.selectedText;
                    };
                }

                //if (option === undefined) {
                getOption(elm.val());
                //}

                if (s.group) {
                    prev = gr;
                    inst.temp = [gr, option];
                }

                s.wheels = genWheels();
            },
            onMarkupReady: function (dw) {
                dw.addClass('dw-select');

                $('.dwwl' + grIdx, dw).on('mousedown touchstart', function () {
                    clearTimeout(timer);
                });

                if (groupHdr) {
                    $('.dw', dw).addClass('dw-select-gr');
                    $('.dw-li[data-val^="__group"]', dw).addClass('dw-w-gr');
                }

                if (multiple) {
                    dw.addClass('dwms');

                    $('.dwwl', dw).on('keydown', function (e) {
                        if (e.keyCode == 32) { // Space
                            e.preventDefault();
                            e.stopPropagation();
                            onTap($('.dw-sel', this));
                        }
                    }).eq(optIdx).addClass('dwwms').attr('aria-multiselectable', 'true');

                    origValues = $.extend({}, inst._selectedValues);
                }
            },
            validate: function (dw, i, time) {
                var j,
                    v,
                    t = $('.dw-ul', dw).eq(optIdx);

                if (i === undefined && multiple) {
                    v = inst._selectedValues;
                    j = 0;

                    $('.dwwl' + optIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected');

                    for (j in v) {
                        $('.dwwl' + optIdx + ' .dw-li[data-val="' + v[j] + '"]', dw).addClass(selectedClass).attr('aria-selected', 'true');
                    }
                }

                if (s.group && (i === undefined || i === grIdx)) {
                    gr = +inst.temp[grIdx];
                    if (gr !== prev) {
                        group = elm.find('optgroup').eq(gr);
                        option = group.find('option').not('[disabled]').eq(0).val();
                        option = option || elm.val();
                        s.wheels = genWheels();
                        if (!change) {
                            inst.temp = [gr, option];
                            s.readonly = [false, true];
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                change = true;
                                prev = gr;
                                inst.changeWheel([optIdx], undefined, true);
                                s.readonly = roPre;
                            }, time * 1000);
                            return false;
                        }
                    } else {
                        s.readonly = roPre;
                    }
                } else {
                    option = inst.temp[optIdx];
                }

                $.each(s.invalid, function (i, v) {
                    $('.dw-li[data-val="' + v + '"]', t).removeClass('dw-v');
                });

                change = false;
            },
            onClear: function (dw) {
                inst._selectedValues = {};
                input.val('');
                $('.dwwl' + optIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected');
            },
            onValueTap: onTap,
            onSelect: function (v) {
                setVal(v, true, true);
            },
            onCancel: function () {
                if (!inst.live && multiple) {
                    inst._selectedValues = $.extend({}, origValues);
                }
            },
            onChange: function (v) {
                if (inst.live && !multiple) {
                    input.val(v);
                    prevent = true;
                    elm.val(inst.temp[optIdx]).change();
                }
            },
            onDestroy: function () {
                input.remove();
                elm.removeClass('dw-hsel').removeAttr('tabindex');
            }
        };
    };

})(jQuery);
