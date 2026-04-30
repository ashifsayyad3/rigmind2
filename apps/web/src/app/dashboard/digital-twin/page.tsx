'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fleetApi, rigsApi } from '@/lib/api/client'
import { cn, healthScoreColor } from '@/lib/utils'
import { Cpu, Activity, AlertTriangle, Layers, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'

// Three.js dynamically imported to avoid SSR issues
function RigModel({ healthScores, selectedRigId }: { healthScores: any[]; selectedRigId: number | null }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let THREE: any, renderer: any, scene: any, camera: any, animId: number

    const init = async () => {
      THREE = await import('three')
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js' as any).catch(() => ({ OrbitControls: null }))

      const w = mountRef.current!.clientWidth
      const h = mountRef.current!.clientHeight

      // Scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x0a0e1a)
      scene.fog = new THREE.FogExp2(0x0a0e1a, 0.018)

      // Camera
      camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500)
      camera.position.set(18, 14, 22)

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      mountRef.current!.appendChild(renderer.domElement)

      // Controls
      if (OrbitControls) {
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.maxPolarAngle = Math.PI / 2
        sceneRef.current = { controls }
      }

      // Lighting
      const ambient = new THREE.AmbientLight(0x334466, 0.6)
      scene.add(ambient)
      const sun = new THREE.DirectionalLight(0x88aaff, 1.2)
      sun.position.set(20, 30, 10)
      sun.castShadow = true
      scene.add(sun)
      const blue = new THREE.PointLight(0x0066ff, 2, 30)
      blue.position.set(0, 8, 0)
      scene.add(blue)

      // Ocean plane
      const oceanGeo = new THREE.PlaneGeometry(200, 200, 32, 32)
      const oceanMat = new THREE.MeshStandardMaterial({
        color: 0x001133, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.85,
      })
      const ocean = new THREE.Mesh(oceanGeo, oceanMat)
      ocean.rotation.x = -Math.PI / 2
      ocean.receiveShadow = true
      scene.add(ocean)

      // Grid
      const grid = new THREE.GridHelper(80, 40, 0x112244, 0x0d1a2e)
      grid.position.y = 0.01
      scene.add(grid)

      // Build rig model
      buildRig(THREE, scene, healthScores)

      // Animate
      const clock = new THREE.Clock()
      const animate = () => {
        animId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()
        blue.intensity = 1.5 + Math.sin(t * 2) * 0.5
        if (sceneRef.current?.controls) sceneRef.current.controls.update()
        renderer.render(scene, camera)
      }
      animate()

      // Resize handler
      const onResize = () => {
        if (!mountRef.current) return
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      }
      window.addEventListener('resize', onResize)
      sceneRef.current = { ...sceneRef.current, cleanup: () => window.removeEventListener('resize', onResize) }
    }

    init()

    return () => {
      cancelAnimationFrame(animId)
      if (sceneRef.current?.cleanup) sceneRef.current.cleanup()
      if (renderer) {
        renderer.dispose()
        mountRef.current?.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}

function buildRig(THREE: any, scene: any, healthScores: any[]) {
  const mat = (hex: number, emissive = 0, rough = 0.5) =>
    new THREE.MeshStandardMaterial({ color: hex, emissive, emissiveIntensity: emissive ? 0.3 : 0, roughness: rough, metalness: 0.7 })

  // Jacket legs (4 corner columns)
  const legPositions = [[-3, -3], [3, -3], [-3, 3], [3, 3]]
  legPositions.forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 14, 8), mat(0x334466))
    leg.position.set(x, 7, z)
    leg.castShadow = true
    scene.add(leg)
  })

  // Main deck
  const deck = new THREE.Mesh(new THREE.BoxGeometry(9, 0.6, 9), mat(0x445577))
  deck.position.set(0, 14.3, 0)
  deck.castShadow = true
  deck.receiveShadow = true
  scene.add(deck)

  // Derrick tower (tall lattice approximation)
  const derrick = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.8, 18, 6), mat(0x667799, 0x003355))
  derrick.position.set(0, 23, 0)
  derrick.castShadow = true
  scene.add(derrick)

  // Crown block at top
  const crown = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), mat(0xffd700, 0xaa7700))
  crown.position.set(0, 32.5, 0)
  scene.add(crown)

  // BOP stack — color by health
  const bopScore = healthScores[0]?.componentHealth ?? 80
  const bopColor = bopScore >= 80 ? 0x00cc66 : bopScore >= 60 ? 0xffaa00 : 0xff3333
  const bop = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 3.5, 12), mat(bopColor, bopColor, 0.3))
  bop.position.set(0.5, 16.5, 0)
  scene.add(bop)

  // Module buildings on deck
  const modules = [
    { pos: [-2.5, 15, -2.5], size: [2, 2, 2], color: 0x445566 },
    { pos: [2.5, 15, -2.5], size: [2, 1.5, 2], color: 0x334455 },
    { pos: [-2.5, 15, 2.5], size: [1.5, 2.5, 1.5], color: 0x445566 },
    { pos: [2.5, 15.5, 2.5], size: [2.5, 1, 2.5], color: 0x556677 },
  ]
  modules.forEach(({ pos, size, color }) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat(color))
    mesh.position.set(...pos as [number, number, number])
    mesh.castShadow = true
    scene.add(mesh)
  })

  // Helideck
  const heli = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 0.15, 20), mat(0x334455))
  heli.position.set(3.5, 15.1, 0)
  scene.add(heli)
  const heliH = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.0, 20), mat(0xffffff))
  heliH.rotation.x = -Math.PI / 2
  heliH.position.set(3.5, 15.25, 0)
  scene.add(heliH)

  // Flare stack
  const flare = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 7, 6), mat(0x888899))
  flare.position.set(-4, 18, -4)
  scene.add(flare)
  const flame = new THREE.PointLight(0xff6600, 3, 5)
  flame.position.set(-4, 22, -4)
  scene.add(flame)

  // Cross bracing
  for (let y = 2; y < 14; y += 4) {
    legPositions.forEach(([x, z], i) => {
      const next = legPositions[(i + 1) % 4]
      const brace = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 5.5, 4), mat(0x2a3a55))
      brace.position.set((x + next[0]) / 2, y, (z + next[1]) / 2)
      brace.lookAt(x, y, z)
      brace.rotateX(Math.PI / 2)
      scene.add(brace)
    })
  }

  // Health indicator lights on deck
  healthScores.slice(0, 4).forEach((rig, i) => {
    const score = rig?.overallScore ?? 75
    const lightColor = score >= 80 ? 0x00ff88 : score >= 60 ? 0xffaa00 : 0xff3333
    const light = new THREE.PointLight(lightColor, 1.5, 4)
    const angle = (i / 4) * Math.PI * 2
    light.position.set(Math.cos(angle) * 3, 15, Math.sin(angle) * 3)
    scene.add(light)
  })
}

