import { useState } from 'react'
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'

const initialGoals = [
  {
    id: 'goal-1',
    title: 'Train consistently',
    target: 'Complete 3 workouts each week',
    category: 'Consistency',
  },
]

export default function GoalsScreen() {

    const [title, setTitle] = useState('')
    const [target, setTarget] = useState('')
    const [goals, setGoals] = useState(initialGoals)

    function addGoal() {
        const cleanTitle = title.trim()
        const cleanTarget = target.trim()

        if (!cleanTitle || !cleanTarget) {
            Alert.alert('Missing information', 'Enter a goal and its target.')
            return
        }

        const newGoal = {
            id: `${Date.now()}`,
            title: cleanTitle,
            target: cleanTarget,
            category: 'Personal goal',
        }

        setGoals((currentGoals) => [newGoal, ...currentGoals])
        setTitle('')
        setTarget('')
        }
    function removeGoal(goalId) {
        Alert.alert(
            'Remove goal?',
            'This goal will be removed from the list.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () =>
                    setGoals((currentGoals) =>
                        currentGoals.filter((goal) => goal.id !== goalId)
                    ),
                },
                ]
            )
            }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>YOUR PLAN</Text>
        <Text style={styles.title}>Goals</Text>
        <Text style={styles.subtitle}>
          Set a clear target and keep your training focused.
        </Text>
        <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Create a goal</Text>

            <Text style={styles.label}>Goal name</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="For example, Build a weekly routine"
                placeholderTextColor="#87909E"
                style={styles.input}
                maxLength={60}/>

            <Text style={styles.label}>Target</Text>
            <TextInput
                value={target}
                onChangeText={setTarget}
                placeholder="For example, Train 3 times per week"
                placeholderTextColor="#87909E"
                style={styles.input}
                maxLength={ 100}/>
            <Pressable
                onPress={addGoal}
                style={({ pressed }) => [
                    styles.addButton,
                    pressed && styles.buttonPressed,
                    ]}>
                <Text style={styles.addButtonText}>Add goal</Text>
            </Pressable>
        </View>
        <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Your goals</Text>
            <Text style={styles.count}>{goals.length}</Text>
            </View>

            {goals.length === 0 ? (
            <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No goals yet</Text>
                <Text style={styles.emptyText}>
                Add a goal above to give your training a target.
                </Text>
            </View>
            ) : (
            goals.map((goal) => (
                <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalTopRow}>
                <View style={styles.goalIcon}>
                    <Text style={styles.goalIconText}>◎</Text>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${goal.title}`}
                    onPress={() => removeGoal(goal.id)}
                    style={styles.removeButton}>

                    <Text style={styles.removeButtonText}>Remove</Text>
                </Pressable>
                </View>

                <Text style={styles.goalCategory}>{goal.category}</Text>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalTarget}>{goal.target}</Text>
                </View>
            ))
            )}
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
  formCard: {
  backgroundColor: '#FFFFFF',
  borderColor: '#E8EBF0',
  borderRadius: 18,
  borderWidth: 1,
  padding: 18,
},
sectionTitle: {
  color: '#172B4D',
  fontSize: 18,
  fontWeight: '800',
},
label: {
  color: '#344054',
  fontSize: 13,
  fontWeight: '700',
  marginBottom: 7,
  marginTop: 17,
},
input: {
  backgroundColor: '#FFFFFF',
  borderColor: '#D9DEE7',
  borderRadius: 12,
  borderWidth: 1,
  color: '#172B4D',
  fontSize: 14,
  paddingHorizontal: 13,
  paddingVertical: 12,
},
addButton: {
  alignItems: 'center',
  backgroundColor: '#11845B',
  borderRadius: 12,
  marginTop: 18,
  paddingVertical: 14,
},
buttonPressed: {
  opacity: 0.8,
},
addButtonText: {
  color: '#FFFFFF',
  fontSize: 15,
  fontWeight: '800',
},
listHeader: {
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: 12,
  marginTop: 25,
},
count: {
  backgroundColor: '#E5F4ED',
  borderRadius: 10,
  color: '#11845B',
  fontSize: 12,
  fontWeight: '800',
  marginLeft: 9,
  overflow: 'hidden',
  paddingHorizontal: 9,
  paddingVertical: 4,
},
goalCard: {
  backgroundColor: '#FFFFFF',
  borderColor: '#E8EBF0',
  borderRadius: 18,
  borderWidth: 1,
  marginBottom: 12,
  padding: 17,
},
goalTopRow: {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
},
goalIcon: {
  alignItems: 'center',
  backgroundColor: '#E9F7F1',
  borderRadius: 12,
  height: 42,
  justifyContent: 'center',
  width: 42,
},
goalIconText: {
  color: '#11845B',
  fontSize: 25,
  fontWeight: '800',
},
goalCategory: {
  color: '#11845B',
  fontSize: 11,
  fontWeight: '800',
  letterSpacing: 0.7,
  marginTop: 14,
  textTransform: 'uppercase',
},
goalTitle: {
  color: '#172B4D',
  fontSize: 17,
  fontWeight: '800',
  marginTop: 5,
},
goalTarget: {
  color: '#667085',
  fontSize: 14,
  lineHeight: 20,
  marginTop: 6,
},
emptyCard: {
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 18,
  padding: 24,
},
emptyTitle: {
  color: '#172B4D',
  fontSize: 16,
  fontWeight: '800',
},
emptyText: {
  color: '#667085',
  fontSize: 13,
  lineHeight: 20,
  marginTop: 7,
  textAlign: 'center',
},
removeButton: {
  paddingHorizontal: 8,
  paddingVertical: 7,
},
removeButtonText: {
  color: '#B42318',
  fontSize: 12,
  fontWeight: '700',
},
})