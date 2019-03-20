## Prior stages
1. [Etapa01](Etapa01.md) Setup and list item component.
1. [Etapa02](Etapa02.md) Implement container component.
1. [Etapa03](Etapa03.md) Incorporate an ordering specification.
1. [Etapa04](Etapa04.md) Add interaction to select items in order.
1. [Etapa05](Etapa05.md) Support full partial order.
1. [Etapa06](Etapa06.md) Add item click interaction for partial order.

## Add drag and drop

In this stage we'll develop the initial drag and drop ability.
The goal is to enable a dragged item to be dropped:
- in-between items to reorder it
- on another item to create a group with it
- on a group to add it to the group

The item can be dragged whether it is by itself or in a group.
The position within a group is immaterial. We'll add it to the top
or bottom of the group, whichever is convenient.

We're greatful for
[this post on Medium from freeCodeCamp](https://medium.freecodecamp.org/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a)
This overview of the
[drag and drop api](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
of HTML, from Mozilla, is also quite helpful.

The plan is to implement all of the state management and interaction
within the Parto component, and provide a high-level abstract event
to fire upon reordering. We're not sure how we'll highlight the drop
target visually, especially the in-between targets. It's clear that we'll
be adding and removing class values on the elements and allowing CSS
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

