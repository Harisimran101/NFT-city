import * as THREE from 'https://cdn.skypack.dev/three@0.136';

export function flies(amount,scene){
    const SphereGeometry = new THREE.SphereGeometry(0.25,4,4);
    const spherematerial = new THREE.MeshStandardMaterial({
       color: 'white'
    })
    
    for(let i = 0; i < amount;i++){
      
        const flies = new THREE.Mesh(SphereGeometry,spherematerial)
        scene.add(flies)
        flies.position.x = (Math.random() -0.5) * amount * 2.6
        flies.position.y = Math.random() * 40

        flies.position.z = (Math.random() -0.5) *  amount * 2.6

    }
 
}