import React from 'react'
import Particles from '@tsparticles/react';
import particlesConfig from './config/particles-config';
export default function ParticleBackground() {
  return (
	<div>
		  <Particles param={particlesConfig} style={{zIndex: "100"}}> Hello</Particles>
		  
	</div>
  )
}
