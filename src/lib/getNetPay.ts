import incomeTaxTable from "@/data/taxTable.json";

const taxingStandardRanges = [
  14000000, 50000000, 88000000, 150000000, 300000000, 500000000, 1000000000,
];

const incomeDeductionRanges = [5000000, 15000000, 45000000, 100000000];

const f = (v: number) => (v < 0 ? 0 : v);

const getIncomeTax = (preSalary: number, fammilyCount = 1) => {
  const monthPreSalary = preSalary / 12;
  const hundredMillionTax = [
    1507400, 1431570, 1200840, 1170840, 1140840, 1110840, 1080840, 1050840,
    1020840, 990840, 960840,
  ];

  if (preSalary === 100000000) {
    return hundredMillionTax[fammilyCount - 1] * 12;
  }

  if (100000000 <= preSalary && preSalary < 140000000) {
    return (
      hundredMillionTax[fammilyCount - 1] +
      (preSalary - 100000000) * 0.98 * 0.35 +
      25000
    );
  }

  if (140000000 <= preSalary) {
    return (
      hundredMillionTax[fammilyCount - 1] +
      1397000 +
      (preSalary - 140000000) * 0.98 * 0.38
    );
  }

  const tax: any = incomeTaxTable.find((v) => {
    let min, max;
    if (v.min && v.max) {
      min = Number(v.min + "000");
      max = Number(v.max + "000");

      if (min <= monthPreSalary && monthPreSalary < max) {
        return v;
      }
    }
  });

  return tax ? Number(tax[fammilyCount.toString()]) * 12 : 0;
};

/**
 * @param {Number} y - 과세표준
 * @returns {Number} - 소득세
 */
const tax = (y: number): number => {
  // y는 세전연봉이 아닌 '과세표준'임 (deducible로 계산된 공제항목들 및 4대보험이 공제된 금액)
  // 참고: https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2312&cntntsId=7711
  if (y <= taxingStandardRanges[0]) return y * 0.06;
  if (y <= taxingStandardRanges[1]) return y * 0.15 - 1260000;
  if (y <= taxingStandardRanges[2]) return y * 0.24 - 5760000;
  if (y <= taxingStandardRanges[3]) return y * 0.35 - 15440000;
  if (y <= taxingStandardRanges[4]) return y * 0.38 - 19940000;
  if (y <= taxingStandardRanges[5]) return y * 0.4 - 25940000;
  if (y <= taxingStandardRanges[6]) return y * 0.42 - 35940000;
  return y * 0.45 - 65940000;
};

/**
 * @param {Number} y - 세전연봉
 * @param {Number} numFamily - 부양가족수 (본인포함)
 * @param {Number} nonTax - 비과세
 */
const calculateDeducible = (y: number, numFamily: number, nonTax: number) => {
  return {
    // 소득공제
    income: () => {
      if (y <= incomeDeductionRanges[0]) return y * 0.7;
      else if (y <= incomeDeductionRanges[1])
        return 3500000 + (y - incomeDeductionRanges[0]) * 0.4;
      else if (y <= incomeDeductionRanges[2])
        return 7500000 + (y - incomeDeductionRanges[1]) * 0.15;
      else if (y <= incomeDeductionRanges[3])
        return 12000000 + (y - incomeDeductionRanges[2]) * 0.05;
      else return 14750000 + (y - incomeDeductionRanges[3]) * 0.02;
    },
    // 소득세액공제
    tax: () => {
      const arr2 = [33000000, 70000000];
      if (y < 740000) return y;
      else if (y <= arr2[0]) return 740000;
      else if (y <= arr2[1])
        return Math.max(660000, 740000 - (y - arr2[0]) * 0.008);
      else return Math.max(500000, 660000 - (y - arr2[1]) * 0.5);
    },
    // 인적공제
    family: () => {
      return y < 1500000 ? y : 1500000 * numFamily;
    },
    // 비과세
    nonTax: () => {
      return y < nonTax ? y : nonTax;
    },
  };
};

export interface SalaryReport {
  pension: Number;
  health: Number;
  care: Number;
  hire: Number;
  taxDeduction: Number;
  incomeDeduction: Number;
  familyDeduction: Number;
  nonTaxDeduction: Number;
  taxOn: Number;
  incomeTax: Number;
  incomeTaxLocal: Number;
  totalTax: Number;
  preTax: Number;
  afterTax: Number;
}

/**
 * 세전연봉, 과세금액, 과세표준은 다 다른 개념이기 때문에 이 부분을 주의깊이 읽어주세요.
 *
 * 세전연봉: 말그대로 연봉계약서에 기재되는 금액입니다.
 * 과세금액: 세전연봉 - 비과세
 * 과세표준: 과세금액에서 공제항목들을 다 공제하고 난, 소득세 산정의 대상이 되는 금액.
 *
 * @param {Number} preTax - 세전연봉
 * @param {Number} numFamily - 인적공제
 * @param {Number} nonTax - 비과세
 * @returns {SalaryReport} - 이 항목들을 토대로 프론트엔드 구현
 */
const getNetPay = (
  preTax: number = 22000000,
  numFamily: number = 1,
  nonTax: number = 0,
): SalaryReport => {
  let pension = f((preTax - nonTax) * 0.045); // 국민연금 (과세금액의 4.5%)

  if (pension > 235800 * 12) pension = 235800 * 12; // 국민연금 상한: 월 235,800원

  const health = f((preTax - nonTax) * 0.03545); // 건강보험 (과세금액의 3.545%)

  const care = f(health * 0.1295); // 장기요양 (건강보험료의 12.81%)

  const hire = f((preTax - nonTax) * 0.009); // 고용보험 (과세금액의 0.9%)

  const deducibleCalculator = calculateDeducible(preTax, numFamily, nonTax);

  const taxDeduction = deducibleCalculator.tax();

  const incomeDeduction = deducibleCalculator.income();

  const familyDeduction = deducibleCalculator.family();

  const nonTaxDeduction = deducibleCalculator.nonTax();

  const taxOn = f(
    preTax -
      pension -
      health -
      care -
      hire -
      incomeDeduction -
      taxDeduction -
      familyDeduction -
      nonTaxDeduction,
  ); // 과세표준

  // const incomeTax = tax(taxOn); // 소득세
  const incomeTax = getIncomeTax(preTax); // 소득세

  const incomeTaxLocal = incomeTax * 0.1; // 지방소득세

  const totalTax = pension + health + care + hire + incomeTax + incomeTaxLocal; // 총 공제 (공제액 & 세액 합산)

  const afterTax = preTax - totalTax; // 세후

  return {
    pension,
    health,
    care,
    hire,
    taxDeduction,
    incomeDeduction,
    familyDeduction,
    nonTaxDeduction,
    taxOn,
    incomeTax,
    incomeTaxLocal,
    totalTax,
    preTax,
    afterTax,
  };
};

export default getNetPay;
