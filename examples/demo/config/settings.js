import ru_RU from "antd/lib/locale-provider/ru_RU";

export default {
    /** Locale used for AntDesign widgets */
    locale: {
        short: 'en',
        full: 'en-US',
        antd: ru_RU,
    },
    /** To shorten long labels of fields/values (by length, i.e. number of chars) */
    maxLabelsLength: 50,
    /** Don't show conjunctions switcher for only 1 rule? */
    hideConjForOne: true,
    /** Size of AntDesign components todo а какие еще бывают??? */
    renderSize: 'small',
    /** How to render conjunctions switcher? true - use RadioGroup, false - use ButtonGroup */
    renderConjsAsRadios: false,
    /** How to render fields/ops list? true - use Dropdown/Menu, false - use Select */
    renderFieldAndOpAsDropdown: true,
    customFieldSelectProps: {
        showSearch: false
    },
    groupActionsPosition: 'topRight', // oneOf [topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight]
    setOpOnChangeField: ['keep', 'default'], // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'
    clearValueOnChangeField: false, //false - if prev & next fields have same type (widget), keep
    clearValueOnChangeOp: false,
    setDefaultFieldAndOp: false,
    maxNesting: 10,
    fieldSeparator: '.',
    fieldSeparatorDisplay: ' > ',
    showLabels: false,

    //!!! -- Next options are for localization: -- !!!
    valueLabel: "Значение",
    valuePlaceholder: "Значение",
    fieldLabel: "Поле",
    operatorLabel: "Оператор",
    fieldPlaceholder: "Выбрать поле",
    operatorPlaceholder: "Выбрать оператор",
    deleteLabel: null,
    addGroupLabel: "Группа условий",
    addRuleLabel: "Условие",
    readonlyMode: false,

    notLabel: "НЕ",
    /** Show NOT together with AND/OR? */
    showNot: false,

    delGroupLabel: null,
    canLeaveEmptyGroup: true, //after deletion

    formatReverse: (q, operator, reversedOp, operatorDefinition, revOperatorDefinition, isForDisplay) => {
        if (isForDisplay)
            return "NOT(" + q + ")";
        else
            return "!(" + q + ")";
    },
    formatField: (field, parts, label2, fieldDefinition, config, isForDisplay) => {
        if (isForDisplay)
            return label2;
        else
            return field;
    },

    /** Values of fields can be compared with values or another fields
     *  If you want to disable this feature and leave only comparing with values, remove 'field' */
    valueSourcesInfo: {
        value: {
            label: "Значение"
        },
/*
        field: {
            label: "Поле",
            widget: "field",
        }
*/
    },
    valueSourcesPopupTitle: "Выбирите источник",

    /** Activate reordering support for rules and groups of rules? */
    canReorder: true,
    /** (For comparing field with field) Function for building right list of fields to compare */
    canCompareFieldWithField: (leftField, leftFieldConfig, rightField, rightFieldConfig) => {
        //for type == 'select'/'multiselect' you can check listValues
        return true;
    },
}