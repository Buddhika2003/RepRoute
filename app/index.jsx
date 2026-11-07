import { router } from 'expo-router'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const weeklyActivity = [
  { day: 'M', height: 0 },
  { day: 'T', height: 0 },
  { day: 'W', height: 0 },
  { day: 'T', height: 0 },
  { day: 'F', height: 0 },
  { day: 'S', height: 0 },
  { day: 'S', height: 0 },
]

function StatCard({ label, value, note }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statNote}>{note}</Text>
    </View>
  )
}

export default function DashboardScreen() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>R</Text>
            </View>

            <View style={styles.brandCopy}>
              <Text style={styles.brandName}>RepRoute</Text>
              <Text style={styles.brandTagline}>TRAIN WITH INTENTION</Text>
            </View>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>
          </View>

          <Text style={styles.dateLabel}>{today.toUpperCase()}</Text>
          <Text style={styles.greeting}>Your progress</Text>
          <Text style={styles.subtitle}>
            Every workout is a step forward.
          </Text>

          <View style={styles.heroCard}>
            <Text style={styles.heroEyebrow}>YOUR FITNESS JOURNEY</Text>
            <Text style={styles.heroTitle}>Ready for your first rep?</Text>
            <Text style={styles.heroDescription}>
              Log a workout and start building a training history that is yours.
            </Text>
            <View style={styles.heroAccent}>
              <Text style={styles.heroAccentText}>REP</Text>
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>This week</Text>
            <Text style={styles.sectionNote}>YOUR ACTIVITY</Text>
          </View>

          <View style={styles.statsRow}>
            <StatCard label="Workouts" value="0" note="this week" />
            <StatCard label="Total reps" value="0" note="this week" />
            <StatCard label="Streak" value="0 days" note="keep going" />
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Weekly activity</Text>
            <Text style={styles.sectionNote}>7 DAYS</Text>
          </View>

          <View style={styles.activityCard}>
            {weeklyActivity.map((item, index) => (
              <View key={`${item.day}-${index}`} style={styles.dayColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.activityBar,
                      { height: `${item.height}%` },
                    ]}
                  />
                </View>
                <Text style={styles.dayLabel}>{item.day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Recent workouts</Text>
          </View>

          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>+</Text>
            </View>
            <Text style={styles.emptyTitle}>Your training log starts here</Text>
            <Text style={styles.emptyDescription}>
              Completed workouts will appear here so you can look back at your
              progress.
            </Text>
          </View>

          <Text style={styles.footer}>STRONGER, ONE REP AT A TIME</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
  {[
  { label: 'Home', icon: '⌂', route: '/' },
  { label: 'Workout', icon: '▤', route: '/workout-log' },
  { label: 'Exercises', icon: '＋', route: '/exercises' },
  { label: 'Progress', icon: '↗', route: '/progress' },
  { label: 'Goal', icon: '◎', route: '/goal'}
].map((item) => {
  const isActive = item.label === 'Home'

  return (
    <Pressable
      key={item.label}
      onPress={() => router.push(item.route)}
      style={styles.navItem}
    >
      <Text style={[styles.navIcon, isActive && styles.navActive]}>
        {item.icon}
      </Text>
      <Text style={[styles.navLabel, isActive && styles.navActive]}>
        {item.label}
      </Text>
    </Pressable>
  )
})}
</View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F3F5F1',
  },
  scrollContent: {
    paddingTop: 18,
    paddingBottom: 36,
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#18372A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    color: '#B9F56B',
    fontSize: 23,
    fontWeight: '900',
  },
  brandCopy: {
    flex: 1,
    marginLeft: 10,
  },
  brandName: {
    color: '#17231D',
    fontSize: 17,
    fontWeight: '900',
  },
  brandTagline: {
    color: '#7E8982',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginTop: 3,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DDE8D5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#18372A',
    fontWeight: '900',
  },
  dateLabel: {
    color: '#3D702D',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  greeting: {
    color: '#17231D',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.7,
    marginTop: 6,
  },
  subtitle: {
    color: '#7E8982',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },
  heroCard: {
    minHeight: 190,
    borderRadius: 24,
    backgroundColor: '#18372A',
    padding: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroEyebrow: {
    color: '#B9F56B',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  heroTitle: {
    maxWidth: 250,
    color: '#FFFFFF',
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '900',
    marginTop: 12,
  },
  heroDescription: {
    maxWidth: 270,
    color: '#C0CEC3',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },
  heroAccent: {
    position: 'absolute',
    right: 20,
    top: 24,
    width: 68,
    height: 68,
    borderRadius: 23,
    backgroundColor: '#315442',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '10deg' }],
  },
  heroAccentText: {
    color: '#B9F56B',
    fontSize: 18,
    fontWeight: '900',
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 11,
  },
  sectionTitle: {
    color: '#17231D',
    fontSize: 16,
    fontWeight: '900',
  },
  sectionNote: {
    color: '#7E8982',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 9,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E7EBE5',
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
  statLabel: {
    color: '#7E8982',
    fontSize: 10,
    fontWeight: '700',
  },
  statValue: {
    color: '#17231D',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 9,
  },
  statNote: {
    color: '#3D702D',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 5,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    minHeight: 125,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBE5',
    backgroundColor: '#FFFFFF',
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barTrack: {
    width: 18,
    height: 76,
    borderRadius: 99,
    backgroundColor: '#F1F4EF',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  activityBar: {
    width: '100%',
    borderRadius: 99,
    backgroundColor: '#B9F56B',
  },
  dayLabel: {
    color: '#7E8982',
    fontSize: 9,
    fontWeight: '800',
    marginTop: 8,
  },
  emptyCard: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7EBE5',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  emptyIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#E8F2DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyIconText: {
    color: '#3D702D',
    fontSize: 23,
    fontWeight: '700',
  },
  emptyTitle: {
    color: '#17231D',
    fontSize: 13,
    fontWeight: '900',
  },
  emptyDescription: {
    maxWidth: 300,
    color: '#7E8982',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 6,
  },
  footer: {
    color: '#9AA39D',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
    textAlign: 'center',
    marginTop: 25,
  },bottomNav: {
  minHeight: 68,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 1,
  borderTopColor: '#E7EBE5',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingHorizontal: 4,
  paddingTop: 8,
  paddingBottom: 10,
},
navItem: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 3,
},
navIcon: {
  color: '#7E8982',
  fontSize: 22,
  fontWeight: '700',
},
navLabel: {
  color: '#7E8982',
  fontSize: 10,
  fontWeight: '700',
},
navActive: {
  color: '#B9F56B',
},
})