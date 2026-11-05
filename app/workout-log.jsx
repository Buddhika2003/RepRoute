import { router } from 'expo-router'
import { useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

export default function WorkoutLogScreen() {

    const [exercise, setExercise] = useState('')
    const [sets, setSets] = useState('3')
    const [reps, setReps] = useState('10')
    const [weight, setWeight] = useState('')

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.backButton}>
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
</View>
      </ScrollView>
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
})