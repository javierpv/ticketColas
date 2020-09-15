
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error("El escritorio es necesario");
}

var label = $('small');
var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', () => {

    socket.emit('atenderTicket', { escritorio: escritorio }, (atenderTicket) => {

        if(atenderTicket === 'No hay tickets'){
            alert('No hay tickets');
            return;
        }

        label.text('Ticket: ' + atenderTicket.numero);

    });

});