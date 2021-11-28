# text rendering

## kerning

Kerning is the spacing between individual characters - and different browsers implement different kerning algorithms

You can disable kerning altogether with

```scss
.selector {
  font-kerning: none;
}
```

`letter-spacing` is multiplies whatever kerning the browser already implements.

## text rasterization

rasterization is the process where vectors are turned into pixels, which produces very sharp, boxy letters. to fix this, the os will apply an anti-aliasing algorithm to smooth things out. this means that the same browser will have slightly different typography across different operating systems!

**tldr** there's not good way to mess with the anti-aliasing algorithms.

### text overflow

How does the browser decide where to line-break? Certain characters called "soft wrap opportunities" determine where words start and end, and whenever a word breaks past 80 characters (or whatever the limit), it finds the nearest soft wrap opportunity.

- every white space character and `-` is a soft wrap opportunity

### wrapping

What do you do when there's no soft wrap opportunity and the word is still too long? aside from the options we used for containers (`overflow: auto`, `overflow: hidden`), typography also has other options.

```scss
.selector {
  overflow-wrap: break-word;
}
```

will break the word itself by character! to add a hyphen, add the

```scss
.selector {
  overflow-wrap: break-word;
  hyphens: auto;
}
```

> you need both!

the hyphens won't be selectable, so you can copy and paste urls like normal.

### ellipsis

For when you want to replace line-breaking with an ellipsis instead. So instead of a long word being broken up by letter (with or without hyphens), it will just have an ellipsis.

```scss
.selector {
  overflow: hidden;
  text-overflow: ellipsis;
}
```

little weird that we need both, but :shrug:

### single-line ellipsis

what if we want to avoid line wrapping altogether and only use ellipsis? You can do what we did above, but add `white-space: nowrap;` to prevent linewrapping.

### multi-line ellipsis

what if we want to show a few lines, then add the ellipsis after?

```scss
.selector {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  // hides clamped off lines
  overflow: hidden;
}
```

if the element above is also used a flexbox child, this can cause some bugs! You can solve this with just a wrapper div.

# print-style layouts

what if we want to have a layout that looks like print media?

## column layout

```scss
.wrapper {
  columns: 2;
  column-gap: 16px;
}

.particular_paragraph {
  // if you want to avoid it breaking across columns
  break-inside: avoid;
}
```

## floats

although floats have mostly been replaced with flexbox and grid, there's a few things floats can do that nothing else can

> "A floated element is like a boulder in a stream; the other content flows smoothly around it. In this case, text wraps seamlessly around an image, but we can use this trick for any embedded element, not just images!"

## indentation

one option is to target the first letter

```scss
p::first-letter {
  margin-left: 2rem;
}
```

or you can use the fancy property

```scss
p {
  text-indent: 2rem;
}
```

## justified alignment

with `text-align: justify;` the text will have spacing so that any amount of text will fill the whole line from edge to edge.

```scss
p {
  text-align: justify;
}
```

# masonry grid
