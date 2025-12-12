import * as warning from 'warning';

let warned: Record<string, boolean> = {};

export interface IValidateFunction {
    (props: any, propName: string, componentName: string, ...rest: any[]): any;
}

export function deprecated(propType: any, explanation: string): IValidateFunction {
    return function validate(props, propName, componentName, ...rest) { // Note ...rest here
        if (props[propName] !== null && props[propName] !== undefined) {
            let message: string = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
            if (!warned[message]) {
                warning(false, message);
                warned[message] = true;
            }
        }

        return propType(props, propName, componentName, ...rest); // and here
    };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function _resetWarned(): void {
    warned = {};
}

deprecated._resetWarned = _resetWarned;
