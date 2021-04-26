import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {useMediaInTimeline} from '../use-media-in-timeline';
import {useMediaPlayback} from '../use-media-playback';
import {useMediaTagVolume} from '../use-media-tag-volume';
import {useSyncVolumeWithMediaTag} from '../use-sync-volume-with-media-tag';
import {RemotionAudioProps} from './props';
import {useFrameForVolumeProp} from './use-audio-frame';

const AudioForDevelopmentForwardRefFunction: React.ForwardRefRenderFunction<
	HTMLAudioElement,
	RemotionAudioProps
> = (props, ref) => {
	const audioRef = useRef<HTMLAudioElement>(null);

	const volumePropFrame = useFrameForVolumeProp();

	const {volume, ...nativeProps} = props;

	const actualVolume = useMediaTagVolume(audioRef);

	useSyncVolumeWithMediaTag({
		volumePropFrame,
		actualVolume,
		volume,
		mediaRef: audioRef,
	});

	useMediaInTimeline({
		volume,
		mediaRef: audioRef,
		src: nativeProps.src,
		mediaType: 'audio',
	});

	useMediaPlayback({
		mediaRef: audioRef,
		src: nativeProps.src,
		mediaType: 'audio',
	});

	useImperativeHandle(ref, () => {
		return audioRef.current as HTMLVideoElement;
	});

	return <audio ref={audioRef} {...nativeProps} />;
};

export const AudioForDevelopment = forwardRef(
	AudioForDevelopmentForwardRefFunction
);
