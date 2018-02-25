# parcel-plugin-prefetch

Write some JSON to prefetch data in bundle. 

Not sure of why you'd want this, but I was using it to learn ParcelJS's plugin system.

## How to use

1. Create JSON file with extension `.jsonpf`
2. JSON should be a list in the format...
```json
[{
  "key": "foo",
  "url": "https://..."
}]
```
3. Parcel will prefetch the data and return these keys.
```js
[{
  "key": "foo",
  "url": "https://...",
  "state": "FETCHING" // FAILED || FETCHED
  "data": {} // Data returned if "FETCHED"
  "error": Error // Error returned if "FAILED"  
}]
```
4. A `STATES` key will also be return for comparison.