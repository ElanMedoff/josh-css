# inheritance

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

to force inheritance, you can use the keyword declaration `[property]: inherit`

# the cascade

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

# block and inline directions

Just like a real document is structured in vertical blocks of text with each block being made up of horizontal words, css is made up of the block direction and the inline direction

# the box model

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

This is `box-sizing: content-box`

To make the percentage width refer to the `content` + `padding` + `border`, change `box-sizing` to `border-box`. This means that the `content` + `padding` + `border` will all together take up the entire 500 px. padding and border take priority, and the content shrinks.

Note the 500px refers to the content of the parent, if the parent has `padding` or `margin` or a `border`, it's not included in the 500 for the child. If the parent is also `border-box`, and it has `padding`, this `padding` will reduce the actual width of the content.

To make this apply to everything, paste this in:

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
  // will produce a black, 3px-thick border
  border: solid;
}
```

when a border color isn't specified, it will use the font's color by default (it inherits it!). If you want to target this derived text color explicitly, you can use `currentColor`

```scss
.box {
  border: 1px solid currentColor;
}
```

```scss
.circle {
  border-radius: 50%; // turns into a circle
}
```

Border vs outline:

outline doesn't affect layout, it's like box-shadow in that its a cosmetic effect draped around an element without changing the size or nudging it around

Outlines are stacked _outside_ of borders, can create a second border for effect

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

unlike padding and border, margin can be negative to pull an element outside it's parent, or pull a sibling closer. if you use negative margin on the first sibling, it's siblings will also be pulled!

### `auto` margin

`auto` margins tell the browser to set the margin to the maximum available space, which you can use to center an element horizontally if you set `margin-left: auto` and `margin-right: auto`

this has two conditions, though:

1. only works for horizontal centering, not vertical (`margin-top: auto` is equivalent to `0`)
2. need an explicitly-set width. block elements naturally grow to fill the available width, so need to constrain the width to have space for the margin to grow

# Flow Layout

`inline` elements can be shifted with `margin-left` and `margin-right`, but you can't change the `width` or the `height`

two exceptions:

1. buttons are `inline`, but you can change their `width` and `height`

2. replaced elements (`img`, `video`, `canvas`) are `inline`, but they can also affect block layout
   - it's best to think of these as foreign objects in an `inline` container

`block` elements fill the entire available horizontal space! if we don't want this to happen, we can use `width: fit-content`

HOWEVER, even when blocked elements don't take up the entire `width`, another blocked element underneath it won't move up to the same line, it'll still be on the line underneath!

### Inline elements have “magic space”

Images are weird because they're `inline`, so they're treated as typography meaning they have a default `line-height`! This means the parent of an image will be a bit taller than the image itself. To fix this, either set the `display` to `block`, or the `line-height` to 0

### Inline elements can line-wrap

multiple words inside i.e. a `<strong>` will line wrap!

because `inline` elements can have all kinds of weird shapes, things like width or height don't always make sense

### Inline-block

`inline-block` is an element that internally acts like a `block`, but externally acts like its `inline`. this let's you use properties like `width`, `margin-top`, etc.

BUT `inline-block` doesn't wrap :(

## Width Algorithms

When we use percentage-based widths, those percentages are based on the parent element's content space (how that's calculated is based on context box or box sizing) - no matter what the `margin` of the child. this means that if the child has `margin`, it will actually grow _outside_ the confines of its parent when it has `width: 100%`!

`margin: auto` on the other hand grows as much as it's able too, but it's stopped by the `margin` of the child! and `margin: auto` applies to the child directly, which is why it's stopped by the child's `margin`

`width: min-content` tells the content to be as small as it can be, based on the child's content, not on the parent. This is called an _intrinsic_ property. It will break if it needs to (by line, words wont break)!

`width: max-content` is the same, but it won't add any line breaks! it's also intrinsic, so it doesn't care about constraints set by the parent. It won't fill the available space, so if we want to add a background color only around the letters, this is a good way!

`width: fit-content` if the content can fit within the parent container, it behaves like `max-content`, if it needs a line break, it behaves like `width: auto`, meaning it takes up all the space it can and will add lines breaks.

`min-width` and `max-width` let you mix and match units

```scss
// want 50% of parent's content, but only when that's between 200 and 300
.box {
  width: 50%;
  min-width: 200px;
  max-width: 300px;
  border: solid hotpink;
}
```

## Height Algorithms

```html
<style>
  section {
    min-height: 100%;
    border: solid;
  }
</style>

<section>
  <p>I'm not very tall!</p>
</section>
```

Why doesn't this work? The default for height is to be as small as it can. When we set `min-height` to be 100%, we're telling it to be 100% of the parent, which has the _default_ height value, which is as small as it can be while containing the children!!!

When `html` is given `height: 100%`, it takes up the height of the viewport, which serves as our **base**. If every child is given `height: 100%`, it will take up the entire viewport (since every parent is taking up the entire viewport! When we finally get to our section, we can use `min-height` again, so that at the least we take up the entire viewport, but we can grow if we need to.

```html
<style>
  html,
  body {
    height: 100%;
  }
  section {
    min-height: 100%;
    border: solid;
  }
</style>

<section>
  <p>I fill the viewport!</p>
</section>
```

# Margin Collapse

## Only vertical margins collapse

```scss
p {
  margin-top: 24px;
  margin-bottom: 24px;
}
```

```html
<p>Paragraph One</p>
<p>Paragraph Two</p>
```

The paragraphs will be `24px` apart, not `48`

**only** vertical margin collapses, not horizontal!

## Margins only collapse in flow layout

No margin collapse in flex, grid, etc!

## Only adjacent elements collapse

```scss
p {
  margin-top: 32px;
  margin-bottom: 32px;
}
```

```html
<p>Paragraph One</p>
<br />
<p>Paragraph Two</p>
```

The `<p>` margin will not collapse because they're not adjacent -- there's a `<br>` between them.

## Nesting doesn't prevent collapsing

```scss
p {
  margin-top: 48px;
  margin-bottom: 48px;
}
```

```html
<div>
  <p>Paragraph One</p>
</div>
<p>Paragraph Two</p>
```

Even though the `<p>` is dropped in a `<div>`, it still collapses!

This is because margin is meant to increase the distance between, siblings, not increase the distance between a child and a parent (that's what padding is for). Margin will try and increase distance between siblings, even if it means transferring margin to the parent!

**this includes `0px`!!!**

## Margins must touch to collapse!

1. Margins blocked by padding or a border don't collapse

i.e. if the `<div>` in the previous example had some padding at the bottom, the margin of the child wouldn't be transferred to the outside

2. Margins blocked by a gap don't collapse

Say you have a parent with a fixed height, and a child with a smaller height, the margin of the child and the margin of the parent's sibling wont' collapse.

3. Margins blocked by a scroll container don't collapse

## Margins can collapse in the same direction

If the parent has a scroll container by using the `overflow` property, margin on the child won't collapse with the parent's sibling

```scss
.parent {
  margin-top: 72px;
}
.child {
  margin-top: 24px;
}
```

```html
<div class="parent">
  <p class="child">Paragraph One</p>
</div>
```

The child's margin gets absorbed into the parent's

## Positive and negative margins

Add them together!

## Multiple positive and negative margins

1. Find the largest positive margin
2. Find the largest negative margin
3. Add the two together
