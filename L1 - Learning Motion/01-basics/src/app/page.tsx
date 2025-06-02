import * as motion from 'motion/react-client'

export default function Home() {
  return (
    <div>
      <motion.div
        className='size-40 bg-red-500'
        initial={{ x: -200 }}
        animate={{ x: 200 }}
        transition={{
          duration: 1,
          ease: "easeIn"
        }}
      />
    </div>
  );
}