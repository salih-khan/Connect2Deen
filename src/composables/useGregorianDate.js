export  function useGregorianDate(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    var current = new Date();
    const date = `${current.getDate()}`;
    var mm = `${months[current.getMonth()]}`;
    const year = `${current.getFullYear()}`;

   

    console.log(date)

    return {date, mm, year};
}