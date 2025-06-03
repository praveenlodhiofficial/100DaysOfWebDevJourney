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
- Repeat - Infinity

### Keyframes

Splitting or diving animation into multiple frames. We generally define a array for that. 

Example: Loader Animation

```
animate={{
    scale: [1, 2, 3, 1],
    rotate: [0, 360],
    borderRadius: ['20%', '50%', '10%', '30%'],
    transition: {
        duration: 4,
        ease: 'easeInOut',
    },
}}
```

### Variants:

Variants are a way to define different states or styles. These are pre-defined animation setup that we can switch easily.

Example: Box-Flip Animation

```
'use client'

import { easeInOut, motion } from 'motion/react'
import { useState } from 'react'

const boxVariant = {
    front: { rotateY: 0 },
    back: { rotateY: 180, rotateX: [0, 30, 60, 45, 0] }
}

export default function Home() {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <motion.div
            className='perspective-1000'
            onHoverStart={() => setIsFlipped(!isFlipped)}
            onHoverEnd={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className='cursor-pointer size-30 text-sm rounded-2xl bg-lime-400 overflow-hidden justify-center items-center flex text-black font-semibold uppercase transform-style-preserve-3d'
                variants={boxVariant}
                initial="front"
                animate={isFlipped ? "back" : "front"}
                transition={{
                    duration: 0.65,
                    ease: easeInOut
                }}
            >
                Front Side
            </motion.div>
        </motion.div>
    )
}
```