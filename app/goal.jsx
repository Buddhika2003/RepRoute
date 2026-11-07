import { useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'

export default function GoalsScreen() {

    const [title, setTitle] = useState('')
    const [target, setTarget] = useState('')
    
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
})