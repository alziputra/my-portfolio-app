import { useCallback } from "react";
import { loadFull } from "tsparticles"; // Use loadFull for full initialization
import Particles from "react-tsparticles";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // Load the full tsparticles engine
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles Loaded:", container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        particles: {
          number: { value: 50 },
          size: { value: 3 },
          move: { enable: true, speed: 2 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
        },
       
      }}
    />
  );
};

export default ParticleBackground;
