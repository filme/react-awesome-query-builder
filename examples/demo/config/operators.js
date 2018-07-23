/**
 * Часть конфигурации, ответственная за настройку операторов
 * */
//todo DOC...
import {Operators} from 'react-awesome-query-builder';
const {ProximityOperator} = Operators;

export default {
    equal: {
        label: 'равно',
        labelForFormat: '==',
        reversedOp: 'not_equal',
    },
    not_equal: {
        label: 'не равно',
        labelForFormat: '!=',
        reversedOp: 'equal',
    },

    contains: {
        label: 'содержит',
        labelForFormat: '%%',
        reversedOp: 'not_contains',
    },
    not_contains: {
        label: 'не содержит',
        labelForFormat: '!%',
        reversedOp: 'contains',
    },

    less: {
        label: 'менше',
        labelForFormat: '<',
        reversedOp: 'greater_or_equal',
    },
    less_or_equal: {
        label: 'меньше или равно',
        labelForFormat: '<=',
        reversedOp: 'greater',
    },
    greater: {
        label: 'больше',
        labelForFormat: '>',
        reversedOp: 'less_or_equal',
    },
    greater_or_equal: {
        label: 'больше или равно',
        labelForFormat: '>=',
        reversedOp: 'less',
    },

    between: {
        label: 'между',
        labelForFormat: 'BETWEEN',
        cardinality: 2,
        formatOp: (field, op, values, valueSrcs, valueTypes, opDef, operatorOptions, isForDisplay) => {
            let valFrom = values.first();
            let valTo = values.get(1);
            if (isForDisplay)
                return `${field} >= ${valFrom} AND ${field} <= ${valTo}`;
            else
                return `${field} >= ${valFrom} && ${field} <= ${valTo}`;
        },
        valueLabels: [
            'с',
            'по'
        ],
        textSeparators: [
            null,
            'and'
        ],
        reversedOp: 'not_between',
    },
    not_between: {
        label: 'за пределами',
        labelForFormat: 'NOT BETWEEN',
        cardinality: 2,
        reversedOp: 'between',
        valueLabels: [
            'с',
            'по'
        ],
        textSeparators: [
            null,
            'and'
        ],
        reversedOp: 'between',
    },

    is_empty: {
        isUnary: true,
        label: 'пусто',
        labelForFormat: 'IS EMPTY',
        cardinality: 0,
        reversedOp: 'is_not_empty',
        formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
            return isForDisplay ? `${field} IS EMPTY` : `!${field}`;
        },
    },
    is_not_empty: {
        isUnary: true,
        label: 'не пусто',
        labelForFormat: 'IS NOT EMPTY',
        cardinality: 0,
        reversedOp: 'is_empty',
        formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
            return isForDisplay ? `${field} IS NOT EMPTY` : `!!${field}`;
        },
    },
    select_equals: {
        label: 'равно',
        labelForFormat: '==',
        formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
            return `${field} == ${value}`;
        },
        reversedOp: 'select_not_equals',
    },
    select_not_equals: {
        label: 'не равно',
        labelForFormat: '!=',
        formatOp: (field, op, value, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
            return `${field} != ${value}`;
        },
        reversedOp: 'select_equals',
    },
    select_any_in: {
        label: 'одно из',
        labelForFormat: 'IN',
        formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
            if (valueSrc == 'value')
                return `${field} IN (${values.join(', ')})`;
            else
                return `${field} IN (${values})`;
        },
        reversedOp: 'select_not_any_in',
    },
    select_not_any_in: {
        label: 'не одно из',
        labelForFormat: 'NOT IN',
        formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
            if (valueSrc == 'value')
                return `${field} NOT IN (${values.join(', ')})`;
            else
                return `${field} NOT IN (${values})`;
        },
        reversedOp: 'select_any_in',
    },
    multiselect_equals: {
        label: 'равно',
        labelForFormat: '==',
        formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
            if (valueSrc == 'value')
                return `${field} == [${values.join(', ')}]`;
            else
                return `${field} == ${values}`;
        },
        reversedOp: 'multiselect_not_equals',
    },
    multiselect_not_equals: {
        label: 'Not equals',
        labelForFormat: '!=',
        formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
            if (valueSrc == 'value')
                return `${field} != [${values.join(', ')}]`;
            else
                return `${field} != ${values}`;
        },
        reversedOp: 'multiselect_equals',
    },

    proximity: {
        label: 'Proximity search',
        cardinality: 2,
        valueLabels: [
            {label: 'Word 1', placeholder: 'Enter first word'},
            'Word 2'
        ],
        textSeparators: [
            //'Word 1',
            //'Word 2'
        ],
        formatOp: (field, op, values, valueSrc, valueType, opDef, operatorOptions, isForDisplay) => {
            let val1 = values.first();
            let val2 = values.get(1);
            return `${field} ${val1} NEAR/${operatorOptions.get('proximity')} ${val2}`;
        },
        options: {
            optionLabel: "Near",
            optionTextBefore: "Near",
            optionPlaceholder: "Select words between",
            factory: (props) => <ProximityOperator {...props} />,
            defaults: {
                proximity: 2
            }
        }
    },
};
