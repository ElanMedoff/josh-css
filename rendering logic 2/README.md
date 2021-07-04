Aside from `block` and `inline`, there's also positioned layout -- layouts that can overlap.

# Relative positioning

```scss
.some-box {
  position: relative;
}
```

With `relative` set, we get access to properties like `top`, `left`, `right`, and `bottom`.
This moves the positioned item from where it would be if it was static.

The reason why this is interesting is that unlike margin -- which affects layout -- this won't affect layout!

`relative` positioning can also be used to style both `block` and `inline` elements.

```html
<p>
  This paragraph has some bolded text, and it
  <strong>appears to float</strong> a bit!
</p>
```

```scss
strong {
  position: relative;
  top: -4px;
}
```

# Absolute positioning

Allows you to position things absolutely. When we set something to `position: absolute`, we pull it out of the flow! They're like holograms, they don't _really_ exist.

```html
<style>
  .parent {
    border: 4px solid;
  }

  .child {
    position: absolute;
    width: 200px;
    height: 200px;
    background: pink;
    opacity: 0.5;
  }
</style>

<div class="parent">
  <div class="child"></div>
</div>
```

So the parent's height is based on the height of the child, but since the child is positioned absolutely and pulled out of the flow, from the perspective of the parent, it has no height! So the parent's only height is based on the border.

## Absolute sizes

block elements positioned absolutely without specified sizing doesn't shrink to fill the available space, instead it behaves like `width: min-content`. But if it can't break a line, i.e. if the word is too long, it'll either expand the container, or spill out of it and introduce a horizontal scroll if there's a constrained width or with left and right.

## Single Axis

If specify a value for a single axis i.e. `left: 32px` but omit any `top` or `bottom` value, the element keeps its in-flow position for the vertical axis, but not for the horizontal. Weird!

You can use `margin` to tweak the vertical position within its block, which is nice because you don't have to worry about the added side affects of the margin pulling its siblings along for the ride.

## Absolute centering

Need 4 things to center an element with absolute positioning:

1. `position: absolute`
2. `top`, `left`, `right`, `bottom` all have to be set to `0`
3. An explicit `width` and `height`
4. `margin: auto`

# Containing Blocks

**only non-static elements can constrain absolutely-positioned children**

When deciding where to place an absolutely-positioned element, it crawls up the dom tree looking for a non-static parent (i.e. a parent with a non-default positioning) and if it finds one, it'll anchor the element to that container. If not, it'll anchor the element to the viewport.

# Stacking Contexts

How does the browser decide what to render on top?

For `position: static` it's what you would intuitively expect: things that come later in the markup are placed on top.

For `position: relative`, things change. When the browser renders, it first paints all the `static` elements, one on top of the other as it goes down the DOM, then makes a second pass to do the non-static items.

For a custom order, we need to use:

## z-index

If we want to specify that one sibling be painted above another, we can follow these two steps:

1. Give the element a `position` other than `static`
1. Give the element a `z-index` value larger than its sibling's

```html
<div class="first box"></div>
<div class="second box"></div>
```

```scss
.box {
  position: relative;
}

.first.box {
  z-index: 2;
}

.second.box {
  z-index: 1;
}
```

BUT this only applies to two statically positioned elements, or two non-statically positioned elements. If you have a statically positioned element and a non-statically positioned element in a single stacking context, no matter how much you crank up the z-index of the statically positioned element, it won't go above the non-statically positioned element!

## Stacking contexts

When a parent is turned into a stacking context by one of the methods below,
it's children become "isolated" in the sense that they only compete with
each other (and not other elements) with their z-index.

How to create a stacking context

- combining a non-static position with a `z-index`
- setting position to `fixed` or `sticky`
- adding a `z-index` to a child inside a `display: flex` or `display: grid` container
- using `transform`, `filter`, `clip-path`, or `perspective`
- explicitly creating a context with `isolation: isolate`

# Fixed Positioning

The main difference between fixed and absolute is that fixed can only be contained by the viewport. In other words, they're immune to scrolling.

Without a specified `top`, `left`, `bottom`, or `right`, a fixed element will begin where would normally be if it was static. When you start scrolling, it just stays in that same spot relative to the viewport.

Can center an item with fixed positioning using the same trick as before with absolute -- it's basically a fancy absolute

## transform exception

If an ancestor of a fixed element uses the `transform` property, it becomes the containing block for the element, making it effectively absolutely positioned.

In other words **transformed parents can't have fixed children**

