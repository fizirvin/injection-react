import formatDate from './formatDate'

function todayIs(date){
    const today = date
    const dayOfWeek = today.getDay()
    let day;
    switch (dayOfWeek) {
      case 0:
        day = 7;
        break;
      case 1:
        day = 1;
        break;
      case 2:
         day = 2;
        break;
      case 3:
        day = 3;
        break;
      case 4:
        day = 4;
        break;
      case 5:
        day = 5;
        break;
      case 6:
        day = 6;
        break;
        default:
        day = 6; 
    }
    return day
  }

  function getDateofTable(number, aDate){
    const today = new Date(aDate);
    const dayOfMonth = today.getDate();
    const difference = number - todayIs(today);
    const set = dayOfMonth + difference;
    const date= today.setDate(set);
    
    return formatDate(date)
  }

  function getDateofTable49(number, aDate){
    const today = new Date(aDate);
    const dayOfMonth = today.getDate();
    const difference = number - todayIs(today);
    const set = dayOfMonth + difference;
    const set2= set - 50
    const date= today.setDate(set2);
    
    return formatDate(date)
  }

  export { todayIs, getDateofTable, getDateofTable49 } 