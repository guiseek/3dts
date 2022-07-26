import { MOUSE, TOUCH } from 'three'

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
// This is very similar to OrbitControls, another set of touch behavior
//
//    Orbit - right mouse, or left mouse + ctrl/meta/shiftKey / touch: two-finger rotate
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - left mouse, or arrow keys / touch: one-finger move

import { OrbitControls } from './orbit-controls'

class MapControls extends OrbitControls {
  constructor(object: any, domElement: HTMLElement) {
    super(object, domElement)

    this.screenSpacePanning = false // pan orthogonal to world-space direction camera.up

    this.mouseButtons.LEFT = MOUSE.PAN
    this.mouseButtons.RIGHT = MOUSE.ROTATE

    this.touches.ONE = TOUCH.PAN
    this.touches.TWO = TOUCH.DOLLY_ROTATE
  }
}

export { MapControls }
