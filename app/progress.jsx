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
import { loadLocalData, STORAGE_KEYS } from '../storage/localStorage'


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
          const savedEntries = await loadLocalData(
              STORAGE_KEYS.workoutEntries,
              []
            )

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

        const activeDays = new Set(
          thisWeekEntries.map((entry) => getLocalDateKey(entry.date))
        ).size

        return {
          workouts: activeDays,
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
        <Text style={styles.statValue}>{summary.volume}</Text>
        <Text style={styles.statLabel}>Volume (kg)</Text>
    </View>
    <View style={styles.statCard}>
        <Text style={styles.statValue}>{summary.activeDays}</Text>
        <Text style={styles.statLabel}>Active days</Text>
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
})