# SADE - Sistema de Acompanhamento de Desenvolvedores Externos

This project runs in [AngularJS][angular] web app.

## Getting Started

### Prerequisites

You must have node.js and its package manager (npm) installed.

You can get them from [http://nodejs.org/][node].

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/components` - contains the angular framework files

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

### Compile SASS into CSS

We have preconfigured the project with a watcher for .scss files. While developing using SASS, run:

```
gulp watch
```

Alternatively, you can compile SASS into CSS once running:

```
gulp sass
```

Now browse to the app at `http://localhost:3000/`.

[angular]: http://angularjs.org/
[bower]: http://bower.io/
[node]: https://nodejs.org
[npm]: https://www.npmjs.org/