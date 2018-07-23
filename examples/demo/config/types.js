export default {
    text: {
        widgets: {
            text: {
                defaultOperator: 'contains',
                operators: [
                    "contains",
                    'equal',
                    "not_contains",
                    'not_equal',
                    "is_empty",
                    "is_not_empty",
                    //'proximity' //не нужно
                ],
                widgetProps: {
                    formatValue: (val, fieldDef, wgtDef, isForDisplay) => ("_" + JSON.stringify(val)),
                    valueLabel: "Текст",
                    valuePlaceholder: "Введите текст",
                }
            },
/*
            field: {
                operators: [
                    'equal',
                    'not_equal',
                    //note that unary ops will be excluded anyway, see getWidgetsForFieldOp()
                    //"is_empty",
                    //"is_not_empty",
                    'proximity'
                ],
            }
*/
        },
    },
    number: {
        valueSources: ['value'],
        widgets: {
            number: {
                operators: [
                    "equal",
                    "not_equal",
                    "less",
                    "less_or_equal",
                    "greater",
                    "greater_or_equal",
                    //"between",
                    //"not_between",
                    "is_empty",
                    "is_not_empty",
                ],
                defaultOperator: 'equal',
                widgetProps: {
                    valueLabel: "Число",
                    valuePlaceholder: "Введите число",
                }
            }
        },
    },
    date: {
        widgets: {
            date: {
                operators: [
                    "equal",
                    "not_equal",
                    "less",
                    "less_or_equal",
                    "greater",
                    "greater_or_equal",
                    "between",
                    "not_between",
                    "is_empty",
                    "is_not_empty",
                ]
            }
        },
    },
    time: {
        widgets: {
            time: {
                operators: [
                    "equal",
                    "not_equal",
                    "less",
                    "less_or_equal",
                    "greater",
                    "greater_or_equal",
                    "between",
                    "not_between",
                    "is_empty",
                    "is_not_empty",
                ]
            }
        },
    },
    datetime: {
        widgets: {
            datetime: {
                operators: [
                    //"equal", //для даты-времени не актуально
                    //"not_equal", //для даты-времени не актуально
                    "less",
                    "less_or_equal",
                    "greater",
                    "greater_or_equal",
                    "between",
                    "not_between",
                    "is_empty",
                    "is_not_empty",
                ],
                opProps: {
                    between: {
                        valueLabels: [
                            {label: 'С', placeholder: 'Введите начальную дату'},
                            {label: 'По', placeholder: 'Введите конечную дату'},
                        ],
                    },
                },
                widgetProps: {
                    timeFormat: 'HH:mm',
                    dateFormat: 'YYYY-MM-DD',
                    valueFormat: 'YYYY-MM-DD HH:mm:ss',//для корректного парсинга дата-времени бэком
                }
            }
        },
    },
    select: {
        mainWidget: "select",
        widgets: {
            select: {
                defaultOperator: 'select_equals',
                operators: [
                    'select_equals',
                    'select_not_equals'
                ],
                widgetProps: {
                    customProps: {
                        showSearch: true
                    }
                },
            },
            multiselect: {
                operators: [
                    'select_any_in',
                    'select_not_any_in'
                ],
                widgetProps: {},
            },
        },
    },
    multiselect: {
        widgets: {
            multiselect: {
                operators: [
                    'multiselect_equals',
                    'multiselect_not_equals',
                ]
            }
        },
    },
    boolean: {
        widgets: {
            boolean: {
                operators: [
                    "equal",
                ],
                widgetProps: {
                    //you can enable this if you don't use fields as value sources
                    //hideOperator: true,
                    //operatorInlineLabel: "is",
                }
            },
            field: {
                operators: [
                    "equal",
                    "not_equal",
                ],
            }
        },
    },
};

