import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native'

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>
          Personalize your training experience.
        </Text>
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
})