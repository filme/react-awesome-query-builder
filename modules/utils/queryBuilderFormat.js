'use strict';
import Immutable from 'immutable';
import uuid from "./uuid";
import isArray from 'lodash/isArray'
import {defaultValue} from "./stuff";
import {
    getFieldConfig, getWidgetForFieldOp, getValueSourcesForFieldOp, getOperatorConfig, getFieldWidgetConfig, 
    getFieldPath, getFieldPathLabels, fieldWidgetDefinition
} from './configUtils';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

/* function fo format field description */
export const formatFieldForQueryBuilder = (field, fieldDefinition, fieldSeparator) => {
    //debugger;
    var fieldStructArray = field.split(fieldSeparator);
    var tableName = (fieldStructArray.length == 1) ? '' : fieldStructArray[0];
    var fieldName = (fieldStructArray.length == 1) ? fieldStructArray[0] :
        ((arr) => {
            var result = arr.slice();
            result.shift();
            return result.join(fieldSeparator)
        })(fieldStructArray);

    fieldName = fieldDefinition.fieldName ? fieldDefinition.fieldName : fieldName;
    var result = [];
    result.push(fieldName);

    if (fieldDefinition.tableName === '') {
        tableName = '';
    } else {
        tableName = fieldDefinition.tableName == undefined ? tableName : fieldDefinition.tableName;
    }

    if (tableName) {
        result.unshift(tableName)
    }

    return result.join(fieldSeparator);
};
/*
//testing code for formatFieldForQueryBuilder:
testData = {
    testNum:        [        0,        1,        2,        3,  4,    5,        6,        7,        8,        9,   10,   11],
    field:          [      'f',      'f',      'f',      'f','f',  'f',    't.f',    't.f',    't.f',    't.f','t.f','t.f'],
    tableName:      [undefined,       '',      'T',undefined, '',  'T',undefined,       '',      'T',undefined,   '',  'T'],
    fieldName:      [undefined,undefined,undefined,      'F','F',  'F',undefined,undefined,undefined,      'F',  'F',  'F'],
    expectedResult: [      'f',      'f',    'T.f',      'F','F','T.F',    't.f',      'f',    'T.f',    't.F',  'F','T.F'],
    fieldSeparator: '.'
}

testData.testNum.forEach((item, i) => {
    var fieldDefinition = {tableName: testData.tableName[i], fieldName: testData.fieldName[i]};
    var testResult = formatFieldForQueryBuilder(testData.field[i], fieldDefinition, testData.fieldSeparator);
    console.assert(testResult == testData.expectedResult[i], 'not passed test ' + i + '\n' +
        'expected: <' + testData.expectedResult[i] + '>, got: <' + testResult + '>' + '\n',
        testData.field[i], fieldDefinition.fieldName, fieldDefinition.tableName);
});
*/

/*
 Build tree to http://querybuilder.js.org/ like format

 Example:
 {
 "condition": "AND",
 "rules": [
 {
 "id": "price",
 "field": "price",
 "type": "double",
 "input": "text",
 "operator": "less",
 "value": "10.25"
 },
 {
 "condition": "OR",
 "rules": [
 {
 "id": "category",
 "field": "category",
 "type": "integer",
 "input": "select",
 "operator": "equal",
 "value": "2"
 },
 {
 "id": "category",
 "field": "category",
 "type": "integer",
 "input": "select",
 "operator": "equal",
 "value": "1"
 }
 ]}
 ]
 }
 */
export const queryBuilderFormat = (item, config, rootQuery = null) => {
    const type = item.get('type');
    const properties = item.get('properties');
    const children = item.get('children1');
    const id = item.get('id')

    var resultQuery = {};
    var isRoot = (rootQuery === null);
    if (isRoot) {
        rootQuery = resultQuery;
        rootQuery.usedFields = [];
    }

    if (type === 'group' && children && children.size) {
        const conjunction = properties.get('conjunction');
        const not = properties.get('not');
        const conjunctionDefinition = config.conjunctions[conjunction];

        const list = children
            .map((currentChild) => {
                return queryBuilderFormat(currentChild, config, rootQuery)
            })
            .filter((currentChild) => typeof currentChild !== 'undefined')
        if (!list.size)
            return undefined;
        resultQuery['rules'] = list.toList();
        resultQuery['condition'] = conjunction.toUpperCase();
        resultQuery['not'] = not;

        return resultQuery;
    } else if (type === 'rule') {
        const operator = properties.get('operator');
        const options = properties.get('operatorOptions');
        let field = properties.get('field');
        let value = properties.get('value');
        let valueSrc = properties.get('valueSrc');
        let valueType = properties.get('valueType');

        let hasUndefinedValues = false;
        value.map((currentValue, ind) => {
            if (currentValue === undefined) {
                hasUndefinedValues = true;
                return undefined;
            }
        });

        if (field == null || operator == null || hasUndefinedValues)
            return undefined;

        const fieldDefinition = getFieldConfig(field, config) || {};
        const operatorDefinition = getOperatorConfig(config, operator, field) || {};
        //const reversedOp = operatorDefinition.reversedOp;
        //const revOperatorDefinition = getOperatorConfig(config, reversedOp, field) || {};
        const fieldType = fieldDefinition.type || "undefined";
        const cardinality = defaultValue(operatorDefinition.cardinality, 1);
        const widget = getWidgetForFieldOp(config, field, operator);
        const fieldWidgetDefinition = omit(getFieldWidgetConfig(config, field, operator, widget), ['factory']);
        const typeConfig = config.types[fieldDefinition.type] || {};

        //format field
/*
        if (fieldDefinition.tableName) {
          const regex = new RegExp(field.split(config.settings.fieldSeparator)[0])
          field = field.replace(regex, fieldDefinition.tableName)
        }
*/
        field = formatFieldForQueryBuilder(field, fieldDefinition, config.settings.fieldSeparator);

        if (value.size < cardinality)
            return undefined;

        if (rootQuery.usedFields.indexOf(field) == -1)
            rootQuery.usedFields.push(field);
        value = value.toArray();
        valueSrc = valueSrc.toArray();
        valueType = valueType.toArray();
        let values = [];
        for (let i = 0 ; i < value.length ; i++) {
            let val = {
                type: valueType[i],
                value: value[i],
            };
            values.push(val);
            if (valueSrc[i] == 'field') {
                let secondField = value[i];
                if (rootQuery.usedFields.indexOf(secondField) == -1)
                    rootQuery.usedFields.push(secondField);
            }
        }
        let operatorOptions = options ? options.toJS() : null;
        if (operatorOptions && !Object.keys(operatorOptions).length)
            operatorOptions = null;

        var ruleQuery = {
            id,
            field,
            type: fieldType,
            input: typeConfig.mainWidget,
            operator,
        };
        if (operatorOptions)
            ruleQuery.operatorOptions = operatorOptions;
        ruleQuery.values = values;
        return ruleQuery
    }
    return undefined;
};

