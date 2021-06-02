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
