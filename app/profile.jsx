import { useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'

export default function ProfileScreen() {
    const [name, setName] = useState('Athlete')
    const [weeklyTarget, setWeeklyTarget] = useState('3')
    
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>
          Personalize your training experience.
        </Text>
        <View style={styles.profileCard}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                {name.trim() ? name.trim()[0].toUpperCase() : 'A'}
                </Text>
            </View>
            <Text style={styles.profileName}>{name.trim() || 'Athlete'}</Text>
            <Text style={styles.profileCaption}>RepRoute member</Text>
        </View>

        <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Training profile</Text>

            <Text style={styles.label}>Display name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#87909E"
                style={styles.input}
                maxLength={40}/>

            <Text style={styles.label}>Weekly workout target</Text>
            <TextInput
                value={weeklyTarget}
                onChangeText={setWeeklyTarget}
                keyboardType="number-pad"
                placeholder="3"
                placeholderTextColor="#87909E"
                style={styles.input}/>
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
  profileCard: {
  alignItems: 'center',
  backgroundColor: '#172B4D',
  borderRadius: 20,
  marginBottom: 16,
  padding: 22,
},
avatar: {
  alignItems: 'center',
  backgroundColor: '#B9F56B',
  borderRadius: 31,
  height: 62,
  justifyContent: 'center',
  width: 62,
},
avatarText: {
  color: '#172B4D',
  fontSize: 25,
  fontWeight: '900',
},
profileName: {
  color: '#FFFFFF',
  fontSize: 20,
  fontWeight: '800',
  marginTop: 12,
},
profileCaption: {
  color: '#BCC9D9',
  fontSize: 13,
  marginTop: 5,
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
  marginTop: 16,
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