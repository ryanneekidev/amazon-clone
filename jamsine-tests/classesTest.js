let cart=JSON.parse(localStorage.getItem("savedCart"));

describe("Class testing", ()=>{
    it("Clothing class test", ()=>{
        expect(cart[0].sizeChartLink).toEqual("images/clothing-size-chart.png");
    })
})