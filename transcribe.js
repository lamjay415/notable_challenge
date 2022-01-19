//function to convert line to a numbered line with capitalization
//first split the string, then add starting index, capitalize the first word, and then join the rest of the string
let convertToNumberList = (str, start) => {
    let split = str.split(' ');
    let capitalize = split[1];
    let result = start + '. ' + capitalize[0].toUpperCase() + capitalize.slice(1) + ' ' + split.slice(2).join(' ') ;
    return result;
}

//function to transcibe dictations into numbered list
let transcribe = str => {

    //hash for numbers 1-9 mapping
    let listNum = {'one': 1, 'two': 2, ' three': 3, 'four': 4,
         'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9}

    //loop through string to find starting number and start the list
    let sentences = str.split('Number ');
    let start = '';
    for(let i = 0; i < sentences.length; i++){
        if(Object.keys(listNum).includes(sentences[i].split(' ')[0])){
            start = listNum[sentences[i].split(' ')[0]];
            sentences[i] = convertToNumberList(sentences[i],start);
            start++;
            break;
        }
    }

    //loop through the string to find next list item to continue list
    for(let i = 0; i < sentences.length; i++){
        if(sentences[i].split(' ')[0] === 'next'){
            sentences[i] = convertToNumberList(sentences[i],start);
            start++;
        }
    }

    //return join processed sentences with new lines.
    return sentences.join('\n');
}


let example = `Patient presents today with several issues. Number one BMI has increased by 10% since their last visit. Number next patient reports experiencing dizziness several times in the last two weeks. Number next patient has a persistent cough that hasn’t improved for last 4 weeks.`

console.log(transcribe(example));