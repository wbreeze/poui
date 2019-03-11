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
- Babel installed with the `preset-env` and `preset-react` presets installed
  and configured.
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
