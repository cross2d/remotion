import {
	CodecOrUndefined,
	getFinalOutputCodec,
	getOutputCodecOrUndefined,
	setCodec,
} from '../config/codec';

// getFinalOutputCodec

describe('Codec tests valid codec input', () => {
	const validCodecInput: CodecOrUndefined[] = [
		'h264',
		'h265',
		'vp8',
		'vp9',
		'mp3',
		'aac',
		'wav',
	];
	validCodecInput.forEach((entry) =>
		test(`codec ${entry}`, () =>
			expect(
				getFinalOutputCodec({
					codec: entry,
					emitWarning: false,
					fileExtension: '',
				})
			).toEqual(entry))
	);
});

describe('Codec tests undefined codec input with known extension', () => {
	const codecExtensionCombination: [string, string][] = [
		['vp8', 'webm'],
		['h265', 'hevc'],
		['mp3', 'mp3'],
		['wav', 'wav'],
		['aac', 'aac'],
		['aac', 'm4a'],
	];
	codecExtensionCombination.forEach((entry) =>
		test(`${entry[1]} should be recognized as ${entry[0]}`, () =>
			expect(
				getFinalOutputCodec({
					codec: undefined,
					emitWarning: false,
					fileExtension: entry[1],
				})
			).toEqual(entry[0]))
	);
});

describe('Codec tests undefined codec input with unknown extension', () => {
	const unknownExtensions = ['', 'abc'];
	unknownExtensions.forEach((entry) =>
		test(`testing with "${entry}" as extension`, () =>
			expect(
				getFinalOutputCodec({
					codec: undefined,
					emitWarning: false,
					fileExtension: entry,
				})
			).toEqual('h264'))
	);
});

// setCodec

describe('Codec tests setOutputFormat', () => {
	const validCodecInputs: CodecOrUndefined[] = [
		'h264',
		'h265',
		'vp8',
		'vp9',
		undefined,
	];
	validCodecInputs.forEach((entry) =>
		test(`testing with ${entry}`, () => {
			setCodec(entry);
			expect(getOutputCodecOrUndefined()).toEqual(entry);
		})
	);
});
