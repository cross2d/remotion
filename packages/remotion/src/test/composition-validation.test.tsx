import {render} from '@testing-library/react';
import React from 'react';
import {Composition} from '..';
import {RemotionRoot} from '../RemotionRoot';
import {expectToThrow} from './expect-to-throw';

const AnyComp: React.FC = () => null;

test('It should throw if multiple components have the same id', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					{/**
           // @ts-expect-error*/}
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						fps={30}
						height={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "width/
	);
});
test('It should throw if height is a negative number', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						fps={30}
						height={-100}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "height" of a composition must be positive, but got -100./
	);
});
test('It should throw if height=0 is boundary off-point', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						fps={30}
						height={0}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "height" of a composition must be positive, but got 0./
	);
});
test('It should not throw if height is a positive number', () => {
	expect(() =>
		render(
			<Composition
				lazyComponent={() => Promise.resolve({default: AnyComp})}
				durationInFrames={100}
				fps={30}
				height={100}
				width={100}
				id="id"
			/>
		)
	).not.toThrow();
});
test('It should not throw if height=1 is boundary on-point', () => {
	expect(() =>
		render(
			<Composition
				lazyComponent={() => Promise.resolve({default: AnyComp})}
				durationInFrames={100}
				fps={30}
				height={1}
				width={100}
				id="id"
			/>
		)
	).not.toThrow();
});
test('It should throw if height is not a number', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						fps={30}
						// @ts-expect-error
						height={'100'}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "height" of a composition must be a number, but you passed a string/
	);
});

test('It should throw if width is a negative number', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						fps={30}
						height={100}
						width={-100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "width" of a composition must be positive, but got -100./
	);
});
test('It should throw if width=0 is boundary off-point', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						fps={30}
						height={100}
						width={0}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "width" of a composition must be positive, but got 0./
	);
});
test('It should not throw if width is a positive number', () => {
	expect(() =>
		render(
			<Composition
				lazyComponent={() => Promise.resolve({default: AnyComp})}
				durationInFrames={100}
				fps={30}
				height={100}
				width={100}
				id="id"
			/>
		)
	).not.toThrow();
});
test('It should not throw if width=1 is boundary on-point', () => {
	expect(() =>
		render(
			<Composition
				lazyComponent={() => Promise.resolve({default: AnyComp})}
				durationInFrames={100}
				fps={30}
				height={100}
				width={1}
				id="id"
			/>
		)
	).not.toThrow();
});
test('It should throw if width is not a number', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						fps={30}
						height={100}
						// @ts-expect-error
						width={'100'}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "width" of a composition must be a number, but you passed a string/
	);
});

test('It should throw if durationInFrames of a composition is a negative number', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={-100}
						fps={30}
						height={100}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "durationInFrames" of a composition must be positive, but got -100./
	);
});
test('It should throw if durationInFrames=0 of a composition is boundary off-point', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={0}
						fps={30}
						height={100}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "durationInFrames" of a composition must be positive, but got 0./
	);
});
test('It should throw if durationInFrames of a composition is not an integer', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={0.11}
						fps={30}
						height={100}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "durationInFrames" of a composition must be an integer, but got 0.11./
	);
});
test('It should not throw if durationInFrames=1 of a composition is boundary on-point', () => {
	expect(() =>
		render(
			<Composition
				lazyComponent={() => Promise.resolve({default: AnyComp})}
				durationInFrames={1}
				fps={30}
				height={100}
				width={100}
				id="id"
			/>
		)
	).not.toThrow();
});
test('It should throw if durationInFrames of a composition is not a number', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						// @ts-expect-error
						durationInFrames={'100'}
						fps={30}
						height={100}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "durationInFrames" of a composition must be a number, but you passed a string/
	);
});

test('It should throw if fps is of a composition is negative', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						fps={-30}
						height={100}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "fps" of a composition must be positive, but got -30./
	);
});
test('It should throw if fps=0 of a composition is boundary off-point', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						fps={0}
						height={100}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "fps" of a composition must be positive, but got 0./
	);
});
test('It should not throw if fps=1 of a composition is boundary on-point', () => {
	expect(() =>
		render(
			<Composition
				lazyComponent={() => Promise.resolve({default: AnyComp})}
				durationInFrames={100}
				fps={1}
				height={100}
				width={100}
				id="id"
			/>
		)
	).not.toThrow();
});
test('It should throw if fps of a composition is not a number', () => {
	expectToThrow(
		() =>
			render(
				<RemotionRoot>
					<Composition
						lazyComponent={() => Promise.resolve({default: AnyComp})}
						durationInFrames={100}
						// @ts-expect-error
						fps={'30'}
						height={100}
						width={100}
						id="id"
					/>
				</RemotionRoot>
			),
		/The "fps" of a composition must be a number, but you passed a string/
	);
});
