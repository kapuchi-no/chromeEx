const init = () => {
    // プルダウンをつける要素を取得
    const articles = Array.from(document.getElementsByClassName("test"));

    // 要素の先頭ににプルダウンを追加
    articles.forEach(article => {
        // selectのoptionに追加するデータを読み込み
        // const readOptions = async () => {
        //     const res = await fetch(chrome.runtime.getURL('options.json'))
        //     return res.json()
        // };

        // const options = readOptions().then(data => data).options;
        // console.log(options);

        const options = [
            {"value": 0, "text": "", "color": "#f0f8ff"},
            {"value": 1, "text": "test1", "color": "#dc143c"},
            {"value": 2, "text": "test2", "color": "#006400"},
            {"value": 3, "text": "test3", "color": "#191970"}
        ];

        const article_id = article.getAttribute("id");

        // select作成
        const select_element = document.createElement("select");
        select_element.classList.add("article_category_select");
        select_element.setAttribute("name", article_id);
        // 値が変更された時のイベント
        select_element.addEventListener('change', () => {
            
            // データの保存
            const data = {[article_id]: select_element.value};
            chrome.storage.local.set(data);

            // 色の変更
            changeSelectStyle(select_element, options);
        });

        for(const option of options){
            // option要素作成
            const option_element = document.createElement("option");
            option_element.setAttribute("value", option.value);
            option_element.innerHTML = option.text;

            select_element.append(option_element);
        }

        // 以前，値が選択されていればその値を初期値に
        chrome.storage.local.get(article_id, (result) => {
            const selected_id = result[article_id];

            if(selected_id != undefined) {
                select_element.options[selected_id].selected = true;
            } else {
                select_element.options[0].selected = true;
            }

            changeSelectStyle(select_element, options);
        });

        article.prepend(select_element);
    });
};

init();




function changeSelectStyle(element, options) {

    const selected_option = options.filter((option) => option.value == element.value)[0];
    element.style.backgroundColor = selected_option.color;
}