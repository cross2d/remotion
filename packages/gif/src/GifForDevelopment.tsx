import {Canvas, useWorkerParser} from '@react-gifs/tools';
import {LRUMap} from 'lru_map';
import React, {forwardRef, useState} from 'react';
import {GifState, RemotionGifProps} from './props';
import {useCurrentGifIndex} from './useCurrentGifIndex';

const cache = new LRUMap<string, GifState>(30);

export const GifForDevelopment = forwardRef<
	HTMLCanvasElement,
	RemotionGifProps
>(function Gif(
	{src, width, height, onError, onLoad, fit = 'fill', ...props},
	ref
) {
	const [state, update] = useState<GifState>(() => {
		const parcedGif = cache.get(src);

		if (parcedGif == null) {
			return {
				delays: [],
				frames: [],
				width: 0,
				height: 0,
			};
		}

		return parcedGif;
	});

	// skip loading if frames exist
	useWorkerParser(!!state.frames.length || src, (info) => {
		if ('error' in info) {
			if (onError) {
				onError(info.error);
			} else {
				console.error(
					'Error loading GIF:',
					info.error,
					'Handle the event using the onError() prop to make this message disappear.'
				);
			}
		} else {
			onLoad?.(info);

			cache.set(src, info);
			update(info);
		}
	});

	const index = useCurrentGifIndex(state.delays);

	return (
		<Canvas
			fit={fit}
			index={index}
			frames={state.frames}
			width={width ?? state.width}
			height={height ?? state.height}
			{...props}
			ref={ref}
		/>
	);
});
