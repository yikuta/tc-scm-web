import Vue from 'vue'

export type ModeType = 'inline' | 'block' | 'flex'

interface IFormRuleItem {
    required?: Boolean;
    message: string;
    trigger: string | string[];
    validator?: Function;
}

interface IFormRule {
    [index: string]: IFormRuleItem[]
}

export default class SearchForm extends Vue {
    /* layout mode */
    mode: ModeType;

    form: object[];

    rules: IFormRule;

    size: string;

    labelWidth: string;

    addButtonText: string;

    buttons: string[];
}
