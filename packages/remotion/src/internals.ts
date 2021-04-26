import {CompProps} from './Composition';
import {
	CompositionManager,
	CompositionManagerContext,
	RenderAssetInfo,
	TAsset,
	TCompMetadata,
	TComposition,
	TSequence,
} from './CompositionManager';
import {DEFAULT_BROWSER, getBrowser} from './config/browser';
import {getBrowserExecutable} from './config/browser-executable';
import {
	DEFAULT_CODEC,
	getFinalOutputCodec,
	getOutputCodecOrUndefined,
} from './config/codec';
import {getConcurrency} from './config/concurrency';
import {
	getActualCrf,
	getDefaultCrfForCodec,
	validateSelectedCrfAndCodecCombination,
} from './config/crf';
import {
	getRange,
	setFrameRangeFromCli,
	validateFrameRange,
} from './config/frame-range';
import {
	getUserPreferredImageFormat,
	validateSelectedPixelFormatAndImageFormatCombination,
} from './config/image-format';
import {getShouldOutputImageSequence} from './config/image-sequence';
import {INPUT_PROPS_KEY} from './config/input-props';
import * as Logging from './config/log';
import {
	getWebpackOverrideFn,
	WebpackOverrideFn,
} from './config/override-webpack';
import {getShouldOverwrite} from './config/overwrite';
import {
	DEFAULT_PIXEL_FORMAT,
	getPixelFormat,
	validateSelectedPixelFormatAndCodecCombination,
} from './config/pixel-format';
import {getQuality} from './config/quality';
import {
	DEFAULT_WEBPACK_CACHE_ENABLED,
	getWebpackCaching,
} from './config/webpack-caching';
import {FEATURE_FLAG_FIREFOX_SUPPORT} from './feature-flags';
import {isAudioCodec} from './is-audio-codec';
import * as perf from './perf';
import {getCompositionName, getIsEvaluation, getRoot} from './register-root';
import {RemotionRoot} from './RemotionRoot';
import {SequenceContext} from './sequencing';
import * as Timeline from './timeline-position-state';
import {
	SetTimelineContextValue,
	TimelineContextValue,
} from './timeline-position-state';
import {truthy} from './truthy';
import {useLazyComponent} from './use-lazy-component';
import {useUnsafeVideoConfig} from './use-unsafe-video-config';
import {useVideo} from './use-video';
import {
	RemotionContextProvider,
	useRemotionContexts,
} from './wrap-remotion-context';

// Mark them as Internals so use don't assume this is public
// API and are less likely to use it
export const Internals = {
	perf,
	useUnsafeVideoConfig,
	Timeline,
	CompositionManager,
	RemotionRoot,
	useVideo,
	getRoot,
	getBrowserExecutable,
	getCompositionName,
	getIsEvaluation,
	getPixelFormat,
	getConcurrency,
	getRange,
	getShouldOverwrite,
	getOutputCodecOrUndefined,
	getWebpackOverrideFn,
	getQuality,
	getShouldOutputImageSequence,
	validateSelectedCrfAndCodecCombination,
	getFinalOutputCodec,
	DEFAULT_CODEC,
	DEFAULT_PIXEL_FORMAT,
	FEATURE_FLAG_FIREFOX_SUPPORT,
	DEFAULT_WEBPACK_CACHE_ENABLED,
	getBrowser,
	DEFAULT_BROWSER,
	getDefaultCrfForCodec,
	getActualCrf,
	setFrameRangeFromCli,
	getUserPreferredImageFormat,
	validateSelectedPixelFormatAndImageFormatCombination,
	validateSelectedPixelFormatAndCodecCombination,
	validateFrameRange,
	getWebpackCaching,
	useLazyComponent,
	truthy,
	isAudioCodec,
	INPUT_PROPS_KEY,
	Logging,
	SequenceContext,
	useRemotionContexts,
	RemotionContextProvider,
};

export type {
	TComposition,
	Timeline,
	TCompMetadata,
	TSequence,
	WebpackOverrideFn,
	TAsset,
	RenderAssetInfo,
	TimelineContextValue,
	SetTimelineContextValue,
	CompProps,
	CompositionManagerContext,
};
