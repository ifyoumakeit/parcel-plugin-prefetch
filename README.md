# parcel-plugin-prefetch

Write some JSON to prefetch data in bundle. 

## How to use

`yarn add parcel-plugin-prefetch`

1. Create JSON file with extension `.jsonpf`
2. JSON should be a list in the format...
```json
[{
  "key": "foo",
  "url": "https://..."
}]
```
3. Add `import {foo, STATES} from "./data.jsonpf"` to the top of file.
4. `yarn parcel index.html` or whatever you use.
5. Parcel will prefetch the data and return data in below format.
```js
{
  foo: {
    key: "foo",
    url: "https://...",
    state: "FETCHING" // FAILED || FETCHED
    data: {} // Data returned if "FETCHED"
    error: Error // Error returned if "FAILED"  
  },
  // States for comparison.
  STATES: { 
    FETCHING: "FETCHING",
    FETCHED: "FETCHED",
    FAILURE: "FAILURE"
  }
}
```

## Missing data?
Try running with `--no-cache`.