Can use this js to find the ancestor that's messing up the fixed positioning:

```javascript
// Replace this with a relevant selector.
// If you use a tool that auto-generates classes,
// you can temporarily add an ID and select it
// with '#id'.
const selector = ".the-fixed-child";
function findCulprits(elem) {
  if (!elem) {
    throw new Error("Could not find element with that selector");
  }
  let parent = elem.parentElement;
  while (parent) {
    const { transform, willChange } = getComputedStyle(parent);
    if (transform !== "none" || willChange === "transform") {
      console.warn("🚨 Found a culprit! 🚨\n", parent, {
        transform,
        willChange,
      });
    }
    parent = parent.parentElement;
  }
}
findCulprits(document.querySelector(selector));
```

If you can't change the ancestor to not have `transform`, try moving the model into a portal.

# Overflow

When the content doesn't fit into its parent's content box.

In a situation with a fixed height but overflowing content, the content will spill outside the box and _will have no effect on layout_, which makes it very confusing.

```html
<div class="info">
  <strong>Name:</strong> Pablo Diego José Francisco de Paula Juan Nepomuceno
  María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso
</div>
<div class="info"><strong>Born:</strong> 25 October 1881</div>
```

```scss
.info {
  width: 150px;
  max-height: 100px;
  border: 3px solid;
}
```

The content from the first div will cover up the content from the second div :/

This gives us the property `overflow`, let's look at some examples:

## scroll

`overflow: scroll` lets you scroll through the context box if necessary.

`overflow` is actually a combo for `overflow-x` and `overflow-y`, you can use either if you need to be more specific.

## auto

`overflow: auto` is the best option for when you know an element _might_ overflow. However, when the container needs to scroll, the content box will shrink by about 15 pixels for the width of the scrollbar. If this change is jarring, and you _know_ that a container will need to scroll anyway, you can just use `overflow-y: scroll`

## hidden

`overflow: hidden` is great for a text ellipses, and for decorative elements, like spheres at the edge of the content box that you want to be truncated at the border.

This will help prevent an undesired horizontal scrollbar as well.

## horizontal overflow

Images are inline by default, so they'll line-wrap when they can't all fit.

To tell a wrapper never to break the line, set `white-space: nowrap` and `overflow: auto` to
horizontally scroll.

## overflow and containing blocks

In order for the overflow property of a parent to apply to the child, the child must be contained by the parent! This means that if you have a child positioned absolutely, and a parent that is statically positioned (so the child isn't contained by the parent), any overflow properties of the parent don't apply to the child!

# sticky positioning

In addition to setting `position: sticky`, you also need to pick at least one edge to stick to (top, right, bottom, or left).

## stays in their box

Sticky positioned elements only act as fixed within their own box, which means that once you scroll enough so that the box isn't visible, the element goes back to normal positioning and scrolls away too!

Can create some pretty cool effects.

## offset

The top, right, bottom or left values (with position sticky specifically) determine the minimum gap between the element and the edge of the viewport before the element starts acting fixed.

## not incorporeal

Sticky elements do take up space while they act non-fixed, unlike absolutely or fixed elements.

# troubleshooting

## a parent is hiding overflow

if an ancestor has `overflow` set to `hidden`, `scroll`, or `auto`, `position: sticky` won't work. Use this snippet to find the bad ancestors:

```js
// Replace this with a relevant selector.
// If you use a tool that auto-generates classes,
// you can temporarily add an ID and select it
// with '#id'.
const selector = ".the-fixed-child";
function findCulprits(elem) {
  if (!elem) {
    throw new Error("Could not find element with that selector");
  }
  let parent = elem.parentElement;
  while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;
    if (hasOverflow !== "visible") {
      console.log(hasOverflow, parent);
    }
    parent = parent.parentElement;
  }
}
findCulprits(document.querySelector(selector));
```

## the container isn't big enough

If the container isn't big enough, the child will hit the top of the container immediately, and it won't stick!

# hidden content

## display: none

elements are removed from the dom, invisible and incorporeal. Can't be clicked or focused.

Super useful when combined with media queries to toggle between mobile and desktop.

## visibility: hidden

the element can't be seen, but it's still there and takes up space.

the parent can be hidden while the child visible, which is _weird_, but maybe useful.

## opacity

even at 0 opacity, elements still take up space, buttons can still be clicked, text can still be selected, and form elements can still be focused -- be careful about accessibility issues with tabbing through!
