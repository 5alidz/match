## Installation

npm `npm i @5alid/match`
yarn `yarn add @5alid/match`

## Usage

```js
import match from '@5alid/match';

let num = 1;

let matched = match(num)(
  ['_', 'error'], // default case
  [0, () => 'zero'],
  [1, () => 'one'],
  [2, () => 'two'],
  [3, () => 'three']
); // -> 'one'

num = 4;
// this will return 'error'
match(num)(
  ['_', 'error'], // default case
  [0, () => 'zero'],
  [1, () => 'one'],
  [2, () => 'two'],
  [3, () => 'three']
); // -> 'error'
```

### Use Cases

#### reducers

```js
function stateReducer(state, action) {
  return match(action.type)(
    ['_', () => state],
    ['setSomeProp', () => ({ ...state, someProp: action.payload })],
    ['setOtherProp', () => ({ ...state, otherProp: action.payload })]
  );
}
```

#### jsx

example button that fetches async data

```jsx
function Status() {
  const [status, setStatus] = useState('IDLE');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (status == 'FETCHING') {
      fetch(api_url)
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setStatus('SUCCESS');
        })
        .catch(() => setStatus('ERROR'));
    }
  }, [state]);

  return (
    <button onClick={() => setStatus('FETCH')}>
      {/* standard way to handle conditions expression */}
      {match(status)(
        ['_', () => 'Something went wrong'],
        ['FETCHING', () => '...'],
        ['IDLE', () => 'idle'],
        ['SUCCESS', () => 'Done'],
        ['ERROR', () => 'Something went wrong']
      )}
    </button>
  );
}
```
