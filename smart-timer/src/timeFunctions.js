export function convertSecondsToHours(seconds){
    // return Math.floor(value.date/3600);
    return seconds/3600;
}
export function convertSecondsToMinutes(seconds){
    return seconds/60;
}
export function converSecondsToHourAndMinutesString(seconds){
    let hours = Math.floor(seconds/3600);
    if(hours<10)
        hours = '0'+hours.toString();
    else
        hours = hours.toString();
    let mins = Math.floor((seconds%3600)/60);
    if(mins<10)
        mins = '0'+mins.toString();
    else
        mins = mins.toString();
    return  hours+':'+mins;
}
export function converSecondsToHourAndMinutesString2(seconds){
    let hours = Math.floor(seconds/3600);
    if(hours<10)
        hours = '0'+hours.toString();
    else
        hours = hours.toString();
    let mins = Math.floor((seconds%3600)/60);
    if(mins<10)
        mins = '0'+mins.toString();
    else
        mins = mins.toString();
    const hoursString = (hours=="00")?"":(hours+' hours ')
    const minsString = (mins=="00")?(seconds+" seconds"):(mins+' minutes')    

    const timeString = hoursString+minsString;
    return  timeString;
}
export function converSecondsToHourMinutesSecondsString(seconds){
    let hours = Math.floor(seconds/3600);
    if(hours<10)
        hours = '0'+hours.toString();
    else
        hours = hours.toString();
    let mins = Math.floor((seconds%3600)/60);
    if(mins<10)
        mins = '0'+mins.toString();
    else
        mins = mins.toString();
    let secs = Math.floor(seconds%60);
    if(secs<10)
        secs = '0'+secs.toString();
    else
        secs = secs.toString();
    return  hours+':'+mins+':'+secs;
}
