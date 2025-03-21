let meds = [
  {
    name: "paracetamol",
    company: "cipla",
    usedFor: "headache",
  },
];

module.exports = meds;

/* 
1. General Information
Medicine Name (string) – Generic name of the medicine.
Brand Names (array) – Common brand names associated with the generic medicine.
Category (string) – Type of medicine (e.g., Antibiotic, Painkiller, Antihistamine).
Uses (text) – Medical conditions the medicine is used to treat.
2. Composition & Ingredients
Active Ingredients (array) – Main compounds in the medicine.
Inactive Ingredients (array) – Binders, preservatives, etc.
Dosage Forms (array) – Tablet, syrup, injection, etc.
Strength (string) – Example: 500mg, 10mg/ml.
3. Prescription & Dosage
Dosage Guidelines (text) – Recommended dose for different conditions.
Age Restrictions (text) – Whether it's safe for children, elderly, etc.
Prescription Required (boolean) – Whether a doctor’s prescription is needed.
4. Side Effects & Warnings
Common Side Effects (array) – Example: nausea, dizziness, headache.
Severe Side Effects (array) – Example: liver damage, heart complications.
Contraindications (text) – When the medicine should not be used.
Drug Interactions (array) – Other medicines it interacts with negatively.
Alcohol & Food Warnings (text) – If it should be avoided with certain foods or alcohol.
Pregnancy & Breastfeeding Safety (string) – Whether it's safe or not.
5. Storage & Expiry
Storage Instructions (text) – Example: Store in a cool, dry place.
Shelf Life (string) – Example: 2 years from the date of manufacture.
6. Alternatives & Comparisons
Alternative Medicines (array) – List of similar medicines.
Comparisons (text) – Differences between similar medicines.
7. Accessibility & Availability
Availability (boolean) – Whether it's commonly available in pharmacies.
Price Range (string) – Estimated cost range.
Manufacturers (array) – Companies producing the medicine.
8. Additional Information
Images (array) – Pictures of the medicine, packaging, etc.
Reviews & Ratings (array) – User reviews on effectiveness.
Official References (array) – Links to WHO, FDA, or government databases.
*/
