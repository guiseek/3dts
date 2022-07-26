import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  SkeletonHelper,
  Skeleton,
} from 'three'
import * as THREE from 'three'
import './style.scss'

import { OrbitControls } from './orbit-controls'
import { BVHLoader } from './loaders/bvh-loader'

const clock = new THREE.Clock()

let camera: PerspectiveCamera
let controls: OrbitControls
let scene: Scene
let renderer: WebGLRenderer
let mixer: THREE.AnimationMixer
let skeletonHelper: SkeletonHelper & { skeleton?: Skeleton }

init()
animate()

const loader = new BVHLoader()

loader.load('/models/bvh/pirouette.bvh', (result) => {
  skeletonHelper = new SkeletonHelper(result.skeleton.bones[0])
  skeletonHelper.skeleton = result.skeleton // allow animation mixer to bind to THREE.SkeletonHelper directly

  const boneContainer = new THREE.Group()
  boneContainer.add(result.skeleton.bones[0])

  scene.add(skeletonHelper)
  scene.add(boneContainer)

  // play animation
  mixer = new THREE.AnimationMixer(skeletonHelper)
  mixer.clipAction(result.clip).setEffectiveWeight(1.0).play()
})

function init() {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(0, 200, 300)

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  scene.add(new THREE.GridHelper(400, 10))

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 300
  controls.maxDistance = 700

  window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()

  if (mixer) mixer.update(delta)

  renderer.render(scene, camera)
}
