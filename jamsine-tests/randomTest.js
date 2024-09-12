function formatCurreny(amountInCents){
    let amountInDollars="$"+(Math.round(amountInCents)/100).toFixed(2);
    return amountInDollars;
}

let givenAmountInCents=0;
let expectedAmountInDollars="$0.00";

//Create test suite
describe("Test suite: Format currency", ()=>{
    //Create a test
    it("Convert cents to dollars", ()=>{
        expect(formatCurreny(givenAmountInCents)).toEqual(expectedAmountInDollars);
    });
    it("Convert with 0 cents", ()=>{
        expect(formatCurreny(0)).toEqual("$0.00");
    });
    it("Round down amounts where the decimal part is less than 0.5", ()=>{
        expect(formatCurreny(2014.4)).toEqual("$20.14");
    });
    it("Round up amount where the decimal part is equal to or greater than 0.5", ()=>{
        expect(formatCurreny(2014.5)).toEqual("$20.15");
    })
});