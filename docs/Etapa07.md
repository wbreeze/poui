## Prior stages
1. [Etapa01](Etapa01.md) Setup and list item component.
1. [Etapa02](Etapa02.md) Implement container component.
1. [Etapa03](Etapa03.md) Incorporate an ordering specification.
1. [Etapa04](Etapa04.md) Add interaction to select items in order.
1. [Etapa05](Etapa05.md) Support full partial order.
1. [Etapa06](Etapa06.md) Add item click interaction for partial order.

## Add drag and drop

In this stage we'll develop the initial drag and drop ability.
The goal is to enable a dragged item to be dropped.
Looking at the spec, dragging is only related to reordering items.
It doesn't create groups nor place items in groups.
Thus we want to drag in-between items to reorder them.

The item can be dragged whether it is by itself or in a group.

We're greatful for:
- [this post on Medium from freeCodeCamp](https://medium.freecodecamp.org/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a)
- This overview of the
[drag and drop api](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
of HTML, from Mozilla, is also quite helpful.
- There's a nice
[article about testing](https://reactjsnews.com/testing-drag-and-drop-components-in-react-js)
on ReactJS News. It doesn't use Enzyme, but provides the approach and
good ideas.

The plan is to implement all of the state management and interaction
within the Parto component and provide a high-level abstract event
to fire upon reordering. We're not sure how we'll highlight the drop
target visually. The plan is to add and remove
class values on the elements and allow CSS
to do the work of highlighting, which will make the highlight behavior
configurable.

### Prior art

Let's see how others have done it.
We're looking for something pure, not built upon another library
(such as
[dragula](https://github.com/bevacqua/react-dragula)
or
[react-dnd](https://github.com/react-dnd/react-dnd)
),
simply because what we want isn't that hard, and because
we don't want to introduce dependencies.
There are a number of examples on
[ReactJsExample.com](https://reactjsexample.com/tag/drag-drop/)
including some that could be "plug-and-play" here:
- [Hierarchal](https://reactjsexample.com/drag-and-drop-sortable-component-for-nested-data-and-hierarchies/)
- [Sortable](https://reactjsexample.com/a-set-of-higher-order-components-to-turn-any-list-into-an-animated-sortable-list/)
- [Beautiful](https://reactjsexample.com/beautiful-accessible-drag-and-drop-for-lists-with-react-js-2/)
  Visit this one especially when thinking about how to make the dnd accessible
  from a keyboard.

We're interested in the internals, how they work, as well as the interfaces,
how they're used. Lots to study.

### Drag, with no targets

Let's just get an item to drag, know that it's dragging, see that it's
dragging, and do nothing with the drop.

Right away we encounter a problem with the Item component. It isn't
including any injected `onDragStart` event on the list item. It isn't
including any injected class names.
We update the render method of the Item component to strip expected
properties, groom the class name, and pass along remaining properties.

We have the Parto component inject the `draggable` property and an
`onDragStart` event handler into the Item component. The handler sets
the item key on the `onDragStart` event dataTransfer object.

With that much, an image of the item animates under the cursor when
dragging an item.

### Drop

We add `onDragOver` and `onDrop` event handlers on the items.
First, we just look at the events by logging them to the console.
With much fussing, we work out how to identify the location of the
dragged item (cursor) relative to the drop target and implement
the needed event callbacks in the Parto component.

The `dragOver` events come fast and furious. We'll learn how to
limit them. For now, all we need to do is check whether the target is
a different item and call `ev.preventDefault()`.

On drop, we work-out the position of the drop in the top or bottom
half of the item, then invoke a new callback, `itemReorder` with the key
of the item dropped, key of the item dropped upon, and whether the
drop was in the before or after part (vertically) of the item dropped
upon.

It all turned-out to be very little (hard won) code. But it isn't over.

### Implement the callback in the SelectInOrder component.

Now we have the user interface doing a rudimentary drag and drop.
Let's have the SelectInOrder component implement a callback that
effects the change.

That callback will use the PartialOrder methods to effect the change
to the order. We implement a `moveItem` function there.

In doing so, we find that we want to first remove the item from the
order. We already have a `removeItem` method, but that method is meant
to do a shallow removal from an embedded group. We rename it as
`shallowRemoveItem`, refactor the tests, and add (and test) a new
`removeItem` method.

The other function we want in PartialOrder is `insertItem`,
because we implement `moveItem` by first removing, then inserting.

Another method that we add is `flatten`, which reduces the depth
of grouping by one. It's a one-liner, but we were repeating the one-liner
in multiple places. Now it's a tested function.

At last, implementing the drop behavior in the SelectInOrder component,
the test involves a great deal of troublesome setup- mocking the
drop event, and with JSDOM, faking the size of the drop zone by
finding the DOM component and injecting a `getBoundingClientRect` method
into it that returns fixed values. We only write one.

The drag and drop functions now, but without any meaningful feedback,
during drag, about what will happen.

### Implement preview on drag

We place the current ordering in the state of the Parto component,
copying it originally from the props. We replace the ordering from
props with that from the state, in particular in the `orderedItems` method.

Then in the `dragOver` handler we update the state using PartialOrder
to get an updated order.

This causes some visual feedback. The ordering alters during the drag,
cool. It's a bit subtle. More is needed.

However it also doesn't work. For one thing, when we drop outside of
any drop zone, the ordering doesn't reset to what it was before the
drag. The `dropped` event isn't called, nor the `itemReorder` handler.
This means that the state of the Parto component is now out of synch
with the state in the parent SelectInOrder component.

We attempt to repair the synchronization problem by resetting the
state to the props at the end of the drag.

This works well enough when it's called, but it isn't always being
called. We fear that the event is sometimes dropped.

### Attempt to throttle

The React FAQ's discuss
[throttling](https://reactjs.org/docs/faq-functions.html#throttle)
some handlers. Let's try it. It uses a dependency called `lodash.throttle`,
which we install.

Doing this, we start getting "you're accessing the property `dataTransfer`
on a released/nullified synthetic event" in the console.
We try `debounce` with the same effect.

### Ensure React reconciles only when necessary

The React documentation, under the heading of optimizing performance, has
[recommendation](https://reactjs.org/docs/optimizing-performance.html#avoid-reconciliation)
to prevent DOM reconciliation when the state of a component
has not changed.

When we watched the update highlighting using the React development tools
plugin, we saw the entire Parto component and Item components updating
repeatedly during dragOver events, when there was absolutely no need to
update, because nothing had changed from the prior event.

Repairing this might help. We undertake to implement and test
`shouldComponentUpdate` methods to address it.

Testing requires digging into the component lifecycle and seeing that
[we see that](https://reactjs.org/docs/react-component.html#updating)
after calling `shouldComponentUpdate`, if permitted, React will first
call `render` and later call `componentDidUpdate`. We'll spy on both
and see that they aren't called when we don't want them called.

Jest provides a rich capability for preparing mocks, but what we really
want is spies. For this we add `sinon` as a dev dependency for spying
on the methods called within the component. Quickly, however, given
```
const spy = sinon.spy(Item.prototype, 'componentDidUpdate');
```

we get "Attempted to wrap undefined property componentDidUpdate as function"
from the spy.

Poking around, it seems better to simply test the `shouldComponentUpdate`
function and trust that React is doing the life cycle calls as documented,
not updating when shouldComponentUpdate returns false. So we can back out of
using sinon and spies and all of that fancyness.

Doing so, we get a warning from React about overriding `shouldComponentUpdate`
on a component derived from React.PureComponent.
```
Warning: Item has a method called shouldComponentUpdate().
shouldComponentUpdate should not be used when extending React.PureComponent.
Please extend React.Component if shouldComponentUpdate is used.
```

For curiosity, we check whether the sinon spy will work once we extend
React.Component in place of React.PureComponent. It does not.

Implementing `shouldComponentUpdate` can be a two edged sword. One of our
tests broke because we attempted to inject the `onDragStart` event by
updating props in the test. Because `shouldComponentUpdate` now returns
false in that case, the new, injected DOM event callback isn't rendered.

Modifying the callbacks of a rendered component isn't something we'll be
doing, but it's also something that, with our `shouldComponentUpdate`,
will no longer work. We went ahead and updated the test.


