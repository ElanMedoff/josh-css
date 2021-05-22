Aside from `block` and `inline`, there's also positioned layout -- layouts that can overlap.

## Relative positioning

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

## Absolute positioning

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

### Absolute sizes

block elements positioned absolutely without specified sizing doesn't shrink to fill the available space, instead it behaves like `width: min-content`. But if it can't break a line, i.e. if the word is too long, it'll either expand the container, or spill out of it and introduce a horizontal scroll if there's a constrained width or with left and right.

### Single Axis

If specify a value for a single axis i.e. `left: 32px` but omit any `top` or `bottom` value, the element keeps its in-flow position for the vertical axis, but not for the horizontal. Weird!

You can use `margin` to tweak the vertical position within its block, which is nice because you don't have to worry about the added side affects of the margin pulling its siblings along for the ride.

### Absolute centering

Need 4 things to center an element with absolute positioning:

1. `position: absolute`
2. `top`, `left`, `right`, `bottom` all have to be set to `0`
3. An explicit `width` and `height`
4. `margin: auto`

## Containing Blocks

**only non-static elements can constrain absolutely-positioned children**

When deciding where to place an absolutely-positioned element, it crawls up the dom tree looking for a non-static parent (i.e. a parent with a non-default positioning) and if it finds one, it'll anchor the element to that container. If not, it'll anchor the element to the viewport.
