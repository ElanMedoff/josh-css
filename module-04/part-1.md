# directions and alignment

So block elements normally take up greedy width, and non-greedy height -- they stretch all the width, but they don't stretch all the height.

`flex-direction: column` duplicates this behavior, with the primary axis as the vertical axis.

BUT inline elements take up non-greedy width (what you'd expect) but also non-greedy height (which is weird).

`flex-direction: row` does NOT duplicate this behavior, instead it takes up non-greedy width, but it does take up greedy height! The primary axis is the horizontal axis.

---

`justify-content` has a `space-between` and `space-around`, which `align-items` doesn't have. Why? Because flexbox is supposed to be a 1-d system, and since `justify-content` is for the primary axis, it doesn't really make sense the set the space between the items in the cross axis -- because there isn't really items in the cross axis! Sometimes they overflow, but flexbox isn't really meant to deal with those situations.

`justify-content: stretch` doesn't exist because it can be done in better ways -- tbd.

The same thing with `align-items: baseline`
