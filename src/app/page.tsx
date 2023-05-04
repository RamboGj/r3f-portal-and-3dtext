'use client'

import { PortalScene } from '@/components/PortalScene'
import { Canvas } from '@react-three/fiber'

export default function Home() {
  return (
    <Canvas flat>
      {/* The "flat" makes R3F not to add a tone mapping, so our GLTF uses the 
    provided colors management from the Blender and/or Cinema4D color */}
      <PortalScene />
    </Canvas>
  )
}
