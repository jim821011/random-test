document.addEventListener("DOMContentLoaded", () => {
    let btn = document.getElementById("btn");
    let PrizeNumArr = []; //獎品列表對應號碼
    let PrizeArr = []; //獎品列表
    let nowSelectPrize = []; //目前被抽掉的數字
    let bigPrizeSum = 0;
    let allPrizeSum = 0;
    let randomNumber = 0; //隨機數字
    let randomNumber2 = 0;
    let sone = [{
        num: 2,
        name: "A賞",
        level: 1
    },
    {
        num: 2,
        name: "B賞",
        level: 1
    },
    {
        num: 2,
        name: "C賞",
        level: 1
    },
    {
        num: 2,
        name: "D賞",
        level: 1
    },
    {
        num: 2,
        name: "E賞",
        level: 1
    },
    {
        num: 10,
        name: "F賞",
        level: 2
    },
    {
        num: 20,
        name: "G賞",
        level: 2
    },
    {
        num: 20,
        name: "H賞",
        level: 2
    },
    {
        num: 20,
        name: "I賞",
        level: 2
    },
    ];

    //統計大獎數量and總抽數
    for (let i of sone) {
        if (i.level == 1) {
            bigPrizeSum += i.num;
        }
        allPrizeSum += i.num;
    }

    //生成獎號
    for (let i = 1; i <= 80; i++) {
        PrizeNumArr.push(i);
    }

    //生成獎品列
    for (let prize of sone) {
        for (let i = 1; i <= prize.num; i++) {
            PrizeArr.push(prize.name);
        }
    }

    btn.addEventListener("click", function () {
        while (true) {
            randomNumber = Math.floor(Math.random() * 80) + 1;
            let num = nowSelectPrize.indexOf(randomNumber);
            if (num == -1) {
                nowSelectPrize.push(randomNumber);
                console.log(`恭喜抽中${PrizeArr[randomNumber - 1]}`);
                break;
            }
            if (PrizeNumArr.length == nowSelectPrize.length) {
                console.log("抽完囉");
                break;
            }
        }
        let str = "";
        let bigPrize = 0;
        for (let num of nowSelectPrize) {
            str += num + ",";
            if (bigPrizeSum >= num) {
                bigPrize++;
            }
        }

        console.log(`目前剩${allPrizeSum - nowSelectPrize.length}`);
        console.log(`大獎剩${bigPrizeSum - bigPrize}`);
    });



    //檢測用
    let testArr = []; //{residual:number,num:number}
    let runTime = 1000;
    let nowTime = 0;

    //機率調整
    // let basicR = 1000;
    let bigPR = (bigPrizeSum / allPrizeSum) * 1000;
    let basicRAdd = 0;

    while (true) {
        while (true) {
            randomNumber2 = Math.floor(Math.random() * 1000) + 1;
            if (randomNumber2 <= bigPR + basicRAdd) {
                randomNumber = Math.floor(Math.random() * bigPrizeSum) + 1;
            } else {
                randomNumber = Math.floor(Math.random() * allPrizeSum) + 1;
                if (randomNumber <= bigPrizeSum) {
                    randomNumber += bigPrizeSum;
                }
            }
            let hasNum = nowSelectPrize.indexOf(randomNumber);
            if (hasNum == -1) {
                nowSelectPrize.push(randomNumber);
                break;
            }
        }


        if (randomNumber > bigPrizeSum) {
            basicRAdd += 10;
        } else {
            basicRAdd = 0;
        }

        let bigP = 0;
        let residual = PrizeNumArr.length - nowSelectPrize.length;
        let has = 0;

        nowSelectPrize.forEach(e => {
            if (e <= bigPrizeSum) {
                bigP++;
            }
        })

        if (bigP == bigPrizeSum) {
            for (let item of testArr) {
                if (item.residual == residual) {
                    has++;
                }
            }

            if (has != 0) {
                testArr.forEach(e => {
                    if (e.residual == residual) {
                        e.num++;
                    }
                });
            } else {
                testArr.push({ "residual": residual, "num": 1 });
            }

            nowTime++;
            nowSelectPrize = [];
            if (nowTime == runTime) {
                break;
            }
        }
    }

    for (let i = 0; i < testArr.length - 1; i++) {
        for (let j = 0; j < testArr.length - 1 - i; j++) {
            if (testArr[j].residual > testArr[j + 1].residual) {
                let Arr = testArr[j];
                testArr[j] = testArr[j + 1];
                testArr[j + 1] = Arr;
            }
        }
    }

    for (let item of testArr) {
        console.log(`剩${item.residual}抽，大獎就抽完的次數${item.num}`);
    }

    let num = 0;
    let cc = 0;
    for (let item of testArr) {
        if (num <= runTime * 0.5) {
            num += item.num;
            cc = item.residual;
        }
    }
    console.log(`50%信賴區間落在${cc}`);

});