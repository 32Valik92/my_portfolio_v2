"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

const Model = () => {
  const geometry = useLoader(STLLoader, "/models/output.stl") as THREE.BufferGeometry;

  const meshRef = useRef<THREE.Mesh>(null);

  const centeredGeometry = useMemo(() => {
    const geom = geometry.clone();
    geom.center();
    geom.computeBoundingBox();
    return geom;
  }, [geometry]);

  const scale = useMemo(() => {
    if (!centeredGeometry.boundingBox) return 1;

    const size = new THREE.Vector3();
    centeredGeometry.boundingBox.getSize(size);

    const maxAxis = Math.max(size.x, size.y, size.z);

    const targetSize = 85;

    return targetSize / maxAxis;
  }, [centeredGeometry]);

  return (
    <mesh
      ref={meshRef}
      geometry={centeredGeometry}
      castShadow
      receiveShadow
      rotation={[-0.35, 3.2, 0.06]}
      scale={[-scale, scale, scale]}
    >
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.2}
        roughness={0.35}
      />
    </mesh>
  );
};

const LetsStart3DText = () => {
  return (
    <div
      className="w-[340px] h-[260px] sm:w-[420px] sm:h-[300px] md:w-[500px] md:h-[360px]"
    >
      <Canvas
        className="md:mt-[80px] md:ml-[40px] cursor-pointer"

        /* -----------------------------------------------------
         *  position: [x, y, z]      → де знаходитиметься камера
         *  fov: 30                  → кут огляду (як об’єктив у фотоапарата)
         ------------------------------------------------------ */
        camera={{ position: [0, 0, 140], fov: 30 }}
        shadows
      >
        <ambientLight intensity={0.7} />

        <directionalLight position={[40, 60, 40]} intensity={1.1} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls
          enableDamping
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default LetsStart3DText;
