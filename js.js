console.log(114514);

function constructIntro() {
    fetch("./cactus_data.csv")
        .then((res) => res.text())
        .then((csvText) => {
            const result = Papa.parse(csvText, {
                header: false,          // 第一列作為欄位名稱
                skipEmptyLines: true,  // 跳過空行
                complete: function (results) {
                    window.cactusData = results.data;
                    const data = window.cactusData;
                    console.log("data fetched");
                    let tags = document.getElementById("show").innerHTML;
                    console.log("data length:");
                    console.log(data.length);
                    console.log("tags:");
                    console.log(tags);
                    const classSet = new Set();
                    for (let i = 1; i < data.length; i++) {
                        /*
                        item
                        0: A
                        1: B
                        2: C
                        3: D
                        4: E
                        5: common name
                        6: scientific name
                        7: variant name (f. for formo)
                        8: cultivar name
                        9: class
                        10: introduction
                        11: wide
                        12: narrow
                        13: deep
                        14: shallow
                        15: image path 64 base
                        */
                        const item = data[i];
                        console.log(item[5]);
                        
                        // 1. 建立最外層 div
                        const cactusDiv = document.createElement("div");
                        cactusDiv.className = "cactusItem";
                        for (let j = 0; j < 5; j++) {
                            if (item[j] != "") {
                                cactusDiv.classList.add(String.fromCharCode(j + 65));
                            }
                        }
                        for (let j = 11; j < 15; j++) {
                            if (item[j] == '1') {
                                cactusDiv.classList.add('potType_'+Math.floor((j-11)/2)+(j-11)%2);
                            }
                        }
                        cactusDiv.style.display = "none";

                        // 2. 建立圖片元素
                        const imageWrapper = document.createElement("div");
                        imageWrapper.className = "imageWrapper";
                        const img = document.createElement("img");
                        img.src = "data:image/webp;base64," + item[15];
                        img.alt = "多肉照片";

                        // 3. 建立 intro 容器
                        const introDiv = document.createElement("div");
                        introDiv.className = "intro";

                        // 4. 加入標題
                        const name = document.createElement("p");
                        name.innerHTML = "<b>" + item[5] + "</b>";
                        name.style.fontSize = "28px";

                        const sciname = document.createElement("p");
                        sciname.style.fontSize = "20px";
                        sciname.innerHTML = '<i>' + item[6] + '</i>';
                        if (item[7] != "") {
                            console.log(i, item[7]);
                            const varname = item[7].split(".");
                            sciname.innerHTML += " " + varname[0] + ". <i>" + varname[1] + "</i>";
                        }
                        if (item[8] != "") {
                            console.log(i, item[8])
                            sciname.innerHTML += " '" + item[8] + "'";
                        }
                        const cls = document.createElement("p");
                        cls.style.fontSize = "20px";
                        cls.innerHTML = item[9];
                        
                        // 5. 加入黑線
                        const divider = document.createElement("div");
                        divider.style.height = "0.5px";
                        divider.style.backgroundColor = "black";
                        divider.style.width = "90%";
                        divider.style.left = "5%";
                        divider.style.position = "absolute";
                        divider.style.display = "block";

                        // 6. 加入說明文字
                        const predivbox = document.createElement("div");
                        const pre = document.createElement("pre");
                        pre.textContent = item[10];
                        pre.style.fontSize = "20px";
                        const place = document.createElement("place");
                        place.textContent = (item[0]==1?"A":"")+(item[1]==1?"B":"")+(item[2]==1?"C":"")+(item[3]==1?"D":"")+(item[4]==1?"E":"")+(item[11]==1?"寬":"")+(item[12]==1?"窄":"")+(item[13]==1?"深":"")+(item[14]==1?"淺":"");
                        place.style.color = "red";
                        const introBtn = document.createElement("button");
                        introBtn.textContent = "開啟介紹";
                        introBtn.onclick = () => openIntroBox(i);

                        // 7. 組合 intro 裡的元素
                        introDiv.appendChild(name);
                        introDiv.appendChild(sciname);
                        introDiv.appendChild(cls);
                        introDiv.appendChild(divider);
                        predivbox.appendChild(pre);
                        predivbox.appendChild(place);
                        predivbox.appendChild(introBtn);
                        introDiv.appendChild(predivbox);

                        // 8. 組合 cactusItem
                        imageWrapper.appendChild(img);
                        cactusDiv.appendChild(imageWrapper);
                        cactusDiv.appendChild(introDiv);
                        console.log(cactusDiv);
                        
                        // 9. 加到頁面中
                        if (!classSet.has(item[9])) {
                            classSet.add(item[9]);
                            const classDiv = document.createElement("div");
                            const className = document.createElement("h3");
                            const classCactus = document.createElement("div")
                            classCactus.id = "class_"+item[9];
                            classCactus.className = "grid-container"
                            className.textContent = item[9];
                            document.getElementById("cactusesbox").appendChild(classDiv);
                            classDiv.appendChild(className);
                            classDiv.appendChild(classCactus);
                            console.log("新增"+item[9]);
                        }
                        document.getElementById("class_"+item[9]).appendChild(cactusDiv);
                    }
                }
            });
        });
}

