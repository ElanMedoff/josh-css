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

- justify is for columns / vertically
- align is for rows / horizontally
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
