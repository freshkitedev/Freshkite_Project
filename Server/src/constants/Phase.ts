export const PhaseEnum = {
    PHASE_1: { name: "Phase 1", price: 100 },
    PHASE_2: { name: "Phase 2", price: 200 },
    PHASE_3: { name: "Phase 3", price: 300 }
  } as const;
  
  export type PhaseKey = keyof typeof PhaseEnum; // "PHASE_1" | "PHASE_2" | "PHASE_3"
  export type PhaseValue = typeof PhaseEnum[PhaseKey]; // { name: string; price: number }
  