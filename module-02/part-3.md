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
