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
                    lastAccess: null,
                    messages: [
                        {
                            date: "10/01/2020 15:30",
                            text: "Hai portato a spasso il cane?",
                            status: "sent",
                            toggle: false,
                        },
                        {
                            date: "10/01/2020 15:50",
                            text: "Ricordati di dargli da mangiare",
                            status: "sent",
                            toggle: false,
                        },
                        {
                            date: "10/01/2020 16:15",
                            text: "Tutto fatto!",
                            status: "received",
                            toggle: false,
                        }
                    ],
                },
                {
                    name: "Fabio",
                    avatar: "_2",
                    visible: true,
                    lastAccess: null,
                    messages: [
                        {
                            date: "20/03/2020 16:30",
                            text: "Ciao come stai?",
                            status: "sent",
                            toggle: false,
                        },
                        {
                            date: "20/03/2020 16:30",
                            text: "Bene grazie! Stasera ci vediamo?",
                            status: "received",
                            toggle: false,
                        },
                        {
                            date: "20/03/2020 16:35",
                            text: "Mi piacerebbe ma devo andare a fare la spesa.",
                            status: "sent",
                            toggle: false,
                        }
                    ],
                },
                {
                    name: "Samuele",
                    avatar: "_3",
                    visible: true,
                    lastAccess: null,
                    messages: [
                        {
                            date: "28/03/2020 10:10",
                            text: "La Marianna va in campagna",
                            status: "received",
                            toggle: false,
                        },
                        {
                            date: "28/03/2020 10:20",
                            text: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                            toggle: false,
                        },
                        {
                            date: "28/03/2020 16:15",
                            text: "Ah scusa!",
                            status: "received",
                            toggle: false,
                        }
                    ],
                },
                {
                    name: "Luisa",
                    avatar: "_6",
                    visible: true,
                    lastAccess: null,
                    messages: [
                        {
                            date: "10/01/2020 15:30",
                            text: "Lo sai che ha aperto una nuova pizzeria?",
                            status: "sent",
                            toggle: false,
                        },
                        {
                            date: "10/01/2020 15:50",
                            text: "Si, ma preferirei andare al cinema",
                            status: "received",
                            toggle: false,
                        }
                    ],
                },
            ],
            counter: null,
            searchText: '',
            newMessage: '',
            menu: false,
            answers: [
                'Ciao', 'Può essere', 'Non saprei', 'Certo!', 'Ovviamente',
            ]
        },
        created() {
            this.getLastAccess();
        },
        methods: {
            getLastDate: function (index) {
                //prendo la data dell'ultimo messaggio
                if (this.contacts[index].messages.length > 0) {
                    let lastMessage = this.contacts[index].messages.length - 1;
                    let lastMessageDate = this.contacts[index].messages[lastMessage].date;
                    return lastMessageDate;
                }
            },
            getLastMsg: function (index) {
                //prendo il testo dell'ultimo messaggio
                if (this.contacts[index].messages.length > 0) {
                    let lastMessage = this.contacts[index].messages.length - 1;
                    let lastMessageText = this.contacts[index].messages[lastMessage].text;
                    
                    //mostro "..." se messaggio lungo
                    if (lastMessageText.length > 25){
                        lastMessageText = lastMessageText + ' ...';
                    }
                    return lastMessageText;
                }
            },
            getActiveChat: function (index) {
                this.counter = index;
            },
            getLastAccess: function () {
                //per ogni contatto e ogni messaggio prendo la data del messaggio ricevuto
                this.contacts.forEach((contact) => {
                    contact.messages.forEach((message) => {
                        if (message.status == 'received') {
                            contact.lastAccess = `Ultimo accesso: ${message.date}`;
                        }
                    })
                })
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
            },
            sendMsg: function () {
                let messagesArray = this.contacts[this.counter].messages;
                //data corrente
                dayjs.extend(window.dayjs_plugin_customParseFormat);
                let data = dayjs().format("D/M/YYYY HH:mm"); 

                //se il messaggio inserito non è vuoto
                if (this.newMessage.trim() != ""){
                    messagesArray.push({
                        text: this.newMessage,
                        date: data,
                        status: "sent",
                        toggle: false,
                    });

                    //timer per risposta
                    setTimeout(() => {
                        //status online
                        this.contacts[this.counter].lastAccess = 'Online';
                        setTimeout(() => {
                            //status sta scrivendo
                            this.contacts[this.counter].lastAccess = 'Sta scrivendo..'
                            setTimeout(() => {
                                //numero random per risposta
                                let randomNum = this.rndNum(0, (this.answers.length - 1));
                                //nuova data per la risposta
                                let dataNew = dayjs().format("D/M/YYYY HH:mm");
                                messagesArray.push({
                                    text: this.answers[randomNum],
                                    date: dataNew,
                                    status: "received",
                                    toggle: false,
                                });
                                //status online
                                this.contacts[this.counter].lastAccess = 'Online';
                                setTimeout(() => {
                                    //cambio ultimo accesso
                                    this.contacts[this.counter].lastAccess = `Ultimo accesso: ${messagesArray[messagesArray.length - 1].date}`;
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                };
                this.newMessage = '';
            },
            rmvMessage: function (index) {
                // prendo l'array dei messaggi e tolgo quello selezionato
                let messagesArray = this.contacts[this.counter].messages;
                messagesArray.splice(index, 1);
            },
            rmvMessages: function (counter) {
                //svuoto l'array dei messaggi di quel contatto
                this.menu = false;
                this.contacts[counter].messages = [];
                
            },
            rmvChat: function () {
                //nascondo il contatto dalla lista e torno alla welcome screen
                this.menu = false;
                this.contacts[this.counter].visible = false;
                this.counter = null;
            },
            rndNum: function (min, max) {
                //funzione per prendere una risposta random dall'array risposte
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
        },
    }
)