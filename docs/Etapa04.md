We now have a pretty good static implementation of the UI. It isn't done.
There are many details to implement, such as the staggering of items so
that they don't appear all grouped together. However these details will
come.

Right now the story is:
- Items begin unordered at the bottom.
- Clicking an item on the bottom moves it to last in the order above.

That's it. It's the basic interaction that allows a person to pick
the items in order of preference. That will have us started with something
useful.

We need a place to hold a little bit of state, a place that keeps the
current ordering, intercepts events that alter the ordering, and manipulates
the representation of the ordering in the interface.
It could be the Porto component, but right now we have a clean concern
for that component. It takes care of representing the partial order.
Instead, we can keep that concern separate from those of managing the
state of the order. We can add an executive component that manages
state changes and pushes them down into the representation via props.

Later, the Parto component will have plenty to do; especially when we
implement the drag behavior.

React has a pattern documented as 
[Higher Order Component](https://reactjs.org/docs/higher-order-components.html)
(HOC).
This appears to fit. The HOC accepts a component and returns a new component
that decorates the accepted component with additional behavior. Here, we use
one as an executive.

Redux has a pattern documented as
[Container Component](https://redux.js.org/basics/usage-with-react#implementing-container-components).
The container component subscribes to part of the state in Redux and
manipulates the props of the contained component. The notion of a
container component is referenced in the HOC component documentation,
but there isn't much further elaboration there. It _looks like_ a container
component is an HOC that connects with Redux. Redux provides
a `connect()` capability for creating them.

We're not finding a lot of guidance about naming the module that has
the HOC component generating functions. There's some convention around
naming the returned HOC component using "With". There's some convention
around naming the function that constructs and returns that component using
"with...". We're settling on naming the module around the story behavior
it implements. And we've gone with "SelectInOrder".

In order to query and simulate events on the children of the Parto
component, we need to use the Enzyme `mount` in place of `shallow` method
to render the component. For that to work, we had to adjust the Jest
`testEnvironment` setting in `jest.config.js` from `node` to `jsdom`.
It took a while to work that out; but, it did the trick.

In order to have a click event on the unordered Item components,
we need to pass one down through the Proto component.
Back in [Etapa02](Etapa02.md) we put-off doing this.
Now is the time.
We add two handlers to the Proto component:
- orderedItemClick: for clicking on an ordered item
- unorderedItemClick: for clicking on an unordered item
and arrange for the first to be the `onClickEvent` for items that are
ordered, the second for items that are not.

We needed to deep render in the new tests for Proto, so that we can simulate
the click event on one of its items. We split the tests into two describe
groups: one which shallow renders, the other which deep renders.

We needed to put the item key in the Item component props, so that the
callback could return it and identify the item. The "`key`" used by
React and injected when rendering the list from the Props component
does not show-up in props. And the name appears to be reserved.
We had to add an `itemKey` prop to the Item component. And we tested
that the callback provides it.

We also updated the Proto component to place the `itemKey` property
in its Item children, because we made the `itemKey` a required property.
