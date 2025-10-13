# CSS Normalization

This module contains files for CSS normalization (bringing it to a single form in all browsers).
The files are taken from https://github.com/JohnAlbin/normalize-scss/tree/8.0.0.

Changes have been made to the files to avoid using the deprecated sass API:

- Instead of the global `unit` function, `math.unit` is used
- Instead of `@import`, `@use` is used

It is also possible to add your own custom normalization to the `_custom.scss` file.