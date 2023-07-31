export default (virtualVisit) => (
  `DemoRecoverPT_${
    virtualVisit.appointmentDate
  }_${
    virtualVisit.appointmentTime
  }_${
    virtualVisit.patientId || virtualVisit.patient.id
  }_${
    virtualVisit.healthCareProviderId || virtualVisit.healthCareProvider.id
  }`
);
