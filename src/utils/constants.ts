export const PREDEFINED_SECTIONS = [
  "Delhi-Agra Main Line",
  "Delhi-Ambala Main Line",
  "Mumbai-Pune Main Line",
  "Howrah-Barddhaman Main Line",
  "Chennai-Vijayawada Main Line",
  "Secunderabad-Kazipet Main Line",
  "Delhi-Mathura Branch",
  "Bhusawal Yard",
  "Vijayawada Yard",
  "Kalyan Yard",
  "Other (specify)"
];

export const DEPARTMENTS = [
  { value: "ENGINEERING", label: "Engineering" },
  { value: "SNT", label: "Signal & Telecom" },
  { value: "TRD", label: "TRD" }
] as const;

export const SEVERITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL"
] as const;

export const TYPES = [
  "ROUTINE",
  "EMERGENCY"
] as const;
