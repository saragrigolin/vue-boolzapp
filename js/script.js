/*
Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato
*/

const app = new Vue (
    {
        el: '#app',
        data: {
            contacts: [
                {
                    name: "Michele",
                    avatar: "_1",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            text: "Hai portato a spasso il cane?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            text: "Ricordati di dargli da mangiare",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            text: "Tutto fatto!",
                            status: "received",
                        }
                    ],
                },
                {
                    name: "Fabio",
                    avatar: "_2",
                    visible: true,
                    messages: [
                        {
                            date: "20/03/2020 16:30:00",
                            text: "Ciao come stai?",
                            status: "sent",
                        },
                        {
                            date: "20/03/2020 16:30:55",
                            text: "Bene grazie! Stasera ci vediamo?",
                            status: "received",
                        },
                        {
                            date: "20/03/2020 16:35:00",
                            text: "Mi piacerebbe ma devo andare a fare la spesa.",
                            status: "sent",
                        }
                    ],
                },
                {
                    name: "Samuele",
                    avatar: "_3",
                    visible: true,
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            text: "La Marianna va in campagna",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            text: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            text: "Ah scusa!",
                            status: "received",
                        }
                    ],
                },
                {
                    name: "Luisa",
                    avatar: "_6",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            text: "Lo sai che ha aperto una nuova pizzeria?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            text: "Si, ma preferirei andare al cinema",
                            status: "received",
                        }
                    ],
                },
            ],
            counter: 0,
            searchText: '',
        },
        methods: {
            getLastDate: function (index) {
                //prendo la data dell'ultimo messaggio
                let lastMessage = this.contacts[index].messages.length - 1;
                let lastMessageDate = this.contacts[index].messages[lastMessage].date;
                return lastMessageDate;
            },
            getLastMsg: function (index) {
                //prendo il testo dell'ultimo messaggio
                let lastMessage = this.contacts[index].messages.length - 1;
                let lastMessageText = this.contacts[index].messages[lastMessage].text;
                
                //mostro "..." se messaggio lungo
                if (lastMessageText.length > 25){
                    lastMessageText = lastMessageText + ' ...';
                }
                return lastMessageText;
            },
            getActiveChat: function (index) {
                this.counter = index;
            },
            lastReceivedMsg: function (messages) {
                //prendo l'ultimo messaggio ricevuto per visualizzare l'ultimo accesso
                let receivedMsg = messages.filter((message) => {
                    return message.status == "received";
                });
                let length = receivedMsg.length - 1;
                return receivedMsg[length];
            },
            searchChat: function () {
                //se il nome che cerco è presente nella lista delle chat
                this.contacts.forEach((contact) => {
                    if (contact.name.toLowerCase().includes(this.searchText.toLowerCase())) {
                        contact.visible = true;
                    } else {
                        contact.visible = false;
                    }
                });
            }
        }
    }
)

