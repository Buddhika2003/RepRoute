import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'

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
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>TRAINING LIBRARY</Text>
        <Text style={styles.title}>Exercises</Text>
        <Text style={styles.subtitle}>
          Find an exercise and explore the muscles and equipment it uses.
        </Text>
        <Text style={styles.resultCount}>
  {exercises.length} exercises
</Text>

{exercises.map((exercise) => (
  <View key={exercise.id} style={styles.exerciseCard}>
    <View style={styles.levelBadge}>
      <Text style={styles.levelText}>{exercise.level}</Text>
    </View>

    <Text style={styles.exerciseName}>{exercise.name}</Text>
    <Text style={styles.exerciseMeta}>
      {exercise.muscle} · {exercise.equipment}
    </Text>
  </View>
))}
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
})