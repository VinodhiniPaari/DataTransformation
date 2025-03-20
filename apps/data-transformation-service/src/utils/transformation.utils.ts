import { parse, isValid } from 'date-fns';

export function normalizeDate(dateString: string): string | null {
  const formats = ['MM/dd/yyyy', 'dd-MM-yyyy', 'yyyy-MM-dd'];
  for (const format of formats) {
    const parsedDate = parse(dateString, format, new Date());
    if (isValid(parsedDate)) {
      return parsedDate.toISOString().split('T')[0];
    }
  }
  return null;
}

export function cleanData(data: Record<string, any>): Record<string, any> {
  const cleanedData = { ...data };

  for (const key in cleanedData) {
    if (
      typeof cleanedData[key] === 'string' &&
      cleanedData[key].includes('####')
    ) {
      cleanedData[key] = null;
    }
  }

  if (cleanedData.dateOfBirth) {
    cleanedData.dateOfBirth = normalizeDate(cleanedData.dateOfBirth);
  }
  if (cleanedData.work_startDate) {
    cleanedData.work_startDate = normalizeDate(cleanedData.work_startDate);
  }

  return cleanedData;
}
