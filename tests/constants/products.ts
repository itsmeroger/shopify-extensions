export const PRODUCT_MAP = {
  FULL_BODY_INTELLIGENCE: {
    TEST: { id: "39952562880548" },
    SUBSCRIPTION: {
      WITH_SUPPLEMENTS_BIOTICS_LOZENGES_GEL: {
        id: "41296344023076",
        plan: "14751924260",
      },
      WITH_SUPPLEMENTS_BIOTICS_LOZENGES: {
        id: "40749931036708",
        plan: "1577812004",
      },
      WITH_SUPPLEMENTS_BIOTICS: { id: "39953077010468", plan: "856981540" },
      WITH_SUPPLEMENTS_LOZENGES: { id: "41477584322596", plan: "17455415332" },
      WITH_SUPPLEMENTS: { id: "40426082500644", plan: "856752164" },
      WITH_BIOTICS: { id: "41477533925412", plan: "17455317028" },
      WITH_BIOTICS_LOZENGES: { id: "41477571280932", plan: "17455382564" },
      WITH_LOZENGES: { id: "41477568102436", plan: "17455349796" },
    },
  },

  GUT_INTELLIGENCE: {
    TEST: { id: "41224838086692" },
    SUBSCRIPTION: {
      WITH_SUPPLEMENTS_BIOTICS: { id: "40666994868260", plan: "856817700" },
      WITH_SUPPLEMENTS: { id: "41477593104420", plan: "17455448100" },
      WITH_BIOTICS: { id: "41131865931812", plan: "856948772" },
    },
  },

  ORAL_HEALTH_INTELLIGENCE: {
    TEST: { id: "40686857420836" },
    SUBSCRIPTION: {
      WITH_SUPPLEMENTS_LOZENGES: { id: "40686860828708", plan: "871727140" },
      WITH_SUPPLEMENTS: { id: "41477603524644", plan: "17455480868" },
      WITH_LOZENGES: { id: "40722729992228", plan: "878673956" },
    },
  },

  CANCER_DETECT: {
    TEST: { id: "39960472944676" },
  },

  ORAL_HEALTH_WITH_CANCER_DETECT_PRO: {
    TEST: { id: "40658362433572" },
  },
};

export const PRODUCT_SUBSCRIPTIONS = Object.values(PRODUCT_MAP).reduce(
  (acc, details) => {
    if ("SUBSCRIPTION" in details) {
      acc.push(...Object.values(details.SUBSCRIPTION));
    }

    return acc;
  },
  [] as { id: string; plan: string }[]
);

export const PRODUCT_TESTS = Object.values(PRODUCT_MAP).reduce(
  (acc, details) => {
    if ("TEST" in details) {
      acc.push(details.TEST);
    }

    return acc;
  },
  [] as { id: string }[]
);
