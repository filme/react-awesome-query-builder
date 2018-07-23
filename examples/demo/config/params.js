import fields from "./fields";
import settings from "./settings";
import conjunctions from "./conjunctions";
import types from "./types";
import operators from "./operators";
import widgets from "./widgets";

let configParams = {};

configParams.conjunctions = conjunctions;
configParams.fields = fields;
configParams.types = types;
configParams.operators = operators;
configParams.widgets = widgets;
configParams.settings = settings;

export default configParams;