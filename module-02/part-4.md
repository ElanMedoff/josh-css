# hidden content

## display: none

elements are removed from the dom, invisible and incorporeal. Can't be clicked or focused.

Super useful when combined with media queries to toggle between mobile and desktop.

## visibility: hidden

the element can't be seen, but it's still there and takes up space.

the parent can be hidden while the child visible, which is _weird_, but maybe useful.

## opacity

even at 0 opacity, elements still take up space, buttons can still be clicked, text can still be selected, and form elements can still be focused -- be careful about accessibility issues with tabbing through!
