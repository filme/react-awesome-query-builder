import {Widgets} from 'react-awesome-query-builder';
import moment from 'moment';

const {
    TextWidget,
    NumberWidget,
    SelectWidget,
    MultiSelectWidget,
    DateWidget,
    BooleanWidget,
    TimeWidget,
    DateTimeWidget,
    ValueFieldWidget
} = Widgets;

export default {
    text: {
        type: "text",
            valueSrc: 'value',
            factory: (props) => <TextWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
            return isForDisplay ? '"'+val+'"' : JSON.stringify(val);
        },
            validateValue: (val, fieldDef) => {
            return (val != "test");
        },
    },
    number: {
        type: "number",
            valueSrc: 'value',
            factory: (props) => <NumberWidget {...props} />,
            valueLabel: "Number",
            valuePlaceholder: "Enter number",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
            return isForDisplay ? val : JSON.stringify(val);
        },
    },
    select: {
        type: "select",
            valueSrc: 'value',
            factory: (props) => <SelectWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
            let valLabel = fieldDef.listValues[val];
            return isForDisplay ? '"'+valLabel+'"' : JSON.stringify(val);
        },
    },
    multiselect: {
        type: "multiselect",
            valueSrc: 'value',
            factory: (props) => <MultiSelectWidget {...props} />,
            formatValue: (vals, fieldDef, wgtDef, isForDisplay) => {
            let valsLabels = vals.map(v => fieldDef.listValues[v]);
            return isForDisplay ? valsLabels.map(v => '"'+v+'"') : vals.map(v => JSON.stringify(v));
        },
    },
    date: {
        type: "date",
            valueSrc: 'value',
            factory: (props) => <DateWidget {...props} />,
            dateFormat: 'DD.MM.YYYY',
            valueFormat: 'YYYY-MM-DD',
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
            let dateVal = moment(val, wgtDef.valueFormat);
            return isForDisplay ? '"'+dateVal.format(wgtDef.dateFormat)+'"' : JSON.stringify(val);
        },
    },
    time: {
        type: "time",
            valueSrc: 'value',
            factory: (props) => <TimeWidget {...props} />,
            timeFormat: 'HH:mm',
            valueFormat: 'HH:mm:ss',
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
            let dateVal = moment(val, wgtDef.valueFormat);
            return isForDisplay ? '"'+dateVal.format(wgtDef.timeFormat)+'"' : JSON.stringify(val);
        },
    },
    datetime: {
        type: "datetime",
            valueSrc: 'value',
            factory: (props) => <DateTimeWidget {...props} />,
            timeFormat: 'HH:mm',
            dateFormat: 'DD.MM.YYYY',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
            let dateVal = moment(val, wgtDef.valueFormat);
            return isForDisplay ? '"'+dateVal.format(wgtDef.dateFormat + ' ' + wgtDef.timeFormat)+'"' : JSON.stringify(val);
        },
    },
    boolean: {
        type: "boolean",
            valueSrc: 'value',
            factory: (props) => <BooleanWidget {...props} />,
            labelYes: "Yes",
            labelNo: "No ",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
            return isForDisplay ? (val ? "Yes" : "No") : JSON.stringify(!!val);
        },
            defaultValue: false,
    },
    field: {
        valueSrc: 'field',
            factory: (props) => <ValueFieldWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay, valFieldDef) => {
            return isForDisplay ? (valFieldDef.label || val) : val;
        },
            valueLabel: "Field to compare",
            valuePlaceholder: "Select field to compare",
            customProps: {
            showSearch: true
        }
    }
};
