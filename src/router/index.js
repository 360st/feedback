import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Roadmap from '../views/Roadmap.vue'
import CommentWrapper from '../components/CommentWrapper.vue'
import AddEditFeedback from '../components/AddEditFeedback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add-feedback',
      name: "addFeedback",
      component: AddEditFeedback
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: Roadmap
    },
    {
      path: '/comment/:id',
      name: 'CommentWrapper',
      component: CommentWrapper,
      props: true,
    },
    {
      path: '/comment/:id/edit-feedback',
      name: 'editFeedback',
      component: AddEditFeedback,
      props: true
    }
      
    
  ]
})

export default router
