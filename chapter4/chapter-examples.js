let journal = [];
function addEntry(events, squirrel) {
    journal.push({events, squirrel});
}
addEntry(["work", "touched tree", "pizza", "running",
"television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
"touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
"beer"], true);
function phi(table) {
   return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
        (table[2] + table[3]) * 
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
        )
}
// console.log(phi([76, 9, 4, 1]));
function tableFor(event, journal) {
    let table = [0, 0, 0, 0];
    for (let i = 0; i < table.length; i++) {
        let entry = journal[i];
        let index = 0;
        if (entry.events.includes(event)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}
function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
        for (let event of entry.events) {
            if (!events.includes(event)) {
                events.push(event)
            }
        }
    }
    return events;
}
// console.log(journalEvents(JOURNAL));
for (let event of journalEvents(Jornal)) {
   let correlation = phi(tableFor(event, JOURNAL));
   if (correlation > 0.1 || correlation < -0.1) {
        console.log(event + ":", correlation);
   }
}
/////////////////
function max(...numbers) {
    let result = -Infinity; 
    for (let number of numbers) {
        if (number > result) {
            result = number;
        }
    }
    return result;
}