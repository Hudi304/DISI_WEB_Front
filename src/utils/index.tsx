import * as colors from "./colors";
import { defaultColors } from "./constants";

export type ScoreColor = {
  score: number;
  percent: number;
  color: string;
};

export enum ColorClassType {
  BORDER = "border-",
  TEXT = "text-",
  BACKGROUND = "bg-",
  NONE = "",
}

export const clamp = (value: number, low: number, high: number): number => {
  //? Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b)) found this but seems harder to read
  return value < low ? low : value > high ? high : value;
};

export const scoreToColor = (colorType: ColorClassType, score: number | undefined, colors?: ScoreColor[]): string => {
  let index = 0;
  if (score) {
    const clampedScore = clamp(score, 0, 5);
    index = Math.floor(clampedScore / 0.5 - 1);
  }
  return `${colorType}${colors ? colors[index]?.color : defaultColors[index].color}`;
};

export const percentToColor = (colorType: ColorClassType, score: number | undefined, colors?: ScoreColor[]): string => {
  let index = 0;
  if (score) {
    const clampedScore = Math.floor(clamp(score, 0, 100));
    index = Math.floor(clampedScore / 10 - 1);
  }
  return `${colorType}${colors ? colors[index]?.color : defaultColors[index].color}`;
};

export const normalizeRange = (range: { low: number; high: number }): { low: number; high: number } => {
  if (range.low < 0 && range.high > 0) {
    return { low: 0, high: range.high - range.low };
  }
  if (range.low < 0 && range.high < 0) {
    return { low: -range.high, high: -range.low };
  }
  return range;
};

//? range(-100,100) score 0 => yellow
export const rangeToColor = (
  colorType: ColorClassType,
  score: number | undefined,
  range: {
    low: number;
    high: number;
  },
  colors?: ScoreColor[]
): string => {
  let index = 0;
  if (score) {
    const normScore = range.low < 0 && range.high > 0 ? score - range.low : range.low < 0 && range.high < 0 ? -score : score;
    const normRange = normalizeRange(range);
    const clampedScore = clamp(normScore, normRange.low, normRange.high);

    const step = colors
      ? Math.floor(clampedScore / ((normRange.high - normRange.low) / colors.length))
      : Math.floor(clampedScore / ((normRange.high - normRange.low) / defaultColors.length));

    index = colors ? clamp(step, 0, colors.length - 1) : clamp(step, 0, defaultColors.length - 1);
  }
  return `${colorType}${colors ? colors[index]?.color : defaultColors[index].color}`;
};

export function findByKey(array: any[], key: string, value: any) {
  if (array) {
    return array?.find((item, index) => item[key] === value);
  } else {
    return undefined;
  }
}

//prettier-ignore
export const enumToArray = (enumObj: any) => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key: string) => ({
      value: Number(enumObj[key]),
      label: key.replaceAll(/([A-Z])/gm, " $1").trim(),
    })) || [];
};

//prettier-ignore
export const getValue = (obj: any, accessor: any, value?: any): any => {
  if (!obj)
    return '';
  if (typeof accessor === 'string')
    return getValue(obj, accessor.split('.'), value);
  else if (accessor.length === 1 && value !== undefined)
    return obj[accessor[0]] = value;
  else if (accessor.length === 0)
    return obj;
  else
    return getValue(obj[accessor[0]], accessor.slice(1), value);
}

//prettier-ignore
export const setThemeColors = (primaryColor: keyof typeof colors, secondaryColor: keyof typeof colors, tertiaryColor: keyof typeof colors) => {
  Object.keys(colors[primaryColor]).forEach((key: any) => {
    document.documentElement.style.setProperty(`--primary-${key as string}`, (colors[primaryColor] as any)[key]);
  });
  Object.keys(colors[secondaryColor]).forEach((key: any) => {
    document.documentElement.style.setProperty(`--secondary-${key as string}`, (colors[secondaryColor] as any)[key]);
  });
  Object.keys(colors[tertiaryColor]).forEach((key: any) => {
    document.documentElement.style.setProperty(`--tertiary-${key as string}`, (colors[tertiaryColor] as any)[key]);
  });

  document.documentElement.style.setProperty("--primary", colors[primaryColor]["600"]);
  document.documentElement.style.setProperty("--secondary", colors[secondaryColor]["500"]);
  document.documentElement.style.setProperty("--tertiary", colors[tertiaryColor]["600"]);
};

export const generateGuid = (): string => {
  const s4 = () => {
    const rand = Math.floor((1 + Math.random()) * 0x10000);
    return rand.toString(16).substring(1);
  };
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
};

export const downloadCsv = (data: any, headers: string, fileName: string) => {
  const csvData = data;
  let csv = headers;

  csvData.forEach((row: any) => {
    csv += row.join(",");
    csv += "\n";
  });

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = fileName;
  hiddenElement.click();
};

//? more like redirect to file Location?
export const downloadPdf = (url: string, fileName: string) => {
  var hiddenElement = document.createElement("a");
  hiddenElement.href = url;
  hiddenElement.target = "_blank";
  hiddenElement.download = fileName;
  hiddenElement.click();
};

export const range = (start: number, end: number) => {
  return Array.from({ length: end - start }, (v, k) => k + start);
};
