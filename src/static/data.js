const heightOptions = [
  { label: '3ft 6in', key: '1' },
  { label: '4ft 6in', key: '2' },
  { label: '4ft 7in', key: '3' },
  { label: '4ft 8in', key: '4' },
  { label: '4ft 9in', key: '5' },
  { label: '4ft 10in', key: '6' },
  { label: '4ft 11in', key: '7' },
  { label: '5ft', key: '8' },
  { label: '5ft 1in', key: '9' },
  { label: '5ft 2in', key: '10' },
  { label: '5ft 3in', key: '11' },
  { label: '5ft 4in', key: '12' },
  { label: '5ft 5in', key: '13' },
  { label: '5ft 6in', key: '14' },
  { label: '5ft 7in', key: '15' },
  { label: '5ft 8in', key: '16' },
  { label: '5ft 9in', key: '17' },
  { label: '5ft 10in', key: '18' },
  { label: '5ft 11in', key: '19' },
  { label: '6ft', key: '20' },
  { label: '6ft 1in', key: '21' },
  { label: '6ft 2in', key: '22' },
  { label: '6ft 3in', key: '23' },
]

const educationLevels = [
  {
    key: 1,
    country: 'India',
    level: 'Secondary',
    name: 'SSLC (10th Standard)',
    duration: '10 years',
  },
  {
    key: 2,
    country: 'India',
    level: 'Senior Secondary',
    name: 'Plus Two (12th Standard)',
    duration: '12 years',
  },
  {
    key: 3,
    country: 'India',
    level: 'Undergraduate',
    name: 'Bachelor’s Degree',
    duration: '3-4 years',
  },

  {
    key: 4,
    country: 'USA',
    level: 'High School',
    name: 'High School Diploma',
    duration: '12 years',
  },
  {
    key: 5,
    country: 'USA',
    level: 'Undergraduate',
    name: 'Associate’s/Bachelor’s Degree',
    duration: '2-4 years',
  },
  {
    key: 6,
    country: 'USA',
    level: 'Postgraduate',
    name: 'Master’s Degree',
    duration: '2 years',
  },

  {
    key: 7,
    country: 'UK',
    level: 'Secondary',
    name: 'GCSE',
    duration: '11 years',
  },
  {
    key: 8,
    country: 'UK',
    level: 'Pre-University',
    name: 'A-Levels',
    duration: '13 years',
  },
  {
    key: 9,
    country: 'UK',
    level: 'Undergraduate',
    name: 'Bachelor’s Degree',
    duration: '3-4 years',
  },

  {
    key: 10,
    country: 'Germany',
    level: 'Secondary',
    name: 'Hauptschulabschluss',
    duration: '9-10 years',
  },
  {
    key: 11,
    country: 'Germany',
    level: 'Vocational',
    name: 'Ausbildung',
    duration: '2-3 years',
  },
  {
    key: 12,
    country: 'Germany',
    level: 'University',
    name: 'Bachelor’s Degree',
    duration: '3 years',
  },

  {
    key: 13,
    country: 'France',
    level: 'Secondary',
    name: 'Brevet',
    duration: '9 years',
  },
  {
    key: 14,
    country: 'France',
    level: 'Pre-University',
    name: 'Baccalauréat',
    duration: '12 years',
  },
  {
    key: 15,
    country: 'France',
    level: 'University',
    name: 'Licence (Bachelor’s Degree)',
    duration: '3 years',
  },

  {
    key: 16,
    country: 'China',
    level: 'Secondary',
    name: 'Zhongkao',
    duration: '9 years',
  },
  {
    key: 17,
    country: 'China',
    level: 'University Entrance',
    name: 'Gaokao',
    duration: '12 years',
  },
  {
    key: 18,
    country: 'China',
    level: 'University',
    name: 'Benke (Bachelor’s Degree)',
    duration: '4 years',
  },

  {
    key: 19,
    country: 'Japan',
    level: 'Secondary',
    name: 'Chūgakkō',
    duration: '9 years',
  },
  {
    key: 20,
    country: 'Japan',
    level: 'Senior Secondary',
    name: 'Kōtōgakkō',
    duration: '12 years',
  },
  {
    key: 21,
    country: 'Japan',
    level: 'University',
    name: 'Gakushi (Bachelor’s Degree)',
    duration: '4 years',
  },

  {
    key: 22,
    country: 'Australia',
    level: 'High School',
    name: 'Senior Secondary Certificate',
    duration: '12 years',
  },
  {
    key: 23,
    country: 'Australia',
    level: 'Vocational',
    name: 'TAFE Diploma',
    duration: '1-2 years',
  },
  {
    key: 24,
    country: 'Australia',
    level: 'University',
    name: 'Bachelor’s Degree',
    duration: '3-4 years',
  },

  {
    key: 25,
    country: 'Brazil',
    level: 'Secondary',
    name: 'Ensino Médio',
    duration: '12 years',
  },
  {
    key: 26,
    country: 'Brazil',
    level: 'Vocational',
    name: 'Técnico',
    duration: '1-3 years',
  },
  {
    key: 27,
    country: 'Brazil',
    level: 'University',
    name: 'Bacharelado (Bachelor’s Degree)',
    duration: '3-5 years',
  },

  {
    key: 28,
    country: 'South Africa',
    level: 'Secondary',
    name: 'Matric (National Senior Certificate)',
    duration: '12 years',
  },
  {
    key: 29,
    country: 'South Africa',
    level: 'Vocational',
    name: 'Diploma (TVET College)',
    duration: '1-3 years',
  },
  {
    key: 30,
    country: 'South Africa',
    level: 'University',
    name: 'Bachelor’s Degree',
    duration: '3-4 years',
  },

  {
    key: 31,
    country: 'Russia',
    level: 'Secondary',
    name: 'Attestat',
    duration: '11 years',
  },
  {
    key: 32,
    country: 'Russia',
    level: 'Vocational',
    name: 'Technical Diploma',
    duration: '2-4 years',
  },
  {
    key: 33,
    country: 'Russia',
    level: 'University',
    name: 'Bakalavr (Bachelor’s Degree)',
    duration: '4 years',
  },

  {
    key: 34,
    country: 'Saudi Arabia',
    level: 'Secondary',
    name: 'Thanawiya Amma',
    duration: '12 years',
  },
  {
    key: 35,
    country: 'Saudi Arabia',
    level: 'Vocational',
    name: 'Diploma',
    duration: '1-2 years',
  },
  {
    key: 36,
    country: 'Saudi Arabia',
    level: 'University',
    name: 'Bachelor’s Degree',
    duration: '4 years',
  },

  {
    key: 37,
    country: 'Mexico',
    level: 'Secondary',
    name: 'Secundaria',
    duration: '9 years',
  },
  {
    key: 38,
    country: 'Mexico',
    level: 'High School',
    name: 'Preparatoria',
    duration: '12 years',
  },
  {
    key: 39,
    country: 'Mexico',
    level: 'University',
    name: 'Licenciatura (Bachelor’s Degree)',
    duration: '4-5 years',
  },

  {
    key: 40,
    country: 'Egypt',
    level: 'Secondary',
    name: 'Thanaweya Amma',
    duration: '12 years',
  },
  {
    key: 41,
    country: 'Egypt',
    level: 'Vocational',
    name: 'Diploma',
    duration: '2-3 years',
  },
  {
    key: 42,
    country: 'Egypt',
    level: 'University',
    name: 'Bachelor’s Degree',
    duration: '4 years',
  },

  {
    key: 43,
    country: 'Afghanistan',
    level: 'Secondary',
    name: 'Baccalaureate (12th Grade)',
    duration: '12 years',
  },
  {
    key: 44,
    country: 'Afghanistan',
    level: 'Vocational',
    name: 'Technical Diploma',
    duration: '1-3 years',
  },
  {
    key: 45,
    country: 'Afghanistan',
    level: 'University',
    name: 'Bachelor’s Degree',
    duration: '4 years',
  },
]

