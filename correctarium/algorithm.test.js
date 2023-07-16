/*
1. Given workDuration as integer (miliseconds) and return expected deadline in range 1-5 days and 10-19 time

131880000 - Mon Jul 24 2023 10:38:00 GMT+0300 (Восточная Европа, летнее время)
34560000 - Tue Jul 18 2023 10:36:00 GMT+0300 (Восточная Европа, летнее время)
42300000 - Tue Jul 18 2023 12:45:00 GMT+0300 (Восточная Европа, летнее время)

2. If given invalid argument throw error with such message.

2008.4 - error 'workDuration must be integer'
() - error 'workDuration must be exist'
'2008' - error 'workDuration must be number'
false - error 'workDuration must be number'
true - error 'workDuration must be number'
null - error 'workDuration must be number'
()=> {} - error 'workDuration must be number'
{} - error 'workDuration must be number'
[] - error 'workDuration must be number'
*/

const {calcDeadline} = require("./algorithm");

describe("test calcDeadline function", ()=> {
    test("131880000 - Mon Jul 24 2023 10:38:00 GMT+0300", ()=> {
        const result = calcDeadline(131880000);
        expect(result).toBe('Mon Jul 24 2023 10:38:00 GMT+0300 (Восточная Европа, летнее время)');
    })

    test("34560000 - Tue Jul 18 2023 10:36:00 GMT+0300", ()=> {
        expect(calcDeadline(34560000)).toBe('Tue Jul 18 2023 10:36:00 GMT+0300 (Восточная Европа, летнее время)');
    })

    test("42300000 - Tue Jul 18 2023 12:45:00 GMT+0300 (Восточная Европа, летнее время)", ()=> {
        expect(calcDeadline(42300000)).toBe('Tue Jul 18 2023 12:45:00 GMT+0300 (Восточная Европа, летнее время)');
    })

    test("42300000.54 - error 'workDuration must be integer'", ()=> {
        expect(() => calcDeadline(42300000.54)).toThrow('workDuration must be integer')
    })

    test("() - error 'workDuration must be exist'", ()=> {
        expect(() => calcDeadline()).toThrow('workDuration must be exist')
    })

    test("'2008' - error 'workDuration must be number'", ()=> {
        expect(() => calcDeadline('2008')).toThrow('workDuration must be number')
    })

    test("false - error 'workDuration must be number'", ()=> {
        expect(() => calcDeadline(false)).toThrow('workDuration must be number')
    })

    test("true - error 'workDuration must be number'", ()=> {
        expect(() => calcDeadline(true)).toThrow('workDuration must be number')
    })

    test("null - error 'workDuration must be number'", ()=> {
        expect(() => calcDeadline(null)).toThrow('workDuration must be number')
    })

    test("()=>{} - error 'workDuration must be number'", ()=> {
        expect(() => calcDeadline(()=>{})).toThrow('workDuration must be number')
    })

    test("{} - error 'workDuration must be number'", ()=> {
        expect(() => calcDeadline({})).toThrow('workDuration must be number')
    })

    test("[] - error 'workDuration must be number'", ()=> {
        expect(() => calcDeadline([])).toThrow('workDuration must be number')
    })
})