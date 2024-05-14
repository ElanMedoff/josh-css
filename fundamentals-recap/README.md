# anatomy of a style rule

**Selector**: `.error-text`

**Property**: `color`, `font-size`

**First declaration:** `color: red;`

**Second declaration:** `font-size: 25px;`

**Rule**:

```css
.error-text {
  color: red;
  font-size: 25px;
}
```

# media queries

```scss
@media (condition) {
  // some css that'll apply if the condition is met
}
```

like `(max-width: 300px)`, but even though this looks like a declaration, it isn't: it's a `media feature`. not every declaration can be a media feature!

# selectors

## psuedo-classes

important ones include:

- `focus`: clicking a button, link, or input
- `checked`: radios, checkboxes that are checked
- `first-child`: (see below)
- `last-child`: the last child within it's parent
  - this makes sense if you think about it: if you don't have a parent, you're the very top element - in which case you don't have siblings, and it doesn't make sense to be the last
  - if the element you're trying to select isn't the last child in the parent (i.e. it has a sibling after it), it won't be selected

```html
<style>
  p:first-child {
    color: red;
  }
</style>

<section>
  <h1>Hello world!</h1>
  <!-- this won't be selected since `h1` is the first child -->
  <p>This is a paragraph!</p>
</section>
```

- `first-of-type`: would solve the issue ^
- `last-of-type`: ""

---

## pseudo-elements

target sub-elements within an element:

```scss
input::placeholder {
  color: goldenrod;
}
```

that's why it's "pseudo" - these selectors target elements not explicitly created with HTML tags

important ones to remember:

- `::before`
- `::after`

## combinators

definitions:

- `child`: doesn't have to be the _first_ child, but can only be nested one level deeper than the parent
- `descendants`: includes children, but also elements that are nested more than one level deep

this targets descendants:

```css
.main-list li {
}
```

this targets the child, and no other li descendants:

```css
.main-list > li {
}
```

# color

HSL is the best way to use colors
H: hue, in degrees, what color
S: saturation, in percentage, how saturated
L: lightness, in percentage, how light/dark

```scss
.colorful-thing {
  color: hsl(200deg 100% 50%);
  // can add a fourth argument for opacity
  // `/` is for separation, not division!
  background-color: hsl(340deg 100% 50% / 0.75);
}
```

# typography

**em**: relative to font size of the current element

**rem**: relative to font size of the root html tag

what to use?

- typography: `rem`
- media queries: `rem`
- padding, border, margin: `px`
- width/height: fixed, use `px`, relative, use percentage
- color: `hsl`

Three most popular font families: serif, sans-serif, monospace. all three are font families that are built into operating systems. for web fonts - fonts loaded through script tags - you can use double quotes

```scss
p {
  // will try the first font, if not around will try the others
  font-family: "Roboto", sans-serif;
}
```

## bold, italic, underline

```scss
p {
  font-weight: bold; // or a number
  font-style: italic;
  text-decoration: none;
}
```

but underline really just means links, so avoid using it for style.

## spacing

can tweak the horizontal spacing between letters with `letter-spacing`, vertical gap between lines with `line-height`.

```scss
p {
  line-height: 1.5; // unique in that it's unit-less! it's multiplied by the elements font size
  letter-spacing: 10px;
}
```
