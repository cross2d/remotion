import {interpolateColors} from '../interpolateColors';
import {expectToThrow} from './expect-to-throw';

test('Throws if color string is not right', () => {
	expectToThrow(() => {
		interpolateColors(1, [0, 1], ['#fabgdf', '#ffaabb']);
	}, /invalid color string #fabgdf provided/);
});

test('Throws error if input, inputRange or outputRange is undefined', () => {
	expectToThrow(() => {
		//@ts-expect-error
		interpolateColors(undefined, ['#aaa', '#bbb'], ['#fff', '#000']);
	}, /input can not be undefined/);
	expectToThrow(() => {
		//@ts-expect-error
		interpolateColors(1, undefined, ['#fff', '#000']);
	}, /inputRange can not be undefined/);
	expectToThrow(() => {
		//@ts-expect-error
		interpolateColors(1, ['#fff', '#000'], undefined);
	}, /outputRange can not be undefined/);
});

test('inputRange and outputRange must be of same length', () => {
	expectToThrow(() => {
		interpolateColors(1, [1, 2, 3], ['#ffffff', '#aaaaaa']);
	}, /inputRange \(3 values provided\) and outputRange \(2 values provided\) must have the same length/);
});

test('Basic interpolate Colors', () => {
	expect(interpolateColors(1, [0, 1], ['#ffaadd', '#fabfdf'])).toBe(
		'rgba(250, 191, 223, 1)'
	);
});

test('Color shorthands', () => {
	expect(interpolateColors(1, [0, 1], ['#fad', '#fabfdf'])).toBe(
		'rgba(250, 191, 223, 1)'
	);
});

test('Color names', () => {
	expect(interpolateColors(1, [0, 1], ['red', 'blue'])).toBe(
		'rgba(0, 0, 255, 1)'
	);
});

test('Mix transparency', () => {
	expect(interpolateColors(0.5, [0, 1], ['transparent', 'blue'])).toBe(
		'rgba(0, 0, 128, 0.5)'
	);
});

test('HSV', () => {
	expect(
		interpolateColors(0.5, [0, 1], ['hsla(120, 100%, 25%, 0)', 'blue'])
	).toBe('rgba(0, 64, 128, 0.5)');
});
