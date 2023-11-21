{
    let form = document.forms.lang_form;
    let questions;
    let question_number = 0;
    let score = 0;
    let max = 0;
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
            max = questions.length
            let ch_ja = document.getElementById("lang_ja_chant");
            let ph_ja = document.getElementsByName("lang_ja_phrase");
            let days = document.getElementById("days");
            let current = document.getElementById("current");
            let process = document.getElementById("process");
            process.innerHTML = "Processing";
            days.innerHTML = fi[0];
            current.innerHTML = (question_number + 1) + "/" + questions.length;
            ch_ja.innerHTML = questions[question_number].Chants.JA;
            for (let i = 0; i < questions[question_number].Phrase.length; i++) {
                ph_ja[i].innerHTML = questions[question_number].Phrase[i].JA;
            }
            console.log(questions[question_number].Chants);
            console.log(questions[question_number].Phrase);
        })
    })

    function OnSubmit() {
        let ch_ans = document.getElementById("lang_en_chant");
        let ph_ans = document.getElementsByName("lang_en_phrase");
        let ch_ja = document.getElementById("lang_ja_chant");
        let ph_ja = document.getElementsByName("lang_ja_phrase");
        let score_board = document.getElementById("score_board");
        let process = document.getElementById("process");
        let correct_chant = document.getElementById("correct_chant");
        let correct_phrase = document.getElementById("correct_phrase");
        let current = document.getElementById("current");

        if (max <= question_number) {
            process.innerHTML = "END";
            return false
        }
        if (ch_ans.value == questions[question_number].Chants.EN) {
            for (let i = 0; i < questions[question_number].Phrase.length; i++) {
                if (ph_ans[i].value != questions[question_number].Phrase[i].EN) {
                    return
                }
            }
            // reset Values
            ch_ans.value = "";
            ch_ja.innerHTML = ""
            for (let i = 0; i < questions[question_number].Phrase.length; i++) {
                ph_ans[i].value = ""
                ph_ja[i].innerHTML = "";
            }

            score++;
            score_board.innerHTML = score;

            question_number++;
            if (max > question_number) {
                ch_ja.innerHTML = questions[question_number].Chants.JA;
                for (let i = 0; i < questions[question_number].Phrase.length; i++) {
                    ph_ja[i].innerHTML = questions[question_number].Phrase[i].JA;
                }
                ch_ans.value = "";
                for (let i = 0; i < questions[question_number].Phrase.length; i++) {
                    ph_ans[i].value = "";
                }
                current.innerHTML = (question_number + 1) + "/" + questions.length;
                correct_chant.innerHTML = "";
                correct_phrase.innerHTML = "";
                console.log(questions[question_number].Chants);
                console.log(questions[question_number].Phrase);
            } else {
                process.innerHTML = "END";
            }
            console.log(question_number);
        } else {
            var tmp = [];
            for (let i = 0; i < questions[question_number].Phrase.length; i++) {
                tmp.push(questions[question_number].Phrase[i].EN);
            }
            correct_chant.innerHTML = questions[question_number].Chants.EN;
            correct_phrase.innerText = tmp.join("\n");
            score = score - 0.5;
            score_board.innerHTML = score;
        }
    }

    function OnSkip() {
        let ch_ans = document.getElementById("lang_en_chant");
        let ph_ans = document.getElementsByName("lang_en_phrase");
        let ch_ja = document.getElementById("lang_ja_chant");
        let ph_ja = document.getElementsByName("lang_ja_phrase");
        let process = document.getElementById("process");
        let correct_chant = document.getElementById("correct_chant");
        let correct_phrase = document.getElementById("correct_phrase");
        let current = document.getElementById("current");
        if (max <= question_number) {
            process.innerHTML = "END";
            return false
        }
        // reset Values
        ch_ans.value = "";
        ch_ja.innerHTML = ""
        for (let i = 0; i < questions[question_number].Phrase.length; i++) {
            ph_ans[i].value = "";
            ph_ja[i].innerHTML = "";
        }

        question_number++;
        if (max > question_number) {
            ch_ja.innerHTML = questions[question_number].Chants.JA;
            for (let i = 0; i < questions[question_number].Phrase.length; i++) {
                ph_ja[i].innerHTML = questions[question_number].Phrase[i].JA;
            }

            current.innerHTML = (question_number + 1) + "/" + questions.length;
            correct_chant.innerHTML = ""
            correct_phrase.innerHTML = ""
            console.log(questions[question_number].Chants);
            console.log(questions[question_number].Phrase);
        } else {
            process.innerHTML = "END";
        }
    }
}

