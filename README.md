This is a project to develop a user interface for specifying partial orders.

A "partial order" is simply an ordering of things in which some items
share the same position in the ordering.

Refer to the `docs` directory for
[an initial design document](docs/OriginalDesign.md).

## Usage

The package will be available in the Node.js package repository as,
"[poui]()."

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
in markdown documents with the name of the stage, e.g. [Etapa01.md](Etapa01.md).

Git tags mark the
end of one stage and the beginning of the next. In other words, there is
a tag, `Etapa01` with all of the work committed to date before moving on
to Etapa02.

1. [Etapa01](Etapa01) Setup and list item component.

