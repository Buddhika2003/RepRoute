import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import BottomNav from '../component/bottomNav'
import { getProfileStorageKey, loadLocalData, saveLocalData, STORAGE_KEYS } from '../storage/localStorage'

export default function WorkoutLogScreen() {

    const [exercise, setExercise] = useState('')
    const [sets, setSets] = useState('3')
    const [reps, setReps] = useState('10')
    const [weight, setWeight] = useState('')
    const [message, setMessage] = useState('')
    const [entries, setEntries] = useState([])
    const [entriesLoaded, setEntriesLoaded] = useState(false)
    const [activeProfileId, setActiveProfileId] = useState(null)

    useEffect(() => {
  let isMounted = true

  async function loadEntries() {
    const profileId = await loadLocalData(
      STORAGE_KEYS.activeProfileId,
      null
    )

    if (!profileId) {
      if (isMounted) {
        setEntries([])
        setEntriesLoaded(true)
      }
      return
    }

    const savedEntries = await loadLocalData(
      getProfileStorageKey(STORAGE_KEYS.workoutEntries, profileId),
      []
    )

    if (isMounted) {
      setActiveProfileId(profileId)
      setEntries(Array.isArray(savedEntries) ? savedEntries : [])
      setEntriesLoaded(true)
    }
  }

  loadEntries()

  return () => {
    isMounted = false
  }
}, [])

useEffect(() => {
  if (!entriesLoaded || !activeProfileId) return

  saveLocalData(
    getProfileStorageKey(STORAGE_KEYS.workoutEntries, activeProfileId),
    entries
  )
}, [entries, entriesLoaded, activeProfileId])

      function addExercise() {
        const setCount = Number(sets)
        const repCount = Number(reps)
        const weightValue = Number(weight)

        if (!exercise.trim()) {
          setMessage('Enter an exercise name.')
          return
        }

        if (!Number.isInteger(setCount) || setCount < 1) {
          setMessage('Sets must be a whole number greater than zero.')
          return
        }

        if (!Number.isInteger(repCount) || repCount < 1) {
          setMessage('Reps must be a whole number greater than zero.')
          return
  }

        if (!Number.isFinite(weightValue) || weightValue < 0) {
          setMessage('Weight must be zero or greater.')
        return
        }

        const newEntry = {
        id: `${Date.now()}`,
        name: exercise.trim(),
        sets: setCount,
        reps: repCount,
        weight: weightValue,
        date: new Date().toISOString()
        }

        setEntries((currentEntries) => [newEntry, ...currentEntries])
        setExercise('')
        setMessage('Exercise added to this workout.')
      }

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <Pressable onPress={() => router.replace('/')} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹  Dashboard</Text>
        </Pressable>

        <Text style={styles.eyebrow}>TRAINING JOURNAL</Text>
        <Text style={styles.title}>Workout log</Text>
        <Text style={styles.subtitle}>
          Record each exercise as you train.
        </Text>
            <View style={styles.formCard}>
  <Text style={styles.cardTitle}>Add an exercise</Text>

  <Text style={styles.label}>Exercise name</Text>
  <TextInput
    value={exercise}
    onChangeText={setExercise}
    placeholder="e.g. Barbell Bench Press"
    placeholderTextColor="#929B95"
    style={styles.input}
  />

  <View style={styles.fieldRow}>
    <View style={styles.fieldColumn}>
      <Text style={styles.label}>Sets</Text>
      <TextInput
        value={sets}
        onChangeText={setSets}
        keyboardType="number-pad"
        placeholder="3"
        placeholderTextColor="#929B95"
        style={styles.input}
      />
    </View>
    

    <View style={styles.fieldColumn}>
      <Text style={styles.label}>Reps</Text>
      <TextInput
        value={reps}
        onChangeText={setReps}
        keyboardType="number-pad"
        placeholder="10"
        placeholderTextColor="#929B95"
        style={styles.input}
      />
    </View>

    <View style={styles.fieldColumn}>
      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
        placeholder="0"
        placeholderTextColor="#929B95"
        style={styles.input}
      />
    </View>
  </View>
  {!!message && (
  <Text
    style={[
      styles.message,
      message.startsWith('Enter') ||
      message.startsWith('Sets') ||
      message.startsWith('Reps') ||
      message.startsWith('Weight')
        ? styles.errorMessage
        : styles.successMessage,
    ]}
  >
    {message}
  </Text>
)}

<Pressable onPress={addExercise} style={styles.addButton}>
  <Text style={styles.addButtonText}>Add to workout</Text>
  <Text style={styles.addButtonIcon}>＋</Text>
</Pressable>
</View>
<View style={styles.sectionHeading}>
  <Text style={styles.sectionTitle}>This workout</Text>
  <Text style={styles.sectionCount}>
    {entries.length} exercises
  </Text>
</View>

{entries.length === 0 ? (
  <View style={styles.emptyCard}>
    <Text style={styles.emptyMark}>＋</Text>
    <Text style={styles.emptyTitle}>No exercises added yet</Text>
    <Text style={styles.emptyText}>
      Add your first exercise using the form above.
    </Text>
  </View>
) : (
  entries.map((entry, index) => (
    <View key={entry.id} style={styles.entryCard}>
      <View style={styles.entryNumber}>
        <Text style={styles.entryNumberText}>
          {String(index + 1).padStart(2, '0')}
        </Text>
      </View>

      <View style={styles.entryDetails}>
        <Text style={styles.entryName}>{entry.name}</Text>
        <Text style={styles.entryInfo}>
          {entry.sets} sets  ·  {entry.reps} reps  ·  {entry.weight} kg
        </Text>
      </View>
    </View>
  ))
)}

<Text style={styles.note}>
  Your workout entries are saved on this device.
</Text>
      </ScrollView>
      <BottomNav/>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F3F5F1',
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    padding: 20,
    paddingTop: 18,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 14,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#3D702D',
    fontSize: 13,
    fontWeight: '800',
  },
  eyebrow: {
    color: '#3D702D',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  title: {
    color: '#17231D',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 6,
  },
  subtitle: {
    color: '#7E8982',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 22,
  },
  formCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#E7EBE5',
  padding: 16,
},
cardTitle: {
  color: '#17231D',
  fontSize: 15,
  fontWeight: '900',
  marginBottom: 17,
},
label: {
  color: '#17231D',
  fontSize: 11,
  fontWeight: '800',
  marginBottom: 7,
},
input: {
  minHeight: 46,
  borderRadius: 13,
  borderWidth: 1,
  borderColor: '#E7EBE5',
  backgroundColor: '#FBFCFA',
  paddingHorizontal: 12,
  color: '#17231D',
  fontSize: 13,
  marginBottom: 14,
},
fieldRow: {
  flexDirection: 'row',
  gap: 9,
},
fieldColumn: {
  flex: 1,
},
message: {
  fontSize: 11,
  fontWeight: '700',
  marginBottom: 10,
},
errorMessage: {
  color: '#C54F45',
},
successMessage: {
  color: '#3D702D',
},
addButton: {
  minHeight: 48,
  borderRadius: 15,
  backgroundColor: '#B9F56B',
  paddingHorizontal: 15,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
addButtonText: {
  color: '#17231D',
  fontSize: 13,
  fontWeight: '900',
},
addButtonIcon: {
  color: '#17231D',
  fontSize: 19,
  fontWeight: '800',
},
sectionHeading: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 25,
  marginBottom: 11,
},
sectionTitle: {
  color: '#17231D',
  fontSize: 16,
  fontWeight: '900',
},
sectionCount: {
  color: '#7E8982',
  fontSize: 10,
  fontWeight: '800',
},
emptyCard: {
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#E7EBE5',
  padding: 22,
},
emptyMark: {
  color: '#3D702D',
  fontSize: 25,
  marginBottom: 8,
},
emptyTitle: {
  color: '#17231D',
  fontSize: 13,
  fontWeight: '900',
},
emptyText: {
  color: '#7E8982',
  fontSize: 11,
  marginTop: 6,
  textAlign: 'center',
},
entryCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 17,
  borderWidth: 1,
  borderColor: '#E7EBE5',
  padding: 13,
  marginBottom: 9,
},
entryNumber: {
  width: 36,
  height: 36,
  borderRadius: 12,
  backgroundColor: '#E8F2DF',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 11,
},
entryNumberText: {
  color: '#3D702D',
  fontSize: 10,
  fontWeight: '900',
},
entryDetails: {
  flex: 1,
},
entryName: {
  color: '#17231D',
  fontSize: 13,
  fontWeight: '900',
},
entryInfo: {
  color: '#7E8982',
  fontSize: 10,
  marginTop: 5,
},
note: {
  color: '#7E8982',
  fontSize: 10,
  textAlign: 'center',
  marginTop: 18,
},
})