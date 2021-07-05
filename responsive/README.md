# working with mobile devices

## the magical meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

`device-width` sets the viewport width to math the device's width, and `initial-scale` says we should start at 1x zoom.

# media queries

- don't affect specificity
- allows you to merge rules together, don't have to choose "one or the other"

## mobile-first vs desktop-first

- try to use `min-width` for mobile first, and `max-width` for desktop first --

desktop:

```scss
.signup-button {
  color: deeppink;
  font-size: 1rem;
}
@media (max-width: 400px) {
  .signup-button {
    font-size: 2rem;
  }
}
```

mobile:

```scss
.signup-button {
  color: deeppink;
  font-size: 2rem;
}
@media (min-width: 401px) {
  .signup-button {
    font-size: 1rem;
  }
}
```
