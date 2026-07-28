import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis: Lenis | null = null

export function getSmoothScroll() {
  return lenis
}

interface Props {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    function raf(time: number) {
      lenis!.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis!.destroy()
      lenis = null
    }
  }, [])

  return <>{children}</>
}
