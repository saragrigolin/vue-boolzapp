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
                        },
                        {
                            date: "10/01/2020 15:50",
                            text: "Ricordati di dargli da mangiare",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15",
                            text: "Tutto fatto!",
                            status: "received",
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
                        },
                        {
                            date: "20/03/2020 16:30",
                            text: "Bene grazie! Stasera ci vediamo?",
                            status: "received",
                        },
                        {
                            date: "20/03/2020 16:35",
                            text: "Mi piacerebbe ma devo andare a fare la spesa.",
                            status: "sent",
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
                        },
                        {
                            date: "28/03/2020 10:20",
                            text: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15",
                            text: "Ah scusa!",
                            status: "received",
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
                        },
                        {
                            date: "10/01/2020 15:50",
                            text: "Si, ma preferirei andare al cinema",
                            status: "received",
                        }
                    ],
                },
            ],
            counter: 0,
            searchText: '',
            newMessage: '',
            activeMessage: {
                index: false,
                show: false
            },
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
                        status: "sent"
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
                                    status: "received"
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
            showMenu: function (index) {
                //funzione per mostrare il menu del messaggio
                if (this.activeMessage.index !== index && this.activeMessage.index !== false){
                    this.activeMessage.show = false;
                    this.activeMessage.index = false;
                }
                this.activeMessage.show = !this.activeMessage.show;
                this.activeMessage.index = index;
            },
            rmvMessage: function (index) {
                // prendo l'array dei messaggi e tolgo quello selezionato
                let messagesArray = this.contacts[this.counter].messages;
                messagesArray.splice(index, 1);

                // nascondo il menu
                this.activeMessage.show = false;
                this.activeMessage.index = false;
            },
            rndNum: function (min, max) {
                //funzione per prendere una risposta random dall'array risposte
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        },
    }
)

