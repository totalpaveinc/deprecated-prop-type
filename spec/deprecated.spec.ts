
import * as propTypes from 'prop-types';
import {deprecated} from '../src/deprecated';

beforeEach(() => {
    jest.spyOn(console, 'error');
});

it('logs an error when deprecated prop is passed', () => {
    propTypes.checkPropTypes({
        excludeDates: deprecated(propTypes.string, 'It has been replaced by exclude.')
    }, { excludeDates: 'does not matter' }, 'excludeDates', 'MyComponent');
    expect(console.error).toHaveBeenCalledWith('Warning: "excludeDates" property of "MyComponent" has been deprecated.\nIt has been replaced by exclude.');
});

it('throws an error when incorrect prop is passed', () => {
    propTypes.checkPropTypes({
        excludeDates: deprecated(propTypes.string, 'It has been replaced by exclude.')
    }, { excludeDates: 42 }, 'excludeDates', 'MyComponent');
    expect(console.error).toHaveBeenCalledWith(`Warning: Failed excludeDates type: Invalid excludeDates \`excludeDates\` of type \`number\` supplied to \`MyComponent\`, expected \`string\`.`);
});
