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

# The cascade

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

# Cardinality

Just like a real document is structured in vertical blocks of text with each block being made up of horizontal words, css is made up of the block direction and the inline direction

# The box model

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

# Flow Layout

`inline` elements can be shifted with `margin-left` and `margin-right`, but you can't change the `width` or the `height`

two exceptions:

1. buttons are `inline`, but you can change their `width` and `height`

2. replaced elements (`img`, `video`, `canvas`) are `inline`, but they can also affect block layout

`block` elements fill the entire available horizontal space! if we don't want this to happen, we can use width: fit-content

HOWEVER, even when blocked elements don't take up the entire `width`, another blocked element underneath it won't move up to the same line, it'll still be on the line underneath!

Images are weird because they're `inline`, so they're treated as typography meaning they have a default `line-height`! This means the parent of an image will be a bit taller than the image itself. To fix this, either set the `display` to `block`, or the `line-height` to 0

unlike block elements, which can only be blocks, `inline` elements can have all kinds of weird shapes -- which is why things like width or height don't always make sense

`inline-block` is an element that internally acts like a `block`, but externally acts like its `inline`

BUT `inline-block` doesn't wrap :(

## Width Algorithms

When we use percentage-based widths, those percentages are based on the parent element's content space (how that's calculated is based on context box or box sizing) no matter what the `margin` of the child

`margin: auto` on the other hand grows as much as it's able too, but it's stopped by the `margin` of the child! and `margin: auto` applies to the child directly, which is why it's stopped by the child's `margin`

`width: min-content` tells the content to be as small as it can be, based on the child's content, not on the parent. This is called an _intrinsic_ property. It will break if it needs to (by line, words wont break)!

`width: max-content` is the same, but it won't add any line breaks! it's also intrinsic, so it doesn't care about constraints set by the parent. It won't fill the available space, so if we want to add a background color only around the letters, this is a good way!

`width: fit-content` if the content can fit within the parent container, it behaves like `max-content`, if it needs a line break, it behaves like `width: auto`, meaning it takes up all the space it can

`min-width` and `max-width`

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

## Margins blocked by padding or a border don't collapse

i.e. if the `<div>` in the previous example had some padding at the bottom, the margin of the child wouldn't be transferred to the outside

## Margins blocked by a gap

Say you have a parent with a fixed height, and a child with a smaller height, the margin of the child and the margin of the parent's sibling wont' collapse.

## Margins can collapse in the same direction

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
