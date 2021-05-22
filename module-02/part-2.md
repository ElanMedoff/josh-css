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

## Stacking contexts

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
