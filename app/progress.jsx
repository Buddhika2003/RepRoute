import { router } from 'expo-router'
import { useMemo } from 'react'
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'

export default function ProgressScreen() {
    const summary = useMemo(() => {
    return {
        workouts: 0,
        sets: 0,
        volume: 0,
        activeDays: 0,
    }
    }, [])

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