import { router, useFocusEffect } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import BottomNav from '../component/bottomNav'
import { getProfileStorageKey, loadLocalData, STORAGE_KEYS, } from '../storage/localStorage'


function getLocalDateKey(value) {
  const date = new Date(value)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}


export default function ProgressScreen() {
      const [entries, setEntries] = useState([])

      useFocusEffect(
        useCallback(() => {
          let isActive = true

          async function loadEntries() {

          const activeProfileId = await loadLocalData(
  STORAGE_KEYS.activeProfileId,
  null
)

const savedEntries = activeProfileId
  ? await loadLocalData(
      getProfileStorageKey(
        STORAGE_KEYS.workoutEntries,
        activeProfileId
      ),
      []
    )
  : []

            if (isActive) {
              setEntries(Array.isArray(savedEntries) ? savedEntries : [])
            }
            }

          loadEntries()

          return () => {
            isActive = false
          }
        }, [])
      )

    const summary = useMemo(() => {
        const now = new Date()
        const weekStart = new Date(now)
        const mondayOffset = (now.getDay() + 6) % 7

        weekStart.setDate(now.getDate() - mondayOffset)
        weekStart.setHours(0, 0, 0, 0)

        const nextWeekStart = new Date(weekStart)
        nextWeekStart.setDate(weekStart.getDate() + 7)

        const thisWeekEntries = entries.filter((entry) => {
          if (!entry.date) return false

          const entryDate = new Date(entry.date)
          return entryDate >= weekStart && entryDate < nextWeekStart
        })

        const weeklyVolumes = Array.from({ length: 4 }, (_, index) => {
        const start = new Date(weekStart)
        start.setDate(weekStart.getDate() - (3 - index) * 7)

        const end = new Date(start)
        end.setDate(start.getDate() + 7)

        const weekEntries = entries.filter((entry) => {
          if (!entry.date) return false

          const entryDate = new Date(entry.date)
          return entryDate >= start && entryDate < end
        })

        const volume = weekEntries.reduce(
          (total, entry) =>
            total +
            (Number(entry.sets) || 0) *
            (Number(entry.reps) || 0) *
            (Number(entry.weight) || 0),
            0
          )

        return {
          label: start.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          volume,
        }
      })

        const activeDays = new Set(
          thisWeekEntries.map((entry) => getLocalDateKey(entry.date))
        ).size

        return {
          workouts: activeDays, weeklyVolumes,
          sets: thisWeekEntries.reduce(
            (total, entry) => total + (Number(entry.sets) || 0),
            0
          ),
          volume: thisWeekEntries.reduce(
            (total, entry) =>
              total +
              (Number(entry.sets) || 0) *
                (Number(entry.reps) || 0) *
                (Number(entry.weight) || 0),
                0
          ),
          activeDays,
        }
      }, [entries])

      const weeklyActivity = useMemo(() => {
        const weekStart = new Date()
        const mondayOffset = (weekStart.getDay() + 6) % 7

        weekStart.setDate(weekStart.getDate() - mondayOffset)
        weekStart.setHours(0, 0, 0, 0)

        const dailyCounts = new Map()

        entries.forEach((entry) => {
          if (!entry.date) return

          const key = getLocalDateKey(entry.date)
          dailyCounts.set(key, (dailyCounts.get(key) || 0) + 1)
        })

        return Array.from({ length: 7 }, (_, index) => {
          const date = new Date(weekStart)
          date.setDate(weekStart.getDate() + index)

          const key = getLocalDateKey(date)

          return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            exercises: dailyCounts.get(key) || 0,
          }
        })
      }, [entries])

const maxDailyExercises = Math.max(
  1,
  ...weeklyActivity.map((item) => item.exercises)
)

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
        
        <Pressable
            onPress={() => router.replace('/')}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>‹  Dashboard</Text>
        </Pressable>

        <Text style={styles.eyebrow}>YOUR TRAINING</Text>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>
          A clear view of your training consistency and performance.
        </Text>
        <View style={styles.periodCard}>
    <View>
        <Text style={styles.periodLabel}>THIS WEEK</Text>
        <Text style={styles.periodTitle}>Keep building momentum</Text>
    </View>
    <View style={styles.periodIcon}>
        <Text style={styles.periodIconText}>↗</Text>
    </View>
    </View>

    <View style={styles.statsGrid}>
    <View style={styles.statCard}>
        <Text style={styles.statValue}>{summary.workouts}</Text>
        <Text style={styles.statLabel}>Workouts</Text>
    </View>
    <View style={styles.statCard}>
        <Text style={styles.statValue}>{summary.sets}</Text>
        <Text style={styles.statLabel}>Sets completed</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={styles.statValue}>
        {Math.round(summary.volume).toLocaleString()} kg
      </Text> 
        <Text style={styles.statLabel}>Total lifted this week</Text>
    </View>
    <View style={styles.statCard}>
        <Text style={styles.statValue}>{summary.activeDays}</Text>
        <Text style={styles.statLabel}>Active days</Text>
    </View>
    </View>
    
    

