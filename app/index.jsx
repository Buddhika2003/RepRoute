import { StyleSheet, Text, View } from 'react-native'

export default function DashboardScreen() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>R</Text>
            </View>

            <View style={styles.brandCopy}>
              <Text style={styles.brandName}>RepRoute</Text>
              <Text style={styles.brandTagline}>TRAIN WITH INTENTION</Text>
            </View>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>
          </View>

          <Text style={styles.dateLabel}>{today.toUpperCase()}</Text>
          <Text style={styles.greeting}>Your progress</Text>
          <Text style={styles.subtitle}>
            Every workout is a step forward.
          </Text>

          
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F3F5F1',
  },
  scrollContent: {
    paddingTop: 18,
    paddingBottom: 36,
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#18372A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    color: '#B9F56B',
    fontSize: 23,
    fontWeight: '900',
  },
  brandCopy: {
    flex: 1,
    marginLeft: 10,
  },
  brandName: {
    color: '#17231D',
    fontSize: 17,
    fontWeight: '900',
  },
  brandTagline: {
    color: '#7E8982',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginTop: 3,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DDE8D5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#18372A',
    fontWeight: '900',
  },
  dateLabel: {
    color: '#3D702D',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  greeting: {
    color: '#17231D',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.7,
    marginTop: 6,
  },
  subtitle: {
    color: '#7E8982',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },
 
})