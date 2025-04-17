Sixsense JS
===========

## Overview

Sixsense JS is a package containing reusable javascript we can share across React UI projects. As you're writing UI code, ask yourself if it can be reused. If so, put it here

## Usage
### Add the package as a dependency of your project (perhaps use a manage.sh script for this)
***DON'T INCLUDE IN THE PACKAGE.JSON FILE OF YOUR PROJECT***
```bash
bazel build //sixsense-js:static
cd your-project
npm install {NTROPY_HOME}/bazel-genfiles/sixense-js/sixsense-js.tgz --force
```
### Update bazel build rules

In your project/BUILD:

- Add to srcs

```
srcs = [
    ...
    "//sixsense-js:static"
],
```

- Add to cmd
This is necessary because yarn isn't smart enough to autodetect for local packages
```
...cmd
+ "&& npm install {relative/path/to/ntropy/root}$(location //sixsense-js:static) --force""
```

### Import resources
```js
import { Row } from 'sixsense-js/lib/components';
```

## Build
```bash
npm run build
```

## Development
Change import in your project to import relatively from this project. This will enable the use of hot reloading and prevent the need to build the package for every change
```js
import Row from '{path/to/sixsense-js}/src/components/Row';
```

### Adding dependencies
```bash
yarn add {package}
```
Update "bundledDependencies" in package.json to include your dependency

**Any dependencies used in this project must be managed by here, not only in your project. If something you add to this package uses lodash and you only have lodash listed as a dependency in your project, it will not work when built or for other projects**

### Debugging webpack

The babelrc for this package contains only what it needs. When we add babel plugins, we add bloat to the webpack bundle. Therefore, it's possible that you may need to add one or more babel-plugins to support your uses. Simply
```bash
yarn add --dev {the babel plugin you need}
```
and add new plugins to the .babelrc file
```json
"plugins": [
  "transform-object-rest-spread"
  "your-new-plugin"
],
```

### Before you go

Change this back
```js
import { Row } from 'sixsense-js/lib/components';
```

```bash
bazel build //sixsense-js:static
cd your-project
npm install {NTROPY_HOME}/bazel-genfiles/sixense-js/sixsense-js.tgz --force
```

Does everything still work?

## Migrating existing code
Take special caution when migrating existing code to this package. If the code relies on anything coupled to its existing project, it's not reusable enough to put in this package. Take special care that whatever you pull out still works exactly the same in its original project
