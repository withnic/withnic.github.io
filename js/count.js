{
    let cnt = 0;
    update();

    function up() {
        cnt++;
        update();
    }

    function down() {
        cnt--;
        update();
    }

    function update () {
       let c = document.getElementById("count");
       c.innerHTML = cnt;
    }
}
