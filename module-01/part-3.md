## Margin Collapse

### Only vertical margins collapse

```scss
p {
  margin-top: 24px;
  margin-bottom: 24px;
}
```

```html
<p>Paragraph One</p>
<p>Paragraph Two</p>
```

The paragraphs will be `24px` apart, not `48`

**only** vertical margin collapses, not horizontal!

### Only adjacent elements collapse

```scss
p {
  margin-top: 32px;
  margin-bottom: 32px;
}
```

```html
<p>Paragraph One</p>
<br />
<p>Paragraph Two</p>
```

The `<p>` margin will not collapse because they're not adjacent -- there's a `<br>` between them.

### Nesting doesn't prevent collapsing

```scss
p {
  margin-top: 48px;
  margin-bottom: 48px;
}
```

```html
<div>
  <p>Paragraph One</p>
</div>
<p>Paragraph Two</p>
```

Even though the `<p>` is dropped in a `<div>`, it still collapses!

This is because margin is meant to increase the distance between, siblings, not increase the distance between a child and a parent (that's what padding is for). Margin will try and increase distance between siblings, even if it means transferring margin to the parent!

**this includes `0px`!!!**

### Margins blocked by padding or a border don't collapse

i.e. if the `<div>` in the previous example had some padding at the bottom, the margin of the child wouldn't be transferred to the outside

### Margins blocked by a gap

Say you have a parent with a fixed height, and a child with a smaller height, the margin of the child and the margin of the parent's sibling wont' collapse.

### Margins can collapse in the same direction

```scss
.parent {
  margin-top: 72px;
}
.child {
  margin-top: 24px;
}
```

```html
<div class="parent">
  <p class="child">Paragraph One</p>
</div>
```

The child's margin gets absorbed into the parent's

### Positive and negative margins

Add them together!

### Multiple positive and negative margins

1. Find the largest positive margin
2. Find the largest negative margin
3. Add the two together
