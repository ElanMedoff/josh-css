## Flow Layout

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