<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Weekly volume comparison</Text>
</View>

<View style={styles.activityCard}>
  {summary.weeklyVolumes.map((week) => (
    <View
      key={week.label}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
      }}>

      <Text style={styles.chartDay}>Week starting {week.label}</Text>
      <Text style={styles.statLabel}>
        {Math.round(week.volume).toLocaleString()} kg
      </Text>
    </View>
  ))}
</View>

<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Weekly activity</Text>
  <Text style={styles.sectionNote}>THIS WEEK</Text>
</View>

<View style={styles.activityCard}>
  <View style={styles.chart}>
    
    {weeklyActivity.map((item) => (
      <View key={item.day} style={styles.chartColumn}>
        <View style={styles.barTrack}>
          <View
            style={[
              styles.bar,
              item.exercises > 0 && styles.barActive,
              {
                height:
                  item.exercises === 0
                    ? 8
                    : Math.max(16, (item.exercises / maxDailyExercises) * 82),
              },
            ]}
          />
        </View>
        <Text style={styles.chartDay}>{item.day}</Text>
      </View>
    ))}
  </View>

  <View style={styles.chartLegend}>
    <View style={styles.legendDot} />
    <Text style={styles.legendText}>Exercises logged</Text>
  </View>
</View>
      </ScrollView>
      <BottomNav/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    padding: 22,
    paddingBottom: 40,
  },
  eyebrow: {
    color: '#11845B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.6,
    marginTop: 12,
  },
  title: {
    color: '#111827',
    fontSize: 32,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    color: '#667085',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 20,
  },
  periodCard: {
  alignItems: 'center',
  backgroundColor: '#172B4D',
  borderRadius: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 20,
},
periodLabel: {
  color: '#A9B8CE',
  fontSize: 11,
  fontWeight: '800',
  letterSpacing: 1.4,
},
periodTitle: {
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: '800',
  marginTop: 8,
},
periodIcon: {
  alignItems: 'center',
  backgroundColor: '#24436F',
  borderRadius: 15,
  height: 48,
  justifyContent: 'center',
  width: 48,
},
periodIconText: {
  color: '#6FE0AE',
  fontSize: 27,
  fontWeight: '800',
},
statsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginTop: 16,
},
statCard: {
  backgroundColor: '#FFFFFF',
  borderColor: '#E8EBF0',
  borderRadius: 17,
  borderWidth: 1,
  marginBottom: 12,
  padding: 17,
  width: '48%',
},
statValue: {
  color: '#172B4D',
  fontSize: 27,
  fontWeight: '800',
},
statLabel: {
  color: '#667085',
  fontSize: 12,
  fontWeight: '600',
  marginTop: 5,
},
backButton: {
  alignSelf: 'flex-start',
  marginBottom: 14,
  paddingVertical: 6,
},
backButtonText: {
  color: '#11845B',
  fontSize: 14,
  fontWeight: '700',

},
sectionHeader: {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 12,
  marginTop: 20,
},
sectionTitle: {
  color: '#172B4D',
  fontSize: 18,
  fontWeight: '800',
},
sectionNote: {
  color: '#667085',
  fontSize: 12,
},
activityCard: {
  backgroundColor: '#FFFFFF',
  borderColor: '#E8EBF0',
  borderRadius: 18,
  borderWidth: 1,
  padding: 18,
},
chart: {
  alignItems: 'flex-end',
  flexDirection: 'row',
  height: 128,
  justifyContent: 'space-between',
},
chartColumn: {
  alignItems: 'center',
  flex: 1,
},
barTrack: {
  alignItems: 'center',
  backgroundColor: '#F1F4F7',
  borderRadius: 7,
  height: 100,
  justifyContent: 'flex-end',
  overflow: 'hidden',
  width: 17,
},
bar: {
  backgroundColor: '#D8E0E8',
  borderRadius: 7,
  width: 17,
},
barActive: {
  backgroundColor: '#16A36A',
},
chartDay: {
  color: '#667085',
  fontSize: 10,
  marginTop: 9,
},
chartLegend: {
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: 14,
},
legendDot: {
  backgroundColor: '#16A36A',
  borderRadius: 4,
  height: 8,
  marginRight: 7,
  width: 8,
},
legendText: {
  color: '#667085',
  fontSize: 11,
},
})