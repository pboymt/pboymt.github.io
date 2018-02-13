if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

function formatTime(time = 0) {
    const date = new Date(time);
    return `${date.getFullYear()}年${(date.getMonth()+1).toString().padStart(2,'0')}月${date.getDate().toString().padStart(2,'0')}日 ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:${date.getSeconds().toString().padStart(2,'0')}`
}
$(() => {
    console.log('?');
    $.getJSON('./data/data.json', (body) => {
        console.log(body);
        $('#last-update').text(formatTime(body.info.lastUpdate));
        const list = body.list.sort((a, b) => {
            return a.addtime - b.addtime;
        });
        $('#list').children().remove();
        for (let item of list) {
            const tr = $('<tr>');
            tr.append($('<td>').text(formatTime(item.addtime)));
            tr.append($('<td>').text(item.mid));
            tr.append($('<td>').text(item.username));
            tr.append($('<td>').text(formatTime(item.regtime)));
            tr.append($('<td>').text(item.hasForbid ? '是' : '否'));
            $('#list').append(tr);
        }
    });
});