import ModeLocation from './components/ModeLocation.vue'
import ModeBattle from './components/ModeBattle.vue'
import ModeCutscene from './components/ModeCutscene.vue'

import locationRoutes from './components/Location/routes'
import battleRoutes from './components/Battle/routes'
import cutsceneRoutes from './components/Cutscene/routes'

export default [
  { path: '/location', component: ModeLocation, children: locationRoutes },
  { path: '/battle', component: ModeBattle, children: battleRoutes },
  { path: '/cutscene', component: ModeCutscene, children: cutsceneRoutes }
]