function prepintro() {
    document.querySelectorAll('.cactusItem').forEach((el) => {
        el.style.display = 'none';
    });
    
    let key_0 = document.getElementById("show").innerHTML;
    console.log("keys:");
    console.log(key_0.split(""));
    key_0.split("").forEach((chr) => {
        document.querySelectorAll('.' + chr).forEach((el) => {
            el.style.display = 'block';
        });
    });
    
    let key = document.getElementById("key").innerHTML;
    if (key.length == 6) {
        let key_1 = (document.getElementById("show2pot").innerHTML).slice(-2);
        key_1.split("").forEach((chr,i) => {
            document.querySelectorAll('.potType_' + i + (chr-1)).forEach((el) => {
                el.style.display = 'block';
            });
        });
    }
    
    document.querySelectorAll('.combinationBtn').forEach((el) => {
        if (el.id == 'combinationBtn_all') {
            el.classList.add("combinationBtnChoosed");
        } else {
            el.classList.remove("combinationBtnChoosed");
        }
    });

}

function prepCombinationBtn() {
    document.querySelectorAll('.combinationBtn').forEach((el) => {
        el.style.display = 'none';
    });
    
    let key_0 = document.getElementById("show").innerHTML;
    console.log("keys:");
    console.log(key_0.split(""));
    key_0.split("").forEach((chr) => {
        document.getElementById("combinationBtn_" + chr).style.display = 'block';
    });
    
    let key = document.getElementById("key").innerHTML;
    if (key.length == 6) {
        let key_1 = (document.getElementById("show2pot").innerHTML).slice(-2);
        key_1.split("").forEach((chr,i) => {
            document.getElementById("combinationBtn_potType_"+ i + (chr-1)).style.display = 'block';
        });
    }
    
    document.querySelectorAll('.combinationbBtn').forEach((el) => {
        if (el.id == 'combinationBtn_all') {
            el.classList.add("combinationBtnChoosed");
        } else {
            el.classList.remove("combinationBtnChoosed");
        }
    });
}

function show(text) {
    document.querySelectorAll('.cactusItem').forEach((el) => {
        el.style.display = 'none';
    });
    
    if (text == "all") {
        prepintro();
    } else {
        document.querySelectorAll('.combinationBtn').forEach((el) => {
            if (el.id == 'combinationBtn_'+text) {
                el.classList.add("contBtn");
            } else {
                el.classList.remove("contBtn");
            }
        });
        document.querySelectorAll('.' + text).forEach((el) => {
            el.style.display = 'block';
        });
    }
    //triggerFadeIn("ansbox","block");
    //triggerFadeIn("cactusesbox","grid");
}

function getEnvironmentText(tempStr) {
    const config = [
        ["平地", "山邊"],
        ["室內", "室外"],
        ["窗台", "無窗", "陽台", "露臺"],
        ["東", "西", "南", "北"],
        ["寬", "窄"],
        ["深", "淺"]
    ];
    let pref = "";
    tempStr.split("").forEach((i, j) => {
        if (config[j] && config[j][parseInt(i) - 1]) {
            pref += ">" + config[j][parseInt(i) - 1];
        }
    });
    return pref;
}