export default function DigitalTwinPage() {
  const [selectedRigId, setSelectedRigId] = useState<number | null>(null)
  const [activePanel, setActivePanel] = useState<'health' | 'sensors' | 'alerts'>('health')

  const { data: healthData } = useQuery({
    queryKey: ['fleet-health-scores'],
    queryFn: fleetApi.getHealthScores,
    refetchInterval: 30_000,
  })

  const healthScores: any[] = healthData?.data ?? []
  const selectedRig = healthScores.find((r) => r.rigId === selectedRigId) ?? healthScores[0]

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* 3D Viewport */}
      <div className="flex-1 relative">
        <RigModel healthScores={healthScores} selectedRigId={selectedRigId} />

        {/* Overlay controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-surface-900/80 backdrop-blur border border-surface-700/60 rounded-xl p-3">
            <div className="text-xs text-surface-400 mb-2 font-semibold uppercase tracking-wide">Select Rig</div>
            {healthScores.slice(0, 8).map((rig) => (
              <button
                key={rig.rigId}
                onClick={() => setSelectedRigId(rig.rigId === selectedRigId ? null : rig.rigId)}
                className={cn(
                  'flex items-center gap-2 w-full text-left px-2 py-1.5 rounded text-xs transition-colors',
                  selectedRigId === rig.rigId ? 'bg-brand-500/20 text-brand-300' : 'text-surface-300 hover:bg-surface-700/50',
                )}
              >
                <div className={cn('w-2 h-2 rounded-full shrink-0',
                  rig.overallScore >= 80 ? 'bg-green-400' : rig.overallScore >= 60 ? 'bg-amber-400' : 'bg-red-400',
                )} />
                {rig.rigName}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-surface-900/70 backdrop-blur rounded-lg px-3 py-2 flex gap-4 text-xs">
          {[['bg-green-400', '≥80 Healthy'], ['bg-amber-400', '60–79 Caution'], ['bg-red-400', '<60 Critical']].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <div className={cn('w-2.5 h-2.5 rounded-full', c)} />
              <span className="text-surface-400">{l}</span>
            </div>
          ))}
        </div>

        {/* Camera hint */}
        <div className="absolute bottom-4 right-4 text-xs text-surface-500 bg-surface-900/60 rounded px-2 py-1">
          Drag to orbit · Scroll to zoom · Right-drag to pan
        </div>
      </div>

      {/* Info panel */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 320, opacity: 1 }}
        className="w-80 bg-surface-900 border-l border-surface-700 overflow-y-auto shrink-0"
      >
        {selectedRig ? (
          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-white font-bold">{selectedRig.rigName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className={cn('text-2xl font-bold', healthScoreColor(selectedRig.overallScore))}>
                  {selectedRig.overallScore}
                </div>
                <div className="text-surface-400 text-sm">/ 100</div>
              </div>
              <div className="text-xs text-surface-500 capitalize">{selectedRig.trend} trend</div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-surface-800 rounded-lg p-1">
              {(['health', 'sensors', 'alerts'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActivePanel(t)}
                  className={cn('flex-1 py-1.5 text-xs rounded capitalize transition-colors',
                    activePanel === t ? 'bg-surface-700 text-white' : 'text-surface-400 hover:text-white',
                  )}
                >{t}</button>
              ))}
            </div>

            {activePanel === 'health' && (
              <div className="space-y-3">
                {[
                  { label: 'Component Health', value: selectedRig.componentHealth },
                  { label: 'Maintenance', value: selectedRig.maintenanceCompliance },
                  { label: 'Certification', value: selectedRig.certificationStatus },
                  { label: 'NPT Score', value: selectedRig.nptScore },
                ].map((d) => (
                  <div key={d.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-surface-400">{d.label}</span>
                      <span className={healthScoreColor(d.value)}>{d.value}</span>
                    </div>
                    <div className="h-2 bg-surface-700 rounded-full overflow-hidden">
                      <motion.div
                        className={cn('h-full rounded-full',
                          d.value >= 80 ? 'bg-green-400' : d.value >= 60 ? 'bg-amber-400' : 'bg-red-400',
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${d.value}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[
                    { label: 'Open Failures', value: selectedRig.openFailures, color: 'text-red-400' },
                    { label: 'Maintenance', value: selectedRig.openMaintenance, color: 'text-amber-400' },
                    { label: 'Certs', value: selectedRig.expiringCerts, color: 'text-orange-400' },
                  ].map((s) => (
                    <div key={s.label} className="bg-surface-800 rounded-lg p-2 text-center">
                      <div className={cn('text-lg font-bold', s.color)}>{s.value}</div>
                      <div className="text-xs text-surface-500">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePanel === 'sensors' && (
              <div className="text-center py-8 text-surface-400 text-sm">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-40" />
                Connect RTM feed to view live sensor data
              </div>
            )}

            {activePanel === 'alerts' && (
              <div className="space-y-2">
                {selectedRig.openFailures > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-red-300">{selectedRig.openFailures} open failure{selectedRig.openFailures > 1 ? 's' : ''} require attention</div>
                  </div>
                )}
                {selectedRig.expiringCerts > 0 && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-300">{selectedRig.expiringCerts} certificate{selectedRig.expiringCerts > 1 ? 's' : ''} expiring within 60 days</div>
                  </div>
                )}
                {selectedRig.openFailures === 0 && selectedRig.expiringCerts === 0 && (
                  <div className="text-center py-6 text-surface-400 text-sm">No active alerts</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-surface-400 text-sm">
            <div className="text-center">
              <Cpu className="w-10 h-10 mx-auto mb-3 opacity-30" />
              Select a rig to view details
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
