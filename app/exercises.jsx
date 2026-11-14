import { router } from 'expo-router'
import { useMemo, useState } from 'react'
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import BottomNav from '../component/bottomNav'

const filters = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms']



export default function ExercisesScreen() {
    const exercises = [
  {
    id: '1',
    name: 'Barbell Squat',
    muscle: 'Legs',
    equipment: 'Barbell',
    level: 'Intermediate',
    description:
      'A compound lower-body exercise that trains the quadriceps, glutes, and hamstrings.',
  },
  {
    id: '2',
    name: 'Dumbbell Bench Press',
    muscle: 'Chest',
    equipment: 'Dumbbells',
    level: 'Beginner',
    description:
      'A chest pressing exercise that also works the shoulders and triceps.',
  },
  {
    id: '3',
    name: 'Lat Pulldown',
    muscle: 'Back',
    equipment: 'Cable machine',
    level: 'Beginner',
    description: 'A pulling exercise that targets the lats and upper back.',
  },
  {
    id: '4',
    name: 'Dumbbell Shoulder Press',
    muscle: 'Shoulders',
    equipment: 'Dumbbells',
    level: 'Beginner',
    description:
      'An overhead press that strengthens the shoulders and triceps.',
  },
  {
    id: '5',
    name: 'Barbell Romanian Deadlift',
    muscle: 'Legs',
    equipment: 'Barbell',
    level: 'Intermediate',
    description:
      'A hip-hinge exercise focused on the hamstrings and glutes.',
  },
  {
    id: '6',
    name: 'Cable Triceps Pushdown',
    muscle: 'Arms',
    equipment: 'Cable machine',
    level: 'Beginner',
    description: 'An isolation exercise that targets the triceps.',
  },
]

const [search, setSearch] = useState('')
const [selectedFilter, setSelectedFilter] = useState('All')
const [selectedExercise, setSelectedExercise] = useState(null)

const filteredExercises = useMemo(() => {
  const query = search.trim().toLowerCase()

  return exercises.filter((exercise) => {
  const matchesFilter =
    selectedFilter === 'All' || exercise.muscle === selectedFilter

  const matchesSearch =
    exercise.name.toLowerCase().includes(query) ||
    exercise.muscle.toLowerCase().includes(query) ||
    exercise.equipment.toLowerCase().includes(query)

  return matchesFilter && matchesSearch
})
}, [search,selectedFilter])
  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
        <Pressable
            onPress={() => router.replace('/')}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>‹  Dashboard</Text>
        </Pressable>

        <Text style={styles.eyebrow}>TRAINING LIBRARY</Text>
        <Text style={styles.title}>Exercises</Text>
        <Text style={styles.subtitle}>
          Find an exercise and explore the muscles and equipment it uses.
        </Text>
        <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search exercises or equipment"
            placeholderTextColor="#7B8494"
            style={styles.searchInput}
            autoCapitalize="none"/>
        
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}>
            {filters.map((filter) => {
            const isSelected = selectedFilter === filter

    return (
      <Pressable
        key={filter}
        onPress={() => setSelectedFilter(filter)}
        style={[
          styles.filterButton,
          isSelected && styles.filterButtonSelected,
        ]}
      >
        <Text
          style={[
            styles.filterText,
            isSelected && styles.filterTextSelected,
          ]}
        >
          {filter}
        </Text>
      </Pressable>
    )
  })}
</ScrollView>
        <Text style={styles.resultCount}>
            {filteredExercises.length} exercises
        </Text>

        {filteredExercises.map((exercise) => (
        <Pressable
          key={exercise.id}
          onPress={() => setSelectedExercise(exercise)}
          style={({ pressed }) => [
          styles.exerciseCard,
          pressed && { opacity: 0.75 },
          ]}>

            <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{exercise.level}</Text>
        </View>

        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseMeta}>
            {exercise.muscle} · {exercise.equipment}
        </Text>
    </Pressable>
))}
      </ScrollView>

