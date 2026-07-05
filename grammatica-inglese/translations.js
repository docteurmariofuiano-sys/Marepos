/* ===== Traduzioni a risposta libera (IT → EN americano) =====
   window.TRANSLATIONS = { topicId: [ {it, en:[varianti accettate], note?} ] }
   La prima variante è quella "modello" mostrata come soluzione.
   Il correttore normalizza: maiuscole, punteggiatura, contrazioni (n't, 'm, 're, 'll, 've, 'd), apostrofi.
   Le varianti con 's (is/has) vanno elencate esplicitamente.
*/
window.TRANSLATIONS = {

  "alfabeto": [
    { it: "Come si scrive il tuo nome?", en: ["How do you spell your name?"], note: "to spell = fare lo spelling, lettera per lettera." },
    { it: "Puoi ripetere, per favore?", en: ["Can you repeat, please?", "Could you repeat, please?", "Can you say that again, please?"], note: "'Could' è più gentile di 'can'." }
  ],
  "parti-discorso": [
    { it: "Io amo la musica.", en: ["I love music."], note: "Niente articolo: 'the music' sarebbe una musica specifica." },
    { it: "Loro parlano inglese.", en: ["They speak English."], note: "Le lingue sempre con la maiuscola in inglese." }
  ],
  "numeri-date": [
    { it: "Il mio compleanno è il 4 luglio.", en: ["My birthday is on July 4th.", "My birthday is on July fourth.", "My birthday is July 4th.", "My birthday is July fourth."], note: "USA: mese prima del giorno; il giorno è ordinale." },
    { it: "Ho trentadue anni.", en: ["I am thirty-two years old.", "I am 32 years old.", "I am thirty two years old.", "I am thirty-two.", "I am 32."], note: "Età con TO BE, mai con have!" }
  ],
  "plurale-regolare": [
    { it: "Due città e tre autobus.", en: ["Two cities and three buses."], note: "city → cities (cons.+y); bus → buses (+es)." },
    { it: "Mi piacciono le patate.", en: ["I like potatoes."], note: "potato → potatoes; niente articolo per il senso generale." }
  ],
  "plurale-irregolare": [
    { it: "I bambini hanno i piedi piccoli.", en: ["Children have small feet.", "Kids have small feet.", "The children have small feet."], note: "child → children; foot → feet." },
    { it: "Ci sono molte persone.", en: ["There are a lot of people.", "There are many people.", "There are lots of people."], note: "people è già plurale → are." }
  ],
  "numerabili": [
    { it: "Quanti soldi hai?", en: ["How much money do you have?", "How much money have you got?"], note: "money è uncountable → how much (non many)." },
    { it: "Vorrei un bicchiere d'acqua.", en: ["I would like a glass of water."], note: "water non si conta → serve 'a glass of'." }
  ],
  "genitivo-sassone": [
    { it: "La macchina di John è rossa.", en: ["John's car is red."], note: "Ordine invertito rispetto all'italiano: possessore + 's + cosa." },
    { it: "La casa dei miei genitori è grande.", en: ["My parents' house is big.", "My parents' house is large."], note: "Plurale in -s → solo apostrofo (parents')." }
  ],
  "to-be": [
    { it: "Ho fame.", en: ["I am hungry."], note: "Fame/sete/freddo/paura → TO BE + aggettivo, non have!" },
    { it: "Quanti anni hai?", en: ["How old are you?"], note: "Letteralmente 'quanto vecchio sei' — mai 'how many years'." }
  ],
  "to-have": [
    { it: "Hai una macchina?", en: ["Do you have a car?", "Have you got a car?"], note: "USA: Do you have…? (con l'ausiliare do)." },
    { it: "Non ho fratelli.", en: ["I don't have any brothers.", "I don't have brothers.", "I have no brothers.", "I haven't got any brothers."], note: "don't have + any, oppure have no." }
  ],
  "present-simple": [
    { it: "Lei lavora in ospedale.", en: ["She works in a hospital.", "She works at a hospital.", "She works at the hospital.", "She works in the hospital."], note: "Terza persona → works (-s!)." },
    { it: "Il treno parte alle sei.", en: ["The train leaves at six.", "The train leaves at 6."], note: "Orari ufficiali → present simple." }
  ],
  "present-simple-neg": [
    { it: "Dove abiti?", en: ["Where do you live?"], note: "Serve l'ausiliare DO: mai 'Where you live?'." },
    { it: "Lui non fuma.", en: ["He doesn't smoke."], note: "doesn't + verbo base (la -s è già su does)." }
  ],
  "present-progressive": [
    { it: "Sto studiando inglese.", en: ["I am studying English."], note: "am/is/are + -ing; English maiuscolo." },
    { it: "Sta piovendo.", en: ["It is raining.", "It's raining."], note: "Il soggetto 'it' è obbligatorio per il meteo." }
  ],
  "present-progressive-neg": [
    { it: "Stai lavorando?", en: ["Are you working?"], note: "Inversione di be, niente do." },
    { it: "Non stanno dormendo.", en: ["They aren't sleeping.", "They are not sleeping."], note: "be + not + -ing." }
  ],
  "present-simple-vs-progressive": [
    { it: "Di solito bevo caffè, ma oggi sto bevendo tè.", en: ["I usually drink coffee, but today I am drinking tea.", "Usually I drink coffee, but today I am drinking tea."], note: "Abitudine → simple; oggi/adesso → progressive." },
    { it: "Conosco la risposta.", en: ["I know the answer."], note: "know è stativo: mai 'I am knowing'." }
  ],
  "past-simple-regolare": [
    { it: "Ieri ho lavorato dieci ore.", en: ["Yesterday I worked ten hours.", "I worked ten hours yesterday.", "Yesterday I worked for ten hours.", "I worked for ten hours yesterday.", "I worked 10 hours yesterday.", "Yesterday I worked 10 hours."], note: "yesterday → simple past (non present perfect!)." },
    { it: "Hanno vissuto a Roma per due anni.", en: ["They lived in Rome for two years."], note: "Periodo concluso → simple past." }
  ],
  "past-simple-irregolare": [
    { it: "Sono andato a New York l'anno scorso.", en: ["I went to New York last year."], note: "go → went (irregolare)." },
    { it: "Ha comprato una macchina nuova.", en: ["She bought a new car.", "He bought a new car."], note: "buy → bought." }
  ],
  "past-simple-neg": [
    { it: "Non l'ho visto ieri.", en: ["I didn't see him yesterday.", "I didn't see it yesterday.", "I didn't see her yesterday."], note: "didn't + base (see, non saw!)." },
    { it: "Sei andato al lavoro?", en: ["Did you go to work?"], note: "Did + base (go, non went!)." }
  ],
  "past-progressive": [
    { it: "Stavo dormendo quando hai chiamato.", en: ["I was sleeping when you called."], note: "Sfondo → past progressive; interruzione → simple past." },
    { it: "Cosa stavi facendo?", en: ["What were you doing?"], note: "were + you + -ing." }
  ],
  "present-perfect-form": [
    { it: "Ho finito.", en: ["I have finished.", "I am done.", "I am finished."], note: "have + participio; colloquiale USA: I'm done." },
    { it: "Lei è appena arrivata.", en: ["She has just arrived.", "She's just arrived.", "She just arrived."], note: "USA: anche 'She just arrived' (simple past con just) è comune." }
  ],
  "present-perfect-uso": [
    { it: "Sei mai stato in America?", en: ["Have you ever been to America?", "Have you ever been to the US?", "Have you ever been to the United States?"], note: "been TO (non in); ever = mai nelle domande." },
    { it: "Vivo qui da cinque anni.", en: ["I have lived here for five years.", "I have been living here for five years.", "I have lived here for 5 years.", "I have been living here for 5 years."], note: "Azione che continua → present perfect + for (durata)." }
  ],
  "past-vs-perfect": [
    { it: "Ho perso le chiavi (e non le trovo).", en: ["I have lost my keys.", "I lost my keys."], note: "Effetto sul presente → present perfect (USA accetta anche il past)." },
    { it: "L'ho vista ieri.", en: ["I saw her yesterday."], note: "C'è 'ieri' → simple past obbligatorio." }
  ],
  "present-perfect-progressive": [
    { it: "Studio da due ore.", en: ["I have been studying for two hours.", "I have been studying for 2 hours."], note: "Durata di un'azione ancora in corso → have been + -ing." },
    { it: "Piove da stamattina.", en: ["It has been raining since this morning.", "It's been raining since this morning."], note: "since = da un punto preciso nel tempo." }
  ],
  "futuro-will": [
    { it: "Ti aiuterò.", en: ["I will help you."], note: "will + base, senza 'to'." },
    { it: "Penso che pioverà.", en: ["I think it will rain.", "I think it is going to rain."], note: "Opinione (I think) → will." }
  ],
  "futuro-going-to": [
    { it: "Stasera studierò (l'ho già deciso).", en: ["I am going to study tonight.", "Tonight I am going to study."], note: "Piano già deciso → going to." },
    { it: "Stavo per chiamarti.", en: ["I was going to call you."], note: "was going to = intenzione non realizzata." }
  ],
  "futuro-4-modi": [
    { it: "Il film inizia alle otto.", en: ["The movie starts at eight.", "The movie starts at 8.", "The film starts at eight.", "The film starts at 8."], note: "Orario ufficiale → present simple (USA: movie)." },
    { it: "Domani vedo il dentista.", en: ["I am seeing the dentist tomorrow.", "I am going to see the dentist tomorrow.", "Tomorrow I am seeing the dentist."], note: "Appuntamento fissato → present continuous." }
  ],
  "past-perfect": [
    { it: "Il treno era già partito.", en: ["The train had already left."], note: "Anteriore a un momento passato → had + participio." },
    { it: "Quando arrivai, erano già usciti.", en: ["When I arrived, they had already left.", "When I arrived, they had already gone out."], note: "Prima l'uscita (past perfect), poi l'arrivo (simple past)." }
  ],
  "past-perfect-progressive": [
    { it: "Era stanca perché aveva lavorato tutto il giorno.", en: ["She was tired because she had been working all day."], note: "Durata prima di un momento passato → had been + -ing." }
  ],
  "stato-moto": [
    { it: "Vado a casa.", en: ["I am going home.", "I go home."], note: "home senza 'to'! (mai 'to home')." },
    { it: "Voglio un caffè.", en: ["I want a coffee.", "I want coffee."], note: "want è stativo: mai 'I am wanting'." }
  ],
  "discorso-indiretto": [
    { it: "Ha detto che era stanco.", en: ["He said he was tired.", "He said that he was tired.", "She said she was tired.", "She said that she was tired."], note: "Backshift: 'I am tired' → said he WAS tired." },
    { it: "Mi ha chiesto dove abitavo.", en: ["He asked me where I lived.", "She asked me where I lived."], note: "Niente inversione: NON 'where did I live'." }
  ],
  "passivo": [
    { it: "Qui si parla inglese.", en: ["English is spoken here."], note: "Il 'si' impersonale spesso si rende col passivo." },
    { it: "La mia macchina è stata rubata.", en: ["My car was stolen.", "My car has been stolen."], note: "be + participio (stolen, da steal-stole-stolen)." }
  ],
  "causativi": [
    { it: "Mi sono fatto tagliare i capelli.", en: ["I got my hair cut.", "I had my hair cut.", "I got a haircut."], note: "have/get + oggetto + participio (servizio fatto da altri)." },
    { it: "Mi ha fatto aspettare.", en: ["She made me wait.", "He made me wait."], note: "make + persona + base senza 'to'." }
  ],
  "gerundio-participio": [
    { it: "Nuotare fa bene.", en: ["Swimming is good for you.", "Swimming is good."], note: "Verbo come soggetto → -ing (gerundio)." },
    { it: "Sono bravo a cucinare.", en: ["I am good at cooking."], note: "Dopo preposizione → sempre -ing." }
  ],
  "gerundio-infinito": [
    { it: "Voglio imparare l'inglese.", en: ["I want to learn English."], note: "want + to + base." },
    { it: "Mi piace leggere.", en: ["I like reading.", "I like to read.", "I enjoy reading."], note: "like accetta entrambi; enjoy solo -ing." }
  ],
  "condizionale": [
    { it: "Vorrei un caffè, per favore.", en: ["I would like a coffee, please."], note: "'Vorrei' = I'd like (educato), non 'I want'." },
    { it: "Cosa faresti?", en: ["What would you do?"], note: "would + base, con inversione nella domanda." }
  ],
  "if-zero": [
    { it: "Se scaldi il ghiaccio, si scioglie.", en: ["If you heat ice, it melts."], note: "Verità generale → presente + presente (niente will)." }
  ],
  "if-primo": [
    { it: "Se piove, resterò a casa.", en: ["If it rains, I will stay home.", "If it rains, I will stay at home."], note: "Dopo if → presente (mai 'if it will rain')." },
    { it: "Se studi, passerai l'esame.", en: ["If you study, you will pass the exam."], note: "if + presente, will nella principale." }
  ],
  "if-secondo": [
    { it: "Se fossi in te, accetterei.", en: ["If I were you, I would accept."], note: "if I WERE you (congiuntivo) + would." },
    { it: "Se avessi soldi, viaggerei.", en: ["If I had money, I would travel."], note: "if + past simple, would + base (would MAI dopo if)." }
  ],
  "if-terzo": [
    { it: "Se avessi studiato, avrei passato l'esame.", en: ["If I had studied, I would have passed the exam."], note: "if + past perfect, would have + participio." }
  ],
  "can-may-will-shall": [
    { it: "So nuotare.", en: ["I can swim."], note: "'sapere fare' = can (mai 'I know to swim')." },
    { it: "Potresti aiutarmi?", en: ["Could you help me?", "Can you help me?"], note: "could = richiesta gentile; + base senza to." }
  ],
  "have-to-must": [
    { it: "Devo andare.", en: ["I have to go.", "I must go.", "I have got to go.", "I gotta go."], note: "USA colloquiale: I gotta go." },
    { it: "Non devi pagare (non è necessario).", en: ["You don't have to pay."], note: "non necessità → don't have to (mustn't = vietato!)." }
  ],
  "pronomi-personali": [
    { it: "Lei lo ama.", en: ["She loves him."], note: "she (soggetto) + him (complemento)." },
    { it: "Dallo a me.", en: ["Give it to me."], note: "dopo preposizione → me (mai I)." }
  ],
  "pronomi-riflessivi": [
    { it: "Mi sono fatto male.", en: ["I hurt myself."], note: "hurt + riflessivo quando l'azione ricade su di te." },
    { it: "Mi sento stanco.", en: ["I feel tired."], note: "feel NON è riflessivo: mai 'I feel myself tired'." }
  ],
  "pronomi-relativi": [
    { it: "L'uomo che ha chiamato è mio zio.", en: ["The man who called is my uncle.", "The man that called is my uncle."], note: "persona → who (o that); senza ripetere 'he'." },
    { it: "La città dove vivo è piccola.", en: ["The city where I live is small.", "The town where I live is small."], note: "luogo → where." }
  ],
  "pronomi-impersonali": [
    { it: "C'è un problema.", en: ["There is a problem.", "There's a problem."], note: "'c'è' = there is (non 'it is')." },
    { it: "C'erano molte persone.", en: ["There were a lot of people.", "There were many people.", "There were lots of people."], note: "people plurale → there were." }
  ],
  "question-tags": [
    { it: "Sei italiano, vero?", en: ["You are Italian, aren't you?", "You're Italian, aren't you?"], note: "frase affermativa → tag negativo." },
    { it: "Non è venuta, vero?", en: ["She didn't come, did she?"], note: "frase negativa → tag affermativo." }
  ],
  "possessivi": [
    { it: "Questo libro è mio.", en: ["This book is mine."], note: "pronome possessivo → mine (senza nome dopo)." },
    { it: "Un mio amico vive a Boston.", en: ["A friend of mine lives in Boston."], note: "doppio genitivo: a friend of mine." }
  ],
  "interrogativi": [
    { it: "Di chi è questa borsa?", en: ["Whose bag is this?", "Whose is this bag?"], note: "whose = di chi (≠ who's = who is)." },
    { it: "Quale preferisci?", en: ["Which one do you prefer?", "Which do you prefer?"], note: "scelta tra opzioni → which." }
  ],
  "indefiniti": [
    { it: "Non ho niente.", en: ["I don't have anything.", "I have nothing."], note: "UNA sola negazione: don't + anything oppure have + nothing." },
    { it: "Tutti lo sanno.", en: ["Everybody knows it.", "Everyone knows it.", "Everybody knows.", "Everyone knows."], note: "everybody + verbo singolare (knows)." }
  ],
  "comparativi": [
    { it: "Lei è più alta di me.", en: ["She is taller than me.", "She's taller than me.", "She is taller than I am."], note: "aggettivo corto → -er + than." },
    { it: "È il film migliore che abbia mai visto.", en: ["It is the best movie I have ever seen.", "It's the best movie I have ever seen.", "It is the best film I have ever seen.", "It's the best film I have ever seen."], note: "good → the best; + present perfect + ever." }
  ],
  "posizione-aggettivi": [
    { it: "Una macchina rossa.", en: ["A red car."], note: "aggettivo PRIMA del nome." },
    { it: "Due gatti neri.", en: ["Two black cats."], note: "aggettivo invariabile: mai 'blacks'." }
  ],
  "avverbi": [
    { it: "Lei canta bene.", en: ["She sings well."], note: "well (avverbio), non good (aggettivo)." },
    { it: "Guida con attenzione!", en: ["Drive carefully!"], note: "careful + ly → carefully." }
  ],
  "avverbi-frequenza": [
    { it: "Bevo sempre il caffè la mattina.", en: ["I always drink coffee in the morning."], note: "always PRIMA del verbo principale." },
    { it: "Lei è sempre in ritardo.", en: ["She is always late.", "She's always late."], note: "con TO BE l'avverbio va DOPO il verbo." }
  ],
  "locuzioni-avverbiali": [
    { it: "Vado in palestra due volte a settimana.", en: ["I go to the gym twice a week."], note: "twice a week (non 'two times in a week')." },
    { it: "Sono andato al cinema ieri sera.", en: ["I went to the movies last night.", "I went to the movie theater last night.", "I went to the cinema last night."], note: "USA: the movies; 'ieri sera' = last night." }
  ],
  "proposizioni-avverbiali": [
    { it: "Ti chiamo quando arrivo.", en: ["I will call you when I arrive.", "I will call you when I get there."], note: "dopo when → presente (mai 'when I will arrive')." },
    { it: "Benché piovesse, siamo usciti.", en: ["Although it was raining, we went out.", "Even though it was raining, we went out.", "Although it rained, we went out.", "Even though it rained, we went out."], note: "although senza 'but'." }
  ],
  "articoli": [
    { it: "Mi piacciono i cani.", en: ["I like dogs."], note: "senso generale → NIENTE articolo." },
    { it: "È un medico.", en: ["She is a doctor.", "She's a doctor.", "He is a doctor.", "He's a doctor."], note: "professioni → a/an obbligatorio." }
  ],
  "preposizioni-base": [
    { it: "Ci vediamo lunedì alle otto.", en: ["See you on Monday at eight.", "See you on Monday at 8.", "I will see you on Monday at eight.", "I will see you on Monday at 8."], note: "on Monday (giorno), at eight (ora)." },
    { it: "Sono nato a maggio.", en: ["I was born in May."], note: "mesi → in; e 'sono nato' = I WAS born." }
  ],
  "preposizioni-luogo": [
    { it: "Il libro è sul tavolo.", en: ["The book is on the table."], note: "superficie → on." },
    { it: "Ti aspetto alla fermata dell'autobus.", en: ["I will wait for you at the bus stop.", "I am waiting for you at the bus stop."], note: "punto preciso → at; wait FOR someone." }
  ],
  "coordinative": [
    { it: "Ero stanco, quindi sono andato a letto.", en: ["I was tired, so I went to bed."], note: "quindi → so; to bed senza articolo." },
    { it: "Né carne né pesce.", en: ["Neither meat nor fish."], note: "neither … nor …" }
  ],
  "subordinative": [
    { it: "Sono rimasto a casa perché ero malato.", en: ["I stayed home because I was sick.", "I stayed at home because I was sick.", "I stayed home because I was ill.", "I stayed at home because I was ill."], note: "USA: sick; because + frase." },
    { it: "Mentre cucinavo, ascoltavo musica.", en: ["While I was cooking, I was listening to music.", "While I was cooking, I listened to music."], note: "while + frase (mai 'during I was cooking')." }
  ]
};
