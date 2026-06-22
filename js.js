function constructIntro() {
    document.getElementById("cactusesbox").innerHTML = "";
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQm0M_Wd1u-kz9i4rJs5_egSSLKc6NfdNDnGZnCQ7gcJdi8SlRmwVegL_WdKuMdN7HzYpqMs2nNNdyQ/pub?output=csv")
        .then((res) => res.text())
        .then((csvText) => {
            const result = Papa.parse(csvText, {
                header: false,          // 第一列作為欄位名稱
                skipEmptyLines: true,  // 跳過空行
                complete: function (results) {
                    const data = results.data;
                    console.log("data fetched");
                    let tags = document.getElementById("show").innerHTML;
                    console.log("data length:");
                    console.log(data.length);
                    console.log("tags:");
                    console.log(tags);
                    const classSet = new Set();
                    for (let i = 1; i < data.length; i++) {
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
                        cactusDiv.style.display = "none";

                        // 2. 建立圖片元素
                        const imageWrapper = document.createElement("div");
                        imageWrapper.className = "imageWrapper";
                        const img = document.createElement("img");
                        /*tempsrc = "";
                        for (let i = 12;i>11;i++){
                            if (item[i] == ""){break;}
                            else{tempsrc+=item[i]}
                        }*/
                        img.src = "data:image/webp;base64," + item[12];
                        img.alt = "多肉照";

                        // 3. 建立 intro 容器
                        const introDiv = document.createElement("div");
                        introDiv.className = "intro";

                        // 4. 加入  標題
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
                        // 5. 加入黑線 divider
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

                        // 7. 組合 intro 裡的元素
                        introDiv.appendChild(name);
                        introDiv.appendChild(sciname);
                        introDiv.appendChild(cls);
                        introDiv.appendChild(divider);
                        predivbox.appendChild(pre);
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
                            const className = document.createElement("p");
                            classDiv.id = "class_"+item[9];
                            className.textContent = item[9];
                            document.getElementById("cactusesbox").appendChild(classDiv);
                            classDiv.appendChild(className);
                            console.log("新增"+item[9]);
                        }
                        document.getElementById("class_"+item[9]).appendChild(cactusDiv);
                    }
                }
            });
        });
}
function prepintro() {
    let key = document.getElementById("show").innerHTML;
    console.log("keys:");
    console.log(key.split(""));
    key.split("").forEach((chr) => {
        document.querySelectorAll('.' + chr).forEach((el) => {
            el.style.display = 'block';
        });
    });
}
function change(a) {
    console.log("change" + a);
    document.getElementById("key").innerHTML += a;
    let l = document.getElementById("key").innerHTML.length;
    let temp = document.getElementById("key").innerHTML;
    if (l == 1) {
        const box = document.getElementById("contbtn")
        box.classList.remove("fadeIn");
        box.offsetWidth;
        box.style.display = "flex";
        box.classList.add("fadeIn")
    }
    if (l == 2) {
        document.getElementById("2" + temp.slice(-1,)).hidden = false;
        document.getElementById(1).hidden = true;
    } else {
        if (l == 3) {
            document.getElementById("21").hidden = true;
            document.getElementById("22").hidden = true;
            if (temp.slice(-1,) == 2) {
                document.getElementById("show").innerHTML = "A";
                document.getElementById("key").innerHTML += "0"
                document.getElementById(4).hidden = false;
                let pref = "";
                let preftemp = [["平地", "山邊"], ["室內", "室外"], ["窗台", "無窗", "陽台", "露臺"], ["東", "西", "南", "北"]]
                temp.split("").forEach((i, j, k) => { pref += "-" + preftemp[j][parseInt(i) - 1]; });
                pref += "-";
                document.getElementById("showplace").innerHTML = pref;
                prepintro();
        } else {
            document.getElementById(3).hidden = false;
        }
    } else if (l == 4) {
        let ab = ["1114", "1224"];
        let abc = ["1111", "1234", "2234", "2244"];
        let abcde = ["1241", "2231"];
        let cde = ["1113", "1231", "1233", "2243"];
        let ce = ["1112", "2232", "2242"];
        let de = ["1243", "2233"];
        let e = ["1232", "1242"];
        let pref = "";
        let preftemp = [["平地", "山邊"], ["室內", "室外"], ["窗台", "無窗", "陽台", "露臺"], ["東", "西", "南", "北"]]
        temp.split("").forEach((i, j, k) => { pref += "-" + preftemp[j][parseInt(i) - 1]; });
        pref += "-";
        document.getElementById("showplace").innerHTML = pref;
        document.getElementById("show").innerHTML = "";
        if (temp == "2114") { document.getElementById("show").innerHTML += "A"; }
        if (ab.includes(temp)) { document.getElementById("show").innerHTML += "AB"; }
        if (abc.includes(temp)) { document.getElementById("show").innerHTML += "ABC"; }
        if (temp == "2111") { document.getElementById("show").innerHTML += "ABD"; }
        if (abcde.includes(temp)) { document.getElementById("show").innerHTML += "ABCDE"; }
        if (temp == "2113") { document.getElementById("show").innerHTML += "BC"; }
        if (temp == "2241") { document.getElementById("show").innerHTML += "BCDE"; }
        if (cde.includes(temp)) { document.getElementById("show").innerHTML += "CDE"; }
        if (ce.includes(temp)) { document.getElementById("show").innerHTML += "CE"; }
        if (de.includes(temp)) { document.getElementById("show").innerHTML += "DE"; }
        if (e.includes(temp)) { document.getElementById("show").innerHTML += "E"; }
        document.getElementById('3').hidden = true;
        document.getElementById('4').hidden = false;
        prepintro();

    } else {
        if (l == 6) {
            document.getElementById(5).hidden = true;
            if (temp.slice(-2, -1) == "1") {
                document.getElementById("showpot").innerHTML += "深";
            } else {
                document.getElementById("showpot").innerHTML += "淺";
            }
            if (temp.slice(-1,) == "1") {
                document.getElementById("showpot").innerHTML += "寬";
            } else {
                document.getElementById("showpot").innerHTML += "窄";
            }
            const show2pot = document.getElementById('show2pot');
            show2pot.innerHTML = document.getElementById('show').innerHTML+document.getElementById('showpot').innerHTML;
            console.log(show2pot.innerHTML);
            const box = document.getElementById('ansbox');
            box.classList.remove("fadeIn");
            box.offsetWidth;
            box.style.display = "block";
            box.classList.add("fadeIn");
            const cbox = document.getElementById('cactusesbox');
            cbox.classList.remove("fadeIn");
            cbox.offsetWidth;
            cbox.style.display = "grid";
            cbox.classList.add("fadeIn");



        } else {
            document.getElementById(l - 1).hidden = true;
            document.getElementById(l).hidden = false;
        }
    }
}

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
    let temp = document.getElementById("key").innerHTML;
    let l = temp.length;
    if (temp.slice(-1) == "0") {
        document.getElementById("key").innerHTML = temp.slice(0, -2);
        document.getElementById(4).hidden = true;
        document.getElementById(21).hidden = false;
    } else if (l == 3) {
        document.getElementById(3).hidden = true;
        if (["1", "2"].includes(temp.slice(-1,))) {
            document.getElementById(21).hidden = false;
        } else {
            document.getElementById(22).hidden = false;
        }
        document.getElementById("key").innerHTML = temp.slice(0, -1);
    } else if (l == 2) {
        document.getElementById("key").innerHTML = temp.slice(0, -1);
        document.getElementById(21).hidden = true;
        document.getElementById(22).hidden = true;
        document.getElementById(1).hidden = false;
    } else {
        if (l != 6) {
            document.getElementById(l).hidden = true;
        } else {
            document.getElementById("ansbox").style.display = 'none';
            document.getElementById("cactusesbox").style.display = 'none';
            let a = document.getElementById("showpot").innerHTML;
            document.getElementById("showpot").innerHTML = a.slice(0, -2);
        }
        document.getElementById(l - 1).hidden = false;
        document.getElementById("key").innerHTML = temp.slice(0, -1);
        if (l == 4) {
            document.getElementById("showplace").innerHTML = "";
            document.getElementById("show").innerHTML = "";
            document.getElementById("showpot").innerHTML = "";
        }
        if (l == 1) {
            document.getElementById("contbtn").style.display = 'none';
        }
    }
}
