export function normalizeHeaders(headers: string[]): string[] {
  return headers.map(header => header.replace(/\./g, '_'));
}
type MappingCondition = {
  condition: string;
  value: string;
};

type Mapping = {
  [key: string]: string | MappingCondition | { transform: string; source: string };
};

// Flatten the object for CSV processing
function flattenObject(obj: Record<string, any>, parentKey = '', result: Record<string, any> = {}): Record<string, any> {
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

  for (const [key, value] of Object.entries(mapping)) {
    if (isMappingCondition(value)) {
      try {
        const condition = value.condition.replace(/\b(\w+)\b/g, (match) => `flatData['${match}']`);
        const resultValue = value.value.replace(/\b(\w+)\b/g, (match) => `flatData['${match}']`);
        transformedData[key] = eval(condition) ? eval(resultValue) : null;
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

// Helper functions
function isMappingCondition(value: any): value is MappingCondition {
  return typeof value === 'object' && 'condition' in value && 'value' in value;
}

function calculateAge(dob: string): number | null {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}


