{
    let form = document.forms.lang_form;
    let questions;
    let question_number = 0;
    let max = 0;
    let all_questions = [];
    let tm = 10;
    const JA_NUMBER = 1;
    const EN_NUMBER = 0;
    form.lang_file.addEventListener('change', function (e) {
        let result = e.target.files[0];
        let reader = new FileReader();
        var fname = result.name;
        var fi = fname.split('.');
        // read
        reader.readAsText(result);
        reader.addEventListener('load', function () {
            question_number = 0;
            let json = reader.result
            questions = JSON.parse(json);
            for (let i = 0; i < questions.length; i++) {
                all_questions.push([questions[i].Chants.EN, questions[i].Chants.JA])
                for (let j = 0; j < questions[i].Phrase.length; j++) {
                    all_questions.push([questions[i].Phrase[j].EN, questions[i].Phrase[j].JA])
                }
            }

            max = all_questions.length
            randmize()
            let lang_ja = document.getElementById("lang_ja");
            lang_ja.innerHTML = all_questions[question_number][JA_NUMBER];
            tm = 10;
        })
    })

    function OnSubmit() {
        tm = 10;
        let lang_en = document.getElementById("lang_en");
        if (max <= question_number) {
            form.reset();
            return false
        }
        lang_en.innerHTML = all_questions[question_number][EN_NUMBER];
    }

    function OnNext() {
        tm = 10;
        let lang_ja = document.getElementById("lang_ja");
        let lang_en = document.getElementById("lang_en");
        if (max <= question_number) {
            form.reset();
            return false
        }
        // reset Values
        lang_ja.innerHTML = ""
        lang_en.innerHTML = ""
        question_number++;
        if (max <= question_number) {
            form.reset();
            return false
        }
        lang_ja.innerHTML = all_questions[question_number][JA_NUMBER];
    }

    function randmize() {
        for(let i=0; i < max; i++) {
            arrayShuffle(all_questions);
        }
    }

    function arrayShuffle(array) {
        for(let i = (array.length - 1); 0 < i; i--){
          // 0〜(i+1)の範囲で値を取得
          let r = Math.floor(Math.random() * (i + 1));
          // 要素の並び替えを実行
          let tmp = array[i];
          array[i] = array[r];
          array[r] = tmp;
        }
        return array;
      }

    function showTime() {
        document.getElementById("timer").textContent = tm;
        tm--;
        if (tm == -1) {
            tm = 10;
        }
        setTimeout(showTime, 1000);
    }
    showTime();
}

