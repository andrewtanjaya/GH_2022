export const denullify = (text) =>{
    
    if(text === undefined || text === null ) text = " "
    return text;
} 