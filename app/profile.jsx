import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native'
import BottomNav from '../component/bottomNav'
import { useTheme } from '../context/ThemeContext'
import { loadLocalData, saveLocalData, STORAGE_KEYS } from '../storage/localStorage'



export default function ProfileScreen() {
    const [name, setName] = useState('Athlete')
    const [weeklyTarget, setWeeklyTarget] = useState('3')
    
    const { theme, colors, toggleTheme } = useTheme()

    useEffect(() => {
      let isMounted = true

        async function loadProfile() {
          const savedProfile = await loadLocalData(
            STORAGE_KEYS.profile,
            null
          )

          if (isMounted && savedProfile) {
            if (typeof savedProfile.name === 'string') {
              setName(savedProfile.name)
              }

            if (savedProfile.weeklyTarget !== undefined) {
              setWeeklyTarget(String(savedProfile.weeklyTarget))
            }
          }
          }

      loadProfile()

      return () => {
          isMounted = false
        }
      }, [])

    async function saveProfile() {
        const cleanName = name.trim()
        const target = Number(weeklyTarget)

        if (!cleanName) {
          showMessage('Name required', 'Enter your name to save your profile.')
          return
        }

        if (!Number.isInteger(target) || target < 1 || target > 14) {
          showMessage('Invalid target', 'Enter a weekly target from 1 to 14.')
          return
        }

  await saveLocalData(STORAGE_KEYS.profile, {
    name: cleanName,
    weeklyTarget: String(target),
  })

  setName(cleanName)
  setWeeklyTarget(String(target))
  showMessage('Profile updated', 'Your profile settings have been updated.')
}

function showMessage(title, message) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`)
    return
  }

    Alert.alert(title, message)
    }

function openScreen(route) {
    router.push(route)
    }

  return (
    <SafeAreaView
        style={
            [styles.safeArea, 
            { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Pressable
            onPress={() => router.push('/')}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>‹  Dashboard</Text>
        </Pressable>
        
        <Text style={[styles.eyebrow, { color: colors.primary }]}>YOUR ACCOUNT</Text>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Personalize your training experience.
        </Text>
        <View style={[
            styles.profileCard,
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
            },
            ]}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                {name.trim() ? name.trim()[0].toUpperCase() : 'A'}
                </Text>
            </View>
            
            <Text style={[styles.profileName, { color: colors.text }]}>
                {name.trim() || 'Athlete'}</Text>
            <Text style={[styles.profileCaption, { color: colors.muted }]}>
                RepRoute member</Text>
            
            </View>

        <View  style={[
            styles.formCard,
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
            },
            ]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Training profile</Text>

            <Text style={[styles.label, { color: colors.muted }]}>Display name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#87909E"
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                        color: colors.text,
                    },
                    ]}
                maxLength={40}/>

            <Text style={[styles.label, { color: colors.muted }]}>Weekly workout target</Text>
            <TextInput
                value={weeklyTarget}
                onChangeText={setWeeklyTarget}
                keyboardType="number-pad"
                placeholder="3"
                placeholderTextColor="#87909E"
                style={[
                    styles.input,
                        {
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                            color: colors.text,
                        },
                        ]}/>
            
            
            <Pressable
                onPress={saveProfile}
                style={({pressed}) => [
                    styles.saveButton,
                    pressed && styles.buttonPressed,
                    { backgroundColor: colors.primary }
                ]}>
                <Text
                    style={[
                    styles.saveButtonText,
                    { color: theme === 'dark' ? '#111B16' : '#FFFFFF' },
                ]}>
                Save
                </Text>
            </Pressable>
        </View>
        
        <View style={[
                styles.appearanceCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
                ]}>
            <View>
                <Text style={[styles.appearanceNote, { color: colors.muted }]}>Appearance</Text>
                <Text style={styles.appearanceNote}>
                {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                </Text>
            </View>

            <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: '#D0D5DD', true: '#3D702D' }}
                thumbColor={theme === 'dark' ? '#B9F56B' : '#FFFFFF'}/>
            </View>
                    <Text style={[styles.sectionTitleWithMargin, { color: colors.text }]}>Quick access</Text>

            <Pressable
                onPress={() => openScreen('/workout-log')}
                style={[
                    styles.linkCard,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}>
            <Text style={[styles.linkTitle,{color:colors.text}]}>Workout log</Text>
            <Text style={[styles.linkArrow,{color:colors.text}]}>›</Text>
            </Pressable>

            <Pressable
                onPress={() => openScreen('/exercises')}
                style={[
                    styles.linkCard,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}>
            <Text style={[styles.linkTitle,{color:colors.text}]}>Exercise library</Text>
            <Text style={[styles.linkArrow,{color:colors.text}]}>›</Text>
            </Pressable>
  
      </ScrollView>
      <BottomNav/>
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
saveButton:{
    alignItems: 'center',
    backgroundColor: '#1d9168',
    borderRadius: 15,
    padding: 15,
    marginTop:20,
},
saveButtonText:{
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800'
},
backButton:{
    alignSelf: 'flex-start',
    marginBottom:10,
    paddingVertical:6
},
backButtonText:{
    color:'#16146b',
    fontWeight: '600',
    fontSize:14
},
buttonPressed: {
  opacity: 0.8,
},
sectionTitleWithMargin: {
  color: '#172B4D',
  fontSize: 18,
  fontWeight: '800',
  marginBottom: 11,
  marginTop: 24,
},
linkCard: {
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderColor: '#E8EBF0',
  borderRadius: 14,
  borderWidth: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 9,
  paddingHorizontal: 16,
  paddingVertical: 15,
},
linkTitle: {
  color: '#172B4D',
  fontSize: 14,
  fontWeight: '700',
},
linkArrow: {
  color: '#11845B',
  fontSize: 22,
  fontWeight: '700',
},
appearanceCard: {
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderColor: '#E8EBF0',
  borderRadius: 18,
  borderWidth: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
  padding: 18,
},
appearanceNote: {
  color: '#667085',
  fontSize: 13,
  marginTop: 5,
},

})