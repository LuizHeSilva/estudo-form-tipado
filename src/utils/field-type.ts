export function FieldType(fieldType: string) {
    return function (target: any, propertyKey: string) {
        if (!target.constructor.fieldTypes) {
            target.constructor.fieldTypes = {};
        }
        target.constructor.fieldTypes[propertyKey] = fieldType;
    };
}