<Modal
  visible={selectedExercise !== null}
  transparent
  animationType="fade"
  onRequestClose={() => setSelectedExercise(null)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalCard}>
      {selectedExercise && (
        <>
          <View style={styles.modalHeader}>
            <Text style={styles.levelText}>
              {selectedExercise.level}
            </Text>

            <Pressable onPress={() => setSelectedExercise(null)}>
              <Text style={styles.modalCloseIcon}>×</Text>
            </Pressable>
          </View>

          <Text style={styles.modalTitle}>
            {selectedExercise.name}
          </Text>

          <Text style={styles.modalMeta}>
            Muscle group: {selectedExercise.muscle}
          </Text>

          <Text style={styles.modalMeta}>
            Equipment: {selectedExercise.equipment}
          </Text>

          <Text style={styles.modalDescriptionTitle}>Description</Text>

          <Text style={styles.modalDescription}>
            {selectedExercise.description}
          </Text>

          <Pressable
            onPress={() => setSelectedExercise(null)}
            style={styles.modalCloseButton}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </Pressable>
        </>
      )}
    </View>
  </View>
</Modal>

<BottomNav />
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
    color: '#6B7280',
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
    marginBottom: 22,
  },
  resultCount: {
  color: '#667085',
  fontSize: 13,
  fontWeight: '700',
  marginBottom: 12,
},
exerciseCard: {
  backgroundColor: '#FFFFFF',
  borderColor: '#E8EBF0',
  borderRadius: 18,
  borderWidth: 1,
  marginBottom: 12,
  padding: 17,
},
levelBadge: {
  alignSelf: 'flex-start',
  backgroundColor: '#F0F2F6',
  borderRadius: 12,
  paddingHorizontal: 10,
  paddingVertical: 6,
},
levelText: {
  color: '#475467',
  fontSize: 11,
  fontWeight: '700',
},
exerciseName: {
  color: '#172B4D',
  fontSize: 17,
  fontWeight: '800',
  marginTop: 14,
},
exerciseMeta: {
  color: '#667085',
  fontSize: 13,
  marginTop: 6,
},
searchInput: {
  backgroundColor: '#FFFFFF',
  borderColor: '#E2E6ED',
  borderRadius: 14,
  borderWidth: 1,
  color: '#111827',
  fontSize: 15,
  paddingHorizontal: 16,
  paddingVertical: 14,
  marginBottom: 18,
},
filterList: {
  gap: 9,
  paddingVertical: 18,
},
filterButton: {
  backgroundColor: '#FFFFFF',
  borderColor: '#E2E6ED',
  borderRadius: 18,
  borderWidth: 1,
  paddingHorizontal: 15,
  paddingVertical: 9,
},
filterButtonSelected: {
  backgroundColor: '#172B4D',
  borderColor: '#172B4D',
},
filterText: {
  color: '#475467',
  fontSize: 13,
  fontWeight: '700',
},
filterTextSelected: {
  color: '#FFFFFF',
},
backButton: {
  alignSelf: 'flex-start',
  marginBottom: 14,
  paddingVertical: 6,
},
backButtonText: {
  color: '#402f9b',
  fontSize: 14,
  fontWeight: '700',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  padding: 24,
},
modalCard: {
  alignSelf: 'center',
  backgroundColor: '#FFFFFF',
  borderColor: '#E8EBF0',
  borderRadius: 20,
  borderWidth: 1,
  maxWidth: 480,
  padding: 20,
  width: '100%',
},
modalHeader: {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
},
modalCloseIcon: {
  color: '#667085',
  fontSize: 28,
  fontWeight: '600',
  paddingHorizontal: 6,
},
modalTitle: {
  color: '#172B4D',
  fontSize: 23,
  fontWeight: '800',
  marginTop: 16,
},
modalMeta: {
  color: '#667085',
  fontSize: 14,
  marginTop: 10,
},
modalDescriptionTitle: {
  color: '#172B4D',
  fontSize: 13,
  fontWeight: '800',
  marginTop: 20,
},
modalDescription: {
  color: '#667085',
  fontSize: 14,
  lineHeight: 21,
  marginTop: 7,
},
modalCloseButton: {
  alignItems: 'center',
  backgroundColor: '#172B4D',
  borderRadius: 12,
  marginTop: 22,
  paddingVertical: 13,
},
modalCloseButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '800',
},
})