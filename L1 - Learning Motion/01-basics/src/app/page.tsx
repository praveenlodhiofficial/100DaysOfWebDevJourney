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