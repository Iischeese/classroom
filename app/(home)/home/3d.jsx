'use client'

import { OrbitControls, PresentationControls } from "@react-three/drei"
import { TextureLoader } from "three"
import { useLoader } from "@react-three/fiber"
function ThreeD() {

    const black = useLoader(TextureLoader, './blue.png')

    return (
        <>

            <OrbitControls autoRotate enableZoom={false}/>

            <ambientLight intensity={.2} color='blue'/>
            <directionalLight castShadow intensity={5} position={[1, 2, 3]} color={'white'} />

            <mesh castShadow>
                <torusKnotGeometry args={[1,.4,200,200,1,3]} scale={[1, 2, 1]} />
                <meshMatcapMaterial  matcap={black}/>
            </mesh>
        </>
    )
}

export default ThreeD