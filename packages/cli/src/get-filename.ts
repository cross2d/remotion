import {Codec} from 'remotion';
import {Log} from './log';
import {
	getUserPassedFileExtension,
	getUserPassedOutputLocation,
} from './user-passed-output-location';

export const getOutputFilename = (
	codec: Codec,
	imageSequence: boolean
): string => {
	let filename = getUserPassedOutputLocation();
	let extension = getUserPassedFileExtension();
	if (imageSequence) {
		if (extension !== null) {
			Log.Error(
				'The output directory of the image sequence cannot have an extension. Got: ' +
					extension
			);
			process.exit(1);
		}
		return filename;
	}
	if (extension === null && !imageSequence) {
		if (codec === 'h264' || codec === 'h265') {
			Log.Info('No file extension specified, adding .mp4 automatically.');
			filename += '.mp4';
			extension = 'mp4';
		}
		if (codec === 'vp8' || codec === 'vp9') {
			Log.Info('No file extension specified, adding .webm automatically.');
			filename += '.webm';
			extension = 'webm';
		}
	}
	if (codec === 'h264') {
		if (extension !== 'mp4') {
			Log.Error(
				'When using the H264 codec, the output filename must end in .mp4.'
			);
			process.exit(1);
		}
	}
	if (codec === 'h265') {
		if (extension !== 'mp4' && extension !== 'hevc') {
			Log.Error(
				'When using H265 codec, the output filename must end in .mp4 or .hevc.'
			);
			process.exit(1);
		}
	}
	if (codec === 'vp8' || codec === 'vp9') {
		if (extension !== 'webm') {
			Log.Error(
				`When using the ${codec.toUpperCase()} codec, the output filename must end in .webm.`
			);
			process.exit(1);
		}
	}
	if (codec === 'mp3') {
		if (extension !== 'mp3') {
			Log.Error("When using the 'mp3' codec, the output must end in .mp3");
			process.exit(1);
		}
	}
	if (codec === 'aac') {
		const allowedAacExtensions = ['aac', '3gp', 'm4a', 'm4b', 'mpg', 'mpeg'];
		if (!extension || !allowedAacExtensions.includes(extension)) {
			Log.Error(
				`When using the 'aac' codec, the output must end in one of those extensions: ${allowedAacExtensions
					.map((a) => `.${a}`)
					.join(', ')}`
			);
			process.exit(1);
		}
	}
	if (codec === 'wav') {
		if (extension !== 'wav') {
			Log.Error(
				"When using the 'wav' codec, the output locatio must end in .wav."
			);
			process.exit(1);
		}
	}

	return filename;
};
