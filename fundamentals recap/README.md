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

```css
.error-text {
  color: red;
  font-size: 25px;
}
```

# selectors

targets the immediate child, and no other li descendants

```css
.main-list > li {
  border: 2px dotted;
}
```

# color

HSL is the best way to use colors
H: hue, in degrees, what color
S: saturation, in percentage, how saturated
L: lightness, in percentage, how light/dark

```css
.colorful-thing {
  color: hsl(200deg 100% 50%);
  /* can add a fourth argument for opacity */
  background-color: hsl(340deg 100% 50% / 0.75);
}
```

# typography

**em**: relative to font size of the current element
**rem**: relative to font size of the root html tag

**typography**: rem
**padding, border, margin**: px
**width/height**: fixed, use px, relative, use percentage \*\*\*color\*: hsl

Three most popular font families: serif, sans-serif, monospace

```scss
p {
  // quote web fonts
  // will try the first font, if not around will try the others
  font-family: "Roboto", sans-serif;
}
```
