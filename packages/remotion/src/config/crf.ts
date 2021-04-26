import {isAudioCodec} from '../is-audio-codec';
import {Codec} from './codec';

type Crf = number | undefined;

let currentCrf: Crf = undefined;

export const setCrf = (newCrf: Crf) => {
	if (typeof newCrf !== 'number' && newCrf !== undefined) {
		throw new TypeError('The CRF must be a number or undefined.');
	}
	currentCrf = newCrf;
};

export const getCrfOrUndefined = () => {
	return currentCrf;
};

export const getDefaultCrfForCodec = (codec: Codec): number => {
	if (isAudioCodec(codec)) {
		return 0;
	}
	if (codec === 'h264') {
		return 18; // FFMPEG default 23
	}
	if (codec === 'h265') {
		return 23; // FFMPEG default 28
	}
	if (codec === 'vp8') {
		return 9; // FFMPEG default 10
	}
	if (codec === 'vp9') {
		return 28; // FFMPEG recommendation 31
	}
	throw new TypeError(`Got unexpected codec "${codec}"`);
};

export const getValidCrfRanges = (codec: Codec): [number, number] => {
	if (isAudioCodec(codec)) {
		return [0, 0];
	}
	if (codec === 'h264') {
		return [0, 51];
	}
	if (codec === 'h265') {
		return [0, 51];
	}
	if (codec === 'vp8') {
		return [4, 63];
	}
	if (codec === 'vp9') {
		return [0, 63];
	}
	throw new TypeError(`Got unexpected codec "${codec}"`);
};

export const validateSelectedCrfAndCodecCombination = (
	crf: number,
	codec: Codec
) => {
	const range = getValidCrfRanges(codec);
	if (crf < range[0] || crf > range[1]) {
		throw new TypeError(
			`CRF must be between ${range[0]} and ${range[1]} for codec ${codec}. Passed: ${crf}`
		);
	}
};

export const getActualCrf = (codec: Codec) => {
	const crf = getCrfOrUndefined() ?? getDefaultCrfForCodec(codec);
	validateSelectedCrfAndCodecCombination(crf, codec);
	return crf;
};
