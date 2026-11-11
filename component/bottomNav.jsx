import { router, usePathname } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../context/ThemeContext'

const tabs = [
  { label: 'Home', icon: '⌂', route: '/' },
  { label: 'Workout', icon: '▤', route: '/workout-log' },
  { label: 'Exercises', icon: '＋', route: '/exercises' },
  { label: 'Progress', icon: '↗', route: '/progress' },
  { label: 'Goals', icon: '◎', route: '/goal' },
  { label: 'Profile', icon: '●', route: '/profile' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { colors } = useTheme()
  
  return (
    <View
        style={[
          styles.bottomNav,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
          ]}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route

        return (
          <Pressable
            key={tab.label}
            onPress={() => router.replace(tab.route)}
            style={styles.navItem}
          >
            <Text
              style={[
              styles.navIcon,
              { color: isActive ? colors.primary : colors.muted },
            ]}>
              {tab.icon}
            </Text>

            <Text
              style={[
              styles.navLabel,
              { color: isActive ? colors.primary : colors.muted },
            ]}>
              {tab.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomNav: {
    minHeight: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E7EBE5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    paddingTop: 7,
    paddingBottom: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  navIcon: {
    color: '#716d7a',
    fontSize: 22,
    fontWeight: '700',
  },
  navLabel: {
    color: '#716d7a',
    fontSize: 10,
    fontWeight: '700',
  },
})