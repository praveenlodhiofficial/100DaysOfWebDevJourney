# Motion Docs

## Transformation Animation

### Animate Properties:

    animate = {{
        x: 20,
        y: 20
    }}

- x, y
- rotate, rotateX, rotateY, rotateZ
- scale, scaleX, scaleY, scaleZ
- skew, skewX, skew Y

### Transition Animation:

There are basically two states which are used in animation those are intial & animate .

    initial = {{ x: 0 }}
    animate = {{ x: 100 }}
    transition = {{
        duration: 5,
        ease: "linear"
    }}

- Duration - How long the animation takes.
- Easing - The speed curve of the animation (easeIn, easeOut, easeInOut, linear).
- Delay - How long to wait before animation starts.