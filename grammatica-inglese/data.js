/* ===== Grammatica Inglese Americana — contenuti =====
   Struttura: window.GRAMMAR = [ { cat, icon, topics:[ {id,title,lead,html,quiz} ] } ]
   quiz: [ {q, options:[...], answer:index, explain} ]
*/
window.GRAMMAR = [

/* ============================================================ LE BASI */
{ cat: "Le Basi", icon: "📚", topics: [

  { id: "alfabeto", title: "Alfabeto e Spelling", lead: "Le 26 lettere e come si pronunciano (fondamentale per fare lo spelling al telefono).",
    html: `
    <div class="card"><h3>🔤 Le 26 lettere</h3>
    <p>L'alfabeto inglese ha <b>26 lettere</b>, come l'italiano ma con in più <code>J K W X Y</code> e senza accenti.</p>
    <table class="ex"><tr><th>Lettera</th><th>Si dice (approx.)</th><th>Lettera</th><th>Si dice</th></tr>
    <tr><td>A</td><td>èi /eɪ/</td><td>N</td><td>en /ɛn/</td></tr>
    <tr><td>B</td><td>bi /biː/</td><td>O</td><td>ou /oʊ/</td></tr>
    <tr><td>C</td><td>si /siː/</td><td>P</td><td>pi /piː/</td></tr>
    <tr><td>D</td><td>di /diː/</td><td>Q</td><td>chiu /kjuː/</td></tr>
    <tr><td>E</td><td>i /iː/</td><td>R</td><td>ar /ɑːr/</td></tr>
    <tr><td>F</td><td>ef /ɛf/</td><td>S</td><td>es /ɛs/</td></tr>
    <tr><td>G</td><td>gi /dʒiː/</td><td>T</td><td>ti /tiː/</td></tr>
    <tr><td>H</td><td>èicc /eɪtʃ/</td><td>U</td><td>iu /juː/</td></tr>
    <tr><td>I</td><td>ai /aɪ/</td><td>V</td><td>vi /viː/</td></tr>
    <tr><td>J</td><td>gèi /dʒeɪ/</td><td>W</td><td>dàbol-iu /ˈdʌbəljuː/</td></tr>
    <tr><td>K</td><td>chèi /keɪ/</td><td>X</td><td>ex /ɛks/</td></tr>
    <tr><td>L</td><td>el /ɛl/</td><td>Y</td><td>uài /waɪ/</td></tr>
    <tr><td>M</td><td>em /ɛm/</td><td>Z</td><td>zi /ziː/ (USA)</td></tr>
    </table></div>
    <div class="rule">🇺🇸 <b>Americano vs Britannico:</b> la <b>Z</b> in USA si dice <b>"zi"</b> /ziː/, in UK "zed".</div>
    <div class="card"><h3>Fare lo spelling</h3>
    <p>Per lettere doppie gli americani dicono <code>double</code>: <b>ss → "double S"</b>. Per chiarire al telefono si usa l'alfabeto fonetico: <i>A as in Alpha, B as in Bravo…</i></p></div>
    <div class="err"><b>Errore tipico:</b> pronunciare la <b>E</b> come "e" e la <b>I</b> come "i". In inglese è il contrario: <b>E</b> = "i", <b>I</b> = "ai". <span class="no">"i-mail"</span> → <span class="ok">"i" = E</span>.</div>`,
    quiz: [
      { q: "Come si pronuncia la lettera <b>E</b>?", options: ["è", "i /iː/", "ei"], answer: 1, explain: "E si legge /iː/ (i). Attenzione: è il classico trabocchetto per gli italiani." },
      { q: "In inglese americano la <b>Z</b> si dice:", options: ["zed", "zi /ziː/", "zeta"], answer: 1, explain: "USA: /ziː/. UK: 'zed'." }
    ] },

  { id: "parti-discorso", title: "Le Parti del Discorso", lead: "Le 8 categorie di parole: la mappa di tutta la grammatica.",
    html: `
    <div class="card"><h3>Le 8 parti del discorso</h3>
    <table class="ex"><tr><th>Categoria</th><th>Cosa indica</th><th>Esempi</th></tr>
    <tr><td><b>Noun</b> (sostantivo)</td><td>persona, cosa, idea</td><td>dog, love, John</td></tr>
    <tr><td><b>Pronoun</b> (pronome)</td><td>sostituisce un nome</td><td>I, you, it, they</td></tr>
    <tr><td><b>Verb</b> (verbo)</td><td>azione o stato</td><td>run, be, think</td></tr>
    <tr><td><b>Adjective</b> (aggettivo)</td><td>descrive un nome</td><td>big, red, happy</td></tr>
    <tr><td><b>Adverb</b> (avverbio)</td><td>descrive verbo/agg.</td><td>quickly, very, well</td></tr>
    <tr><td><b>Preposition</b></td><td>relazione</td><td>in, on, at, to</td></tr>
    <tr><td><b>Conjunction</b></td><td>collega</td><td>and, but, because</td></tr>
    <tr><td><b>Determiner/Article</b></td><td>introduce il nome</td><td>a, the, this, my</td></tr>
    </table></div>
    <div class="rule">💡 In inglese l'<b>ordine delle parole</b> è quasi sempre <b>SVO</b>: <span class="en">Soggetto → Verbo → Oggetto</span>. <i>I (S) love (V) you (O).</i></div>
    <div class="err"><b>Errore tipico:</b> in italiano puoi omettere il soggetto ("Vado a casa"), in inglese <b>NO</b>: <span class="no">Go home</span> → <span class="ok">I go home</span>. Il soggetto è quasi sempre obbligatorio.</div>`,
    quiz: [
      { q: "In <i>She sings <b>beautifully</b></i>, 'beautifully' è un…", options: ["aggettivo", "avverbio", "verbo"], answer: 1, explain: "Descrive il verbo 'sings' → avverbio (finisce in -ly)." },
      { q: "L'ordine base della frase inglese è:", options: ["Verbo-Soggetto-Oggetto", "Soggetto-Verbo-Oggetto", "Oggetto-Verbo-Soggetto"], answer: 1, explain: "SVO: I love you." }
    ] },

  { id: "numeri-date", title: "Numeri e Date", lead: "Cardinali, ordinali e come dire/scrivere le date all'americana.",
    html: `
    <div class="card"><h3>Cardinali e ordinali</h3>
    <table class="ex"><tr><th>Cardinale</th><th>Ordinale</th></tr>
    <tr><td>one, two, three</td><td>first (1st), second (2nd), third (3rd)</td></tr>
    <tr><td>four, five, twelve</td><td>fourth, fifth, twelfth</td></tr>
    <tr><td>twenty, twenty-one</td><td>twentieth, twenty-first</td></tr>
    </table>
    <p><b>Centinaia/migliaia:</b> <i>325 = three hundred <b>and</b> twenty-five</i> (in USA la "and" spesso si omette: <i>three hundred twenty-five</i>). <i>2,500 = two thousand five hundred</i>.</p></div>
    <div class="card"><h3>🇺🇸 Le date (formato americano)</h3>
    <div class="rule">USA = <b>Mese / Giorno / Anno</b>. <i>07/04/2026</i> = <b>4 luglio</b> (non 7 aprile!).</div>
    <p>Si dice: <i>July <b>fourth</b>, twenty twenty-six</i> oppure <i>July 4th</i>. Il giorno è <b>ordinale</b>.</p>
    <p><b>Anni:</b> 1999 = "nineteen ninety-nine"; 2026 = "twenty twenty-six" o "two thousand twenty-six".</p></div>
    <div class="err"><b>Errore tipico italiano:</b> leggere <i>07/04</i> come 7 aprile. In America è <b>4 luglio</b> (Independence Day!). E si scrive prima il mese.</div>
    <div class="card"><h3>Prezzi, orari</h3>
    <p><i>$4.50</i> = "four fifty" · <i>3:30</i> = "three thirty" / "half past three".</p></div>`,
    quiz: [
      { q: "Negli USA la data <b>03/08/2026</b> significa:", options: ["3 agosto", "8 marzo", "3 agosto o 8 marzo"], answer: 1, explain: "Mese/giorno/anno → 8 marzo (March 8th)." },
      { q: "L'ordinale di 'five' è:", options: ["fiveth", "fifth", "fifteenth"], answer: 1, explain: "five → fifth (irregolare)." },
      { q: "2026 si legge spesso:", options: ["twenty twenty-six", "two zero two six", "two thousand and twenty-sixth"], answer: 0, explain: "'twenty twenty-six' è il modo più naturale." }
    ] }
]},

/* ============================================================ SOSTANTIVI */
{ cat: "Sostantivi", icon: "📦", topics: [

  { id: "plurale-regolare", title: "Plurale Regolare", lead: "La regola base (+s) e le sue varianti ortografiche.",
    html: `
    <div class="card"><h3>Regola generale: + s</h3>
    <p>La maggior parte dei nomi forma il plurale aggiungendo <b>-s</b>: <i>book → books, car → cars</i>.</p>
    <table class="ex"><tr><th>Finale del nome</th><th>Plurale</th><th>Esempio</th></tr>
    <tr><td>-s, -ss, -sh, -ch, -x, -z</td><td>+ <b>es</b></td><td>bus→buses, box→boxes, watch→watches</td></tr>
    <tr><td>consonante + y</td><td>y → <b>ies</b></td><td>city→cities, baby→babies</td></tr>
    <tr><td>vocale + y</td><td>+ s</td><td>boy→boys, day→days</td></tr>
    <tr><td>-o (alcuni)</td><td>+ es</td><td>tomato→tomatoes, potato→potatoes</td></tr>
    <tr><td>-f / -fe (molti)</td><td>→ <b>ves</b></td><td>leaf→leaves, knife→knives</td></tr>
    </table></div>
    <div class="rule">🔊 <b>Pronuncia della -s finale:</b> /s/ dopo suono sordo (books), /z/ dopo suono sonoro (dogs), /ɪz/ dopo s/sh/ch/x (buses).</div>
    <div class="err"><b>Errore tipico:</b> <span class="no">citys, babys</span> → <span class="ok">cities, babies</span> (consonante + y → ies).</div>`,
    quiz: [
      { q: "Plurale di <b>city</b>:", options: ["citys", "cities", "cityes"], answer: 1, explain: "consonante + y → ies." },
      { q: "Plurale di <b>box</b>:", options: ["boxs", "boxes", "boxies"], answer: 1, explain: "finale in -x → +es." },
      { q: "Plurale di <b>day</b>:", options: ["daies", "days", "dayes"], answer: 1, explain: "vocale + y → solo +s." }
    ] },

  { id: "plurale-irregolare", title: "Plurale Irregolare", lead: "I nomi che non seguono la regola: vanno memorizzati.",
    html: `
    <div class="card"><h3>I principali irregolari</h3>
    <table class="ex"><tr><th>Singolare</th><th>Plurale</th><th>Italiano</th></tr>
    <tr><td>man</td><td><b>men</b></td><td>uomo/uomini</td></tr>
    <tr><td>woman</td><td><b>women</b> /ˈwɪmɪn/</td><td>donna/donne</td></tr>
    <tr><td>child</td><td><b>children</b></td><td>bambino/i</td></tr>
    <tr><td>foot</td><td><b>feet</b></td><td>piede/i</td></tr>
    <tr><td>tooth</td><td><b>teeth</b></td><td>dente/i</td></tr>
    <tr><td>mouse</td><td><b>mice</b></td><td>topo/i</td></tr>
    <tr><td>person</td><td><b>people</b></td><td>persona/persone</td></tr>
    </table>
    <p><b>Uguali al singolare:</b> <i>fish, sheep, deer, aircraft, series, species</i>. <i>one sheep → two sheep</i>.</p></div>
    <div class="err"><b>Errore tipico:</b> <span class="no">persons, childs, foots</span> → <span class="ok">people, children, feet</span>. Inoltre <i>people</i> è già plurale: <span class="no">people is</span> → <span class="ok">people are</span>.</div>`,
    quiz: [
      { q: "Plurale di <b>child</b>:", options: ["childs", "childrens", "children"], answer: 2, explain: "children (irregolare)." },
      { q: "Plurale di <b>foot</b>:", options: ["foots", "feet", "feets"], answer: 1, explain: "foot → feet." },
      { q: "'People' vuole il verbo:", options: ["is", "are", "was (sing.)"], answer: 1, explain: "people è plurale → are." }
    ] },

  { id: "numerabili", title: "Numerabili e Non Numerabili", lead: "Countable vs uncountable: some/any, much/many, a lot of.",
    html: `
    <div class="card"><h3>Due tipi di nomi</h3>
    <p><b>Numerabili (countable):</b> si contano, hanno plurale → <i>a book, three books</i>.</p>
    <p><b>Non numerabili (uncountable):</b> masse/astratti, NO plurale, NO 'a' → <i>water, money, information, advice, news, bread, rice</i>.</p></div>
    <table class="ex"><tr><th></th><th>Countable</th><th>Uncountable</th></tr>
    <tr><td>quanti/quanto?</td><td><b>How many</b> books?</td><td><b>How much</b> water?</td></tr>
    <tr><td>tanti/tanto</td><td>many / a lot of</td><td>much / a lot of</td></tr>
    <tr><td>un po'</td><td>a few</td><td>a little</td></tr>
    <tr><td>articolo 'a'</td><td>✔ a book</td><td>✘ → a piece of / a glass of</td></tr>
    </table>
    <div class="rule">Per contare un uncountable si usa un contenitore/porzione: <i>a <b>glass of</b> water, a <b>piece of</b> advice, two <b>slices of</b> bread</i>.</div>
    <div class="err"><b>Errori tipici (false friends grammaticali):</b> <span class="no">an information, informations</span> → <span class="ok">information / a piece of information</span>. Anche <b>news, advice, furniture, money, hair, work</b> sono uncountable: <span class="no">a news, many advices</span> → <span class="ok">a piece of news, a lot of advice</span>.</div>`,
    quiz: [
      { q: "Quale è corretto?", options: ["many informations", "much information", "a information"], answer: 1, explain: "information è uncountable → much / a piece of information." },
      { q: "'How ___ money do you have?'", options: ["many", "much", "few"], answer: 1, explain: "money è uncountable → how much." },
      { q: "Corretto:", options: ["a few water", "a little water", "many water"], answer: 1, explain: "water uncountable → a little." }
    ] },

  { id: "genitivo-sassone", title: "Genitivo Sassone ('s)", lead: "Il possesso: John's car. Quando usare 's e quando 'of'.",
    html: `
    <div class="card"><h3>La regola del 's</h3>
    <p>Per esprimere il possesso di <b>persone/animali</b> si usa <b>'s</b>: <i>John<b>'s</b> car</i> = la macchina di John. In italiano l'ordine è invertito!</p>
    <table class="ex"><tr><th>Caso</th><th>Forma</th><th>Esempio</th></tr>
    <tr><td>singolare</td><td>+ 's</td><td>the dog's tail</td></tr>
    <tr><td>plurale in -s</td><td>+ '</td><td>my parents' house</td></tr>
    <tr><td>plurale irregolare</td><td>+ 's</td><td>children's toys</td></tr>
    <tr><td>due possessori</td><td>'s sull'ultimo</td><td>Tom and Amy's car (una sola)</td></tr>
    </table></div>
    <div class="rule">🇺🇸 Con <b>cose/oggetti</b> si preferisce <b>of</b>: <i>the roof <b>of</b> the house</i>, non "the house's roof". Con luoghi/tempo il 's è ok: <i>today's news, New York's museums</i>.</div>
    <div class="err"><b>Errore tipico:</b> tradurre "la macchina di John" con <span class="no">the car of John</span> → <span class="ok">John's car</span>. E attenzione: <b>it's</b> = "it is", il possessivo è <b>its</b> (senza apostrofo!).</div>`,
    quiz: [
      { q: "\"La casa dei miei genitori\":", options: ["my parents's house", "my parents' house", "the house of my parents"], answer: 1, explain: "plurale in -s → solo apostrofo." },
      { q: "\"I giocattoli dei bambini\":", options: ["the childrens' toys", "the children's toys", "the toys of children"], answer: 1, explain: "plurale irregolare children → 's." },
      { q: "Possessivo di 'it':", options: ["it's", "its", "its'"], answer: 1, explain: "its (senza apostrofo). it's = it is." }
    ] }
]},

/* ============================================================ VERBI */
{ cat: "Verbi", icon: "🔁", topics: [

  { id: "to-be", title: "To Be — Essere", lead: "Il verbo più importante: am/is/are, forma negativa e interrogativa.",
    html: `
    <div class="card"><h3>Presente di TO BE</h3>
    <table class="ex"><tr><th>Affermativa</th><th>Contratta</th><th>Negativa</th></tr>
    <tr><td>I am</td><td>I'm</td><td>I'm not</td></tr>
    <tr><td>you are</td><td>you're</td><td>you aren't</td></tr>
    <tr><td>he/she/it is</td><td>he's</td><td>he isn't</td></tr>
    <tr><td>we/you/they are</td><td>we're</td><td>we aren't</td></tr>
    </table>
    <p><b>Interrogativa:</b> si <b>inverte</b> verbo e soggetto → <i>Are you ready? Is she a doctor?</i></p></div>
    <div class="rule">💡 In inglese TO BE si usa dove l'italiano usa <b>AVERE</b>: età, fame, sete, paura, ragione. <i>I <b>am</b> 30 (years old), I <b>am</b> hungry, I <b>am</b> cold, I <b>am</b> right.</i></div>
    <div class="err"><b>Errori tipici:</b> <span class="no">I have 30 years</span> → <span class="ok">I am 30 years old</span>. <span class="no">I have hungry</span> → <span class="ok">I'm hungry</span>. <span class="no">I have right</span> → <span class="ok">I'm right</span>.</div>`,
    quiz: [
      { q: "\"Ho 25 anni\":", options: ["I have 25 years", "I am 25 years old", "I am 25 years"], answer: 1, explain: "età con TO BE: I am … years old." },
      { q: "\"Ho fame\":", options: ["I have hunger", "I am hungry", "I have hungry"], answer: 1, explain: "hungry (aggettivo) con to be." },
      { q: "Forma interrogativa di 'She is a nurse':", options: ["She is a nurse?", "Is she a nurse?", "Does she is a nurse?"], answer: 1, explain: "inversione verbo-soggetto." }
    ] },

  { id: "to-have", title: "To Have (Got) — Avere", lead: "have / has, have got, e gli usi idiomatici (have breakfast…).",
    html: `
    <div class="card"><h3>Possesso: have / have got</h3>
    <p>Due modi (stesso significato): <i>I <b>have</b> a car = I <b>have got</b> a car (I've got)</i>. In USA si preferisce spesso <b>have</b> semplice.</p>
    <table class="ex"><tr><th></th><th>have</th><th>have got</th></tr>
    <tr><td>afferm.</td><td>She has a dog</td><td>She's got a dog</td></tr>
    <tr><td>neg.</td><td>She doesn't have…</td><td>She hasn't got…</td></tr>
    <tr><td>domanda</td><td>Do you have…?</td><td>Have you got…?</td></tr>
    </table></div>
    <div class="rule">🇺🇸 Americano tipico: <b>Do you have…?</b> / <b>I don't have…</b> (con l'ausiliare DO). "Have got" è più britannico ma capito ovunque.</div>
    <div class="card"><h3>Have per attività (non possesso)</h3>
    <p><i>have breakfast/lunch, have a shower, have a party, have a good time</i> → qui NON si usa "got".</p></div>
    <div class="err"><b>Errore tipico:</b> <span class="no">Have you a car?</span> (arcaico) → <span class="ok">Do you have a car?</span></div>`,
    quiz: [
      { q: "Domanda americana per il possesso:", options: ["Have you a car?", "Do you have a car?", "You have a car?"], answer: 1, explain: "USA: Do you have…?" },
      { q: "\"Lei non ha fratelli\" (con have got):", options: ["She hasn't got brothers", "She doesn't got brothers", "She not has brothers"], answer: 0, explain: "hasn't got." },
      { q: "\"Faccio colazione alle 8\":", options: ["I have got breakfast at 8", "I have breakfast at 8", "I do breakfast at 8"], answer: 1, explain: "have breakfast (attività), senza got." }
    ] },

  { id: "present-simple", title: "Simple Present: formazione", lead: "Abitudini e verità generali. La temuta -s della terza persona.",
    html: `
    <div class="card"><h3>Formazione (affermativa)</h3>
    <p>Verbo base per tutti… tranne <b>he/she/it</b> che prende <b>-s</b>.</p>
    <table class="ex"><tr><th>Soggetto</th><th>Verbo</th></tr>
    <tr><td>I / you / we / they</td><td>work, live, play</td></tr>
    <tr><td>he / she / it</td><td>work<b>s</b>, live<b>s</b>, play<b>s</b></td></tr>
    </table>
    <p><b>Ortografia 3ª persona:</b> -o/-s/-sh/-ch/-x → +es (go→goes, watch→watches); cons.+y → ies (study→studies).</p></div>
    <div class="rule">🕐 <b>Quando si usa:</b> abitudini (<i>I get up at 7</i>), verità generali (<i>Water boils at 100°</i>), programmi fissi (<i>The train leaves at 6</i>). Spesso con <b>always, usually, often, every day</b>.</div>
    <div class="err"><b>Errore tipico n°1 degli italiani:</b> dimenticare la -s → <span class="no">He work</span> → <span class="ok">He works</span>. La terza persona -s è la regola più tradita!</div>`,
    quiz: [
      { q: "\"Lei lavora in banca\":", options: ["She work in a bank", "She works in a bank", "She working in a bank"], answer: 1, explain: "3ª persona → works." },
      { q: "3ª persona di 'study':", options: ["studys", "studies", "studyes"], answer: 1, explain: "cons.+y → ies." },
      { q: "3ª persona di 'go':", options: ["gos", "goes", "goies"], answer: 1, explain: "go → goes (+es)." }
    ] },

  { id: "present-simple-neg", title: "Simple Present: interrogativa e negativa", lead: "L'ausiliare DO/DOES: il concetto più importante per un italiano.",
    html: `
    <div class="card"><h3>Serve l'ausiliare DO / DOES</h3>
    <p>L'italiano non ha ausiliare nelle domande; l'inglese <b>sì</b>. Usa <b>do</b> (I/you/we/they) e <b>does</b> (he/she/it).</p>
    <table class="ex"><tr><th></th><th>Negativa</th><th>Interrogativa</th></tr>
    <tr><td>I/you/we/they</td><td>don't work</td><td>Do you work?</td></tr>
    <tr><td>he/she/it</td><td>doesn't work</td><td>Does he work?</td></tr>
    </table></div>
    <div class="rule">⚠️ Regola d'oro: quando compare <b>does/doesn't</b>, il verbo torna alla <b>forma base</b> (la -s è già su does): <i>Does she <b>work</b>?</i>, non "works".</div>
    <div class="err"><b>Errori tipici:</b><br>
    <span class="no">Where you live?</span> → <span class="ok">Where <b>do</b> you live?</span><br>
    <span class="no">He doesn't works</span> → <span class="ok">He doesn't <b>work</b></span><br>
    <span class="no">Does she works?</span> → <span class="ok">Does she <b>work</b>?</span></div>`,
    quiz: [
      { q: "\"Dove abiti?\":", options: ["Where you live?", "Where do you live?", "Where does you live?"], answer: 1, explain: "you → do." },
      { q: "\"Lui non fuma\":", options: ["He don't smoke", "He doesn't smoke", "He doesn't smokes"], answer: 1, explain: "doesn't + base." },
      { q: "\"Lei parla inglese?\":", options: ["Does she speaks English?", "Does she speak English?", "Do she speak English?"], answer: 1, explain: "Does + base (speak)." }
    ] },

  { id: "present-progressive", title: "Present Progressive: formazione", lead: "be + verbo-ing: azioni in corso ADESSO.",
    html: `
    <div class="card"><h3>Formazione: am/is/are + -ing</h3>
    <p><i>I <b>am working</b>, she <b>is reading</b>, they <b>are playing</b></i>.</p>
    <table class="ex"><tr><th>Regola -ing</th><th>Esempio</th></tr>
    <tr><td>generale: + ing</td><td>play → playing</td></tr>
    <tr><td>-e muta: togli e</td><td>make → making, write → writing</td></tr>
    <tr><td>1 vocale+1 cons. (accento)</td><td>run → running, sit → sitting</td></tr>
    <tr><td>-ie → ying</td><td>die → dying, lie → lying</td></tr>
    </table></div>
    <div class="rule">🕐 <b>Quando:</b> azione in corso ora (<i>I'm eating</i>), periodo temporaneo (<i>I'm living in Rome this year</i>), futuro programmato (<i>I'm meeting John tomorrow</i>). Spesso con <b>now, right now, at the moment, today</b>.</div>
    <div class="err"><b>Errore tipico:</b> dimenticare il verbo <b>be</b> → <span class="no">I working now</span> → <span class="ok">I'm working now</span>. Serve SEMPRE am/is/are.</div>`,
    quiz: [
      { q: "Forma -ing di 'run':", options: ["runing", "running", "runnying"], answer: 1, explain: "raddoppia la n." },
      { q: "\"Sto scrivendo una mail\":", options: ["I writing an email", "I'm writing an email", "I write an email now"], answer: 1, explain: "am + writing." },
      { q: "-ing di 'make':", options: ["makeing", "making", "makking"], answer: 1, explain: "-e muta cade." }
    ] },

  { id: "present-progressive-neg", title: "Present Progressive: interrogativa e negativa", lead: "Si usa solo be (niente do!).",
    html: `
    <div class="card"><h3>Negativa e domanda con BE</h3>
    <table class="ex"><tr><th>Negativa</th><th>Interrogativa</th></tr>
    <tr><td>I'm not working</td><td>Am I working?</td></tr>
    <tr><td>She isn't working</td><td>Is she working?</td></tr>
    <tr><td>They aren't working</td><td>Are they working?</td></tr>
    </table></div>
    <div class="rule">⚠️ Qui l'ausiliare è già <b>be</b>: NON si aggiunge do/does. Domanda = inversione be+soggetto; negativa = be + not.</div>
    <div class="err"><b>Errore tipico:</b> mescolare con 'do' → <span class="no">Do you working?</span> → <span class="ok">Are you working?</span></div>`,
    quiz: [
      { q: "\"Stai lavorando?\":", options: ["Do you working?", "Are you working?", "You are working?"], answer: 1, explain: "Are + you + -ing." },
      { q: "\"Lei non sta dormendo\":", options: ["She doesn't sleeping", "She isn't sleeping", "She not sleeping"], answer: 1, explain: "isn't + -ing." }
    ] },

  { id: "present-simple-vs-progressive", title: "Simple Present o Present Progressive?", lead: "Abitudine vs azione in corso. E i verbi di stato che NON vogliono -ing.",
    html: `
    <div class="card"><h3>Il confronto chiave</h3>
    <table class="ex"><tr><th>Simple Present</th><th>Present Progressive</th></tr>
    <tr><td>abitudine, sempre vero</td><td>ora, in questo momento</td></tr>
    <tr><td>I work in Milan</td><td>I'm working from home today</td></tr>
    <tr><td>He plays tennis (in generale)</td><td>He's playing tennis now</td></tr>
    </table></div>
    <div class="rule">🚫 <b>Verbi di stato (stative):</b> NON si usano al progressive perché indicano stati, non azioni: <b>like, love, want, know, understand, believe, need, prefer, hate, seem, own, mean</b>. → <i>I <b>know</b> the answer</i> (non "I'm knowing").</div>
    <div class="err"><b>Errore tipico:</b> <span class="no">I am wanting a coffee / I'm knowing him</span> → <span class="ok">I want a coffee / I know him</span>. (<i>"I'm loving it"</i> è pubblicità, non standard.)</div>`,
    quiz: [
      { q: "\"Capisco ora\":", options: ["I'm understanding now", "I understand now", "I understanding now"], answer: 1, explain: "understand è stativo → simple present." },
      { q: "\"Di solito prendo il bus\":", options: ["I'm taking the bus usually", "I usually take the bus", "I take usually the bus"], answer: 1, explain: "abitudine → simple present, 'usually' prima del verbo." },
      { q: "\"Guarda! Sta piovendo\":", options: ["Look! It rains", "Look! It's raining", "Look! It raining"], answer: 1, explain: "azione ora → progressive." }
    ] },

  { id: "past-simple-regolare", title: "Simple Past Regolare: formazione", lead: "Il passato con -ed e la sua pronuncia.",
    html: `
    <div class="card"><h3>Verbi regolari: + ed</h3>
    <p>Uguale per tutte le persone: <i>I/you/he/we/they work<b>ed</b></i>.</p>
    <table class="ex"><tr><th>Regola</th><th>Esempio</th></tr>
    <tr><td>generale + ed</td><td>work → worked</td></tr>
    <tr><td>-e → + d</td><td>live → lived</td></tr>
    <tr><td>cons.+y → ied</td><td>study → studied</td></tr>
    <tr><td>1 voc.+1 cons. accentata</td><td>stop → stopped, plan → planned</td></tr>
    </table></div>
    <div class="rule">🔊 <b>Pronuncia di -ed</b> (3 modi!): <b>/t/</b> dopo suono sordo (worked, stopped), <b>/d/</b> dopo suono sonoro (played, lived), <b>/ɪd/</b> dopo t/d (wanted, needed → "wontid").</div>
    <div class="err"><b>Errore tipico:</b> pronunciare sempre "-ed" come "ed". Solo dopo t/d si sente /ɪd/. <i>worked</i> = "workt", non "work-ed".</div>`,
    quiz: [
      { q: "Passato di 'study':", options: ["studyed", "studied", "studdied"], answer: 1, explain: "cons.+y → ied." },
      { q: "Passato di 'stop':", options: ["stoped", "stopped", "stopt"], answer: 1, explain: "raddoppia p." },
      { q: "'Wanted' si pronuncia con:", options: ["/t/", "/d/", "/ɪd/"], answer: 2, explain: "dopo -t → /ɪd/ (wontid)." }
    ] },

  { id: "past-simple-irregolare", title: "Simple Past e Paradigmi Irregolari", lead: "I verbi che cambiano forma: go→went, e le 3 colonne del paradigma.",
    html: `
    <div class="card"><h3>I 3 paradigmi (base / past / participio)</h3>
    <p>I verbi irregolari vanno imparati a memoria in 3 forme.</p>
    <table class="ex"><tr><th>Base</th><th>Simple Past</th><th>Past Participle</th></tr>
    <tr><td>be</td><td>was/were</td><td>been</td></tr>
    <tr><td>go</td><td>went</td><td>gone</td></tr>
    <tr><td>have</td><td>had</td><td>had</td></tr>
    <tr><td>do</td><td>did</td><td>done</td></tr>
    <tr><td>see</td><td>saw</td><td>seen</td></tr>
    <tr><td>take</td><td>took</td><td>taken</td></tr>
    <tr><td>make</td><td>made</td><td>made</td></tr>
    <tr><td>eat</td><td>ate</td><td>eaten</td></tr>
    <tr><td>get</td><td>got</td><td>gotten (USA)</td></tr>
    <tr><td>buy</td><td>bought</td><td>bought</td></tr>
    </table></div>
    <div class="rule">🇺🇸 Il participio di <b>get</b> in America è <b>gotten</b> (UK: got). <i>I've gotten better.</i></div>
    <div class="err"><b>Errore tipico:</b> applicare -ed agli irregolari → <span class="no">goed, buyed, taked</span> → <span class="ok">went, bought, took</span>.</div>`,
    quiz: [
      { q: "Passato di 'go':", options: ["goed", "went", "gone"], answer: 1, explain: "went (gone è il participio)." },
      { q: "Passato di 'buy':", options: ["buyed", "bought", "brought"], answer: 1, explain: "bought (brought = bring)." },
      { q: "Participio USA di 'get':", options: ["got", "getted", "gotten"], answer: 2, explain: "USA: gotten." }
    ] },

  { id: "past-simple-neg", title: "Simple Past: interrogativa e negativa", lead: "L'ausiliare DID: il passato torna alla forma base.",
    html: `
    <div class="card"><h3>DID per tutti</h3>
    <table class="ex"><tr><th>Affermativa</th><th>Negativa</th><th>Interrogativa</th></tr>
    <tr><td>I went</td><td>I didn't go</td><td>Did you go?</td></tr>
    <tr><td>She saw</td><td>She didn't see</td><td>Did she see?</td></tr>
    </table></div>
    <div class="rule">⚠️ Con <b>did/didn't</b> il verbo torna alla <b>forma base</b> (il passato è già in "did"): <i>Did you <b>go</b>? / I didn't <b>see</b></i>. Vale anche per gli irregolari!</div>
    <div class="err"><b>Errori tipici:</b><br>
    <span class="no">Did you went?</span> → <span class="ok">Did you <b>go</b>?</span><br>
    <span class="no">I didn't saw</span> → <span class="ok">I didn't <b>see</b></span></div>`,
    quiz: [
      { q: "\"Sei andato al lavoro?\":", options: ["Did you went to work?", "Did you go to work?", "Do you went to work?"], answer: 1, explain: "did + base (go)." },
      { q: "\"Non l'ho visto\":", options: ["I didn't saw him", "I didn't see him", "I don't saw him"], answer: 1, explain: "didn't + see." }
    ] },

  { id: "past-progressive", title: "Past Progressive: formazione e uso", lead: "was/were + -ing: cosa stavo facendo in un dato momento.",
    html: `
    <div class="card"><h3>was / were + -ing</h3>
    <p><i>I <b>was</b> sleeping, they <b>were</b> playing</i>.</p>
    <p><b>Uso classico:</b> un'azione in corso nel passato interrotta da un'altra (Simple Past):</p>
    <div class="rule"><i>I <b>was watching</b> TV <b>when</b> the phone <b>rang</b>.</i><br>(azione lunga in corso = past progressive; azione breve che interrompe = simple past)</div>
    <p>Anche due azioni parallele: <i>While she <b>was cooking</b>, he <b>was reading</b>.</i></p></div>
    <div class="err"><b>Errore tipico:</b> usare il simple past per lo sfondo → <span class="no">When she called, I slept</span> (= mi addormentai) → <span class="ok">When she called, I was sleeping</span> (stavo dormendo).</div>`,
    quiz: [
      { q: "\"Stavo guardando la TV quando è arrivato\":", options: ["I watched TV when he arrived", "I was watching TV when he arrived", "I was watching TV when he was arriving"], answer: 1, explain: "sfondo = was watching; interruzione breve = arrived." },
      { q: "\"Mentre cucinava, cantava\":", options: ["While she cooked, she sang", "While she was cooking, she was singing", "While she cooks, she sings"], answer: 1, explain: "due azioni parallele in corso → past progressive." }
    ] },

  { id: "present-perfect-form", title: "Present Perfect: formazione", lead: "have/has + participio passato.",
    html: `
    <div class="card"><h3>have / has + past participle</h3>
    <table class="ex"><tr><th>Soggetto</th><th>Forma</th></tr>
    <tr><td>I/you/we/they</td><td><b>have</b> worked / gone / seen</td></tr>
    <tr><td>he/she/it</td><td><b>has</b> worked / gone / seen</td></tr>
    </table>
    <p>Contratte: I've, he's (= he has), we've. Negativa: haven't/hasn't. Domanda: Have you…? Has she…?</p>
    <p>Il <b>participio passato</b>: regolari = -ed; irregolari = 3ª colonna (gone, seen, done, been…).</p></div>
    <div class="err"><b>Attenzione:</b> <b>he's</b> può essere "he is" o "he has". Se seguito da participio → "has": <i>He's gone</i> = He has gone.</div>`,
    quiz: [
      { q: "\"Lei ha finito\":", options: ["She have finished", "She has finished", "She has finish"], answer: 1, explain: "has + participio (finished)." },
      { q: "Participio di 'see':", options: ["saw", "seen", "seed"], answer: 1, explain: "see-saw-seen." }
    ] },

  { id: "present-perfect-uso", title: "Present Perfect: uso", lead: "Passato collegato al presente: esperienze, ever/never, just/already/yet, for/since.",
    html: `
    <div class="card"><h3>Quando si usa</h3>
    <ul class="clean">
    <li><b>Esperienze di vita</b> (quando non conta): <i>I've been to New York.</i></li>
    <li><b>Azione recente con effetto ora:</b> <i>I've lost my keys</i> (e ora non le ho).</li>
    <li><b>Da quando / per quanto</b> (azione iniziata nel passato che continua): <i>I've lived here <b>for</b> 5 years / <b>since</b> 2020.</i></li>
    </ul></div>
    <table class="ex"><tr><th>Avverbio</th><th>Posizione / uso</th><th>Esempio</th></tr>
    <tr><td>ever / never</td><td>esperienza</td><td>Have you <b>ever</b> been…? I've <b>never</b> seen…</td></tr>
    <tr><td>just</td><td>appena</td><td>I've <b>just</b> eaten</td></tr>
    <tr><td>already</td><td>già (afferm.)</td><td>I've <b>already</b> done it</td></tr>
    <tr><td>yet</td><td>ancora/già (neg./dom., a fine frase)</td><td>Have you finished <b>yet</b>? Not <b>yet</b>.</td></tr>
    <tr><td>for / since</td><td>durata / punto d'inizio</td><td>for 3 years / since Monday</td></tr>
    </table>
    <div class="err"><b>Errore tipico:</b> confondere <b>for</b> (durata: for two hours) e <b>since</b> (da un punto preciso: since 2020). <span class="no">since two hours</span> → <span class="ok">for two hours</span>.</div>`,
    quiz: [
      { q: "\"Vivo qui da 5 anni\":", options: ["I live here since 5 years", "I've lived here for 5 years", "I've lived here since 5 years"], answer: 1, explain: "durata → for; azione che continua → present perfect." },
      { q: "\"Hai mai mangiato sushi?\":", options: ["Did you ever eat sushi?", "Have you ever eaten sushi?", "Have you ever ate sushi?"], answer: 1, explain: "esperienza → present perfect + ever + participio (eaten)." },
      { q: "'Not ___' = non ancora:", options: ["already", "yet", "just"], answer: 1, explain: "not yet." }
    ] },

  { id: "past-vs-perfect", title: "Simple Past o Present Perfect?", lead: "La distinzione più difficile per gli italiani (che usano il passato prossimo per tutto).",
    html: `
    <div class="card"><h3>La regola decisiva: il TEMPO è finito o no?</h3>
    <table class="ex"><tr><th>Simple Past</th><th>Present Perfect</th></tr>
    <tr><td>momento passato <b>preciso e finito</b></td><td>tempo <b>non specificato</b> o collegato a ora</td></tr>
    <tr><td>I saw him <b>yesterday</b></td><td>I've seen him (quando? non conta)</td></tr>
    <tr><td>I went to Paris <b>in 2019</b></td><td>I've been to Paris (nella vita)</td></tr>
    <tr><td>with: yesterday, ago, last week, in 2020, when</td><td>with: ever, never, just, already, yet, so far, recently</td></tr>
    </table></div>
    <div class="rule">🔑 Se dici <b>QUANDO</b> (yesterday, last year, two hours ago) → <b>Simple Past</b>. Se il momento non è indicato o continua fino a ora → <b>Present Perfect</b>.</div>
    <div class="err"><b>Errore tipico italiano:</b> "Ieri ho mangiato" → l'italiano usa il passato prossimo, ma in inglese con "yesterday" serve il simple past: <span class="no">Yesterday I have eaten</span> → <span class="ok">Yesterday I ate</span>.</div>`,
    quiz: [
      { q: "\"L'ho vista ieri\":", options: ["I've seen her yesterday", "I saw her yesterday", "I seen her yesterday"], answer: 1, explain: "yesterday → simple past." },
      { q: "\"Sono già stato a Londra\":", options: ["I already was in London", "I've already been to London", "I already went to London"], answer: 1, explain: "esperienza, tempo non specificato → present perfect." },
      { q: "\"Ho perso le chiavi\" (e ora non le ho):", options: ["I lost my keys (e le ho ritrovate)", "I've lost my keys", "I have lost my keys yesterday"], answer: 1, explain: "effetto sul presente, senza quando → present perfect." }
    ] },

  { id: "present-perfect-progressive", title: "Present Perfect Progressive", lead: "have/has been + -ing: durata di un'azione fino ad ora.",
    html: `
    <div class="card"><h3>have/has been + -ing</h3>
    <p>Sottolinea la <b>durata</b> o la <b>continuità</b> di un'azione iniziata nel passato e ancora in corso (o appena finita, con effetti visibili).</p>
    <table class="ex"><tr><th>Frase</th><th>Sfumatura</th></tr>
    <tr><td>I've been studying <b>for 3 hours</b></td><td>durata dell'attività (ancora in corso)</td></tr>
    <tr><td>It's been raining all day</td><td>continuità</td></tr>
    <tr><td>You're sweaty — have you been running?</td><td>effetto visibile ora</td></tr>
    </table></div>
    <div class="rule">Perfect Simple vs Progressive: <i>I've read this book</i> (risultato: finito) vs <i>I've been reading this book</i> (attività in corso, magari non finita).</div>
    <div class="err"><b>Ricorda:</b> i verbi stativi (know, be, like) NON vanno al progressive → <span class="no">I've been knowing…</span> → <span class="ok">I've known him for years</span>.</div>`,
    quiz: [
      { q: "\"Studio da 2 ore\" (durata, ancora in corso):", options: ["I study for 2 hours", "I've been studying for 2 hours", "I'm studying since 2 hours"], answer: 1, explain: "durata continua → present perfect progressive + for." },
      { q: "Corretto:", options: ["I've been knowing her for years", "I've known her for years", "I'm knowing her for years"], answer: 1, explain: "know è stativo → perfect simple." }
    ] },

  { id: "futuro-will", title: "Futuro con Will", lead: "Previsioni, decisioni istantanee, promesse.",
    html: `
    <div class="card"><h3>will + verbo base</h3>
    <p>Uguale per tutti: <i>I/you/he <b>will</b> go</i> (contratto: I'll, he'll). Negativa: <b>won't</b> (= will not).</p>
    <table class="ex"><tr><th>Uso di WILL</th><th>Esempio</th></tr>
    <tr><td>previsione/opinione</td><td>I think it <b>will</b> rain</td></tr>
    <tr><td>decisione sul momento</td><td>The phone's ringing — I<b>'ll</b> get it!</td></tr>
    <tr><td>promessa/offerta</td><td>I<b>'ll</b> help you</td></tr>
    <tr><td>futuro con probably, maybe, I think</td><td>She'll probably come</td></tr>
    </table></div>
    <div class="err"><b>Errore tipico:</b> mettere il verbo al presente/futuro dopo will → <span class="no">I will to go / I will goes</span> → <span class="ok">I will go</span> (will + base, senza "to").</div>`,
    quiz: [
      { q: "\"Ti aiuterò\":", options: ["I will to help you", "I'll help you", "I will helping you"], answer: 1, explain: "will + base." },
      { q: "Negativa di 'will':", options: ["willn't", "won't", "will not (solo esteso)"], answer: 1, explain: "won't." }
    ] },

  { id: "futuro-going-to", title: "Futuro con To Be Going To", lead: "Intenzioni e previsioni basate su prove evidenti.",
    html: `
    <div class="card"><h3>am/is/are going to + base</h3>
    <table class="ex"><tr><th>Uso</th><th>Esempio</th></tr>
    <tr><td>intenzione/piano già deciso</td><td>I<b>'m going to</b> study tonight</td></tr>
    <tr><td>previsione con prove ora</td><td>Look at those clouds — it<b>'s going to</b> rain</td></tr>
    </table></div>
    <div class="rule">🇺🇸 Nel parlato "going to" diventa <b>"gonna"</b>: <i>I'm gonna call her.</i> (informale, solo orale).</div>
    <div class="card"><h3>Will vs Going to</h3>
    <p><b>Decisione ora</b> (will): <i>— I'm cold. — I'll close the window.</i><br>
    <b>Piano già fatto</b> (going to): <i>I'm going to visit Rome next month</i> (già deciso).</p></div>
    <div class="err"><b>Errore tipico:</b> <span class="no">I'm going to buy → dimenticare 'to'</span>: <span class="ok">going <b>to</b> + verbo base</span>.</div>`,
    quiz: [
      { q: "\"Ho deciso: stasera studio\":", options: ["I will study tonight (decisione ora)", "I'm going to study tonight", "I study tonight"], answer: 1, explain: "piano già deciso → going to." },
      { q: "\"Guarda le nuvole, pioverà\":", options: ["it will rain", "it's going to rain", "it rains"], answer: 1, explain: "prova evidente ora → going to." }
    ] },

  { id: "futuro-4-modi", title: "Futuro: 4 Modi per esprimerlo", lead: "will, going to, present continuous, present simple: quando usarli.",
    html: `
    <div class="card"><h3>I 4 futuri a confronto</h3>
    <table class="ex"><tr><th>Forma</th><th>Uso</th><th>Esempio</th></tr>
    <tr><td>will</td><td>previsioni, decisioni immediate, promesse</td><td>I'll call you later</td></tr>
    <tr><td>going to</td><td>intenzioni, prove evidenti</td><td>I'm going to travel</td></tr>
    <tr><td>present continuous</td><td>appuntamenti fissati (agenda)</td><td>I'm meeting John at 5</td></tr>
    <tr><td>present simple</td><td>orari/programmi ufficiali</td><td>The train leaves at 6</td></tr>
    </table></div>
    <div class="rule">💡 Regola pratica: appuntamento personale già preso → <b>present continuous</b>; orario di treni/cinema/negozi → <b>present simple</b>.</div>
    <div class="err"><b>Errore tipico:</b> usare 'will' per un appuntamento già fissato → meglio <span class="ok">I'm having dinner with Sara tomorrow</span> (present continuous) che "I will have dinner…".</div>`,
    quiz: [
      { q: "\"Il film inizia alle 8\" (orario):", options: ["The movie will start at 8", "The movie starts at 8", "The movie is going to start at 8"], answer: 1, explain: "orario ufficiale → present simple." },
      { q: "\"Domani vedo il dentista\" (appuntamento):", options: ["I'll see the dentist tomorrow", "I'm seeing the dentist tomorrow", "I see the dentist tomorrow"], answer: 1, explain: "appuntamento fissato → present continuous." }
    ] },

  { id: "past-perfect", title: "Past Perfect", lead: "had + participio: il 'trapassato', un passato prima di un altro passato.",
    html: `
    <div class="card"><h3>had + past participle</h3>
    <p>Uguale per tutti: <i>I/she/they <b>had</b> gone</i> (contratto: I'd, she'd). Indica un'azione <b>anteriore</b> a un altro momento passato.</p>
    <div class="rule"><i>When I arrived, the train <b>had</b> already <b>left</b>.</i><br>(prima è partito il treno → past perfect; poi sono arrivato → simple past)</div></div>
    <p>Utile con: <b>already, just, never, before, after, by the time</b>. Frequente nel discorso indiretto e nei periodi ipotetici del 3° tipo.</p>
    <div class="err"><b>Errore tipico:</b> usare due simple past quando serve chiarire l'ordine → <span class="no">When I arrived, the train left</span> (sembra dopo!) → <span class="ok">…the train had left</span> (era già partito).</div>`,
    quiz: [
      { q: "\"Quando arrivai, lui era già uscito\":", options: ["When I arrived, he already left", "When I arrived, he had already left", "When I had arrived, he left"], answer: 1, explain: "azione anteriore → past perfect (had left)." },
      { q: "Forma corretta del past perfect:", options: ["I have gone", "I had gone", "I did gone"], answer: 1, explain: "had + participio." }
    ] },

  { id: "past-perfect-progressive", title: "Past Perfect Progressive", lead: "had been + -ing: durata di un'azione fino a un punto del passato.",
    html: `
    <div class="card"><h3>had been + -ing</h3>
    <p>Sottolinea per <b>quanto tempo</b> un'azione era andata avanti prima di un momento passato.</p>
    <div class="rule"><i>She was tired because she <b>had been working</b> all day.</i><br><i>They <b>had been waiting</b> for an hour when the bus finally came.</i></div></div>
    <div class="err"><b>Attenzione:</b> spesso spiega la <b>causa</b> di uno stato passato (era stanca perché aveva lavorato). Verbi stativi esclusi (no "had been knowing").</div>`,
    quiz: [
      { q: "\"Era stanco perché aveva corso\":", options: ["He was tired because he ran", "He was tired because he had been running", "He was tired because he has run"], answer: 1, explain: "durata prima di un momento passato → past perfect progressive." }
    ] },

  { id: "stato-moto", title: "Verbi di Stato e di Moto", lead: "Stative verbs (no -ing) e verbi di movimento con preposizioni.",
    html: `
    <div class="card"><h3>Verbi di stato (stative)</h3>
    <p>Esprimono stati, non azioni → normalmente <b>senza -ing</b>:</p>
    <ul class="clean">
    <li>opinione: think, believe, know, understand, mean, agree</li>
    <li>emozione: like, love, hate, want, prefer, need</li>
    <li>sensi: see, hear, smell, taste (percezione)</li>
    <li>possesso: have, own, belong</li>
    </ul>
    <p>Alcuni cambiano senso: <i>I <b>think</b> it's true</i> (opinione, stativo) vs <i>I<b>'m thinking</b> about it</i> (rifletto, azione).</p></div>
    <div class="card"><h3>Verbi di moto + preposizione</h3>
    <table class="ex"><tr><th>Verbo</th><th>Esempio</th></tr>
    <tr><td>go to</td><td>go to work / to school</td></tr>
    <tr><td>go into / out of</td><td>go into the room</td></tr>
    <tr><td>get on/off</td><td>get on the bus, get off the train</td></tr>
    <tr><td>get in/out of</td><td>get in the car, get out of the car</td></tr>
    </table></div>
    <div class="err"><b>Errore tipico:</b> <span class="no">go to home</span> → <span class="ok">go home</span> (home senza 'to'). Anche: get <b>on</b> the bus ma get <b>in</b> the car.</div>`,
    quiz: [
      { q: "Corretto:", options: ["I'm liking this song", "I like this song", "I like-ing this song"], answer: 1, explain: "like è stativo." },
      { q: "\"Vado a casa\":", options: ["I go to home", "I go home", "I go at home"], answer: 1, explain: "go home (niente 'to')." },
      { q: "Salire sull'autobus:", options: ["get in the bus", "get on the bus", "get to the bus"], answer: 1, explain: "get on the bus / get in the car." }
    ] },

  { id: "discorso-indiretto", title: "Discorso Indiretto (Reported Speech)", lead: "Riportare cosa qualcuno ha detto: il backshift dei tempi.",
    html: `
    <div class="card"><h3>La regola del 'passo indietro' (backshift)</h3>
    <p>Quando riporti con <b>said/told</b> al passato, i tempi arretrano di un gradino:</p>
    <table class="ex"><tr><th>Discorso diretto</th><th>Indiretto</th></tr>
    <tr><td>"I <b>am</b> tired"</td><td>He said he <b>was</b> tired</td></tr>
    <tr><td>"I <b>work</b> here"</td><td>She said she <b>worked</b> there</td></tr>
    <tr><td>"I <b>saw</b> him"</td><td>He said he <b>had seen</b> him</td></tr>
    <tr><td>"I <b>will</b> go"</td><td>She said she <b>would</b> go</td></tr>
    <tr><td>"I <b>can</b> swim"</td><td>He said he <b>could</b> swim</td></tr>
    </table></div>
    <div class="rule">Cambiano anche pronomi e riferimenti: <b>now→then, today→that day, tomorrow→the next day, here→there, this→that</b>. Le domande perdono l'inversione: <i>He asked <b>where I lived</b></i> (non "where did I live").</div>
    <div class="err"><b>Errore tipico:</b> mantenere l'inversione nelle domande indirette → <span class="no">She asked where do I live</span> → <span class="ok">She asked where I lived</span>. Say vs tell: <i>say (to sb) / tell <b>sb</b></i> → <span class="no">He said me</span> → <span class="ok">He told me</span>.</div>`,
    quiz: [
      { q: "\"I am happy\" riportato: He said…", options: ["he is happy", "he was happy", "he has been happy"], answer: 1, explain: "am → was (backshift)." },
      { q: "Domanda indiretta corretta:", options: ["She asked where did I work", "She asked where I worked", "She asked where do I work"], answer: 1, explain: "niente inversione, niente did." },
      { q: "Corretto:", options: ["He said me the truth", "He told me the truth", "He told to me the truth"], answer: 1, explain: "tell + persona (told me)." }
    ] },

  { id: "passivo", title: "Forma Passiva", lead: "be + participio passato: quando l'agente è irrilevante o sconosciuto.",
    html: `
    <div class="card"><h3>be + past participle</h3>
    <p>L'oggetto diventa soggetto. L'agente (se serve) va con <b>by</b>.</p>
    <table class="ex"><tr><th>Attivo</th><th>Passivo</th></tr>
    <tr><td>They build houses</td><td>Houses <b>are built</b></td></tr>
    <tr><td>Shakespeare wrote Hamlet</td><td>Hamlet <b>was written</b> by Shakespeare</td></tr>
    <tr><td>They have sold the car</td><td>The car <b>has been sold</b></td></tr>
    <tr><td>They will finish it</td><td>It <b>will be finished</b></td></tr>
    </table>
    <p>Il tempo si esprime sul verbo <b>be</b>; il verbo principale resta al <b>participio</b>.</p></div>
    <div class="rule">🇺🇸 Molto usato in contesti formali/scientifici e quando non conta chi fa l'azione: <i>English <b>is spoken</b> here. My car <b>was stolen</b>.</i></div>
    <div class="err"><b>Errore tipico:</b> dimenticare 'be' o usare la base invece del participio → <span class="no">The car was steal</span> → <span class="ok">was stolen</span>.</div>`,
    quiz: [
      { q: "Passivo di 'They clean the office every day':", options: ["The office is cleaned every day", "The office cleans every day", "The office is clean every day"], answer: 0, explain: "is + cleaned (participio)." },
      { q: "\"La torta è stata mangiata\":", options: ["The cake was eat", "The cake was eaten", "The cake has eat"], answer: 1, explain: "was + eaten." }
    ] },

  { id: "causativi", title: "Causativi — Fare + Verbo", lead: "have/get something done, make/let/have somebody do.",
    html: `
    <div class="card"><h3>1) Far fare qualcosa a qualcun altro (servizio)</h3>
    <div class="rule"><b>have/get + oggetto + participio</b><br>
    <i>I <b>had</b> my car <b>repaired</b></i> = ho fatto riparare la macchina (da un meccanico).<br>
    <i>She <b>got</b> her hair <b>cut</b></i> = si è fatta tagliare i capelli.</div></div>
    <div class="card"><h3>2) Costringere / lasciare / far fare (persona)</h3>
    <table class="ex"><tr><th>Struttura</th><th>Significato</th><th>Esempio</th></tr>
    <tr><td>make sb <b>do</b></td><td>costringere</td><td>She made me <b>wait</b></td></tr>
    <tr><td>let sb <b>do</b></td><td>permettere</td><td>They let me <b>go</b></td></tr>
    <tr><td>have sb <b>do</b></td><td>far fare</td><td>I had him <b>call</b> me</td></tr>
    <tr><td>get sb <b>to do</b></td><td>convincere</td><td>I got him <b>to help</b></td></tr>
    </table></div>
    <div class="err"><b>Errore tipico:</b> con make/let il verbo è alla <b>base senza 'to'</b> → <span class="no">She made me to wait</span> → <span class="ok">She made me wait</span>. Ma <b>get</b> vuole 'to': <i>get him <b>to</b> help</i>.</div>`,
    quiz: [
      { q: "\"Ho fatto riparare il computer\":", options: ["I repaired my computer", "I had my computer repaired", "I had repaired my computer"], answer: 1, explain: "have + oggetto + participio (servizio)." },
      { q: "\"Mi ha fatto aspettare\":", options: ["She made me to wait", "She made me wait", "She let me to wait"], answer: 1, explain: "make sb do (senza to)." }
    ] },

  { id: "gerundio-participio", title: "Gerundio e Participio Presente", lead: "La forma -ing con due funzioni diverse.",
    html: `
    <div class="card"><h3>Stessa forma, due ruoli</h3>
    <p><b>Gerundio (-ing come sostantivo):</b> <i><b>Swimming</b> is good for you</i> (il nuotare). Soggetto/oggetto, dopo preposizioni: <i>I'm good <b>at cooking</b></i>.</p>
    <p><b>Participio presente (-ing verbale):</b> nei tempi progressivi (<i>She is <b>running</b></i>) e come aggettivo/frase: <i>a <b>crying</b> baby</i>, <i><b>Feeling</b> tired, I went to bed</i>.</p></div>
    <div class="rule">💡 Dopo una <b>preposizione</b> il verbo è sempre <b>-ing</b>: <i>before <b>leaving</b>, after <b>eating</b>, interested in <b>learning</b>, without <b>saying</b></i>.</div>
    <div class="err"><b>Errore tipico:</b> mettere l'infinito dopo una preposizione → <span class="no">I'm interested in to learn</span> → <span class="ok">interested in learning</span>.</div>`,
    quiz: [
      { q: "\"Sono bravo a cucinare\":", options: ["I'm good at cook", "I'm good at cooking", "I'm good at to cook"], answer: 1, explain: "dopo preposizione → -ing." },
      { q: "\"Prima di uscire\":", options: ["before to leave", "before leaving", "before leave"], answer: 1, explain: "before + -ing." }
    ] },

  { id: "gerundio-infinito", title: "Gerundio e Infinito", lead: "Quali verbi vogliono -ing e quali to + verbo.",
    html: `
    <div class="card"><h3>Verbo + gerundio (-ing)</h3>
    <p><b>enjoy, finish, avoid, mind, suggest, keep, practice, miss, can't help, feel like</b>: <i>I enjoy <b>reading</b>. She finished <b>working</b>.</i></p></div>
    <div class="card"><h3>Verbo + infinito (to + base)</h3>
    <p><b>want, decide, hope, need, promise, offer, plan, learn, would like, agree</b>: <i>I want <b>to go</b>. He decided <b>to leave</b>.</i></p></div>
    <div class="card"><h3>Cambiano significato</h3>
    <table class="ex"><tr><th>+ -ing</th><th>+ to</th></tr>
    <tr><td>stop <b>smoking</b> (smettere)</td><td>stop <b>to smoke</b> (fermarsi per…)</td></tr>
    <tr><td>remember <b>locking</b> (ricordare di aver fatto)</td><td>remember <b>to lock</b> (ricordarsi di fare)</td></tr>
    <tr><td>try <b>calling</b> (provare)</td><td>try <b>to call</b> (sforzarsi)</td></tr>
    </table></div>
    <div class="err"><b>Errore tipico:</b> <span class="no">I want going / I enjoy to read</span> → <span class="ok">I want to go / I enjoy reading</span>. Vanno memorizzati i gruppi.</div>`,
    quiz: [
      { q: "\"Voglio andare\":", options: ["I want going", "I want to go", "I want go"], answer: 1, explain: "want + to." },
      { q: "\"Mi piace leggere\" (enjoy):", options: ["I enjoy to read", "I enjoy reading", "I enjoy read"], answer: 1, explain: "enjoy + -ing." },
      { q: "\"Ho smesso di fumare\":", options: ["I stopped to smoke", "I stopped smoking", "I stopped smoke"], answer: 1, explain: "stop + -ing = smettere." }
    ] },

  { id: "condizionale", title: "Condizionale (would)", lead: "Il 'condizionale' inglese si fa con would + verbo base.",
    html: `
    <div class="card"><h3>would + base</h3>
    <p>L'inglese non ha un tempo condizionale come l'italiano: usa <b>would</b> (contratto 'd).</p>
    <table class="ex"><tr><th>Italiano</th><th>Inglese</th></tr>
    <tr><td>Vorrei un caffè</td><td>I <b>would like</b> a coffee (I'd like)</td></tr>
    <tr><td>Sarebbe bello</td><td>It <b>would</b> be nice</td></tr>
    <tr><td>Cosa faresti?</td><td>What <b>would</b> you do?</td></tr>
    </table></div>
    <div class="rule"><b>would like</b> = "vorrei" (educato). <b>would rather</b> = "preferirei" (+ base): <i>I'd rather stay home.</i> <b>used to</b> = abitudine passata.</div>
    <div class="err"><b>Errore tipico:</b> <span class="no">I would to like / I would liked</span> → <span class="ok">I would like</span> (would + base). E "vorrei" ≠ "I want" (troppo diretto): usa <b>I'd like</b>.</div>`,
    quiz: [
      { q: "\"Vorrei un tè\" (educato):", options: ["I want a tea", "I would like a tea", "I would liked a tea"], answer: 1, explain: "would like = vorrei." },
      { q: "\"Cosa faresti?\":", options: ["What you would do?", "What would you do?", "What would you did?"], answer: 1, explain: "would + base, con inversione." }
    ] },

  { id: "if-zero", title: "Ipotetico Tipo Zero", lead: "Verità generali e automatismi: If + presente, presente.",
    html: `
    <div class="card"><h3>If + present simple, present simple</h3>
    <p>Per fatti sempre veri, leggi scientifiche, automatismi. "If" = "when" (ogni volta che).</p>
    <table class="ex"><tr><th>Frase</th></tr>
    <tr><td>If you <b>heat</b> ice, it <b>melts</b></td></tr>
    <tr><td>If it <b>rains</b>, the ground <b>gets</b> wet</td></tr>
    <tr><td>Water <b>boils</b> if you <b>heat</b> it to 100°</td></tr>
    </table></div>
    <div class="err"><b>Errore tipico:</b> usare 'will' nel tipo zero → <span class="no">If you heat ice, it will melt</span> (quello è 1° tipo) → <span class="ok">it melts</span> (verità sempre vera).</div>`,
    quiz: [
      { q: "\"Se scaldi il ghiaccio, si scioglie\":", options: ["If you heat ice, it will melt", "If you heat ice, it melts", "If you will heat ice, it melts"], answer: 1, explain: "verità generale → present + present." }
    ] },

  { id: "if-primo", title: "Ipotetico Primo Tipo (reale)", lead: "Condizione possibile nel futuro: If + presente, will + base.",
    html: `
    <div class="card"><h3>If + present simple, will + base</h3>
    <p>Situazioni <b>reali e probabili</b> nel futuro.</p>
    <table class="ex"><tr><th>Frase</th></tr>
    <tr><td>If it <b>rains</b>, I <b>will stay</b> home</td></tr>
    <tr><td>If you <b>study</b>, you <b>'ll pass</b> the exam</td></tr>
    <tr><td>I'll call you if I <b>have</b> time</td></tr>
    </table></div>
    <div class="rule">⚠️ Dopo <b>if</b> NON si usa 'will': il futuro è già espresso nella principale. La subordinata resta al presente.</div>
    <div class="err"><b>Errore tipico italiano n°1 nei periodi ipotetici:</b> <span class="no">If it will rain, I will stay</span> → <span class="ok">If it <b>rains</b>, I will stay</span>. (In italiano "se pioverà"; in inglese presente!)</div>`,
    quiz: [
      { q: "\"Se piove, resto a casa\":", options: ["If it will rain, I'll stay home", "If it rains, I'll stay home", "If it rains, I stay home"], answer: 1, explain: "if + presente, will nella principale." },
      { q: "\"Se studi, passerai\":", options: ["If you study, you'll pass", "If you will study, you'll pass", "If you study, you pass"], answer: 0, explain: "if + present, will + base." }
    ] },

  { id: "if-secondo", title: "Ipotetico Secondo Tipo (irreale presente)", lead: "Situazioni improbabili/immaginarie: If + past, would + base.",
    html: `
    <div class="card"><h3>If + past simple, would + base</h3>
    <p>Situazione <b>irreale o improbabile</b> nel presente/futuro (immaginazione, sogno).</p>
    <table class="ex"><tr><th>Frase</th></tr>
    <tr><td>If I <b>had</b> money, I <b>would travel</b> the world</td></tr>
    <tr><td>If I <b>were</b> you, I <b>would</b> accept</td></tr>
    <tr><td>What would you do if you <b>won</b> the lottery?</td></tr>
    </table></div>
    <div class="rule">💡 Con "to be" nell'ipotetico si usa <b>were</b> per tutte le persone (anche "I/he"): <i>If I <b>were</b> rich…</i>. "If I were you" = "se fossi in te" (consiglio classico).</div>
    <div class="err"><b>Errore tipico:</b> <span class="no">If I would have money…</span> → <span class="ok">If I <b>had</b> money, I would…</span> (would NON va nella parte con if).</div>`,
    quiz: [
      { q: "\"Se fossi in te, accetterei\":", options: ["If I was you, I would accept", "If I were you, I would accept", "If I would be you, I accept"], answer: 1, explain: "if I were you + would." },
      { q: "\"Se avessi tempo, verrei\":", options: ["If I would have time, I come", "If I had time, I would come", "If I have time, I would come"], answer: 1, explain: "if + past, would + base." }
    ] },

  { id: "if-terzo", title: "Ipotetico Terzo Tipo (irreale passato)", lead: "Rimpianti sul passato: If + past perfect, would have + participio.",
    html: `
    <div class="card"><h3>If + past perfect, would have + participio</h3>
    <p>Situazione <b>impossibile</b> perché il passato è già andato (rimpianto, "col senno di poi").</p>
    <table class="ex"><tr><th>Frase</th></tr>
    <tr><td>If I <b>had studied</b>, I <b>would have passed</b></td></tr>
    <tr><td>If you <b>had told</b> me, I <b>would have helped</b></td></tr>
    <tr><td>She <b>wouldn't have missed</b> the train if she <b>had left</b> earlier</td></tr>
    </table></div>
    <div class="rule">Nel parlato: "would have" → <b>"would've"</b> /wʊdəv/ (spesso scritto per errore "would of" — evitalo!).</div>
    <div class="err"><b>Errori tipici:</b> <span class="no">If I would have studied…</span> → <span class="ok">If I <b>had</b> studied, I would have…</span>. E mai <span class="no">would of</span> → <span class="ok">would have / would've</span>.</div>`,
    quiz: [
      { q: "\"Se avessi studiato, avrei passato\":", options: ["If I studied, I would pass", "If I had studied, I would have passed", "If I would have studied, I passed"], answer: 1, explain: "3° tipo: had + participio / would have + participio." },
      { q: "Contrazione corretta di 'would have':", options: ["would of", "would've", "wouldof"], answer: 1, explain: "would've (mai 'would of')." }
    ] }
]},

/* ============================================================ VERBI MODALI */
{ cat: "Verbi Modali", icon: "🗝️", topics: [

  { id: "can-may-will-shall", title: "Can, May, Will, Shall", lead: "Abilità, permesso, offerte e proposte.",
    html: `
    <div class="card"><h3>Caratteristiche dei modali</h3>
    <p>I modali sono seguiti dalla <b>base senza 'to'</b>, uguali per tutte le persone, e formano domanda/negativa senza 'do'.</p>
    <table class="ex"><tr><th>Modale</th><th>Uso</th><th>Esempio</th></tr>
    <tr><td><b>can</b></td><td>abilità, permesso informale, possibilità</td><td>I can swim; Can I go?</td></tr>
    <tr><td><b>could</b></td><td>abilità passata, richieste educate</td><td>Could you help me?</td></tr>
    <tr><td><b>may</b></td><td>permesso formale, possibilità</td><td>May I come in? It may rain</td></tr>
    <tr><td><b>might</b></td><td>possibilità più remota</td><td>It might snow</td></tr>
    <tr><td><b>will</b></td><td>futuro, offerte, promesse</td><td>I'll help you</td></tr>
    <tr><td><b>shall</b></td><td>proposte (I/we), formale</td><td>Shall we go?</td></tr>
    </table></div>
    <div class="rule">🇺🇸 In America <b>can I</b> è normale per chiedere permesso; <b>shall</b> è raro (solo "Shall we…?" per proposte). Per abilità passata: <b>could</b> o <b>was able to</b>.</div>
    <div class="err"><b>Errore tipico:</b> <span class="no">I can to swim / She cans swim / Can you to help?</span> → <span class="ok">I can swim / She can swim / Can you help?</span> (mai 'to', mai -s).</div>`,
    quiz: [
      { q: "\"So nuotare\":", options: ["I can to swim", "I can swim", "I cans swim"], answer: 1, explain: "can + base, senza to né -s." },
      { q: "Proposta \"Andiamo?\":", options: ["Shall we go?", "Will we go?", "Do we go?"], answer: 0, explain: "Shall we…? per proposte." },
      { q: "Richiesta educata:", options: ["Can you helping me?", "Could you help me?", "Could you to help me?"], answer: 1, explain: "could + base." }
    ] },

  { id: "have-to-must", title: "To Have To e Must", lead: "Obbligo e necessità; e la trappola di mustn't vs don't have to.",
    html: `
    <div class="card"><h3>Obbligo: must vs have to</h3>
    <table class="ex"><tr><th>Forma</th><th>Sfumatura</th><th>Esempio</th></tr>
    <tr><td><b>must</b></td><td>obbligo sentito da chi parla, regole</td><td>You must wear a seatbelt</td></tr>
    <tr><td><b>have to</b></td><td>obbligo esterno; per passato/futuro</td><td>I have to work; I had to go</td></tr>
    </table>
    <p>'must' non ha passato/futuro → si usa <b>have to</b>: <i>I <b>had to</b> leave. I<b>'ll have to</b> study.</i></p></div>
    <div class="card"><h3>⚠️ La grande trappola del negativo</h3>
    <table class="ex"><tr><th>Negativa</th><th>Significato</th></tr>
    <tr><td><b>mustn't</b></td><td>DIVIETO: non devi (è proibito)</td></tr>
    <tr><td><b>don't have to</b></td><td>NON necessità: non è necessario (ma puoi)</td></tr>
    </table>
    <p><i>You <b>mustn't</b> smoke here</i> (vietato) ≠ <i>You <b>don't have to</b> come</i> (non sei obbligato).</p></div>
    <div class="err"><b>Errore tipico italiano:</b> tradurre "non devi" sempre con mustn't. "Non devi venire" (non è necessario) = <span class="ok">you don't have to come</span>, non "you mustn't come" (che significa "ti è vietato").</div>`,
    quiz: [
      { q: "\"Ho dovuto lavorare ieri\":", options: ["I must work yesterday", "I had to work yesterday", "I musted work yesterday"], answer: 1, explain: "must non ha passato → had to." },
      { q: "\"È vietato fumare qui\":", options: ["You don't have to smoke here", "You mustn't smoke here", "You haven't to smoke here"], answer: 1, explain: "divieto → mustn't." },
      { q: "\"Non sei obbligato a venire\":", options: ["You mustn't come", "You don't have to come", "You can't come"], answer: 1, explain: "assenza di obbligo → don't have to." }
    ] }
]},

/* ============================================================ PRONOMI */
{ cat: "Pronomi", icon: "👤", topics: [

  { id: "pronomi-personali", title: "Pronomi Personali", lead: "Soggetto vs complemento: I/me, he/him, they/them.",
    html: `
    <div class="card"><h3>Soggetto e complemento</h3>
    <table class="ex"><tr><th>Soggetto</th><th>Complemento</th></tr>
    <tr><td>I</td><td>me</td></tr>
    <tr><td>you</td><td>you</td></tr>
    <tr><td>he / she / it</td><td>him / her / it</td></tr>
    <tr><td>we</td><td>us</td></tr>
    <tr><td>they</td><td>them</td></tr>
    </table>
    <p>Soggetto <b>prima</b> del verbo (<i><b>She</b> loves him</i>); complemento <b>dopo</b> verbo o preposizione (<i>He loves <b>her</b>; give it to <b>me</b></i>).</p></div>
    <div class="rule">💡 <b>it</b> per cose, animali generici, tempo/meteo (<i>It's raining, It's 5 o'clock</i>). <b>they/them</b> ormai usato anche come singolare neutro (<i>Someone left <b>their</b> bag</i>).</div>
    <div class="err"><b>Errore tipico:</b> <span class="no">Me and John went / Between you and I</span> → <span class="ok">John and I went / between you and me</span> (dopo preposizione: complemento).</div>`,
    quiz: [
      { q: "\"Lei ama lui\":", options: ["Her loves he", "She loves him", "She loves he"], answer: 1, explain: "soggetto She, complemento him." },
      { q: "\"Dallo a me\":", options: ["Give it to I", "Give it to me", "Give it me to"], answer: 1, explain: "dopo preposizione → me." }
    ] },

  { id: "pronomi-riflessivi", title: "Pronomi Riflessivi", lead: "myself, yourself…: quando l'azione ricade sul soggetto.",
    html: `
    <div class="card"><h3>-self / -selves</h3>
    <table class="ex"><tr><th>Singolare</th><th>Plurale</th></tr>
    <tr><td>myself</td><td>ourselves</td></tr>
    <tr><td>yourself</td><td>yourselves</td></tr>
    <tr><td>himself / herself / itself</td><td>themselves</td></tr>
    </table>
    <p>Usali quando soggetto e oggetto coincidono: <i>I hurt <b>myself</b>. She taught <b>herself</b> English.</i></p>
    <p><b>by + riflessivo</b> = da solo: <i>I did it <b>by myself</b>.</i> Enfasi: <i>The president <b>himself</b> came.</i></p></div>
    <div class="err"><b>Errore tipico:</b> molti verbi italiani riflessivi NON lo sono in inglese: <i>svegliarsi = wake up, sentirsi = feel, rilassarsi = relax</i>. <span class="no">I feel myself tired</span> → <span class="ok">I feel tired</span>.</div>`,
    quiz: [
      { q: "\"Mi sono fatto male\":", options: ["I hurt me", "I hurt myself", "I hurt to me"], answer: 1, explain: "riflessivo → myself." },
      { q: "\"Mi sento stanco\":", options: ["I feel myself tired", "I feel tired", "I feel me tired"], answer: 1, explain: "feel non è riflessivo in inglese." }
    ] },

  { id: "pronomi-relativi", title: "Pronomi Relativi", lead: "who, which, that, whose, where: collegare le frasi.",
    html: `
    <div class="card"><h3>Quale relativo?</h3>
    <table class="ex"><tr><th>Pronome</th><th>Per</th><th>Esempio</th></tr>
    <tr><td><b>who</b></td><td>persone</td><td>the man <b>who</b> called</td></tr>
    <tr><td><b>which</b></td><td>cose/animali</td><td>the book <b>which</b> I read</td></tr>
    <tr><td><b>that</b></td><td>persone o cose (informale)</td><td>the car <b>that</b> I bought</td></tr>
    <tr><td><b>whose</b></td><td>possesso</td><td>the girl <b>whose</b> dog…</td></tr>
    <tr><td><b>where</b></td><td>luoghi</td><td>the city <b>where</b> I live</td></tr>
    </table></div>
    <div class="rule">💡 <b>Defining</b> (essenziale, niente virgole): puoi usare 'that' e spesso omettere il relativo se è oggetto → <i>the book (that) I read</i>. <b>Non-defining</b> (info extra, tra virgole): NO 'that' → <i>My brother, <b>who</b> lives in Rome, …</i></div>
    <div class="err"><b>Errore tipico:</b> usare 'that' dopo la virgola → <span class="no">My car, that is red,…</span> → <span class="ok">My car, <b>which</b> is red,…</span>. E non ripetere il pronome: <span class="no">the man who he called</span> → <span class="ok">the man who called</span>.</div>`,
    quiz: [
      { q: "\"L'uomo che ha chiamato\":", options: ["the man which called", "the man who called", "the man who he called"], answer: 1, explain: "persona → who, senza ripetere 'he'." },
      { q: "\"La ragazza il cui cane…\":", options: ["the girl who dog", "the girl whose dog", "the girl which dog"], answer: 1, explain: "possesso → whose." }
    ] },

  { id: "pronomi-impersonali", title: "Pronomi Impersonali", lead: "Come dire 'si' italiano: you, they, one, it, there.",
    html: `
    <div class="card"><h3>Il 'si' impersonale non esiste: come si rende</h3>
    <table class="ex"><tr><th>Italiano</th><th>Inglese</th></tr>
    <tr><td>In Italia si mangia bene</td><td><b>You</b> eat well in Italy / People eat well</td></tr>
    <tr><td>Dicono che…</td><td><b>They</b> say that…</td></tr>
    <tr><td>Non si sa mai</td><td><b>You</b> never know / <b>One</b> never knows (formale)</td></tr>
    <tr><td>C'è / ci sono</td><td><b>There is / there are</b></td></tr>
    <tr><td>Piove / fa caldo</td><td><b>It</b>'s raining / It's hot</td></tr>
    </table></div>
    <div class="rule">💬 <b>you</b> generico è il più naturale in USA. <b>one</b> è molto formale. Per esistenza: <b>there is/are</b>; per meteo/tempo: <b>it</b>.</div>
    <div class="err"><b>Errore tipico:</b> tradurre "c'è" con "it is" → <span class="no">It is a problem</span> (= "è un problema") vs <span class="ok">There is a problem</span> (= "c'è un problema").</div>`,
    quiz: [
      { q: "\"C'è un errore\":", options: ["It is an error", "There is an error", "Is an error"], answer: 1, explain: "esistenza → there is." },
      { q: "\"In America si guida a destra\":", options: ["In America is driven on the right", "You drive on the right in America", "It drives on the right"], answer: 1, explain: "'si' generico → you (naturale in USA)." }
    ] },

  { id: "question-tags", title: "Question Tags", lead: "…isn't it? …do you? Le 'codine' interrogative.",
    html: `
    <div class="card"><h3>La regola dello specchio</h3>
    <p>Frase <b>affermativa</b> → tag <b>negativo</b>; frase <b>negativa</b> → tag <b>affermativo</b>. Si ripete l'ausiliare.</p>
    <table class="ex"><tr><th>Frase</th><th>Tag</th></tr>
    <tr><td>You're Italian,</td><td><b>aren't you?</b></td></tr>
    <tr><td>She works here,</td><td><b>doesn't she?</b></td></tr>
    <tr><td>They didn't come,</td><td><b>did they?</b></td></tr>
    <tr><td>He can swim,</td><td><b>can't he?</b></td></tr>
    <tr><td>You won't tell,</td><td><b>will you?</b></td></tr>
    </table></div>
    <div class="rule">💡 Se non c'è ausiliare, usa <b>do/does/did</b>. Eccezione: <i>I am… → aren't I?</i> Con "let's" → <i>shall we?</i></div>
    <div class="err"><b>Errore tipico:</b> tag con lo stesso segno della frase → <span class="no">You are Italian, are you?</span> → <span class="ok">…, aren't you?</span> (opposto).</div>`,
    quiz: [
      { q: "\"She works here, ___?\"", options: ["doesn't she", "does she", "isn't she"], answer: 0, explain: "afferm. → tag negativo con does." },
      { q: "\"They didn't come, ___?\"", options: ["didn't they", "did they", "do they"], answer: 1, explain: "neg. → tag afferm. con did." }
    ] }
]},

/* ============================================================ AGGETTIVI */
{ cat: "Aggettivi", icon: "🎨", topics: [

  { id: "possessivi", title: "Aggettivi e Pronomi Possessivi", lead: "my/mine, your/yours: possesso senza articolo.",
    html: `
    <div class="card"><h3>Due serie</h3>
    <table class="ex"><tr><th>Aggettivo (+ nome)</th><th>Pronome (da solo)</th></tr>
    <tr><td>my book</td><td>mine</td></tr>
    <tr><td>your car</td><td>yours</td></tr>
    <tr><td>his / her / its</td><td>his / hers / —</td></tr>
    <tr><td>our house</td><td>ours</td></tr>
    <tr><td>their dog</td><td>theirs</td></tr>
    </table>
    <p><i>This is <b>my</b> car → This car is <b>mine</b>.</i></p></div>
    <div class="rule">⚠️ Il possessivo <b>concorda con il possessore</b>, non con l'oggetto: <i><b>his</b> mother</i> (la madre di lui), <i><b>her</b> father</i> (il padre di lei). E NON si mette l'articolo: <span class="no">the my book</span>.</div>
    <div class="err"><b>Errori tipici:</b> <span class="no">the my car</span> → <span class="ok">my car</span>. <span class="no">her father = il padre di lei? spesso confuso con his</span>. E <b>its</b> (possessivo) ≠ <b>it's</b> (= it is).</div>`,
    quiz: [
      { q: "\"La mia macchina\":", options: ["the my car", "my car", "mine car"], answer: 1, explain: "niente articolo; 'mine' è pronome." },
      { q: "\"Questo libro è mio\":", options: ["This book is my", "This book is mine", "This is book mine"], answer: 1, explain: "pronome possessivo → mine." },
      { q: "\"Il padre di lei\":", options: ["his father", "her father", "hers father"], answer: 1, explain: "possessore femminile → her." }
    ] },

  { id: "interrogativi", title: "Aggettivi e Pronomi Interrogativi", lead: "what, which, who, whose, whom.",
    html: `
    <div class="card"><h3>Le domande (Wh-)</h3>
    <table class="ex"><tr><th>Parola</th><th>Uso</th><th>Esempio</th></tr>
    <tr><td><b>what</b></td><td>cosa (scelta aperta)</td><td>What do you want?</td></tr>
    <tr><td><b>which</b></td><td>quale (scelta limitata)</td><td>Which one? Red or blue?</td></tr>
    <tr><td><b>who</b></td><td>chi (soggetto)</td><td>Who called?</td></tr>
    <tr><td><b>whom</b></td><td>chi (complemento, formale)</td><td>Whom did you see?</td></tr>
    <tr><td><b>whose</b></td><td>di chi</td><td>Whose bag is this?</td></tr>
    </table></div>
    <div class="rule">💡 <b>what</b> = scelta illimitata; <b>which</b> = scelta tra opzioni note. In USA "whom" è raro nel parlato (si usa "who").</div>
    <div class="err"><b>Errore tipico:</b> confondere <b>whose</b> (di chi) e <b>who's</b> (= who is). <i><b>Whose</b> book? / <b>Who's</b> there?</i></div>`,
    quiz: [
      { q: "\"Quale preferisci, il rosso o il blu?\":", options: ["What do you prefer?", "Which do you prefer?", "Who do you prefer?"], answer: 1, explain: "scelta tra opzioni → which." },
      { q: "\"Di chi è questa borsa?\":", options: ["Who's bag is this?", "Whose bag is this?", "Whom bag is this?"], answer: 1, explain: "possesso → whose." }
    ] },

  { id: "indefiniti", title: "Aggettivi e Pronomi Indefiniti", lead: "some/any, no, every, e i composti some-/any-/no-body/thing/where.",
    html: `
    <div class="card"><h3>some / any / no</h3>
    <table class="ex"><tr><th>Forma</th><th>Uso</th><th>Esempio</th></tr>
    <tr><td><b>some</b></td><td>afferm. + offerte/richieste</td><td>I have some money; Want some coffee?</td></tr>
    <tr><td><b>any</b></td><td>negative e domande</td><td>I don't have any; Do you have any?</td></tr>
    <tr><td><b>no</b></td><td>negazione (verbo afferm.)</td><td>I have no money</td></tr>
    </table></div>
    <div class="card"><h3>I composti</h3>
    <table class="ex"><tr><th>Persone</th><th>Cose</th><th>Luoghi</th></tr>
    <tr><td>somebody/someone</td><td>something</td><td>somewhere</td></tr>
    <tr><td>anybody/anyone</td><td>anything</td><td>anywhere</td></tr>
    <tr><td>nobody/no one</td><td>nothing</td><td>nowhere</td></tr>
    <tr><td>everybody/everyone</td><td>everything</td><td>everywhere</td></tr>
    </table>
    <p>Reggono il <b>singolare</b>: <i>Everybody <b>is</b> here. Nobody <b>knows</b>.</i></p></div>
    <div class="err"><b>Errore tipico — doppia negazione (vietata!):</b> <span class="no">I don't have nothing</span> → <span class="ok">I don't have anything</span> oppure <span class="ok">I have nothing</span> (una sola negazione).</div>`,
    quiz: [
      { q: "\"Non ho soldi\":", options: ["I don't have no money", "I don't have any money", "I have any money"], answer: 1, explain: "una negazione: don't + any." },
      { q: "\"C'è qualcuno?\":", options: ["Is there someone? / anyone?", "Is there anybody?", "Entrambe accettabili"], answer: 2, explain: "in domande sia 'anybody' sia 'somebody' (se aspetti 'sì') sono ok." },
      { q: "\"Nessuno lo sa\":", options: ["Nobody know it", "Nobody knows it", "Nobody don't know it"], answer: 1, explain: "nobody + verbo singolare afferm." }
    ] },

  { id: "comparativi", title: "Comparativi e Superlativi", lead: "-er/-est, more/most, e gli irregolari good→better→best.",
    html: `
    <div class="card"><h3>La regola della lunghezza</h3>
    <table class="ex"><tr><th>Aggettivo</th><th>Comparativo</th><th>Superlativo</th></tr>
    <tr><td>corto (1 sill.)</td><td>+ er: tall<b>er</b></td><td>the + est: the tall<b>est</b></td></tr>
    <tr><td>-y</td><td>happ<b>ier</b></td><td>the happ<b>iest</b></td></tr>
    <tr><td>lungo (2+ sill.)</td><td><b>more</b> modern</td><td>the <b>most</b> modern</td></tr>
    </table>
    <p><b>Comparativo di maggioranza + than:</b> <i>She is tall<b>er than</b> me.</i> Uguaglianza: <i><b>as … as</b></i> → <i>as tall as</i>.</p></div>
    <div class="card"><h3>Irregolari (da memorizzare)</h3>
    <table class="ex"><tr><td>good → <b>better</b> → the best</td></tr>
    <tr><td>bad → <b>worse</b> → the worst</td></tr>
    <tr><td>far → farther/further → the farthest</td></tr>
    <tr><td>much/many → more → the most</td></tr></table></div>
    <div class="err"><b>Errori tipici:</b> <span class="no">more tall / the most tall</span> → <span class="ok">taller / the tallest</span> (corti: -er/-est). <span class="no">more better</span> → <span class="ok">better</span>. Dopo il comparativo: <b>than</b>, non "that/of".</div>`,
    quiz: [
      { q: "\"Più alto di me\":", options: ["more tall than me", "taller than me", "taller that me"], answer: 1, explain: "corto → -er + than." },
      { q: "Superlativo di 'good':", options: ["the goodest", "the best", "the most good"], answer: 1, explain: "good → best (irregolare)." },
      { q: "\"Più interessante\":", options: ["interestinger", "more interesting", "most interesting"], answer: 1, explain: "lungo → more." }
    ] },

  { id: "posizione-aggettivi", title: "Posizione degli Aggettivi", lead: "Prima del nome, invariabili, e l'ordine di più aggettivi.",
    html: `
    <div class="card"><h3>Due regole d'oro</h3>
    <p>1) L'aggettivo va <b>prima</b> del nome: <i>a <b>red</b> car</i> (non "a car red").<br>
    2) È <b>invariabile</b>: niente plurale né femminile → <i>two <b>red</b> cars</i> (non "reds").</p></div>
    <div class="card"><h3>Ordine di più aggettivi (OSASCOMP)</h3>
    <p><b>Opinion → Size → Age → Shape → Color → Origin → Material → Purpose → NOUN</b></p>
    <div class="rule"><i>a <b>beautiful small old round black Italian leather</b> bag</i><br>(opinione–dimensione–età–forma–colore–origine–materiale + nome)</div>
    <p>Nella pratica raramente se ne mettono più di 2-3: <i>a nice big house, a small black cat.</i></p></div>
    <div class="err"><b>Errore tipico italiano:</b> mettere l'aggettivo dopo il nome (come in italiano) → <span class="no">a car red / a house beautiful</span> → <span class="ok">a red car / a beautiful house</span>.</div>`,
    quiz: [
      { q: "\"Una macchina rossa\":", options: ["a car red", "a red car", "a reds car"], answer: 1, explain: "aggettivo prima del nome, invariabile." },
      { q: "\"Due gatti neri\":", options: ["two blacks cats", "two black cats", "two cats black"], answer: 1, explain: "aggettivo invariabile, prima del nome." }
    ] }
]},

/* ============================================================ AVVERBI */
{ cat: "Avverbi", icon: "⚡", topics: [

  { id: "avverbi", title: "Avverbi", lead: "Formazione con -ly e differenza con gli aggettivi.",
    html: `
    <div class="card"><h3>Aggettivo + ly → avverbio</h3>
    <table class="ex"><tr><th>Aggettivo</th><th>Avverbio</th></tr>
    <tr><td>quick</td><td>quick<b>ly</b></td></tr>
    <tr><td>easy</td><td>eas<b>ily</b> (y→ily)</td></tr>
    <tr><td>careful</td><td>careful<b>ly</b></td></tr>
    </table>
    <p><b>Irregolari:</b> good → <b>well</b>; fast → fast; hard → hard (hardly = a malapena!); late → late.</p></div>
    <div class="rule">💡 L'aggettivo descrive un <b>nome</b> (a <b>careful</b> driver); l'avverbio descrive un <b>verbo</b> (he drives <b>carefully</b>).</div>
    <div class="err"><b>Errori tipici:</b> <span class="no">She sings good</span> → <span class="ok">She sings well</span> (good è aggettivo, well avverbio). <span class="no">hardly = duramente</span> → in realtà <b>hardly</b> = "a malapena"; "duramente" = <b>hard</b>.</div>`,
    quiz: [
      { q: "\"Canta bene\":", options: ["She sings good", "She sings well", "She sings goodly"], answer: 1, explain: "avverbio di good → well." },
      { q: "Avverbio di 'easy':", options: ["easyly", "easily", "easly"], answer: 1, explain: "y → ily." },
      { q: "\"Lavora duramente\":", options: ["He works hardly", "He works hard", "He works hardly-ly"], answer: 1, explain: "hard = duramente; hardly = a malapena." }
    ] },

  { id: "avverbi-frequenza", title: "Avverbi di Frequenza", lead: "always, usually, often, never: dove si mettono nella frase.",
    html: `
    <div class="card"><h3>La scala</h3>
    <p>always (100%) › usually › often › sometimes › rarely › never (0%).</p></div>
    <div class="card"><h3>Posizione</h3>
    <div class="rule"><b>Prima del verbo</b> principale, ma <b>dopo</b> il verbo 'to be'.<br>
    <i>I <b>always</b> drink coffee</i> (prima del verbo)<br>
    <i>She is <b>always</b> late</i> (dopo 'be')<br>
    <i>I have <b>never</b> been there</i> (dopo il primo ausiliare)</div></div>
    <div class="err"><b>Errori tipici:</b> mettere l'avverbio a fine frase (all'italiana) → <span class="no">I drink always coffee / I go never</span> → <span class="ok">I always drink coffee / I never go</span>. <b>never</b> è già negativo: <span class="no">I don't never go</span> → <span class="ok">I never go</span>.</div>`,
    quiz: [
      { q: "\"Bevo sempre caffè\":", options: ["I drink always coffee", "I always drink coffee", "Always I drink coffee"], answer: 1, explain: "prima del verbo principale." },
      { q: "\"Lei è sempre in ritardo\":", options: ["She always is late", "She is always late", "Always she is late"], answer: 1, explain: "dopo il verbo 'be'." }
    ] },

  { id: "locuzioni-avverbiali", title: "Locuzioni Avverbiali", lead: "Espressioni di tempo, modo, luogo e il loro ordine.",
    html: `
    <div class="card"><h3>Tipi di locuzioni</h3>
    <table class="ex"><tr><th>Tipo</th><th>Esempi</th></tr>
    <tr><td>tempo</td><td>every day, last week, in the morning, at night</td></tr>
    <tr><td>modo</td><td>in a hurry, by car, on foot, with care</td></tr>
    <tr><td>luogo</td><td>at home, in the park, over there, next door</td></tr>
    <tr><td>frequenza</td><td>once a week, twice a day, from time to time</td></tr>
    </table></div>
    <div class="rule">📐 Ordine tipico a fine frase: <b>Modo → Luogo → Tempo (MLT)</b>.<br>
    <i>She sang <b>beautifully (M) at the theater (L) last night (T)</b>.</i></div>
    <div class="err"><b>Errore tipico:</b> mettere il tempo prima del luogo → <span class="no">I went yesterday to the gym</span> → <span class="ok">I went to the gym yesterday</span> (luogo prima del tempo).</div>`,
    quiz: [
      { q: "Ordine corretto:", options: ["I studied yesterday at the library", "I studied at the library yesterday", "I studied at yesterday the library"], answer: 1, explain: "Luogo prima del Tempo." },
      { q: "\"Due volte a settimana\":", options: ["two times in a week", "twice a week", "two a week"], answer: 1, explain: "twice a week." }
    ] },

  { id: "proposizioni-avverbiali", title: "Proposizioni Avverbiali", lead: "Subordinate di tempo, causa, scopo, concessione.",
    html: `
    <div class="card"><h3>Le subordinate avverbiali</h3>
    <table class="ex"><tr><th>Tipo</th><th>Introdotta da</th><th>Esempio</th></tr>
    <tr><td>tempo</td><td>when, while, before, after, as soon as, until</td><td>Call me <b>when</b> you arrive</td></tr>
    <tr><td>causa</td><td>because, since, as</td><td>I stayed <b>because</b> I was tired</td></tr>
    <tr><td>scopo</td><td>to, in order to, so that</td><td>I study <b>to</b> pass</td></tr>
    <tr><td>concessione</td><td>although, even though, though</td><td><b>Although</b> it rained, we went</td></tr>
    <tr><td>condizione</td><td>if, unless, as long as</td><td>I'll help <b>unless</b> I'm busy</td></tr>
    </table></div>
    <div class="rule">⚠️ Dopo <b>when/as soon as/until</b> riferiti al futuro → si usa il <b>presente</b> (non will): <i>I'll call you when I <b>arrive</b></i>. <b>unless</b> = "if not".</div>
    <div class="err"><b>Errori tipici:</b> <span class="no">When I will arrive…</span> → <span class="ok">When I arrive…</span>. E "although" + "but" insieme: <span class="no">Although it rained, but we went</span> → <span class="ok">Although it rained, we went</span> (uno solo).</div>`,
    quiz: [
      { q: "\"Ti chiamo quando arrivo\":", options: ["I'll call you when I'll arrive", "I'll call you when I arrive", "I call you when I arrive"], answer: 1, explain: "dopo 'when' futuro → presente." },
      { q: "\"Anche se pioveva, siamo usciti\":", options: ["Although it rained, but we went", "Although it rained, we went", "Because it rained, we went"], answer: 1, explain: "although da solo, senza 'but'." }
    ] }
]},

/* ============================================================ ARTICOLI */
{ cat: "Articoli", icon: "🔤", topics: [

  { id: "articoli", title: "Scelta dell'Articolo Corretto", lead: "a/an, the, o niente articolo: una delle scelte più difficili.",
    html: `
    <div class="card"><h3>a / an — indeterminativo (una cosa generica)</h3>
    <p>Solo con nomi <b>singolari numerabili</b>. <b>a</b> + consonante, <b>an</b> + suono vocalico.</p>
    <table class="ex"><tr><th>a</th><th>an</th></tr>
    <tr><td>a car, a university (suono "iu")</td><td>an apple, an hour (h muta)</td></tr>
    </table></div>
    <div class="card"><h3>the — determinativo (cosa specifica/nota)</h3>
    <p>Quando è chiaro di quale si parla: <i><b>the</b> sun, <b>the</b> car I bought, <b>the</b> USA</i>.</p></div>
    <div class="card"><h3>∅ nessun articolo (zero article)</h3>
    <p>Con <b>plurali/uncountable in senso generale</b> e molti nomi: <i>I like <b>dogs</b>. <b>Water</b> is essential. <b>Breakfast</b> is ready. She's at <b>school/home/work</b>. I play <b>tennis</b>.</i></p></div>
    <div class="rule">🔑 Conta il <b>suono</b>, non la lettera: <i>an hour</i> (h muta), <i>a university</i> (suono /juː/), <i>an MBA</i> (em…).</div>
    <div class="err"><b>Errori tipici italiani:</b> <span class="no">I like the dogs</span> (generale) → <span class="ok">I like dogs</span>. <span class="no">I go to the bed / to the home</span> → <span class="ok">go to bed / go home</span>. <span class="no">She is doctor</span> → <span class="ok">She is <b>a</b> doctor</span> (professioni con a/an!).</div>`,
    quiz: [
      { q: "\"Mi piacciono i cani\" (in generale):", options: ["I like the dogs", "I like dogs", "I like a dogs"], answer: 1, explain: "plurale generale → nessun articolo." },
      { q: "Corretto:", options: ["a hour", "an hour", "the hour (sempre)"], answer: 1, explain: "h muta → suono vocalico → an." },
      { q: "\"È un medico\":", options: ["She is doctor", "She is a doctor", "She is the doctor (generale)"], answer: 1, explain: "professioni → a/an." }
    ] }
]},

/* ============================================================ PREPOSIZIONI */
{ cat: "Preposizioni", icon: "📍", topics: [

  { id: "preposizioni-base", title: "Preposizioni di Base (tempo)", lead: "in / on / at con orari, giorni, mesi: la trappola classica.",
    html: `
    <div class="card"><h3>in / on / at nel tempo</h3>
    <table class="ex"><tr><th>Preposizione</th><th>Uso</th><th>Esempi</th></tr>
    <tr><td><b>at</b></td><td>ora precisa, festività, notte</td><td>at 5, at noon, at night, at Christmas, at the weekend</td></tr>
    <tr><td><b>on</b></td><td>giorni e date</td><td>on Monday, on July 4th, on my birthday</td></tr>
    <tr><td><b>in</b></td><td>mesi, anni, stagioni, parti del giorno</td><td>in May, in 2026, in summer, in the morning</td></tr>
    </table></div>
    <div class="rule">🇺🇸 In USA si dice <b>on the weekend</b> (UK: at the weekend). <b>Niente preposizione</b> con next/last/this/every: <i>see you <b>next</b> week</i> (non "in next week").</div>
    <div class="err"><b>Errori tipici:</b> <span class="no">in Monday / on May / at 2026</span> → <span class="ok">on Monday / in May / in 2026</span>. <span class="no">in the night</span> → <span class="ok">at night</span>.</div>`,
    quiz: [
      { q: "\"Lunedì\":", options: ["in Monday", "on Monday", "at Monday"], answer: 1, explain: "giorni → on." },
      { q: "\"Alle 8\":", options: ["in 8", "on 8", "at 8"], answer: 2, explain: "ora precisa → at." },
      { q: "\"A luglio\":", options: ["in July", "on July", "at July"], answer: 0, explain: "mesi → in." }
    ] },

  { id: "preposizioni-luogo", title: "Preposizioni di Luogo", lead: "in / on / at nello spazio, e le direzioni.",
    html: `
    <div class="card"><h3>in / on / at nello spazio</h3>
    <table class="ex"><tr><th>Preposizione</th><th>Uso</th><th>Esempi</th></tr>
    <tr><td><b>at</b></td><td>punto preciso</td><td>at the door, at the bus stop, at home, at work</td></tr>
    <tr><td><b>on</b></td><td>superficie</td><td>on the table, on the wall, on the floor</td></tr>
    <tr><td><b>in</b></td><td>spazio chiuso/dentro</td><td>in the box, in the room, in London</td></tr>
    </table></div>
    <div class="card"><h3>Altre utili</h3>
    <p>under (sotto), over/above (sopra), between (tra due), among (tra molti), next to/beside (accanto), in front of (davanti), behind (dietro), across (attraverso), through (attraverso dentro).</p>
    <p><b>Direzione:</b> to (verso), into (dentro), out of (fuori da), onto (su).</p></div>
    <div class="err"><b>Errori tipici:</b> <span class="no">in the picture c'è un uomo → in a photo</span> ok, ma <span class="no">arrive to</span> → <span class="ok">arrive at/in</span> (arrive non vuole 'to'). <span class="no">go in home</span> → <span class="ok">go home</span>.</div>`,
    quiz: [
      { q: "\"Sul tavolo\":", options: ["in the table", "on the table", "at the table"], answer: 1, explain: "superficie → on." },
      { q: "\"A casa\" (stato):", options: ["in home", "at home", "on home"], answer: 1, explain: "at home." },
      { q: "\"Nella scatola\":", options: ["on the box", "at the box", "in the box"], answer: 2, explain: "dentro → in." }
    ] }
]},

/* ============================================================ CONGIUNZIONI */
{ cat: "Congiunzioni", icon: "🔗", topics: [

  { id: "coordinative", title: "Congiunzioni Coordinative", lead: "and, but, or, so… collegano elementi dello stesso livello (FANBOYS).",
    html: `
    <div class="card"><h3>FANBOYS</h3>
    <table class="ex"><tr><th>Cong.</th><th>Significato</th><th>Esempio</th></tr>
    <tr><td><b>For</b></td><td>poiché (formale)</td><td>I stayed, for I was tired</td></tr>
    <tr><td><b>And</b></td><td>e</td><td>bread and butter</td></tr>
    <tr><td><b>Nor</b></td><td>né</td><td>neither… nor…</td></tr>
    <tr><td><b>But</b></td><td>ma</td><td>cheap but good</td></tr>
    <tr><td><b>Or</b></td><td>o</td><td>tea or coffee</td></tr>
    <tr><td><b>Yet</b></td><td>eppure</td><td>tired yet happy</td></tr>
    <tr><td><b>So</b></td><td>quindi</td><td>It rained, so we stayed</td></tr>
    </table></div>
    <div class="rule">💡 Coppie correlative: <b>both … and</b>, <b>either … or</b>, <b>neither … nor</b>, <b>not only … but also</b>.</div>
    <div class="err"><b>Errore tipico:</b> doppia congiunzione all'italiana → <span class="no">Although… but… / Because… so…</span> → in inglese <b>una sola</b>: <span class="ok">It rained, so we stayed</span> (non "Because it rained, so…").</div>`,
    quiz: [
      { q: "\"Né carne né pesce\":", options: ["nor meat nor fish", "neither meat nor fish", "either meat or fish"], answer: 1, explain: "neither … nor …" },
      { q: "\"Ha piovuto, quindi siamo restati\":", options: ["Because it rained, so we stayed", "It rained, so we stayed", "It rained so that we stayed"], answer: 1, explain: "una sola congiunzione (so)." }
    ] },

  { id: "subordinative", title: "Congiunzioni Subordinative", lead: "because, although, if, when, while, since… introducono le secondarie.",
    html: `
    <div class="card"><h3>Le principali</h3>
    <table class="ex"><tr><th>Cong.</th><th>Introduce</th><th>Esempio</th></tr>
    <tr><td>because / since / as</td><td>causa</td><td>I left because I was late</td></tr>
    <tr><td>although / even though / though</td><td>concessione</td><td>Although it's hard, I like it</td></tr>
    <tr><td>if / unless</td><td>condizione</td><td>Unless you hurry, you'll miss it</td></tr>
    <tr><td>when / while / before / after / until</td><td>tempo</td><td>Wait until I come back</td></tr>
    <tr><td>so that / in order that</td><td>scopo</td><td>Speak slowly so that they understand</td></tr>
    <tr><td>whereas / while</td><td>contrasto</td><td>I like tea, whereas she likes coffee</td></tr>
    </table></div>
    <div class="rule">💡 Differenze utili: <b>because</b> + frase (perché…), <b>because of</b> + nome (a causa di…). <b>during</b> + nome, <b>while</b> + frase.</div>
    <div class="err"><b>Errori tipici:</b> <span class="no">because of it was late</span> → <span class="ok">because it was late</span> (because + frase). <span class="no">during I was working</span> → <span class="ok">while I was working</span> (while + frase).</div>`,
    quiz: [
      { q: "\"A causa della pioggia\" (+ nome):", options: ["because the rain", "because of the rain", "during the rain (causa)"], answer: 1, explain: "because of + nome." },
      { q: "\"Mentre lavoravo\":", options: ["during I worked", "while I was working", "when I working"], answer: 1, explain: "while + frase." }
    ] }
]},

/* ============================================================ APPROFONDIMENTI */
{ cat: "Approfondimenti", icon: "🎬", topics: [

  { id: "videolezioni", title: "VideoLezioni e Risorse Online", lead: "Dove continuare: canali, podcast e strumenti per l'inglese americano.",
    html: `
    <div class="card"><h3>🎥 Canali YouTube (inglese americano)</h3>
    <ul class="clean">
    <li><a href="https://www.youtube.com/@RachelsEnglish" target="_blank" rel="noopener">Rachel's English</a> — pronuncia americana, IPA, movimento della bocca.</li>
    <li><a href="https://www.youtube.com/@bbclearningenglish" target="_blank" rel="noopener">BBC Learning English</a> — grammatica chiara (accento UK ma ottimo).</li>
    <li><a href="https://www.youtube.com/@EnglishwithLucy" target="_blank" rel="noopener">English with Lucy</a> — lezioni tematiche.</li>
    <li><a href="https://www.youtube.com/@engvidluke" target="_blank" rel="noopener">EngVid</a> — grammatica ed espressioni con vari insegnanti.</li>
    </ul></div>
    <div class="card"><h3>🎧 Podcast per l'ascolto</h3>
    <ul class="clean">
    <li><b>All Ears English</b> — inglese americano quotidiano e naturale.</li>
    <li><b>ESL Podcast / Culips</b> — velocità graduale, spiegazioni.</li>
    <li><b>6 Minute English</b> (BBC) — brevi, con trascrizione.</li>
    </ul></div>
    <div class="card"><h3>🛠️ Strumenti pratici</h3>
    <ul class="clean">
    <li><a href="https://www.wordreference.com/enit/" target="_blank" rel="noopener">WordReference</a> — dizionario IT↔EN con esempi.</li>
    <li><a href="https://youglish.com/" target="_blank" rel="noopener">YouGlish</a> — ascolta una parola pronunciata in migliaia di video reali.</li>
    <li><a href="https://dictionary.cambridge.org/" target="_blank" rel="noopener">Cambridge Dictionary</a> — definizioni + IPA + audio US/UK.</li>
    <li><b>Anki</b> — flashcard con spaced repetition per il vocabolario.</li>
    </ul></div>
    <div class="rule">📖 Le grammatiche di riferimento di questo corso: <i>nspeak — grammatica.pdf</i>, <i>ITIS Polistena — Grammatica Inglese</i>, <i>Erickson — Simple English Practice</i>, <i>UniTe — Quaderni di grammatica</i>.</div>
    <div class="card"><h3>💡 Metodo consigliato</h3>
    <p>1) Studia un argomento qui → 2) guarda un video sullo stesso tema → 3) crea 5 frasi tue → 4) ascolta un podcast → 5) ripassa dopo 1, 3, 7 giorni (spaced repetition).</p></div>`,
    quiz: [
      { q: "Quale sito serve per SENTIRE una parola in video reali?", options: ["WordReference", "YouGlish", "Anki"], answer: 1, explain: "YouGlish mostra la parola pronunciata in tanti video." },
      { q: "Quale strumento usa la spaced repetition per il vocabolario?", options: ["Anki", "Cambridge Dictionary", "YouTube"], answer: 0, explain: "Anki = flashcard con ripetizione dilazionata." }
    ] }
]}

];
