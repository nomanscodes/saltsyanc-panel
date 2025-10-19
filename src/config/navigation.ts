import type { Component } from 'vue'
import {
  Home,
  Gift,
  Package,
  ClipboardCheck,
  Users,
  DollarSign,
  FileText,
  Bell,
  User
} from 'lucide-vue-next'

export interface NavigationItem {
  name: string
  path: string
  icon: Component
  exact?: boolean
  badge?: number
}

export interface NavigationGroup {
  title: string
  items: NavigationItem[]
}

/**
 * Navigation Menu Configuration
 *
 * Each group contains:
 * - title: Section heading
 * - items: Array of navigation items
 *
 * Each item contains:
 * - name: Display name
 * - path: Route path
 * - icon: Lucide icon component
 * - exact: (optional) Use exact match for active state
 * - badge: (optional) Badge number to display
 */
export const navigationGroups: NavigationGroup[] = [
  {
    title: 'Main',
    items: [
      {
        name: 'Home',
        path: '/',
        icon: Home,
        exact: true
      },
      {
        name: 'Offer',
        path: '/offer',
        icon: Gift
      },
      {
        name: 'Package',
        path: '/package',
        icon: Package
      }
    ]
  },
  {
    title: 'Activity',
    items: [
      {
        name: 'Task',
        path: '/task',
        icon: ClipboardCheck
      },
      {
        name: 'Referral',
        path: '/referrals',
        icon: Users
      },
      {
        name: 'Accounting',
        path: '/accounting',
        icon: DollarSign
      },
      {
        name: 'Report',
        path: '/report',
        icon: FileText
      }
    ]
  },
  {
    title: 'Others',
    items: [
      {
        name: 'Notification',
        path: '/notification',
        icon: Bell,
        badge: 1
      },
      {
        name: 'My account',
        path: '/account',
        icon: User
      }
    ]
  }
]