const bodyTypeOptions = ['Lean', 'Fit', 'Fat', 'No Preference']

const salaryRanges = [
  {
    country: 'India',
    ranges: [
      { key: 1, label: '0-1 Lakh' },
      { key: 2, label: '1-2 Lakh' },
      { key: 3, label: '2-3 Lakh' },
      { key: 4, label: '3-4 Lakh' },
      { key: 5, label: '4-5 Lakh' },
      { key: 6, label: '5-6 Lakh' },
      { key: 7, label: '6-7 Lakh' },
      { key: 8, label: '7-8 Lakh' },
      { key: 9, label: '8-9 Lakh' },
      { key: 10, label: '9-10 Lakh' },
      { key: 11, label: '10-15 Lakh' },
      { key: 12, label: '15-20 Lakh' },
      { key: 13, label: '20-25 Lakh' },
      { key: 14, label: '25-30 Lakh' },
      { key: 15, label: '30+ Lakh' },
    ],
  },
  {
    country: 'USA',
    ranges: [
      { key: 1, label: '$0-20K' },
      { key: 2, label: '$20K-40K' },
      { key: 3, label: '$40K-60K' },
      { key: 4, label: '$60K-80K' },
      { key: 5, label: '$80K-100K' },
      { key: 6, label: '$100K-150K' },
      { key: 7, label: '$150K-200K' },
      { key: 8, label: '$200K-250K' },
      { key: 9, label: '$250K+' },
    ],
  },
  {
    country: 'Afghanistan',
    ranges: [
      { key: 1, label: 'AFN 0-100K' },
      { key: 2, label: 'AFN 100K-200K' },
      { key: 3, label: 'AFN 200K-400K' },
      { key: 4, label: 'AFN 400K+' },
    ],
  },
  {
    country: 'Andorra',
    ranges: [
      { key: 1, label: '€0-20K' },
      { key: 2, label: '€20K-40K' },
      { key: 3, label: '€40K-60K' },
      { key: 4, label: '€60K+' },
    ],
  },
  {
    country: 'Austria',
    ranges: [
      { key: 1, label: '€0-25K' },
      { key: 2, label: '€25K-50K' },
      { key: 3, label: '€50K-75K' },
      { key: 4, label: '€75K-100K' },
      { key: 5, label: '€100K+' },
    ],
  },
  {
    country: 'Australia',
    ranges: [
      { key: 1, label: 'AUD 0-30K' },
      { key: 2, label: 'AUD 30K-50K' },
      { key: 3, label: 'AUD 50K-80K' },
      { key: 4, label: 'AUD 80K-120K' },
      { key: 5, label: 'AUD 120K+' },
    ],
  },
  {
    country: 'Azerbaijan',
    ranges: [
      { key: 1, label: 'AZN 0-10K' },
      { key: 2, label: 'AZN 10K-20K' },
      { key: 3, label: 'AZN 20K-40K' },
      { key: 4, label: 'AZN 40K+' },
    ],
  },
  {
    country: 'Angola',
    ranges: [
      { key: 1, label: 'AOA 0-500K' },
      { key: 2, label: 'AOA 500K-1M' },
      { key: 3, label: 'AOA 1M-2M' },
      { key: 4, label: 'AOA 2M+' },
    ],
  },
  {
    country: 'The Bahamas',
    ranges: [
      { key: 1, label: 'BSD 0-30K' },
      { key: 2, label: 'BSD 30K-60K' },
      { key: 3, label: 'BSD 60K-100K' },
      { key: 4, label: 'BSD 100K+' },
    ],
  },
]

const weightOptions = ['31-45kg', '46-60kg', '61-75kg', '76-90kg', '91-100kg', '100kg and above']

export { heightOptions, weightOptions, educationLevels, salaryRanges, bodyTypeOptions }
