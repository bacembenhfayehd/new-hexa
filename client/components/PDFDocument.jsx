'use client'
import {  Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


export const PDFDocument = ({ composition, userInfo, cropType, quantity, unit, additionalElements }) => {
  const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
    header: { fontSize: 24, marginBottom: 20, color: '#166534', textAlign: 'center' },
    section: { marginBottom: 15 },
    title: { fontSize: 16, marginBottom: 10, fontWeight: 'bold', color: '#1e293b' },
    row: { flexDirection: 'row', marginBottom: 5 },
    label: { width: '40%', fontWeight: 'bold' },
    value: { width: '60%' },
    formula: { fontSize: 20, textAlign: 'center', marginVertical: 15, color: '#16a34a' },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Formulation d'Engrais</Text>
        
        <Text style={styles.formula}>
          NPK: {composition.N}-{composition.P}-{composition.K}
        </Text>

        <View style={styles.section}>
          <Text style={styles.title}>Informations Client</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nom:</Text>
            <Text style={styles.value}>{userInfo.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userInfo.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Téléphone:</Text>
            <Text style={styles.value}>{userInfo.phone}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Composition</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Azote (N):</Text>
            <Text style={styles.value}>{composition.N}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phosphore (P):</Text>
            <Text style={styles.value}>{composition.P}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Potassium (K):</Text>
            <Text style={styles.value}>{composition.K}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Calcium (CaO):</Text>
            <Text style={styles.value}>{composition.CaO}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Magnésium (MgO):</Text>
            <Text style={styles.value}>{composition.MgO}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Soufre (SO₃):</Text>
            <Text style={styles.value}>{composition.SO3}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Quantité</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Quantité commandée:</Text>
            <Text style={styles.value}>{quantity} {unit}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};