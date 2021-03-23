```html
<p>I know <em>you</em> are, but what am I?</p>
```

```scss
p {
  color: hotpink;
  border: 1px solid hotpink;
}
```

the `em` will be styled pink too, even though its not styled directly BUT it won't be styled with a border

most typography-related properties are inherited! `color`, `font-size`, `text-shadow`

to force inheritance, you can use the keyword declaration [selector]: inherit

## The cascade

good way to think of which rules override which

```javascript
const appliedStyles = {
  ...inheritedStyles,
  ...tagStyles,
  ...classStyles,
  ...idStyles,
  ...inlineStyles,
  ...importantStyles,
};
```

## Cardinality

Just like a real document is structured in vertical blocks of text with each block being made up of horizontal words, css is made up of the block direction and the inline direction

## The box model

```html
<section>
  <div class="box"></div>
</section>
```

```scss
section {
  width: 500px;
}
.box {
  width: 100%;
  padding: 20px;
  border: 4px solid;
}
```

How much space will this take up by default? By default, percentage width refers specifically to the element's inner content! This means that the width will be 500 + any `padding` + any `border`

This is:
`box-sizing: content-box`

To make the percentage width refer to the `content` + `padding` + `border`, change `box-sizing` to `border-box`. This means that the `content` + `padding` + `border` will all together take up the entire 500 px (note the 500px refers to the content of the parent, if the parent has `padding` or `margin` or a `border`, it's not included in the 500 for the child. If the parent is also `border-box`, and it has``padding`, this `padding` will reduce the actual width of the content.) To make this apply to everything, paste this in:

```scss
*,
*:before,
*:after {
  box-sizing: border-box;
}
```

Because the parent is `border-box`, the total width of the `content` + `padding` is 500, which means the `content` of the parent is only 450. This means the child's 100% is 100% of this 450.

```scss
* {
  box-sizing: border-box;
}
section {
  width: 500px;
  height: 250px;
  padding: 25px;
}
.box {
  width: 100%;
  height: 100%;
  border: 2px solid;
}
```

## Padding

the padding at the bottom will be 200px because percentage padding always refers to the element's width! So don't use %

```scss
.something {
  width: 400px;
  height: 150px;
  padding-bottom: 50%;
}
```

## Border

only field that's required is border-style! Without it no border will appear

```scss
.good {
/_ 🙆‍♀️ Will produce a black, 3px-thick border _/
border: solid;
}
```

when a border color isn't specified, it will use the font's color by default (it inherits it!)

```scss
.box {
  width: 100px;
  height: 50px;
  border: 4px solid;
}
```

```scss
.box.one {
  // Setting TEXT color,
  // not border color
  color: hotpink;
}
```

If you want to target this derived text color explicitly, you can use currentColor

```scss
.box {
  color: hotpink;
  border: 1px solid currentColor;
  box-shadow: 2px 2px 2px currentColor;
}
```

```scss
.circle {
  border-radius: 50%;
}
```

Border vs outline:

outline doesn't affect layout, it's like box-shadow in that its a cosmetic effect draped around an element without changing the size or nudging it around

Outlines are stacked outside of borders, can create a second border for effect

Note: no such thing as outline radius
BUT: there is an outline-offset property which is like padding

```scss
.outline-offset {
  border: 4px solid darkviolet;
  outline: 4px solid currentColor;
  outline-offset: 4px;
}
```

## Margin

Unlike padding and border, margin can be negative to pull an element outside it's parent, or pull a sibling closer

```scss
main {
  width: 200px;
  height: 200px;
  border: 3px solid;
}

.floating-box {
  width: 50%;
  height: 50%;
  border: 3px solid palevioletred;
  margin-bottom: -32px;
}

.neighbor {
  width: 50%;
  height: 50%;
  background: silver;
  margin-left: 16px;
}
```
