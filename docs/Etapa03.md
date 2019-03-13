## Prior stages
[Etapa01](Etapa01.md) setup and initial list item implementation
[Etapa02](Etapa02.md) initial parto ordered list implementation

## Etapa03

It's time to have the Parto component display a designated ordering
of the items we give to it. For this, we'll need a way to designate the
ordering.

First, we'll have to supply keys for the items.
Then we can designate the order using the keys.
For example, given keys "a", "b", "c" we can provide an ordering as
`["c", "a", "b"]`.

- `["c", "a", "b"]` means first "c", then "a", then "b".
- `["a", "c"] means first "a", then "c" and "b" is not ordered
  (part of "the rest").
- `[]` means that nothing is ordered, all are part of "the rest".
- `["a"] means first "a", "c" and "b" are part of "the rest".

By "the rest", we mean everything else, which come last without preference
one over the other.

Later we'll upgrade this to encompass full partial orders. For now,
it's enough to establish an order, and to distinguish "the rest" as
those that are not ordered.

So the properties we send to the Parto component need to evolve.
First, we send the itemList as tuples of form,
`{ "key": <a key>, "description": <a description> }`.
Both key and description are string valued.

We update the Parto test and component to work with the itemList as tuples.


