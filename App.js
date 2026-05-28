import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, I18nManager} from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const en = {
  title: 'QuickFly - Flight Search',
  from: 'From',
  to: 'To',
  date: 'Travel Date (YYYY-MM-DD)',
  passengers: 'Passengers',
  search: 'Search Tickets',
  book: 'Book Now',
  pleaseFill: 'Please fill all fields',
  noResults: 'No results'
};

const bn = {
  title: 'QuickFly - ফ্লাইট সার্চ',
  from: 'কোথা থেকে',
  to: 'কোথায়',
  date: 'যাত্রা তারিখ (YYYY-MM-DD)',
  passengers: 'যাত্রী সংখ্যা',
  search: 'টিকেট খুঁজুন',
  book: 'এখন বুক করুন',
  pleaseFill: 'সব ঘর পূরণ করুন',
  noResults: 'কোন ফলাফল নেই'
};

i18n.translations = { en, bn };
// default: use device locale if bn available else en
i18n.locale = Localization.locale.startsWith('bn') ? 'bn' : 'en';
i18n.fallbacks = true;

export default function App() {
  const [fromCity, setFromCity] = useState('Doha');
  const [toCity, setToCity] = useState('Dubai');
  const [date, setDate] = useState('2026-06-15');
  const [passengers, setPassengers] = useState('1');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState(i18n.locale);

  const switchLang = (l) => {
    i18n.locale = l;
    setLang(l);
    // optional: force RTL if Arabic later
    I18nManager.allowRTL(false);
  };

  const searchTickets = () => {
    if (!fromCity || !toCity || !date || !passengers) {
      alert(i18n.t('pleaseFill'));
      return;
    }
    setLoading(true);
    // demo results (simulate API)
    setTimeout(() => {
      const demoResults = [
        { id: '1', airline: 'Qatar Airways', price: '$220', time: '08:30 AM' },
        { id: '2', airline: 'Emirates', price: '$250', time: '01:15 PM' },
        { id: '3', airline: 'Turkish Airlines', price: '$310', time: '07:45 PM' },
      ];
      setTickets(demoResults);
      setLoading(false);
    }, 600);
  };

  const renderItem = ({item}) => (
    <View style={styles.ticketCard}>
      <Text style={styles.airline}>{item.airline}</Text>
      <Text style={styles.info}>Departure: {item.time}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity style={styles.bookBtn} onPress={() => {
        // external booking demo link (Google)
        const url = 'https://www.google.com/search?q=' + encodeURIComponent(item.airline + ' flight booking');
        // open in browser
        import('expo-linking').then(Linking => Linking.openURL(url));
      }}>
        <Text style={styles.bookText}>{i18n.t('book')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={styles.title}>{i18n.t('title')}</Text>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => switchLang('en')} style={[styles.langBtn, lang==='en' && styles.langActive]}>
            <Text>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchLang('bn')} style={[styles.langBtn, lang==='bn' && styles.langActive]}>
            <Text>BN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput style={styles.input} placeholder={i18n.t('from')} value={fromCity} onChangeText={setFromCity} />
      <TextInput style={styles.input} placeholder={i18n.t('to')} value={toCity} onChangeText={setToCity} />
      <TextInput style={styles.input} placeholder={i18n.t('date')} value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder={i18n.t('passengers')} value={passengers} onChangeText={setPassengers} keyboardType="numeric" />

      <TouchableOpacity style={styles.searchBtn} onPress={searchTickets}><Text style={styles.searchText}>{i18n.t('search')}</Text></TouchableOpacity>

      {loading ? <Text style={{textAlign:'center'}}>Loading...</Text> : (
        tickets.length === 0 ? <Text style={{textAlign:'center', marginTop:10}}>{i18n.t('noResults')}</Text> :
        <FlatList data={tickets} keyExtractor={item=>item.id} renderItem={renderItem} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#f2f2f2', padding:20},
  title: {fontSize:20, fontWeight:'bold', marginBottom:12},
  input: {backgroundColor:'#fff', padding:12, borderRadius:10, marginBottom:10, fontSize:16},
  searchBtn: {backgroundColor:'#0a84ff', padding:14, borderRadius:10, marginBottom:12},
  searchText: {color:'#fff', textAlign:'center', fontWeight:'bold'},
  ticketCard: {backgroundColor:'#fff', padding:14, borderRadius:10, marginBottom:12},
  airline: {fontSize:18, fontWeight:'bold'},
  info: {fontSize:14, marginBottom:6},
  price: {fontSize:18, color:'green', fontWeight:'bold', marginBottom:8},
  bookBtn: {backgroundColor:'#34c759', padding:10, borderRadius:8},
  bookText: {color:'#fff', textAlign:'center', fontWeight:'bold'},
  langBtn: {padding:6, marginLeft:6, borderRadius:6, backgroundColor:'#e6e6e6'},
  langActive: {backgroundColor:'#cde7ff'}
});