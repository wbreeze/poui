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


