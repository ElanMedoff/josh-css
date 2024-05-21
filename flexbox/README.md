# directions and alignment

So block elements normally take up greedy width, and non-greedy height -- they stretch all the width, but they don't stretch all the height.

`flex-direction: column` duplicates this behavior, with the primary axis as the vertical axis.

BUT inline elements take up non-greedy width (what you'd expect) but also non-greedy height (which is weird).

`flex-direction: row` does NOT duplicate this behavior, instead it takes up non-greedy width, but it does take up greedy height! The primary axis is the horizontal axis.

---

`justify-content` has a `space-between` and `space-around`, which `align-items` doesn't have. Why?

Flexbox is supposed to be a 1-d system, with `justify-content` controlling the space between multiple items on the primary axis. `space-between` and `space-around` are used to space multiple items, so it make sense that you can use them with `justify-content`. on the other hand, `align-items` is for the cross axis. sometimes the cross axis has multiple items (i.e. if you wrap), but most of the time they don't, they just have a single item on the axis, so it doesn't make sense to use `space-between` and `space-around` with `align-items`.

`justify-content: stretch` doesn't exist because it can be done in better ways -- tbd.

---

for `justify-content: space-between`, each item has left and right "padding", so the between items is twice that padding, and between an item and the edge is only that padding. `justify-content: space-evenly` has the items on the edge have as twice as much padding, so all the spacing is even.

# alignment tricks

## baseline alignment

`align-items: baseline` ensures that the items on the cross axis are aligned along the bottom.

## align self

A child can align itself using `align-self: ` with the right side of the colon being any `align-items` argument

`justify-self` doesn't exist, and it makes sense, since most `justify-content` rules deal with how to space multiple elements relative to eachother (think `space-between`, etc.). what if you had `justify-self: center`, would that mean centered between the left and right elements? not clear

Instead, we can use other properties like `flex-grow`, `flex-shrink`, `flex-basis`, and `order`

# growing and shrinking

There's this concept called hypothetical size, which is the width/height if no other force was acted upon the element. By default, this is the size of the line without breaks. If you give it a fixed width, the hypothetical size will be that fixed width

**however** a fixed width does not maintain that width when the element is forced to shrink! (in `position: static`, it would) _fixed widths/heights (a set hypothetical size) with flexbox are more like suggestions_

- note, a fixed width could set the hypothetical size below the minimum content size, while flex-basis can't

`flex-basis` can be thought of as a fixed width or height that changes between width or height automatically depending on which is the main axis! in other words, `flex-basis` sets the hypothetical width/height ...

`flex-grow` overrides the `flex-basis`, and can be thought of "how quickly should I grow from my hypothetical size when there's more than enough room for my hypothetical size?" -- it only acts when an element is above its hypothetical size

There's also another concept called minimum content size, which is the minimum size that the element will shrink to -- think of it like `width: min-content`. it'll break lines, but not words.

`flex-shrink` can be thought of as "how quickly should I shrink from my hypothetical size when there isn't enough space for my hypothetical size?" -- it only acts when an element is between its minimum size and it's hypothetical size. `flex-shrink` won't shrink an element below its minimum size.

## flex shorthand

`flex: 1` is the same as:

```scss
flex-basis: 0px;
flex-grow: 1;
flex-shrink: 1;
```

which has the effect of making every item that it's applied to the same width! -- once you set the basis to 0, all the space of the parent becomes available space to be filled, and since both have a grow of 1, they grow at the same rate, and each take half of the available space.

## constraints

although the hypothetical size (often set by a fixed width/height) is more of a suggestion, flexbox **will** respect any `min-width`, `max-width`, `min-height`, and `max-height`!

- you can think of it as changing the minimum content size

## shortcut gotchas

`flex-basis` will overwrite `width`, so if we have a situation like this:

```scss
flex: 1;
width: 250px;
```

`flex: 1` is implicitly setting the basis to `0px`, which then overrides the `width: 250px`!

# wrapping

when you wrap with `flex-wrap: wrap;`, flexbox will wrap the row once the hypothetical size is reached, NOT the minimum content!

## content vs item

`justify-content` will justify a group a of items -- content == group of items

when you have a single row, and you want to mess with align items, `align-items` will target each item -- as expected. HOWEVER, when you have multiple rows, `align-items` will actually just align the items relative to each row! If you want to align all the items relative to the whole container, you can use `align-content`

# groups and gaps

if a wrapper has `display: flex`, you can add gaps BETWEEN children with the property `gap`! doesn't add a gap to the ends

# ordering

you can flip the order with `flex-direction: row-reverse`, but that also moves everything to be left-aligned! to make it right-aligned again, just add `justify-content: flex-end`

```scss
flex-direction: row-reverse;
justify-content: flex-end;
```

# flex-box interaction

- if an element is a flex item but is also positioned absolutely or fixed, the positioning will always win!

- margin collapse is exclusive to flow layout, it doesn't apply to flex layout!

- although `z-index` normally only works on an element that's positioned `relative`, `absolute`, `fixed`, or `sticky`, it also works on children of a parent with `display: flex;`!
