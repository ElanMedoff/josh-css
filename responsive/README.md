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

- a media query is a way to conditionally add a css rule _in place_, so this means that later rules will still override previous rules, so order matters! in this example, if we had phone>tablet>laptop instead of laptop>tablet>phone, (on any screen) the phone style would always get overridden by the laptop style since we're using `max-width`

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

# viewport units

`1vw` is equivalent to 1% of the viewport width, don't overthink it

_any property that accept a length unit can accept a `vh` unit_!

## the mobile height issue

on mobile, `vh` refers to the maximum possible height of the page (i.e. the ui once the url and buttons hide after scrolling), which means when the url and buttons are there on-page-load, `100vh` is actually larger than the visible screen ...

instead, use the 100% height trick from module 01

## the desktop scrollbar issue

`vw` refers to the viewport width _not counting the scrollbar_. this means that the scrollbar will sit on top of our `100vw` element, and will cause a small horizontal scroll :/

### tracking scrollbar width

we can find the scrollbar width in `px` like this:

```js
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
```

we can then set a css variable with this value

```js
document.documentElement.style.setProperty(
  "--scrollbar-width",
  scrollbarWidth + "px"
);
```

and use calc to work out the `vw` units

```scss
.wrapper {
  width: calc(100vw - var(--scrollbar-width));
}
```

# clamp

`clamp` takes 3 values:

1. the minimum value
1. the ideal value
1. the maximum value

these two are equivalent:

```css
/* Method 1 */
.column {
  min-width: 500px;
  width: 65%;
  max-width: 800px;
}
/* Method 2 */
.column {
  width: clamp(500px, 65%, 800px);
}
```

**but** this frees up our `max-width`, which doesn't override the third clamp value, rather acts alongside it:

```css
.column {
  width: clamp(500px, 65%, 800px);
  max-width: 100%;
}
```

this means our `.column` will never be larger than 800px or 100% of the available space! whichever is _smaller_ will be the max

- on larger screens, the max width will be 800px, since 800px is smaller than 100%
- on smaller screens, the max-width will be 100%, since 100% is smaller than 800px

## min and max

if you want to only clamp from one side, you can use the `min()` and `max()` values instead

# responsive typography

big question: should text grow or shrink on smaller devices?

## body text

body text -- the text in paragraphs and lists -- should stay _stay the same size_!

- try to aim for at least `16px`, but since we like to use `rem` for typography, try to aim for at least `1rem`

## smaller text

smaller bits of text that label or annotate things is normally fine small, but if it looks bad, you can make it larger with a media query:

```css
@media (max-width: 550px) {
  figcaption {
    font-size: 1rem;
  }
}
```

### form fields

form input fields like `<input>` and `<select>` have a pretty small font-size, so if you make it smaller than `1rem`, safari will automatically zoom in. To avoid this, just set the default size to `1rem`

```css
input,
select,
textarea {
  font-size: 1rem;
}
```

## headings

headings are the most complicated, since they don't fit on small screens! you can use a media query, but there's a better way:

# fluid typography

big idea: instead of choosing discrete points where the typography changes, the typography should fluidly change with the viewport

this can be done most simply with the `vw` unit, _but_ this has issues with really small screens. the solution is to use `clamp()`

```scss
h1 {
  // ideally 6vw, but at least 1.5 rem, and cap at 3 rem
  font-size: clamp(1.5rem, 6vw, 3rem);
}
```

**IMPORTANT**: safari is weird, so use this too:

```scss
h1 {
  font-size: clamp(1.5rem, 6vw, 3rem);
  min-height: 0vh;
}
```

_but_ this introduces a problem where we can't zoom in! the solution is to mix in a relative unit:

```scss
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}
```

so now the `+ 1rem` is controlled by the zoom!

# fluid vs responsive

which is better? media queries are easier for reading the code/markup and intuiting the design, and if you need to change multiple things as the viewport changes size, it's better. on the other hand, fluid layouts are specific to the _container_ not the _viewport_ like media queries!
