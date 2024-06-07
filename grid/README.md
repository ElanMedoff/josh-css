# mental model

in grid, the element's _content box_ is sliced into rows and columns. the grid needs to be consistent:

- every cell in the same column needs to have the same width, and every cell in the same row needs to have the same height.
- every column needs to have the same number of rows, and every row needs to have the same number of columns

with some quirks:

- an element can span multiple cells, giving the illusion that a cell is larger than others in the same row/column
- an element can fit snugly inside it's cell, or loosely.
- a cell can be totally empty
- a cell can have multiple children
- elements can overlap, i.e. they span multiple cells, including a cell that another element spans

# grid flow and layout modes

enable grid with

```scss
.wrapper {
  display: grid;
}
```

by default, css will create an implicit grid with one column, where each child will be given a row that spans the whole column. if there's a height on `wrapper`, each row will grow so that all the children add up to that height.

## grid auto flow

if you want to distribute the items horizontally, instead of vertically, i.e. a single row with multiple columsn instead of a single column with multiple rows, you can use

```scss
.wrapper {
  grid-auto-flow: column;
}
```

note that this is pretty different from `flex-direction` - `flex-direction` flips the primary axis and cross axis, while `grid-auto-flow` just flips how the items are distributed (grid has no notion of a primary axis and cross axis)

## layout modes

like with flexbox, when you set an element to `display: grid`, the item itself stays in the flow layout mode, while its children are rendered in grid

# grid construction

to explicitly the columns in a grid, you can use the `grid-template-columns` property.

```scss
.wrapper {
  display: grid;
  grid-template-columns: 25% 75%;
}
```

this will determine how many columns, based on how many items after `:`, and the width of each column.

**unlike in flexbox, these are hard-limits!** they'll shrink below the minimum content size. so what if we want a column to grow if the content wont fit otherwise? the `fr` unit:

```scss
.wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
```

`fr` is like `%` in that it's a fractional unit, but it will grow if the child can't fit within the area that it would normally take up

## implicit rows

by default, css will create as many rows as necessary, given the number of children and the number of columns.

## explicit rows

by default, the row will be the height of the largest cell in that row. to give rows an explicit height, you can use:

```scss
.wrapper {
  display: grid;
  grid-template-rows: 64px 1fr 100px;
  // wrapper is flow layout, so by default the height will be the min it can be
  min-height: 100vh;
}
```

however, if a fourth child is added to the markup, it will still be added to the grid - just squeezed a bit.

## the `repeat` function

```scss
.calendar {
  display: grid;
  grid-template-columns: 250px repeat(5, 1fr);
}
```

## alignment

### aligning columns

to align columns, use `justify-content`. the defualt value for `justify-content` is `stretch`, where the columns stretch to take up the entire available space.

possible values are:

- `stretch`
- `center`
- `start` (not in flexbox, so no need for `flex-`)
- `end` ^
- `space-between`
- `space-around`
- `space-evenly`

`justify-items` changes how a child element moves horizontally around within its cell, without affecting the overall shape of the grid

possible values are:

- `stretch`
- `center`
- `start` (not in flexbox, so no need for `flex-`)
- `end` ^

### aligning rows

to align the rows in a grid, use `align-content`

to align an item vertically within its cell, use `align-items`

### tl;dr

- justify is for columns / horizontally
- align is for rows / vertically
- content is for between cells
- items is for within cells

### self alignment

`align-self` and `justify-self` can be used to apply a one-off alignment of a specific child

## grid areas

grid areas let you define the names of different areas of your grid with `grid-template-areas`, and assign different elements to that area with `grid-area`:

```scss
<style>
.wrapper {
  display: grid;
  // no commas!
  grid-template-areas:
    'sidebar header'
    'sidebar main-content';
  grid-template-columns: 250px 1fr;
  grid-template-rows: 80px 1fr;
}

aside {
  // no quotes!
  grid-area: sidebar;
}
header {
  grid-area: header;
}
main {
  grid-area: main-content;
}
</style>

<div class="wrapper">
  <aside>Aside</aside>
  <header>Header</header>
  <main>Main</main>
</div>
```

## tracks and lines

`grid-template-areas` and `grid-area` is sugar for assigning an element manually to a cell/cells with `grid-column` and `grid-row`:

```scss
.wrapper {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
}

.child {
  // spans from column three to four
  grid-column: 3 / 4;
  // spans from row two to three
  grid-row: 2 / 3;
}
```

indicies start at 1! can either go right to left, 1 -> 2, or go left to right, -1 -> -2. same with columns. this can be useful for spanning an entire column, i.e. `grid-row: 1 / -1`

if an element spans only one row or column, can omit the `/ [ending-row]` and `/ [ending-column]` for brevity

# fluid grids

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
```

^ will create as many columns (of the same width) as possible, while keeping each above the min size of `150px`

## clamping with `minmax`

basically what you expect, but with one gotcha: if you're using a `fr` value, it has to be the max, not the min.

## `auto-fill` vs `auto-fit`

when given empty space, should we create empty columns (`auto-fill`) or stretch the existing columns to be really wide, filing the space (`auto-fit`)

## dealing with a large `min` value

what if you have a large min value, say `400px`, so the column will overflow on small screens? One option would be to use a media query to use `fr` on small screens, and `400px` on large screens, but that's a little clunky. another option is a fluid approach:

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
}
```

on small screens, `100%` will "resolve" to a specific px size of the parent, and be smaller than `400px` - just a single flexible column, no overflow. on larger screens, `400px` is smaller than the size of the parent, so it becomes the min, and you have may have multiple columns (if there's enough room for more than one `400px` wide column)

# sticky grids

you can use `position: sticky` on a grid element (a child of something with `display: grid`), but it'll have some strange behaviors. a good approach is to have the sticky element not be a direct child of the grid wrapper - instead, create a wrapper around the sticky element. once the sticky element isn't affected by grid, it'll behave more normally.

# managing overflow

it's important to note that `fr` doesn't just distribute extra space, like `flex-grow`, it'll also accomodate the size of it's child based on it's content - even if it's huge. how can you manage huge children that overflow?

1. if you put `overflow: auto` on the grid child directly, it'll work as expected

2. use `minmax(0, 1fr)` to indicate that the grid child can shrink below the child's width

# grid quirks

- margin on grid children won't collapse, in either direction
- `z-index` normally only works in positioned layout, but a grid child can use the property even if it doesn't change `position`!