function matchPlantType_1(temp) {
    // 特殊獨立字串的直接對應
    const temp_1 = temp.slice(0,4);
    const pair = {
        "2111": "ABD",
        "2113": "BC",
        "2241": "BCDE"
    };
    if (pair[temp_1]) {
        return pair[temp_1];
    }

    // 多個字串對應同一個結果的陣列
    const a = ["2114", "1125", "2125"]
    const ab = ["1114", "1224"];
    const abc = ["1111", "1234", "2234", "2244"];
    const abcde = ["1241", "2231"];
    const cde = ["1113", "1231", "1233", "2243"];
    const ce = ["1112", "2232", "2242"];
    const de = ["1243", "2233"];
    const e = ["1232", "1242"];

    if (a.includes(temp_1)) return "A";
    if (ab.includes(temp_1)) return "AB";
    if (abc.includes(temp_1)) return "ABC";
    if (abcde.includes(temp_1)) return "ABCDE";
    if (cde.includes(temp_1)) return "CDE";
    if (ce.includes(temp_1)) return "CE";
    if (de.includes(temp_1)) return "DE";
    if (e.includes(temp_1)) return "E";

    // 如果都沒配對到，回傳空字串
    return "";
}

function matchPlantType_2(temp) {
    return (temp.slice(4,5) === "1" ? "寬" : "窄") + (temp.slice(5,6) === "1" ? "深" : "淺");
}

function triggerFadeIn(id, displayType) {
    const box = document.getElementById(id);
    box.classList.remove("fadeIn");
    box.offsetWidth; // 觸發重繪
    box.style.display = displayType;
    box.classList.add("fadeIn");
}

function change(a) {
    console.log("change" + a);

    const key_element = document.getElementById("key");
    const show_element = document.getElementById("show");
    const showplace_element = document.getElementById("showplace");
    
    key_element.innerHTML += a;
    
    let temp = key_element.innerHTML;
    let l = temp.length;

    showplace_element.innerHTML = getEnvironmentText(temp);
    
    if (l === 1) {
        triggerFadeIn("contbtn","flex");
        document.getElementById('0').hidden = true;
        document.getElementById('1').hidden = false;
        return;
    }
    
    if (l === 2) {
        document.getElementById('1').hidden = true;
        document.getElementById("2" + temp.slice(-1,)).hidden = false;
        return;
    }
    
    if (l === 3) {
        document.getElementById("21").hidden = true;
        document.getElementById("22").hidden = true;

        //「無窗」直接補到長度4
        if (temp.slice(-1,) == 2) {
            show_element.innerHTML = "A";
            key_element.innerHTML += "5";
            showplace_element.innerHTML = getEnvironmentText(temp);
            
            document.getElementById('4').hidden = false;
        } else {
            document.getElementById('3').hidden = false;
        }
        return;
    }

    if (l === 4) {
        document.getElementById('3').hidden = true;
        document.getElementById('4').hidden = false;
        return;
    }

    if (l === 5 && a === 3) {
        document.getElementById('4').hidden = true;
        showpot_element = document.getElementById("showpot");
        show_element.innerHTML = matchPlantType_1(temp);
        showpot_element.innerHTML = "未選擇";
        prepintro();
        prepCombinationBtn();

        triggerFadeIn("ansbox","block");
        triggerFadeIn("cactusesbox","grid");
        return;
    }
    
    if (l === 6) {
        document.getElementById('5').hidden = true;

        showpot_element = document.getElementById("showpot");
        show2pot_element = document.getElementById('show2pot');

        show_element.innerHTML = matchPlantType_1(temp);
        showpot_element.innerHTML = matchPlantType_2(temp);
        show2pot_element.innerHTML = show_element.innerHTML+temp.slice(-2);
        
        console.log(show2pot_element.innerHTML);
        prepintro();
        prepCombinationBtn();

        triggerFadeIn("ansbox","block");
        triggerFadeIn("cactusesbox","grid");
        return;
    }
    
    //預設換頁
    document.getElementById(l - 1).hidden = true;
    document.getElementById(l).hidden = false;
    
}

function reset() {
    document.getElementById(0).hidden = false;
    document.getElementById(1).hidden = true;
    document.getElementById(21).hidden = true;
    document.getElementById(22).hidden = true;
    document.getElementById(3).hidden = true;
    document.getElementById(4).hidden = true;
    document.getElementById(5).hidden = true;
    document.getElementById("ansbox").style.display = 'none';
    document.getElementById("cactusesbox").style.display = 'none';
    document.getElementById("key").innerHTML = "";
    document.getElementById("showplace").innerHTML = "";
    document.getElementById("show").innerHTML = "";
    document.getElementById("showpot").innerHTML = "";
    document.getElementById("contbtn").style.display = 'none';
}

