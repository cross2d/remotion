---
title: getInputProps()
id: get-input-props
---

_Available from v2.0_.

Using this method, you can retrieve inputs that you pass in from the command line using [`--props`](/docs/cli), or the [`inputProps`](/docs/ssr#render-a-video-programmatically) parameter if you are using the Node.JS API.

You should whenever possible prefer to retrieve props directly in your composition, like you would read props from a component if you were to code a React application, but this method is useful if you want to retrieve the input props outside of a composition.

## API

Pass in a [parseable](/docs/cli) JSON representation using the `--props` flag to either `remotion preview` or `remotion render`:

```console
npx remotion render --props='{"hello": "world"}' src/index.tsx my-composition out.mp4
```

You can then access the props in JavaScript:

```tsx
const {hello} = getInputProps() // "world"
```

In this example, the props also get passed to the component of the composition with the id `my-composition`.

## See also

- [Dynamic duration, FPS & dimensions](dynamic-metadata)
