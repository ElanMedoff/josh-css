# working with mobile devices

## the magical meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

`device-width` sets the viewport width to math the device's width, and `initial-scale` says we should start at 1x zoom.

# media queries

- don't affect specificity
- allows you to merge rules together, don't have to choose "one or the other"

## mobile-first vs desktop-first

- try to use `min-width` for mobile first, and `max-width` for desktop first --

desktop:

```css
.signup-button {
  color: deeppink;
  font-size: 1rem;
}
@media (max-width: 400px) {
  .signup-button {
    font-size: 2rem;
  }
}
```

mobile:

```css
.signup-button {
  color: deeppink;
  font-size: 2rem;
}
@media (min-width: 401px) {
  .signup-button {
    font-size: 1rem;
  }
}
```

# other queries

## hover queries

to ensure that a style is applied only on desktop hovers, use this media query wrapper

```css
@media (hover: hover) and (pointer: fine) {
  button:hover {
    text-decoration: underline;
  }
}
```

`hover: hover` means the device can move the cursor without also triggering a click, and `pointer: fine` describes the amount of control the user has over the pointer

## orientation queries

_but normally not worth using_

```css
@media (orientation: portrait) {
  /* Styles for windows that are taller than they are wide */
}
@media (orientation: landscape) {
  /* Styles for windows that are wider than they are tall */
}
```

# breakpoints

&rarr; 0-550px — Mobile

&rarr; 550-1100px — Tablet

&rarr; 1100-1500px — Laptop

&rarr; 1500+px — Desktop

desktop-first:

```css
/* Default: Desktop monitors, 1501px and up */
@media (max-width: 1500px) {
  /* Laptop */
}
@media (max-width: 1100px) {
  /* Tablets */
}
@media (max-width: 550px) {
  /* Phones */
}
```

- each selector overrides the previous one

mobile-first:

```css
/* Default: Phones from 0px to 549px */
@media (min-width: 550px) {
  /* Tablets */
}
@media (min-width: 1100px) {
  /* Laptop */
}
@media (min-width: 1500px) {
  /* Desktop */
}
```

specific sizes:

```css
@media (min-width: 550px) and (max-width: 1099.99px) {
  /* Tablet-only styles */
}
```

**try to use rems instead of px** so the breakpoints will scale with the font size the user chooses, to make the math easier, just divide the `px` values above by `16px` -- no matter what! doesn't matter what the root is, `rem` will do the math for us

# css variables

## custom properties

css variables let you create a brand new property (like `display`,`color`, etc. )

```css
strong {
  display: block;
  color: red;
  --favorite-food: tomato;
  --temperature: 18deg;
}
```

- they must always start with `--`
- css variables are inheritable, meaning children of a parent with a css variable will inherit that rule
  - although the browser doesn't have any use for the css property directly, and so the child won't really be affected, the child can still access it with the `var()` function

## default values

`var()` takes in two arguments, the variable and the default value

```css
.btn {
  padding: var(--inner-spacing, 16px);
}
```

since we have default values, we can have a pattern where: we _only_ set a css variable if we're in "mobile", have rules that use that variable, and assuming we also give a default, the variable will apply in mobile, and will otherwise use the default value

## reactive

css variables are reactive, which means if you change them in js, every element that uses the variable will update with the new value!

this means we can have a variable where a variable is set in the \_-first root, then updated in the media query

## fragments

css variables can be used as fragments, like so:

```css
body {
  --standard-border-width: 4px;
}

strong {
  --border-details: dashed goldenrod;
  border: var(--standard-border-width) var(--border-details);
}
```

and are _composable_, meaning you can use variables inside variables!

# calc

css can do math using the `calc()` function with +, -, \*, and /

```css
.something {
  width: calc(100px + 24px);
  height: calc(50px + 25px * 4);
}
```

you can also combine units!

```css
.something {
  width: calc(50% + 32px);
}
```

especially useful for doing `rem` conversions

```css
h2 {
  font-size: calc(24 / 16 * 1rem);
}
```

can be used to mess with css color variables too

```css
.something {
  --pinkred: hsl(calc(var(--red-hue) - 20deg) var(--intense));
}
```