function prev() {
    let key_element = document.getElementById("key");
    let temp = key_element.innerHTML;
    let l = temp.length;
    if (temp.slice(-1) == "5") {
        key_element.innerHTML = temp.slice(0, -2);
        document.getElementById(4).hidden = true;
        document.getElementById(21).hidden = false;
    } else if (l == 3) {
        document.getElementById(3).hidden = true;
        if (["1", "2"].includes(temp.slice(-1,))) {
            document.getElementById(21).hidden = false;
        } else {
            document.getElementById(22).hidden = false;
        }
        key_element.innerHTML = temp.slice(0, -1);
    } else if (l == 2) {
        key_element.innerHTML = temp.slice(0, -1);
        document.getElementById(21).hidden = true;
        document.getElementById(22).hidden = true;
        document.getElementById(1).hidden = false;
    } else if (l == 6) {
        key_element.innerHTML = temp.slice(0, -1);
        document.getElementById(l - 1).hidden = false;
        document.getElementById("ansbox").style.display = 'none';
        document.getElementById("cactusesbox").style.display = 'none';
    } else if (l == 5 && temp.slice(-1) == '3') {
        key_element.innerHTML = temp.slice(0, -1);
        document.getElementById(l - 1).hidden = false;
        document.getElementById("ansbox").style.display = 'none';
        document.getElementById("cactusesbox").style.display = 'none';
    } else {
        //預設
        document.getElementById(l).hidden = true;
        document.getElementById(l - 1).hidden = false;
        key_element.innerHTML = temp.slice(0, -1);
        if (l == 1) {
            document.getElementById("contbtn").style.display = 'none';
        }
    }
    document.getElementById("showplace").innerHTML = getEnvironmentText(key_element.innerHTML);
}

function openIntroBox(i) {
    const myModal = document.getElementById('introBox');
    const body = document.body;
    prepIntroBox(i);
    myModal.showModal(); // 原生方法：自動鎖定背景互動
    body.classList.add('modal-open'); // 鎖定背景滾動
}
function closeIntroBox() {
    const myModal = document.getElementById('introBox');
    const body = document.body;
    myModal.close(); // 原生方法：關閉視窗
    body.classList.remove('modal-open'); // 解除背景滾動鎖定
}

function prepIntroBox(i) {
    const data = window.cactusData;
    const item = data[i];
    
    // 2. 建立圖片元素
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "imageWrapper";
    const img = document.createElement("img");
    img.src = "data:image/webp;base64," + item[15];
    img.alt = "多肉照片";

    // 3. 建立 intro 容器
    const introDiv = document.createElement("div");

    // 4. 加入標題
    const name = document.createElement("p");
    name.innerHTML = "<b>" + item[5] + "</b>";
    name.style.fontSize = "28px";

    const sciname = document.createElement("p");
    sciname.style.fontSize = "20px";
    sciname.innerHTML = '<i>' + item[6] + '</i>';
    if (item[7] != "") {
        console.log(i, item[7]);
        const varname = item[7].split(".");
        sciname.innerHTML += " " + varname[0] + ". <i>" + varname[1] + "</i>";
    }
    if (item[8] != "") {
        console.log(i, item[8])
        sciname.innerHTML += " '" + item[8] + "'";
    }
    const cls = document.createElement("p");
    cls.style.fontSize = "20px";
    cls.innerHTML = item[9];
    
    // 5. 加入黑線
    const divider = document.createElement("div");
    divider.style.height = "0.5px";
    divider.style.backgroundColor = "black";
    divider.style.width = "90%";
    divider.style.left = "5%";
    divider.style.position = "absolute";
    divider.style.display = "block";

    // 6. 加入說明文字
    const predivbox = document.createElement("div");
    const pre = document.createElement("pre");
    pre.textContent = item[10];
    pre.style.fontSize = "20px";
    const place = document.createElement("place");
    place.textContent = (item[0]==1?"A":"")+(item[1]==1?"B":"")+(item[2]==1?"C":"")+(item[3]==1?"D":"")+(item[4]==1?"E":"")+(item[11]==1?"寬":"")+(item[12]==1?"窄":"")+(item[13]==1?"深":"")+(item[14]==1?"淺":"");
    place.style.color = "red";

    // 7. 組合 intro 裡的元素
    introDiv.appendChild(name);
    introDiv.appendChild(sciname);
    introDiv.appendChild(cls);
    introDiv.appendChild(divider);
    predivbox.appendChild(pre);
    predivbox.appendChild(place);
    introDiv.appendChild(predivbox);

    // 8. 組合 cactusItem
    const element_introBox = document.getElementById("introBox");
    element_introBox.replaceChildren();
    element_introBox.appendChild(imageWrapper);
    element_introBox.appendChild(introDiv);
}
