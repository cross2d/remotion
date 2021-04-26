import {render} from '@testing-library/react';
import React from 'react';
import {Sequence} from '../sequencing';
import {expectToThrow} from './expect-to-throw';

test('It should throw if "from" props is not a number', () => {
	expectToThrow(
		// @ts-expect-error
		() => render(<Sequence from={'0'} durationInFrames={30} />),
		/You passed to the "from" props of your <Sequence> an argument of type string, but it must be a number./
	);
});

test('It should throw if Sequence has missing duration', () => {
	expectToThrow(
		// @ts-expect-error
		() => render(<Sequence from={0} />),
		/You passed to durationInFrames an argument of type undefined, but it must be a number./
	);
});

test('It should throw if Sequence has non-integer durationInFrames', () => {
	expectToThrow(
		() =>
			render(
				<Sequence from={0} durationInFrames={1.1}>
					hi
				</Sequence>
			),
		/The "durationInFrames" of a sequence must be an integer, but got 1.1./
	);
});
test('It should throw if Sequence has non-integer from', () => {
	expectToThrow(
		() =>
			render(
				<Sequence from={0.1} durationInFrames={1}>
					hi
				</Sequence>
			),
		/The "from" prop of a sequence must be an integer, but got 0.1./
	);
});

test('It should throw if Sequence has missing duration', () => {
	expectToThrow(
		() =>
			render(
				<Sequence from={0} durationInFrames={1.1}>
					hi
				</Sequence>
			),
		/The "durationInFrames" of a sequence must be an integer, but got 1.1./
	);
});

test('It should throw if Sequence has negative duration', () => {
	expectToThrow(
		// @ts-expect-error
		() => render(<Sequence from={0} durationInFrames={-1} />),
		/durationInFrames must be positive, but got -1/
	);
});

test('It should allow null as children', () => {
	expect(() =>
		render(
			<Sequence durationInFrames={100} from={0}>
				{null}
			</Sequence>
		)
	).not.toThrow();
});

test('It should allow undefined as children', () => {
	expect(() =>
		render(
			<Sequence durationInFrames={100} from={0}>
				{undefined}
			</Sequence>
		)
	).not.toThrow();
});

test('It should throw for invalid layout value', () => {
	expectToThrow(
		() =>
			render(
				// @ts-expect-error
				<Sequence from={0} durationInFrames={100} layout={'invalid-value'} />
			),
		/The layout prop of <Sequence \/> expects either "absolute-fill" or "none", but you passed: invalid-value/
	);
});
