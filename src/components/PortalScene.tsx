/* eslint-disable react/no-unknown-property */
import {
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  Sparkles,
  shaderMaterial,
} from '@react-three/drei'
import portalVertexShadow from '../shaders/portal/vertex.glsl'
import portalFragmentShadow from '../shaders/portal/fragment.glsl'
import * as THREE from 'three'
import { useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000'),
  },
  portalVertexShadow,
  portalFragmentShadow,
)

extend({ PortalMaterial })

export function PortalScene() {
  // The nodes are all the fragments inside the GLB/GLTF, we're handling them individually
  const { nodes }: any = useGLTF('./portal/portal.glb')
  const bakedTexture = useTexture('./portal/baked.jpg')

  const portalMaterial = useRef<any>(null!)

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta
  })

  return (
    <>
      <OrbitControls makeDefault />

      <color args={['#030202']} attach="background" />

      <Center>
        {/* This is the portal, we load the GLTF and inside the Mesh, 
        a basic material containing a JPG of the texture */}
        {/* map-flipY={false} makes the texture work properly */}

        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>

        {/* This mesh is the light inside a lamp */}
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#FFFFE5" />
        </mesh>

        {/* This mesh is the light inside a lamp */}
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#FFFFE5" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.4}
          count={40}
        />
      </Center>
    </>
  )
}

useGLTF.preload('./portal/portal.glb')
