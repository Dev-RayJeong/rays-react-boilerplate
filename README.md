# React 환경설정

# Getting Started

This is going to be the folder structure:

```jsx
react-webpack-babel-typescript/
├── public/
│   ├── index.html
├── config/
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── src/
│   ├── assets/
│   ├── components/
│   ├── containers/
│   ├── types/
│   │   └── css-modules.d.ts
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierrc
├── babel.config.js
├── package.json
└── tsconfig.json
```

Let’s start off by creating a new project directory and generate package.json file with the command below:

```jsx
mkdir [Project Name] && cd [Project Name] && npm init -y
```

The command above will create a directory called typescript-react and generates a package.json file inside the project directory.

# Webpack

Install webpack and its plugins:

```jsx
npm i -D webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin clean-webpack-plugin
```

- **webpack-dev-server** – provides you with a simple web server and the ability to use live reloading.
- **webpack-merge** – a utility to merge webpack configurations.
- **html-webpack-plugin** – a plugin that simplifies creation of HTML files to serve your bundles
- **clean-webpack-plugin** – a plugin to remove/clean your build folder

### config/webpack.common.js

Start by writing the common webpack configuration that will be used for both development and production.

```jsx
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.join(__dirname, '../src/index'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};

module.exports = config;
```

### config/webpack.dev.js

This is the development specific configuration

```jsx
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
  },
};

module.exports = merge(common, config);
```

### config/webpack.prod.js

This is the production specific configuration

```
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const common = require('./webpack.common');

const config = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'js/main.[contentHash].js',
    publicPath: './',
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = merge(common, config);
```

### public/index.html

This is the HTML template thats going to be used by the HTMLWebpackPlugin

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>[Project Name]</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

### package.json

Add the following scripts to package.json file

```
{

  // ...

  "scripts": {
    "start": "webpack-dev-server --mode development --open --hot --config config/webpack.dev.js",
    "build": "webpack --mode production --config config/webpack.prod.js",
  },
  
  // ...

}
```

# Babel

```
npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-proposal-class-properties
```

```
npm i @babel/polyfill
```

### babel.config.js

```
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: ['@babel/plugin-proposal-class-properties']
};
```

### config/webpack.common.js

```jsx
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: ['@babel/polyfill', path.join(__dirname, '../src/index')],

	// ...resolve

 module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  
  // ...plugins
};

module.exports = config;
```

# TypeScript

```jsx
npm i typescript
```

### tsconfig.json

```jsx
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",                       /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": ["es2015", "es6", "esnext", "dom"],                             /* Specify library files to be included in the compilation. */
    "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    "jsx": "react",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                      /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "dist",                          /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    "paths": {
      "components/*": ["./src/components/*"],
      "containers/*": ["./src/containers/*"],
      "assets/*": ["./src/assets/*"],
      "constants/*": ["./constants/*"],
      "utils/*": ["./src/utils/*"]
    },                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    "allowSyntheticDefaultImports": true,     /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true,                     /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  }
}
```

# React

```jsx
npm i react react-dom @types/react @types/react-dom
```

It’s time to write some React components.

### src/index.tsx

```jsx
import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

### src/App.tsx

```jsx
import React, { FC } from 'react';

const App: FC = () => <div>React + Webpack + Babel 7 + Typescript</div>;

export default App;
```

# ESLint and Prettier

```jsx
npm i -D eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

```jsx
npx install-peerdeps --dev eslint-config-airbnb
```

```jsx
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

### .prettierrc

```jsx
{
  "singleQuote": true,
  "parser": "typescript",
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 120,
  "trailingComma": "none",
  "endOfLine": "auto"
}
```

### .eslintrc

```jsx
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "prettier",
    "airbnb",
    "airbnb/hooks",
    "prettier/react",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".ts"] }],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowTypedFunctionExpressions": true
      }
    ],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "@typescript-eslint/indent": ["error", 2],
    "react/prop-types": "off"
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ]
}
```

### .package.json

```jsx
{
  //...
  "scripts": {
		//...
		"lint": "eslint './src/**/*.{ts,tsx,js,jsx}'",
    "lint:fix": "eslint --fix './src/**/*.{ts,tsx,js,jsx}'",
    "prettier": "prettier --write --config ./.prettierrc './src/**/*.{ts,tsx}'"
		//...
  }
  //...
}
```

### .eslintignore

```jsx
/node_modules
```

# CSS Modules

Let us now add the ability to style our components using the **style-loader** and **css-loader**.

```jsx
npm i -D css-loader style-loader
```

### config/webpack.common.js

```jsx
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  
  // ...entry, resolve

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  
  // ...plugins
};

module.exports = config;
```

### src/types/css-modules.d.ts

Without this, you’ll be getting the ***Cannot find module <module name>*** error.

```jsx
declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}
```

We can now import css file that will be applied globally

### src/index.css

```jsx
@import url('https://fonts.googleapis.com/css?family=Muli:400,800&display=swap');

body {
  margin: 0;
  font-family: 'Muli', sans-serif;
```

### src/index.tsx

```jsx
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

# References

[https://onoya.dev/react-webpack-babel7-typescript/](https://onoya.dev/react-webpack-babel7-typescript/)

[https://flamingotiger.github.io/javascript/eslint-setup/](https://flamingotiger.github.io/javascript/eslint-setup/)

[https://poiemaweb.com/es6-babel-webpack-2](https://poiemaweb.com/es6-babel-webpack-2)
