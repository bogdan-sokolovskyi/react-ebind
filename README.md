# react-ebind

This library like "Ebind in the Shell" but "Ebind in the React Application" - business layer of the React application.

Usually we use jsx for UI Components:

```jsx
const Component = () => (
	<div>
		<MenuTop /> /* connect to MenuEbind */
		<Pagination /> /* connect to ListEbind */
		<List /> /* connect to ListEbind */
		<ItemHeader /> /* connect to ItemEbind */
		<ItemContent /> /* connect to ItemEbind */
		<Pagination /> /* connect to ListEbind */
		<MenuBottom /> /* connect to MenuEbind */
	</div>
);
```

But for separate logic layer from UI layer we need some other namings.

So I came up with two functions: **ebind()** and **ebinds()**

```js
import { ebinds, ebind } from "react-ebind";

const PageEbind = ({ param1, param2, id }) =>
	ebinds(
		ebind(MenuEbind, { param1 }),
		ebind(ListEbind, { param2 }),
		id && ebind(ItemEbind, { id })
	);
```

Its equals to react createElement:

```js
import { createElement, Fragment } from "react";

const ebind = createElement;
const ebinds = (...children) => createElement(Fragment, null, ...children);

export { ebind, ebinds };
```

That is all content of this library. So you can use all features of React library for code Business logic.

## Use Case 1. Connecting redux, react and ebind

I propose using:

-  Redux for Model
-  React for UI
-  React-Ebind for Business logic

**business logic** (ebind) <------> **state** (redux) <------> **UI** (react)

#### Ebinds:

-  implement business logic - check for the state changes, compute/load data and dispatch actions for save new data;
-  add/remove reducers in the redux;

#### Redux:

-  change state when receive actions;

#### React:

-  get state;
-  render UI;
-  dispatch redux actions on user interactions;

## Install

1. Install [React JS](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)
2. Add module react-ebind into project:

```
npm i react-ebind
```

### You can use react and redux hooks:

```js
import { useSelector, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ebinds, ebind } from "react-ebind";

const PagesEbind = () => {
	const url = useSelector(({ history }) => history.url);
	const pageEbind = useMemo(() => getPageEbindByUrl(url), [url]);
	return ebind(pageEbind);
};

const HomePageEbind = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const interval = setInterval(() => {
			dispatch({ type: "COUNTER_PLUS" });
		}, 1000);
		return () => clearInterval(interval);
	});

	// you should explicitly point that this ebind hasn't child ebinds
	return null;
};
```

## API

`ebind(Actor, props, children)` - create and return ebind/actor/worker

`ebind(Actor1, Actor2, .... ActorN)` - crate and return many ebinds/actors/workers

```

So we tested logic of application.
After business logic implemented, you can add thin layer of UI using react components.

## Requirements
Support all react versions from 16 and later
```
