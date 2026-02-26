export const format = (amount:string) => {

    let cents;
    amount = amount.replace(/[,]/i, ".");
    let finalValue = amount.split(".");

    if(finalValue[1])
        cents = finalValue[1].padEnd(2,"0");
    else
        cents = "00";

    return parseInt(`${finalValue[0]}${cents}`)

}