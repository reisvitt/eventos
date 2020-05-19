export const moneyMask = value => {

    var money = parseInt(value.replace(/\D/g, ''));

    if(money == undefined || !money ) return '';

    money = money + '';
    money = money + '';
    money = money.replace(/([0-9]{2})$/g, ",$1");
  
    if (money.length > 6) {
      money = money.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    return "R$ " + `${money}`;
}