In this stage we set-up the Node.js development environment with needed packages
and develop the list item component.

## Development environment

Both development and production require React, the UI component framework.
That in turn means we'll need Babel, and probably WebPack.
We need to install and manage a toolchain that extends the capabilities
of vanilla JavaScript in Node.js.

There are several options for initializing and managing this:
- Roll it ourselves by installing and configuring packages.
  This can be quite maddening and can turn in to quite a time sink.
  One resource for this is the Noteworthy post,
  [Creating a React App... From Scratch](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)
  referenced from the React documentation.
- Use [create-react-app](https://github.com/facebook/create-react-app)
  which leaves details of Babel and Webpack "preconfigured and hidden".
  It requires tests to be mixed with the components under test in the
  same directory.
- Use one of the "flexible toolchains" recommended in the React documentation
  for [creating a React app](https://reactjs.org/docs/create-a-new-react-app.html#more-flexible-toolchains)
    - One of these is
      [nwb](https://github.com/insin/nwb/blob/master/docs/guides/ReactApps.md#developing-react-apps-with-nwb)
      The `nwb` toolchain puts tests separate from the components.

### nwb

We tried `nwb`, but it hides details underneath its own shell, e.g.
```
  "scripts": {
    "build": "nwb build-react-component",
    "clean": "nwb clean-module && nwb clean-demo",
    ...
  },
```

Running `npm install` left ten audited vulerabilities
```
found 10 vulnerabilities (4 low, 5 moderate, 1 high)
```

Running `npm audit fix --force` produced:
```
10 vulnerabilities required manual review and could not be updated
```
meaning that some of these, one at minimum, need to be addressed, but we can't
address them without making changes to `nwb` itself,
because they're part of the dependencies of `nwb`.

Unfortunately, the roll-your-own route is the one that gets the job done.

### Installed packages

We follow the procedure from the Noteworthy post,
[Creating a React App… From Scratch](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658)
except, instead of using Webpack, we use Parcel.

We now have configured scripts in `package.json`:
- `npm run serve` which watches for and builds changes, runs a small web
  server on `localhost:1234`
- `npm run watch` which watches for and builds changes
- `npm run build` which builds files into the `dist` directory

In the `package.json` file we have:
- Babel installed and configured with the
  `preset-env` and `preset-react` presets.
- Parcel installed for build, with a lightweight web server for poking.
- React and ReactDOM

We have:
- a browser index file as `public/index.html` which loads the
  application script and provides a target `div` in the page body for
  React to render to.
- a top-level component, `App` from `src/App.js` that renders
  an `h1` element.
- an index script as `src/index.js` that loads React and renders
  the top level App component into the target `div` of the page.

The app runs. React renders the content of the App component.

## List item component

So, onward! We need a component that captures an item to be ranked.
We'll model it as a list item, although it will never be rendered without
JavaScript. It could just as well be a `<div>`, but `<li>` feels right.
If the partial order was rendered in plain old HTML it might look like this:

```
<ol>
  <li>First ranked item</li>
  <li><ul>
    <li>One of two ranked second</li>
    <li>Another of two ranked second</li>
  </ul></li>
  <li>Third ranked item</li>
  <li>Fourth ranked item</li>
</ol>
```

### Tests

There are a few ways to organize tests:
- Place them in the component directory next to the components they are
testing. This mixes tests and code in the source. It places tests right
next to the code being tested.
- Place them in a `tests` directory that lives next to `src`, mirroring the
directory structure of `src`. This has certain advantages for packaging and
distribution-- simply ignore the `tests` directory. It results, however,
in a lot of directory traversal gymnastics in the imports.
- Place them in `tests` directories within the `src` directories, next to
the code being tested. This feels like a happy compromise between the first
two. It lends some structure and separation to the tests without imposing
a requirement to do directory gymnastics in the imports. The imports in
tests look like, for example, `import Item from '../Item';`.

We have to make a choice between Mocha and Chai vs. Jest. It could be a
toss-up. Jest looks simpler to set-up and use. Mocha has rich handling
for testing asynchronous code. In this case, we're developing a library
component. This isn't a full-fledged web application. It feels right to
keep testing simple and straightforward. Some might argue that both are
simple and straightforward. We're going with Jest here.

We have to make a choice between DOM testing library (DTL) and Enzyme.
One major difference is in the query methods. DTM focuses on what is visible.
Its queries focus on text, name, display value, etc. Enzyme allows queries
by internal, non-visible attributes such as classes, id's, and node types.
The philosophy of DTL is understandable, but we're going with Enzyme
in order to have access to all of the DOM attributes.

Installing Jest "added 181 packages from 109 contributors".
Installing Enzyme with the React-16 adapter
"added 33 packages from 22 contributors".
We build upon an almost instantly constructed, massive foundation of
openly distributed, mostly open source work from so many people and places.

### The component

Having the ability to test it, we construct `src/components/Item.js` with
a matching unit test in `src/components/tests/Item.test.js`.

More than just rendering an item, we want to be able to inject behaviors
to be triggered by click and drag. The behaviors will be both visible and
state changing.

To see that we'll be able to do that, we test that we can inject a function
called on click of the item.

#### class-properties

We like the
[class properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
syntax for writing component classes.
Installing that creates a little bit of tech-debt. We'll have to adjust the
Babel plugins when this syntax moves to mainstream.

That isn't a huge increment above maintaining versions of things with
upgrades and patches.

### Styling

Having the component, we'd like it to look more like a clickable button
and not an HTML rendered list item with a bullet.

For now, we put the styling in the `App.css` file. We'll revisit this later
and most likely make a top-level stylesheet for the top-level component.

The component needs a class so that we can target the styling. We treat
styling for this component as a top-level block in the block-element-model
(BEM) paradigm.

We use font-relative units in order to maintain visual feel of the
component in the presense of larger or smaller font size settings.

To add some interactive, button-like behavior, we change the cursor shape
and alter the border color when the pointer tracks over the item.
