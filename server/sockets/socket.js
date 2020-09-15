const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let ticket = ticketControl.siguiente();

        console.log(ticket);

        callback(ticket);

    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return {
                err: true,
                mensaje: 'El escritorio es necesario'
            };
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });

    });

});