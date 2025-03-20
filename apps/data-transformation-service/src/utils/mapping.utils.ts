export function normalizeHeaders(headers: string[]): string[] {
  return headers.map((header) => header.replace(/\./g, '_'));
}

type MappingCondition = {
  condition: string;
  value: string;
};

type Mapping = {
  [key: string]:
    | string
    | MappingCondition
    | { transform: string; source: string };
};

function flattenObject(
  obj: Record<string, any>,
  parentKey = '',
  result: Record<string, any> = {},
): Record<string, any> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

export function applyMapping(data: Record<string, any>, mapping: Mapping): any {
  const transformedData: any = {};
  const flatData = flattenObject(data);

  const salaryKey =
    Object.keys(flatData).find((key) => key.includes('baseSalary')) || 'salary';
  const salary = parseFloat(flatData[salaryKey]);

  if (!isNaN(salary) && salary > 50000) {
    transformedData['bonus'] = salary * 0.1;
  } else {
    transformedData['bonus'] = 0;
  }
  for (const [key, value] of Object.entries(mapping)) {
    if (key === 'bonus') {
      continue;
    }

    if (isMappingCondition(value)) {
      try {
        const variables: Record<string, any> = {
          ...flatData,
          salary: salary,
        };

        const conditionExpression = value.condition.replace(
          /\b(\w+)\b/g,
          (match) => {
            return variables.hasOwnProperty(match) ? variables[match] : `0`;
          },
        );

        const resultExpression = value.value.replace(/\b(\w+)\b/g, (match) => {
          return variables.hasOwnProperty(match) ? variables[match] : `0`;
        });

        const conditionFn = new Function(`return (${conditionExpression});`);
        const resultFn = new Function(`return (${resultExpression});`);

        transformedData[key] = conditionFn() ? resultFn() : null;
      } catch (error) {
        console.error(`Error evaluating condition for key: ${key}`, error);
        transformedData[key] = null;
      }
    } else if (typeof value === 'object' && 'transform' in value) {
      if (value.transform === 'calculateAge') {
        transformedData[key] = calculateAge(flatData[value.source]);
      }
    } else if (typeof value === 'string') {
      transformedData[key] = flatData[value] ?? null;
    }
  }
  return transformedData;
}

function isMappingCondition(value: any): value is MappingCondition {
  return typeof value === 'object' && 'condition' in value && 'value' in value;
}

function calculateAge(dob: string): number | null {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
