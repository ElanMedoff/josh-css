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

# print-style layouts
