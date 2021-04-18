## Stacking Contexts

How does the browser decide what to render on top?

For `position: static` it's what you would intuitively expect: things that come later in the markup are placed on top.

For `position: relative`, things change. When the browser renders, it first paints all the `static` elements, one on top of the other as it goes down the DOM, then makes a second pass to do the non-static items.

For a custom order, we need to use:

### z-index

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

### Stacking contexts

How to create a stacking context

- combining a non-static position with a `z-index`
- setting position to `fixed` or `sticky`
- adding a `z-index` to a child inside a `display: flex` or `display: grid` container
- using `transform`, `filter`, `clip-path`, or `perspective`
- explicitly creating a context with `isolation: isolate`

## Fixed Positioning
