/* eslint-disable react/no-unknown-property */
import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
  Float,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export function TextScene() {
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

  const tempArray = [...Array(100)]

  const donutsGroup = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    // const angle = state.clock.elapsedTime
    // state.camera.position.z += Math.sin(angle) * 0.01

    for (const donut of donutsGroup.current.children) {
      donut.rotation.y += delta * 0.1
    }
  })

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding
    matcapTexture.needsUpdate = true

    material.matcap = matcapTexture
    material.needsUpdate = true
  }, [])

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          material={material}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          font="./fonts/helvetiker_regular.typeface.json"
        >
          HELLO R3F
        </Text3D>
        {/* available PARAMS 
        font: font, size: 80, height: 5, curveSegments: 12,
        bevelEnabled: true, bevelThickness: 10, bevelSize: 8, bevelOffset: 0,
        bevelSegments: 5 */}
      </Center>
      <group ref={donutsGroup}>
        {tempArray.map((it, index) => (
          <Float key={index} floatingRange={[(Math.random() - 0.5) * 1.25]}>
            <mesh
              geometry={torusGeometry}
              material={material}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
              ]}
              scale={0.2 + Math.random() * 0.2}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            />
          </Float>
        ))}
      </group>
    </>
  )
}
