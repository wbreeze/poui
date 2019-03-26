This is a project to develop a user interface for specifying partial orders.

A "partial order" is simply an ordering of things in which some items
share the same position in the ordering.

![PartialOrder](docs/images/Etapa06Capture6.png)

## Usage

The package is available in the Node.js package repository as,
"[poui](https://www.npmjs.com/package/poui)."

Use your package manager to install it.

Use it by requiring it, and then rendering at as a component.

## Development setup and making changes

The project uses:
- The [React](https://reactjs.org/)
  JavaScript library to develop a tree of user interface components
  rendered in a browser.
- The [Node Package manager](https://www.npmjs.com/),
  `npm` for package management.
- [Node.js](https://nodejs.org/)
  as a JavaScript interpreter in development.
- A
  [Node.js version manager](https://github.com/creationix/nvm/),
  `nvm` to manage the Node.js JavaScript environment.
- [Jest](https://jestjs.io/)
  as a test driver.
- [Enzyme](https://github.com/airbnb/enzyme/)
  to render and test the React components.

1. Pull the repository using git.
1. Have the Node.js package manager (npm) installed.
1. Install the packages using `npm install`.

### Styling (CSS)

The project follows the BEM,
[Block, Element, Modifier](http://getbem.com/)
method of styling, using classes.
We prefix the block class names with "`poui-`."

A default stylesheet is provided.
For details, browse the components using an inspector, or view the
component render methods of the components in the source tree.

## Etapas

The project is developed in stages, or "etapas," each with a
description of the work carried out in the stage. The work descriptions are
in the docs directory as markdown documents with the name of the stage,
e.g. [Etapa01.md](docs/Etapa01.md).

Git tags mark the
end of one stage and the beginning of the next. In other words, there is
a tag, `Etapa01` with all of the work committed to date before moving on
to Etapa02.

1. [Etapa01](docs/Etapa01.md) Setup and list item component.
1. [Etapa02](docs/Etapa02.md) Implement container component.
1. [Etapa03](docs/Etapa03.md) Incorporate an ordering specification.
1. [Etapa04](docs/Etapa04.md) Add interaction to select items in order.
1. [Etapa05](docs/Etapa05.md) Support full partial order.
1. [Etapa06](docs/Etapa06.md) Add item click interaction for partial order.
1. [Etapa07](docs/Etapa07.md) Add drag and drop.

