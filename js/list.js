{
    let form = document.forms.lang_form;
    let table = document.getElementById('table');
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');

    const names = ["No.", "Chant Ja", "Chant En", "Link", "Phraze Ja", "Phraze En"]

    for (i = 0; i < names.length; i++) {
        let th = document.createElement('th'); // Number
        th.appendChild(document.createTextNode(names[i]));
        th.setAttribute('scope', 'col');
        tr.appendChild(th);
    }
    thead.appendChild(tr)
    table.appendChild(thead);

    form.lang_file.addEventListener('change', function (e) {
        let result = e.target.files[0];
        let reader = new FileReader();
        let fname = result.name;
        let fi = fname.split('.');
        let day = fi[0];
        // read
        reader.readAsText(result);
        reader.addEventListener('load', function () {
            let json = reader.result
            let questions = JSON.parse(json);
            let tbody = document.createElement('tbody');
            tbody.setAttribute('class', 'tmp');
            for (let i = 0; i < questions.length; i++) {
                let tr = document.createElement('tr');
                tr.setAttribute('class', 'trs');
                let th1 = document.createElement('th');
                th1.appendChild(document.createTextNode("Day " + day + " # " + (i + 1)));
                th1.setAttribute('scope', 'row');
                let td_ch_ja = document.createElement('td');
                td_ch_ja.appendChild(document.createTextNode(questions[i].Chants.JA));
                let td_ch_en = document.createElement('td');
                let td_ch_en_a = document.createElement('a');
                td_ch_en_a.setAttribute('class', 'hidden');
                td_ch_en_a.appendChild(document.createTextNode(questions[i].Chants.EN));
                td_ch_en.appendChild(td_ch_en_a);

                let td_link = document.createElement('td');
                let link = document.createElement('a');
                link.appendChild(document.createTextNode("G"));
                link.setAttribute('href', 'https://www.google.com/search?q=' + questions[i].Chants.EN + '+%E7%BF%BB%E8%A8%B3');
                link.setAttribute('target', '_blank');
                td_link.appendChild(link);

                let ja = [];
                let en = [];
                for (let j = 0; j < questions[i].Phrase.length; j++) {
                    ja.push(questions[i].Phrase[j].JA)
                    en.push(questions[i].Phrase[j].EN)
                }
                let td_ph_ja = document.createElement('td');
                td_ph_ja.appendChild(document.createTextNode(ja.join(' | ')));
                let td_ph_en_a = document.createElement('a');
                td_ph_en_a.setAttribute('class', 'hidden');
                td_ph_en_a.appendChild(document.createTextNode(en.join(' | ')));
                let td_ph_en = document.createElement('td');
                td_ph_en.appendChild(td_ph_en_a);
                tr.appendChild(th1);
                tr.appendChild(td_ch_ja);
                tr.appendChild(td_ch_en);
                tr.appendChild(td_link);
                tr.appendChild(td_ph_ja);
                tr.appendChild(td_ph_en);
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
        })
    })

    function OnClear() {
        tbodies = document.getElementsByClassName('tmp');
        for (i = tbodies.length - 1; i >= 0; i--) {
            tbodies[i].remove();
        }
        form.reset();
    }
}
