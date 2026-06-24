/* =====================================================================
   DERMATO MG — Assistant dermatologique de consultation
   Base de données locale (embarquée en JS pour fonctionner hors-ligne,
   sans serveur ni fetch — ouverture directe via file:// possible).

   Source médicale principale : Dermatoclic — https://www.dermatoclic.com
   Contenus REFORMULÉS à partir des arbres décisionnels et recommandations
   (HAS, sociétés savantes). Outil d'aide à la décision, ne remplace pas
   le jugement clinique. Vérifier CRAT/RCP avant toute prescription.
   ===================================================================== */
'use strict';

/* niveau d'urgence -> couleur de badge
   0 = non urgent (bleu/vert) · 1 = prudence / avis rapide (orange) · 2 = urgence (rouge) */
const NIVEAUX = {
  0: { lib: "Non urgente",  cls: "u-ok"   },
  1: { lib: "Avis rapide",  cls: "u-warn" },
  2: { lib: "Urgence",      cls: "u-crit" }
};

const SRC = "Dermatoclic";
const SRC_URL = "https://www.dermatoclic.com";

/* ---------------------------------------------------------------------
   PATHOLOGIES — fiches structurées (14 rubriques)
   --------------------------------------------------------------------- */
const PATHOLOGIES = [
/* ============ DERMATOSES INFLAMMATOIRES ============ */
{
  id:"dermatite_atopique", nom:"Dermatite atopique", categorie:"Dermatose inflammatoire",
  localisations:["visage","plis","membres","tronc","mains"],
  symptomes:["prurit","plaques rouges","squames","peau sèche"],
  niveau:0, urgence:"Non urgente",
  definition:"Dermatose inflammatoire chronique et prurigineuse évoluant par poussées, sur terrain atopique, débutant le plus souvent dans l'enfance.",
  elements_cles:[
    "Les dermocorticoïdes sont le traitement de référence des poussées.",
    "Les émollients et mesures adjuvantes sont indispensables et quotidiens.",
    "Les explorations allergologiques sont inutiles dans la grande majorité des cas.",
    "Maladie chronique évoluant par poussées : éducation thérapeutique essentielle."
  ],
  terrain:["Terrain atopique personnel ou familial (asthme, rhinite, allergie)","Début souvent < 2 ans","Peau sèche constitutionnelle (xérose)","Facteurs déclenchants : irritants, savon, stress, chaleur, sueur"],
  clinique:["Prurit constant (signe majeur)","Plaques érythémateuses mal limitées, suintantes puis squameuses","Nourrisson : joues, front, convexités","Enfant/adulte : plis (coudes, genoux, cou), mains","Xérose cutanée diffuse","Lichénification dans les formes chroniques"],
  gravite:["Surinfection (impétiginisation) : croûtes jaunâtres, suintement, aggravation brutale","Eczéma herpeticum (vésiculo-pustules ombiliquées, fièvre, AEG) : URGENCE","Érythrodermie","Retentissement majeur sur le sommeil et la qualité de vie"],
  diagnostics_differentiels:["Dermatite séborrhéique (nourrisson : cuir chevelu, plis, peu prurigineuse)","Gale (sillons, prurit familial, atteinte interdigitale)","Eczéma de contact (topographie évocatrice de l'allergène)","Psoriasis","Dermatophytie"],
  examens:["Diagnostic clinique : aucun examen nécessaire en routine","Bilan allergologique INUTILE sauf cas particulier (échec d'un traitement bien conduit, suspicion d'allergie alimentaire avec signes évocateurs)","Prélèvement bactério/viro si surinfection suspectée"],
  traitement_premiere_intention:[
    "Émollients quotidiens, généreux, tout le corps, y compris hors poussée",
    "Dermocorticoïde adapté à la localisation et à la sévérité, 1 fois/jour sur les plaques inflammatoires",
    "Traiter jusqu'à disparition complète des lésions inflammatoires (pas de décroissance complexe)",
    "Éviction des irritants : savon surgras ou syndet, éviter laine et chaleur excessive",
    "Éducation thérapeutique : montrer la quantité de dermocorticoïde (règle de la phalangette)"
  ],
  traitement_deuxieme_intention:[
    "Inhibiteurs de la calcineurine topiques (tacrolimus) sur le visage / zones fines",
    "Traitement proactif : 2 applications/semaine sur les zones récidivantes après contrôle",
    "Avis dermatologique : photothérapie, traitements systémiques (dupilumab, immunosuppresseurs) dans les formes sévères réfractaires"
  ],
  ordonnance_type:
"ÉMOLLIENT (crème/baume)\nApplication généreuse sur tout le corps 1 à 2 fois par jour, tous les jours, y compris hors poussée.\nQSP 1 mois, renouvelable.\n\nDERMOCORTICOÏDE adapté à la localisation (activité modérée à forte selon zone et âge)\nAppliquer 1 fois par jour sur les plaques rouges inflammatoires jusqu'à disparition des lésions.\nNe pas appliquer sur peau saine.\nRéévaluation si absence d'amélioration après 7 à 10 jours.\n\nSYNDET / pain ou gel sans savon pour la toilette.",
  conseils_patient:
"La dermatite atopique est une maladie de la peau fréquente, non contagieuse, qui évolue par poussées. On ne la \"guérit\" pas définitivement mais on la contrôle très bien.\n\n• Hydratez la peau tous les jours avec un émollient, même quand la peau va bien.\n• Pendant les poussées, appliquez la crème à la cortisone une fois par jour sur les plaques rouges qui grattent, jusqu'à ce qu'elles disparaissent. La cortisone locale est sûre quand elle est bien utilisée : n'ayez pas peur de l'appliquer en quantité suffisante.\n• Toilette : eau tiède, courte, pain ou gel sans savon, séchez en tamponnant.\n• Évitez la laine à même la peau, la chaleur excessive et les produits parfumés.\n\nReconsultez si : les plaques deviennent jaunâtres, suintantes ou croûteuses (surinfection), apparition de petites cloques douloureuses avec fièvre, ou si le traitement ne fait plus effet.",
  quand_adresser:["Échec d'un traitement local bien conduit","Diagnostic incertain","Formes sévères, étendues, retentissement majeur","Suspicion d'eczéma herpeticum (URGENCE)","Discussion d'un traitement systémique"],
  suivi:["Réévaluation à 7-10 jours d'une poussée traitée","Renforcer l'éducation et l'observance émollients","Adapter la puissance du dermocorticoïde à l'évolution"],
  source:SRC, source_url:SRC_URL,
  tags:["atopie","eczéma","enfant","cortisone","émollient"]
},
{
  id:"dermatite_seborrheique", nom:"Dermatite séborrhéique", categorie:"Dermatose inflammatoire",
  localisations:["cuir chevelu","visage","tronc"],
  symptomes:["plaques rouges","squames","squames grasses"],
  niveau:0, urgence:"Non urgente",
  definition:"Dermatose inflammatoire chronique des zones séborrhéiques (sillons nasogéniens, sourcils, cuir chevelu), liée à la levure Malassezia, évoluant par poussées.",
  elements_cles:["Topographie des zones grasses très évocatrice","Traitement antifongique local (kétoconazole) au premier plan","Maladie chronique récidivante : traitement d'entretien souvent nécessaire","Une forme profuse/atypique doit faire évoquer une immunodépression (VIH)"],
  terrain:["Adulte jeune à moyen, prédominance masculine","Facteurs aggravants : stress, fatigue, froid, alcool","Formes sévères : maladie de Parkinson, immunodépression (VIH)"],
  clinique:["Plaques érythémateuses recouvertes de squames grasses jaunâtres","Sillons nasogéniens, sourcils, lisière du cuir chevelu, conduits auditifs","Cuir chevelu : état pelliculaire, prurit modéré","Forme du nourrisson : croûtes de lait, atteinte des plis"],
  gravite:["Forme profuse ou résistante → rechercher une immunodépression (VIH)","Érythrodermie (rare)"],
  diagnostics_differentiels:["Psoriasis (squames sèches argentées, plaques épaisses, coudes/genoux)","Dermatite atopique","Rosacée (érythème centrofacial, pas de squames grasses)","Lupus (photosensibilité, lésions persistantes)","Teigne (enfant)"],
  examens:["Diagnostic clinique","Sérologie VIH à discuter si forme profuse, atypique ou résistante"],
  traitement_premiere_intention:["Visage : antifongique local (kétoconazole 2 %), gel ou crème","Cuir chevelu : shampooing antifongique (kétoconazole, ciclopirox) 2-3 fois/semaine","Dermocorticoïde d'activité modérée en cure courte sur les poussées inflammatoires du visage","Toilette douce, éviter savons agressifs"],
  traitement_deuxieme_intention:["Traitement d'entretien intermittent (1-2 fois/semaine)","Inhibiteurs de la calcineurine topiques sur le visage en alternative aux dermocorticoïdes","Avis si résistance / doute diagnostique"],
  ordonnance_type:
"VISAGE — KÉTOCONAZOLE 2 % gel/crème\nAppliquer 1 fois par jour sur les zones atteintes pendant 2 à 4 semaines, puis 1 à 2 fois/semaine en entretien.\n\nCUIR CHEVELU — SHAMPOOING ANTIFONGIQUE (kétoconazole ou ciclopirox)\nLaisser poser 3 à 5 minutes, 2 à 3 fois par semaine pendant 1 mois, puis 1 fois/semaine en entretien.\n\nEn cas de poussée inflammatoire du visage : DERMOCORTICOÏDE modéré 1 fois/jour, cure courte de 5 à 7 jours.",
  conseils_patient:
"La dermatite séborrhéique est une affection bénigne et fréquente de la peau, non contagieuse, qui touche les zones grasses du visage et du cuir chevelu. Elle évolue par poussées, souvent favorisées par la fatigue, le stress ou le froid.\n\n• Utilisez le traitement antifongique régulièrement, y compris en entretien, car la maladie a tendance à revenir.\n• Lavez-vous le visage avec un nettoyant doux, sans savon agressif.\n• Le soleil améliore souvent les lésions.\n\nReconsultez si : les plaques s'étendent largement, résistent au traitement, ou en cas de doute sur le diagnostic.",
  quand_adresser:["Doute diagnostique (psoriasis, lupus)","Forme profuse/résistante (bilan d'immunodépression)","Échec du traitement bien conduit"],
  suivi:["Traitement d'entretien pour espacer les poussées","Réévaluer à 1 mois"],
  source:SRC, source_url:SRC_URL,
  tags:["malassezia","pellicules","visage","kétoconazole"]
},
{
  id:"psoriasis", nom:"Psoriasis", categorie:"Dermatose inflammatoire",
  localisations:["cuir chevelu","coudes","genoux","tronc","ongles","plis"],
  symptomes:["plaques rouges","squames","plaques squameuses"],
  niveau:0, urgence:"Non urgente",
  definition:"Dermatose inflammatoire chronique fréquente, à médiation immunitaire, caractérisée par des plaques érythémato-squameuses bien limitées, évoluant par poussées.",
  elements_cles:["Plaques épaisses recouvertes de squames blanches/argentées","Topographie : faces d'extension (coudes, genoux), cuir chevelu, région sacrée","Rechercher un rhumatisme psoriasique (douleurs articulaires)","Maladie chronique : dépister les comorbidités (syndrome métabolique, dépression)"],
  terrain:["Antécédents familiaux fréquents","Facteurs déclenchants : stress, traumatismes (phénomène de Koebner), infections, médicaments (bêtabloquants, lithium), arrêt de corticothérapie générale","Comorbidités : syndrome métabolique, rhumatisme psoriasique, MICI"],
  clinique:["Plaques érythémateuses bien limitées à squames épaisses argentées","Faces d'extension : coudes, genoux ; cuir chevelu ; région lombo-sacrée ; ongles","Atteinte unguéale : ponctuations, onycholyse, taches d'huile","Formes : en plaques (la plus fréquente), en gouttes, inversé (plis), pustuleux, érythrodermique"],
  gravite:["Psoriasis érythrodermique ou pustuleux généralisé : URGENCE (avis spécialisé / hospitalisation)","Rhumatisme psoriasique destructeur","Retentissement psychologique majeur"],
  diagnostics_differentiels:["Dermatite séborrhéique","Eczéma","Mycose (dermatophytie)","Pityriasis rosé de Gibert","Lichen plan"],
  examens:["Diagnostic clinique","Pas de biopsie en routine (réservée aux formes atypiques)","Évaluer la sévérité et le retentissement, rechercher une atteinte articulaire"],
  traitement_premiere_intention:["Formes localisées : dermocorticoïdes ± analogues de la vitamine D (calcipotriol), association fixe","Émollients","Cuir chevelu : lotions/mousses corticoïdes ± kératolytiques"],
  traitement_deuxieme_intention:["Photothérapie","Traitements systémiques (méthotrexate, acitrétine, apremilast) et biothérapies dans les formes modérées à sévères — du ressort du spécialiste"],
  ordonnance_type:
"PLAQUES LOCALISÉES — Association DERMOCORTICOÏDE FORT + ANALOGUE DE LA VITAMINE D (calcipotriol/bétaméthasone)\nAppliquer 1 fois par jour sur les plaques pendant 4 semaines, puis adapter (entretien intermittent).\n\nCUIR CHEVELU — lotion/mousse corticoïde ± shampooing kératolytique.\n\nÉMOLLIENT sur l'ensemble du corps, quotidien.",
  conseils_patient:
"Le psoriasis est une maladie inflammatoire chronique de la peau, fréquente et non contagieuse. Elle évolue par poussées entrecoupées de périodes d'accalmie. Ce n'est pas une maladie \"sale\" ni allergique.\n\n• Appliquez les traitements régulièrement sur les plaques et hydratez la peau tous les jours.\n• Évitez de gratter ou d'irriter la peau (les plaques peuvent apparaître sur les zones blessées).\n• Le soleil (avec modération) et l'arrêt du tabac/alcool sont bénéfiques.\n• Signalez des douleurs articulaires : elles peuvent être liées au psoriasis.\n\nReconsultez si : extension rapide, peau rouge sur tout le corps, fièvre, pustules diffuses, ou douleurs articulaires.",
  quand_adresser:["Formes étendues, modérées à sévères","Échec des traitements locaux","Atteinte unguéale invalidante, suspicion de rhumatisme psoriasique","Formes érythrodermique/pustuleuse (urgence)"],
  suivi:["Évaluer réponse à 4 semaines","Dépistage des comorbidités","Soutien psychologique si besoin"],
  source:SRC, source_url:SRC_URL,
  tags:["squames argentées","koebner","rhumatisme psoriasique","vitamine D"]
},
{
  id:"rosacee", nom:"Rosacée", categorie:"Dermatose inflammatoire",
  localisations:["visage","paupières"],
  symptomes:["plaques rouges","pustules","bouffées vasomotrices"],
  niveau:0, urgence:"Non urgente",
  definition:"Dermatose chronique du visage de l'adulte, touchant la zone centrofaciale, associant érythème, bouffées vasomotrices (flushs), télangiectasies et parfois papulo-pustules.",
  elements_cles:["Érythème centrofacial et flushs déclenchés par chaleur, alcool, émotions","Absence de comédons (différence avec l'acné)","Pas de dermocorticoïdes (les aggrave)","Atteinte oculaire possible (rosacée oculaire)"],
  terrain:["Adulte d'âge moyen, phototype clair","Facteurs déclenchants : soleil, chaleur, alcool, aliments épicés, émotions"],
  clinique:["Forme vasculaire : érythème permanent, flushs, télangiectasies","Forme papulo-pustuleuse : papules et pustules sur fond érythémateux, sans comédon","Forme oculaire : sécheresse, blépharite, conjonctivite","Rhinophyma (épaississement du nez) dans les formes évoluées"],
  gravite:["Rosacée oculaire compliquée (kératite) → avis ophtalmologique","Rhinophyma invalidant"],
  diagnostics_differentiels:["Acné (présence de comédons, sujet plus jeune)","Dermatite séborrhéique","Lupus (photosensibilité, pas de pustules)","Dermite péri-orale / corticoïde-induite"],
  examens:["Diagnostic clinique"],
  traitement_premiere_intention:["Formes papulo-pustuleuses : métronidazole topique ou acide azélaïque ; ivermectine topique","Éviction des facteurs déclenchants, photoprotection","Érythème/flushs : éviction des déclencheurs ± brimonidine topique"],
  traitement_deuxieme_intention:["Cyclines per os (doxycycline) dans les formes papulo-pustuleuses étendues ou résistantes","Laser/lumière pulsée pour les télangiectasies (avis spécialisé)","Rhinophyma : avis spécialisé"],
  ordonnance_type:
"FORME PAPULO-PUSTULEUSE\nIVERMECTINE 1 % crème : 1 application par jour le soir, en couche fine, pendant plusieurs semaines.\nOU MÉTRONIDAZOLE 0,75 % : 1 à 2 applications par jour.\n\nFormes étendues/résistantes : DOXYCYCLINE 40 mg (libération modifiée) 1/jour, plusieurs semaines (selon RCP).\n\nPHOTOPROTECTION quotidienne (SPF 50). NE PAS utiliser de dermocorticoïdes sur le visage.",
  conseils_patient:
"La rosacée est une affection chronique fréquente du visage, bénigne, non contagieuse. Elle se traduit par des rougeurs, parfois des boutons, surtout au centre du visage.\n\n• Identifiez et limitez ce qui déclenche vos rougeurs : soleil, chaleur, alcool, plats épicés, émotions fortes.\n• Protégez votre visage du soleil tous les jours (crème SPF 50).\n• Utilisez des produits doux, sans alcool ni parfum.\n• N'utilisez jamais de crème à la cortisone sur le visage sans avis : elle aggrave la rosacée.\n\nReconsultez si : yeux rouges, secs ou irrités (atteinte oculaire), ou si les traitements ne sont pas efficaces.",
  quand_adresser:["Rosacée oculaire symptomatique → ophtalmologue","Rhinophyma","Résistance au traitement / doute diagnostique","Demande de traitement des télangiectasies (laser)"],
  suivi:["Réévaluer à 4-8 semaines","Entretien et photoprotection au long cours"],
  source:SRC, source_url:SRC_URL,
  tags:["flush","télangiectasies","ivermectine","visage rouge"]
},
{
  id:"urticaire_aigue", nom:"Urticaire aiguë", categorie:"Dermatose inflammatoire",
  localisations:["tronc","membres","visage","diffus"],
  symptomes:["prurit","plaques rouges","papules œdémateuses"],
  niveau:1, urgence:"Avis rapide si signes de gravité",
  definition:"Éruption de papules/plaques œdémateuses fugaces et migratrices, très prurigineuses, par activation des mastocytes ; aiguë si évolution < 6 semaines.",
  elements_cles:["Lésions fugaces (< 24 h en un même endroit) et migratrices","Très prurigineuse, pas de squames","Rechercher un angio-œdème et des signes d'anaphylaxie (URGENCE)","Cause souvent virale ; bilan étiologique inutile dans l'urticaire aiguë isolée"],
  terrain:["Tout âge","Déclencheurs : infections virales, médicaments, aliments, piqûres ; souvent non retrouvé"],
  clinique:["Papules/plaques érythémato-œdémateuses, bords nets, centre plus pâle","Prurit intense","Chaque lésion disparaît en < 24 h sans séquelle, mais l'éruption peut durer plusieurs jours","Angio-œdème : œdème ferme du visage, lèvres, paupières"],
  gravite:["RED FLAGS : dyspnée, dysphonie, dysphagie, œdème de la glotte, malaise/hypotension → ANAPHYLAXIE","Angio-œdème laryngé → URGENCE VITALE (adrénaline, SAMU 15)"],
  diagnostics_differentiels:["Eczéma (lésions fixes, squameuses)","Érythème polymorphe (lésions en cocarde fixes)","Vascularite urticarienne (lésions fixes > 24 h, purpuriques)","Toxidermie"],
  examens:["Urticaire aiguë isolée : AUCUN bilan","Bilan seulement si signes de gravité, contexte particulier ou suspicion d'anaphylaxie"],
  traitement_premiere_intention:["Anti-H1 de 2e génération (cétirizine, desloratadine) à dose standard","Éviction du facteur déclenchant si identifié","Éducation : reconnaître les signes de gravité"],
  traitement_deuxieme_intention:["En cas de contrôle insuffisant : augmentation possible de la posologie d'anti-H1 (jusqu'à x4, avis)","Angio-œdème / anaphylaxie : adrénaline IM, oxygène, SAMU"],
  ordonnance_type:
"ANTI-H1 DE 2e GÉNÉRATION (ex. cétirizine 10 mg ou desloratadine 5 mg)\n1 comprimé par jour pendant 7 à 10 jours.\nPoursuivre si récidive à l'arrêt ; réévaluer.\n\nSi signes de gravité (gêne respiratoire, gonflement de la gorge, malaise) : appeler le 15 immédiatement.\n\n[Si anaphylaxie connue : ADRÉNALINE auto-injectable selon prescription spécialisée.]",
  conseils_patient:
"L'urticaire est une réaction fréquente de la peau : des plaques rouges qui gonflent et grattent, et qui se déplacent. Chaque plaque disparaît en quelques heures. C'est en général bénin et passager.\n\n• Prenez l'antihistaminique prescrit, même si les plaques vont et viennent.\n• Évitez la chaleur, l'alcool et le grattage qui aggravent les démangeaisons.\n\nAppelez le 15 IMMÉDIATEMENT si : gonflement des lèvres/langue/gorge, difficulté à respirer ou à avaler, voix modifiée, malaise. Ce sont des signes d'allergie grave.",
  quand_adresser:["Signes d'anaphylaxie → SAMU 15 (urgence vitale)","Angio-œdème étendu","Récidives / passage à la chronicité"],
  suivi:["Réévaluer à 1-2 semaines","Si > 6 semaines : urticaire chronique (cf. fiche dédiée)"],
  source:SRC, source_url:SRC_URL,
  tags:["allergie","anti-H1","angio-œdème","anaphylaxie"]
},
{
  id:"urticaire_chronique", nom:"Urticaire chronique", categorie:"Dermatose inflammatoire",
  localisations:["tronc","membres","diffus"],
  symptomes:["prurit","plaques rouges","papules œdémateuses"],
  niveau:0, urgence:"Non urgente",
  definition:"Urticaire évoluant depuis plus de 6 semaines, le plus souvent spontanée (idiopathique) ; rarement liée à une cause sous-jacente identifiable.",
  elements_cles:["Le plus souvent urticaire chronique spontanée, sans cause retrouvée","Bilan étiologique large INUTILE en l'absence de point d'appel clinique","Anti-H1 de 2e génération au long cours, posologie majorée si besoin","Ce n'est habituellement pas une allergie alimentaire"],
  terrain:["Adulte, prédominance féminine","Urticaires inductibles : au froid, à la pression, cholinergique (effort/chaleur), dermographisme"],
  clinique:["Papules urticariennes prurigineuses fugaces, quasi quotidiennes","Avec ou sans angio-œdème","Formes inductibles déclenchées par un stimulus physique"],
  gravite:["Angio-œdème laryngé (rare)","Retentissement majeur sur la qualité de vie et le sommeil"],
  diagnostics_differentiels:["Vascularite urticarienne (lésions fixes > 24 h, purpura, marques résiduelles)","Urticaire inductible","Syndromes auto-inflammatoires (rares)"],
  examens:["Aucun bilan systématique si interrogatoire/examen normaux","Bilan orienté (NFS, CRP, TSH) uniquement si point d'appel ou résistance"],
  traitement_premiere_intention:["Anti-H1 de 2e génération à dose standard, en continu","Tenir un agenda des poussées","Éviter les facteurs aggravants (AINS, alcool, chaleur, stress)"],
  traitement_deuxieme_intention:["Augmentation de la posologie d'anti-H1 jusqu'à x4 (hors AMM standard, pratique courante)","Avis spécialisé : omalizumab (anti-IgE) dans les formes résistantes"],
  ordonnance_type:
"ANTI-H1 DE 2e GÉNÉRATION (ex. cétirizine, fexofénadine, desloratadine)\n1 comprimé par jour en continu pendant 4 semaines, à poursuivre selon l'évolution.\nEn cas de contrôle insuffisant : posologie pouvant être augmentée progressivement (jusqu'à 4/jour) après réévaluation.\n\nÉviter AINS, alcool et facteurs déclenchants. Réévaluation à 4 semaines.",
  conseils_patient:
"L'urticaire chronique est une affection bénigne mais gênante : des plaques qui démangent reviennent régulièrement depuis plusieurs semaines. Dans la grande majorité des cas, on ne trouve pas de cause précise, et ce n'est pas une allergie alimentaire. Elle finit souvent par disparaître spontanément, parfois après plusieurs mois ou années.\n\n• Prenez le traitement tous les jours, même les jours sans plaques : c'est un traitement de fond.\n• Évitez les anti-inflammatoires (type ibuprofène), l'alcool et la chaleur qui peuvent déclencher des poussées.\n\nReconsultez si : les plaques laissent des marques (bleus) ou durent plus de 24 h au même endroit, ou en cas de gonflement de la gorge.",
  quand_adresser:["Résistance à l'anti-H1 à posologie majorée","Suspicion de vascularite urticarienne (biopsie)","Angio-œdème sévère / récidivant"],
  suivi:["Réévaluation régulière, agenda des symptômes","Décroissance progressive lors de l'accalmie"],
  source:SRC, source_url:SRC_URL,
  tags:["chronique","anti-H1","idiopathique","omalizumab"]
},
{
  id:"eczema_contact", nom:"Eczéma de contact", categorie:"Dermatose inflammatoire",
  localisations:["mains","visage","paupières","membres"],
  symptomes:["prurit","plaques rouges","vésicules","squames"],
  niveau:0, urgence:"Non urgente",
  definition:"Réaction d'hypersensibilité retardée à un allergène de contact, responsable d'un eczéma localisé à la zone de contact, débordant parfois ses limites.",
  elements_cles:["Topographie évocatrice de l'allergène (bijoux, cosmétiques, professionnels)","Eczéma aigu : érythème, vésicules, suintement ; chronique : sec, lichénifié","Traitement : éviction de l'allergène + dermocorticoïdes","Patch-tests à distance pour identifier l'allergène"],
  terrain:["Exposition professionnelle ou domestique (nickel, chrome, cosmétiques, caoutchouc…)","Sensibilisation préalable nécessaire"],
  clinique:["Plaques érythémato-vésiculeuses prurigineuses, mal limitées","Topographie correspondant à la zone de contact (puis extension possible)","Évolution : érythème → vésicules → suintement → croûtes → desquamation"],
  gravite:["Surinfection","Formes étendues / érythrodermisantes (rare)","Eczéma aigu du visage avec œdème palpébral"],
  diagnostics_differentiels:["Dermatite atopique","Dermite d'irritation (limites nettes, peu de vésicules, pas de sensibilisation)","Dermatophytie","Psoriasis"],
  examens:["Diagnostic clinique","Patch-tests (tests épicutanés) à distance de la poussée pour identifier l'allergène"],
  traitement_premiere_intention:["ÉVICTION de l'allergène (clé du traitement)","Dermocorticoïde d'activité forte sur les lésions, 1 fois/jour jusqu'à guérison","Émollients ; protection cutanée (gants adaptés en milieu professionnel)"],
  traitement_deuxieme_intention:["Antiseptique/antibiotique local si surinfection localisée","Avis dermatologique : patch-tests, formes chroniques/professionnelles (déclaration maladie professionnelle)"],
  ordonnance_type:
"DERMOCORTICOÏDE d'activité forte (corps/membres) ou modérée (visage)\nAppliquer 1 fois par jour sur les plaques jusqu'à disparition (en général 1 à 2 semaines).\n\nÉMOLLIENT 1 à 2 fois/jour.\n\nÉVICTION stricte de la substance en cause. Protection (gants adaptés) en cas d'exposition professionnelle.",
  conseils_patient:
"L'eczéma de contact est une réaction de la peau au contact d'une substance à laquelle vous êtes devenu allergique (bijou, cosmétique, produit professionnel…). Tant que vous touchez cette substance, l'eczéma revient.\n\n• Le traitement le plus important est d'identifier et d'éviter le produit responsable.\n• Appliquez la crème à la cortisone sur les plaques jusqu'à guérison, et hydratez la peau.\n• Protégez vos mains (gants adaptés) si l'exposition est professionnelle.\n\nReconsultez si : les lésions deviennent jaunâtres/suintantes (surinfection), s'étendent, ou reviennent malgré l'éviction (recherche de l'allergène par des tests).",
  quand_adresser:["Identification de l'allergène par patch-tests","Eczéma professionnel (déclaration)","Formes chroniques ou résistantes"],
  suivi:["Vérifier l'éviction et la guérison","Adapter la protection en milieu professionnel"],
  source:SRC, source_url:SRC_URL,
  tags:["allergène","patch-tests","nickel","professionnel"]
},
{
  id:"dyshidrose", nom:"Dyshidrose", categorie:"Dermatose inflammatoire",
  localisations:["mains","pieds"],
  symptomes:["prurit","vésicules"],
  niveau:0, urgence:"Non urgente",
  definition:"Forme d'eczéma vésiculeux des mains et des pieds, caractérisée par de petites vésicules profondes des faces latérales des doigts et des paumes/plantes, très prurigineuses.",
  elements_cles:["Vésicules dures \"en grains de sériac\" des faces latérales des doigts","Très prurigineux, évolution par poussées","Facteurs : chaleur, sueur, stress, contact irritant, dermatophytie à distance","Traitement : dermocorticoïdes forts en poussée"],
  terrain:["Terrain atopique, hyperhidrose","Facteurs déclenchants : chaleur, stress, irritants, tabac","Parfois associée à une mycose des pieds (réaction \"ide\")"],
  clinique:["Vésicules profondes, fermes, des faces latérales des doigts, paumes et plantes","Prurit, puis desquamation en collerette","Évolution par poussées"],
  gravite:["Surinfection bactérienne","Formes bulleuses invalidantes"],
  diagnostics_differentiels:["Eczéma de contact des mains","Dermatophytie (dyshidrose mycosique)","Psoriasis pustuleux palmo-plantaire","Gale (atteinte interdigitale)"],
  examens:["Diagnostic clinique","Prélèvement mycologique si suspicion de dermatophytie associée"],
  traitement_premiere_intention:["Dermocorticoïde d'activité forte/très forte en cure courte sur les poussées","Émollients en dehors des poussées","Éviction des irritants, protection des mains"],
  traitement_deuxieme_intention:["Traiter une mycose des pieds associée","Avis dermatologique : formes chroniques/sévères (photothérapie locale, etc.)"],
  ordonnance_type:
"DERMOCORTICOÏDE d'activité très forte (mains/pieds)\nAppliquer 1 fois par jour sur les zones atteintes pendant 1 à 2 semaines lors des poussées.\n\nÉMOLLIENT plusieurs fois par jour en entretien.\nProtection des mains (gants) en cas de contact avec irritants.",
  conseils_patient:
"La dyshidrose est une forme d'eczéma qui touche les mains et les pieds, avec de petites cloques qui démangent. C'est bénin et non contagieux, mais cela évolue par poussées.\n\n• Évitez le contact avec les produits irritants (détergents, eau de javel) et protégez vos mains.\n• Appliquez la crème prescrite pendant les poussées et hydratez régulièrement.\n• La transpiration, le stress et la chaleur peuvent déclencher des crises.\n\nReconsultez si : les cloques deviennent jaunes/douloureuses (surinfection) ou si les poussées sont fréquentes et gênantes.",
  quand_adresser:["Formes chroniques invalidantes","Échec du traitement","Doute avec un psoriasis pustuleux"],
  suivi:["Réévaluer après la poussée","Recherche/traitement d'une mycose associée"],
  source:SRC, source_url:SRC_URL,
  tags:["eczéma","mains","vésicules","poussées"]
},
{
  id:"lichen_plan", nom:"Lichen plan", categorie:"Dermatose inflammatoire",
  localisations:["mains","membres","bouche/lèvres","organes génitaux"],
  symptomes:["prurit","papules","plaques violines"],
  niveau:0, urgence:"Non urgente",
  definition:"Dermatose inflammatoire à médiation immunitaire, caractérisée par des papules violines polygonales prurigineuses, avec atteinte cutanée et/ou muqueuse.",
  elements_cles:["Papules violines polygonales, brillantes, à stries blanchâtres (stries de Wickham)","Atteinte fréquente des faces de flexion des poignets, chevilles","Atteinte muqueuse buccale/génitale possible (réseau blanchâtre)","Évoquer une cause médicamenteuse ou une hépatite C dans certains contextes"],
  terrain:["Adulte d'âge moyen","Associations : hépatite C (selon contexte), prises médicamenteuses (lichénoïdes)"],
  clinique:["Papules violines polygonales prurigineuses (4 P)","Stries de Wickham (réseau blanchâtre à la surface)","Topographie : poignets, chevilles, région lombaire","Atteinte muqueuse : réseau blanc réticulé buccal/génital ; formes érosives douloureuses"],
  gravite:["Lichen érosif buccal/génital (douleur, risque de transformation à long terme → surveillance)","Atteinte unguéale destructrice"],
  diagnostics_differentiels:["Psoriasis","Eczéma","Lupus","Toxidermie lichénoïde","Leucoplasie/candidose (muqueuse)"],
  examens:["Diagnostic souvent clinique","Biopsie si doute (formes atypiques, muqueuses érosives)","Sérologie VHC selon contexte"],
  traitement_premiere_intention:["Dermocorticoïdes d'activité forte sur les lésions cutanées","Formes muqueuses : corticoïdes topiques adaptés","Antihistaminiques pour le prurit"],
  traitement_deuxieme_intention:["Avis dermatologique : photothérapie, corticothérapie générale ou immunosuppresseurs dans les formes étendues/érosives"],
  ordonnance_type:
"DERMOCORTICOÏDE d'activité forte\nAppliquer 1 fois par jour sur les lésions jusqu'à amélioration (souvent plusieurs semaines).\n\nFORME BUCCALE : corticoïde topique adapté à la muqueuse.\nANTIHISTAMINIQUE le soir si prurit important.\n\nSurveillance des formes muqueuses érosives.",
  conseils_patient:
"Le lichen plan est une maladie inflammatoire de la peau et parfois des muqueuses (bouche, parties génitales). Il se manifeste par de petits boutons violacés qui démangent. C'est bénin et non contagieux, et il guérit souvent spontanément en plusieurs mois à années.\n\n• Appliquez le traitement prescrit sur les lésions.\n• Pour la bouche : évitez les aliments épicés/acides qui irritent ; bonne hygiène bucco-dentaire.\n\nReconsultez si : plaies douloureuses persistantes dans la bouche ou sur les parties génitales, qui nécessitent une surveillance.",
  quand_adresser:["Formes muqueuses érosives (surveillance, douleur)","Formes étendues/résistantes","Doute diagnostique (biopsie)"],
  suivi:["Surveillance des formes muqueuses au long cours","Réévaluation de la réponse au traitement"],
  source:SRC, source_url:SRC_URL,
  tags:["papules violines","wickham","muqueuse","prurit"]
},
{
  id:"pityriasis_rose", nom:"Pityriasis rosé de Gibert", categorie:"Dermatose inflammatoire",
  localisations:["tronc","membres"],
  symptomes:["plaques rouges","squames"],
  niveau:0, urgence:"Non urgente",
  definition:"Éruption aiguë bénigne et spontanément résolutive, probablement d'origine virale, fréquente chez l'adolescent et l'adulte jeune.",
  elements_cles:["Médaillon initial (plaque \"héraut\") précédant l'éruption","Éruption du tronc en \"sapin de Noël\" avec collerette desquamative","Évolution spontanément favorable en 4 à 8 semaines","Aucun traitement nécessaire"],
  terrain:["Adolescent / adulte jeune","Plus fréquent au printemps/automne"],
  clinique:["Médaillon initial : plaque ovalaire rosée à bordure squameuse (collerette)","Puis multiples petites plaques ovalaires du tronc, suivant les lignes de tension (\"sapin de Noël\")","Prurit modéré ou absent","Respecte habituellement le visage"],
  gravite:["Aucun (bénin) — réévaluer un diagnostic alternatif si évolution atypique"],
  diagnostics_differentiels:["Syphilis secondaire (atteinte palmo-plantaire, contexte → faire la sérologie au moindre doute)","Dermatophytie","Psoriasis en gouttes","Eczématides","Toxidermie"],
  examens:["Diagnostic clinique","Sérologie syphilitique (TPHA-VDRL) au moindre doute (atteinte palmo-plantaire, contexte à risque)"],
  traitement_premiere_intention:["Aucun traitement nécessaire (résolution spontanée)","Émollients ; dermocorticoïde modéré seulement si prurit gênant","Rassurer"],
  traitement_deuxieme_intention:["Antihistaminique si prurit important"],
  ordonnance_type:
"Aucun traitement spécifique nécessaire (guérison spontanée en 4 à 8 semaines).\n\nSi prurit gênant : ÉMOLLIENT et, si besoin, DERMOCORTICOÏDE modéré sur les plaques les plus gênantes, quelques jours.\nANTIHISTAMINIQUE le soir si nécessaire.",
  conseils_patient:
"Le pityriasis rosé est une éruption bénigne et passagère, probablement due à un virus. Elle débute souvent par une grande plaque, suivie de nombreuses petites plaques sur le tronc. Elle n'est pas dangereuse et disparaît toute seule en 4 à 8 semaines, sans laisser de traces.\n\n• Aucun traitement n'est indispensable. Évitez d'irriter la peau (eau trop chaude, savons agressifs).\n• Les démangeaisons peuvent être soulagées par une crème hydratante.\n\nReconsultez si : l'éruption touche les paumes et les plantes, persiste au-delà de 2-3 mois, ou en cas de doute.",
  quand_adresser:["Doute diagnostique (syphilis, psoriasis)","Évolution atypique ou prolongée"],
  suivi:["Réassurance ; contrôle si non-résolution à 2-3 mois"],
  source:SRC, source_url:SRC_URL,
  tags:["médaillon","viral","bénin","sapin de noël"]
},

/* ============ INFECTIONS CUTANÉES ============ */
{
  id:"impetigo", nom:"Impétigo", categorie:"Infection cutanée",
  localisations:["visage","bouche/lèvres","membres","enfant"],
  symptomes:["croûtes jaunâtres","vésicules","bulles","pustules"],
  niveau:0, urgence:"Non urgente",
  definition:"Infection cutanée bactérienne superficielle contagieuse (staphylocoque doré, streptocoque), fréquente chez l'enfant, caractérisée par des croûtes mélicériques (jaunâtres).",
  elements_cles:["Croûtes jaunâtres \"mélicériques\" (couleur miel) très évocatrices","Très contagieux : éviction et mesures d'hygiène","Forme localisée : antibiotique local ; forme étendue : antibiotique per os","Rechercher une dermatose sous-jacente (eczéma impétiginisé)"],
  terrain:["Enfant +++ (collectivités)","Facteurs favorisants : chaleur, mauvaise hygiène, dermatose préexistante (eczéma), portage nasal de staphylocoque"],
  clinique:["Forme croûteuse : vésiculo-pustules superficielles → croûtes jaunâtres, péribuccales/narinaires","Forme bulleuse (staphylococcique) : bulles flasques laissant une érosion à collerette","Peu/pas de fièvre, pas d'AEG dans les formes simples"],
  gravite:["Extension, fièvre, AEG","Glomérulonéphrite post-streptococcique (rare) — surveiller","Suspicion d'épidermolyse staphylococcique (SSSS) chez le nourrisson → URGENCE"],
  diagnostics_differentiels:["Herpès (vésicules groupées, récidive au même endroit)","Eczéma surinfecté","Dermatophytie","Varicelle"],
  examens:["Diagnostic clinique","Prélèvement bactériologique si forme atypique, récidivante, ou échec","Rechercher protéinurie en cas de doute (post-strepto)"],
  traitement_premiere_intention:["Forme peu étendue (< quelques lésions) : antibiotique local (mupirocine, acide fusidique) + antisepsie","Mesures d'hygiène : lavage, ongles courts, linge personnel","Éviction scolaire jusqu'à guérison (ou 48-72 h d'antibiothérapie)"],
  traitement_deuxieme_intention:["Formes étendues, bulleuses, multiples ou avec signes généraux : antibiothérapie per os anti-staphylococcique/streptococcique (amoxicilline-acide clavulanique, ou pristinamycine/céfalexine selon contexte)","Traiter une dermatose sous-jacente (eczéma)"],
  ordonnance_type:
"FORME LOCALISÉE\nANTIBIOTIQUE LOCAL (mupirocine ou acide fusidique) : 2 à 3 applications par jour pendant 5 à 7 jours, après ramollissement des croûtes.\nANTISEPSIE / toilette à l'eau et au savon.\n\nFORME ÉTENDUE ou multiple\nANTIBIOTIQUE PER OS anti-staphylococcique/streptococcique pendant 7 jours (selon RCP et terrain).\n\nMesures d'hygiène, éviction scolaire jusqu'à guérison des lésions (ou 48-72 h de traitement).",
  conseils_patient:
"L'impétigo est une infection de la peau due à des microbes (bactéries). C'est très contagieux, surtout chez les enfants, mais cela guérit bien avec le traitement. Les croûtes couleur \"miel\" sont caractéristiques.\n\n• Lavez les mains souvent, coupez les ongles courts, utilisez du linge de toilette personnel.\n• Appliquez l'antibiotique sur les lésions après avoir ramolli les croûtes à l'eau et au savon.\n• Évitez la crèche/l'école jusqu'à guérison des lésions (ou 48-72 h après le début du traitement).\n\nReconsultez si : les lésions s'étendent, fièvre, fatigue importante, ou urines foncées/peu abondantes dans les semaines qui suivent.",
  quand_adresser:["Formes étendues/sévères résistantes au traitement","Suspicion de complication (SSSS chez le nourrisson → urgence, atteinte rénale)","Récidives multiples (rechercher un portage)"],
  suivi:["Contrôle de la guérison à 1 semaine","Dépister/traiter une dermatose sous-jacente"],
  source:SRC, source_url:SRC_URL,
  tags:["mélicérique","contagieux","enfant","staphylocoque"]
},
{
  id:"erysipele", nom:"Érysipèle (dermohypodermite bactérienne)", categorie:"Infection cutanée",
  localisations:["membres","visage"],
  symptomes:["plaques rouges","fièvre","placard inflammatoire"],
  niveau:1, urgence:"Avis rapide — surveillance rapprochée",
  definition:"Dermohypodermite bactérienne aiguë non nécrosante, le plus souvent streptococcique, touchant surtout la jambe, associant un placard inflammatoire et de la fièvre.",
  elements_cles:["Grand placard inflammatoire bien limité, chaud, douloureux, avec fièvre/frissons","Localisation la plus fréquente : jambe (porte d'entrée à rechercher)","Antibiothérapie anti-streptococcique (amoxicilline) en première intention","Signes de gravité → éliminer une fasciite nécrosante (URGENCE chirurgicale)"],
  terrain:["Facteurs favorisants : insuffisance veineuse/lymphœdème, intertrigo interorteils (porte d'entrée), obésité, plaie","Antécédent d'érysipèle (récidives)"],
  clinique:["Début brutal : fièvre, frissons","Placard érythémateux, chaud, douloureux, bien limité, d'extension centrifuge","Adénopathie, lymphangite possibles","Porte d'entrée : intertrigo, plaie, ulcère"],
  gravite:["RED FLAGS (fasciite nécrosante) : douleur intense disproportionnée, nécrose/lividités, bulles hémorragiques, crépitation, hypoesthésie, sepsis, extension rapide → URGENCE chirurgicale (SAMU)","Sepsis, terrain fragile, immunodépression, mauvaise tolérance → hospitalisation"],
  diagnostics_differentiels:["Fasciite nécrosante (urgence)","Thrombose veineuse profonde","Eczéma aigu / dermite de stase (souvent bilatéral, peu fébrile)","Dermohypodermite sur insuffisance veineuse"],
  examens:["Diagnostic clinique","Biologie (NFS, CRP) selon contexte ; hémocultures si sepsis","Pas d'imagerie en routine ; échographie/IRM si doute sur une forme nécrosante ou un abcès"],
  traitement_premiere_intention:["Antibiothérapie : amoxicilline per os en première intention (forme simple, ambulatoire possible)","Repos, jambe surélevée, antalgiques (PARACÉTAMOL — éviter les AINS)","Traitement de la porte d'entrée (intertrigo), soins locaux","Marquage des limites, réévaluation à 48-72 h"],
  traitement_deuxieme_intention:["Allergie à la pénicilline : pristinamycine ou clindamycine","Hospitalisation si signes de gravité, sepsis, terrain fragile, échec à 48-72 h","Prévention des récidives : prise en charge du lymphœdème, antibioprophylaxie si récidives fréquentes (avis)"],
  ordonnance_type:
"AMOXICILLINE 1 g\n1 g trois fois par jour (50 mg/kg/j chez l'enfant) pendant 7 jours.\n(Allergie : pristinamycine ou clindamycine selon RCP.)\n\nPARACÉTAMOL pour la douleur/fièvre. NE PAS prescrire d'AINS.\nRepos, jambe surélevée. Traiter la porte d'entrée (antifongique si intertrigo).\n\nRÉÉVALUATION OBLIGATOIRE à 48-72 h. Consulter en urgence si douleur intense, coloration violacée/noire, cloques, ou aggravation.",
  conseils_patient:
"L'érysipèle est une infection de la peau, le plus souvent de la jambe, due à une bactérie. Elle se traite bien avec des antibiotiques, mais nécessite une surveillance attentive.\n\n• Prenez bien les antibiotiques jusqu'au bout.\n• Reposez-vous et surélevez la jambe.\n• Soignez la \"porte d'entrée\" (fissure entre les orteils, plaie).\n• Ne prenez pas d'anti-inflammatoires (type ibuprofène).\n\nConsultez en URGENCE si : la douleur devient très intense, la peau prend une teinte violacée ou noire, apparition de cloques, taches insensibles, ou aggravation rapide malgré le traitement. Reconsultez si pas d'amélioration en 2-3 jours.",
  quand_adresser:["Signes de fasciite nécrosante → URGENCE chirurgicale (SAMU 15)","Sepsis, terrain fragile, immunodépression","Échec à 48-72 h","Doute diagnostique (TVP)"],
  suivi:["Réévaluation systématique à 48-72 h","Prévention des récidives (porte d'entrée, lymphœdème)"],
  source:SRC, source_url:SRC_URL,
  tags:["streptocoque","jambe","fasciite","fièvre"]
},
{
  id:"furoncle", nom:"Furoncle / furonculose", categorie:"Infection cutanée",
  localisations:["visage","tronc","membres","plis"],
  symptomes:["pustules","nodule douloureux"],
  niveau:0, urgence:"Non urgente (sauf localisation médiofaciale)",
  definition:"Infection profonde et nécrosante d'un follicule pileux par le staphylocoque doré, formant un nodule inflammatoire douloureux centré par une zone nécrotique (bourbillon).",
  elements_cles:["Nodule inflammatoire douloureux du follicule, évoluant vers l'élimination d'un bourbillon","Localisation médiofaciale = risque de thrombophlébite (ne pas manipuler)","Furonculose = furoncles récidivants → rechercher un portage staphylococcique","Antibiothérapie générale si forme compliquée, médiofaciale ou terrain à risque"],
  terrain:["Portage nasal/cutané de staphylocoque doré","Facteurs : diabète, immunodépression, frottements, mauvaise hygiène, carence martiale"],
  clinique:["Nodule rouge, chaud, douloureux centré par une pustule","Évolution vers la nécrose centrale (bourbillon) puis élimination","Furonculose : furoncles à répétition","Anthrax : agglomérat de plusieurs furoncles"],
  gravite:["Furoncle médiofacial manipulé → risque de staphylococcie maligne de la face / thrombophlébite du sinus caverneux (URGENCE)","Fièvre, AEG, extension","Terrain immunodéprimé/diabétique"],
  diagnostics_differentiels:["Folliculite (plus superficielle)","Kyste épidermique surinfecté","Hidradénite suppurée (plis, récidives, fistules)","Abcès"],
  examens:["Diagnostic clinique","Prélèvement bactériologique + recherche de portage en cas de furonculose","Glycémie / bilan si récidives ou terrain"],
  traitement_premiere_intention:["Furoncle simple : soins locaux, antisepsie, protection ; NE PAS manipuler/presser","Antalgiques","Hygiène rigoureuse (lavage des mains, linge personnel)"],
  traitement_deuxieme_intention:["Antibiothérapie générale anti-staphylococcique si : localisation médiofaciale, forme compliquée, terrain à risque, anthrax","Furonculose : décontamination des gîtes (mupirocine nasale), mesures d'hygiène, traitement de l'entourage si besoin","Incision/drainage d'un abcès collecté (geste)"],
  ordonnance_type:
"FURONCLE SIMPLE\nAntisepsie locale, protection par pansement. NE PAS PRESSER ni manipuler (surtout sur le visage).\nAntalgiques (paracétamol).\n\nFORME COMPLIQUÉE / MÉDIOFACIALE / TERRAIN À RISQUE\nANTIBIOTHÉRAPIE anti-staphylococcique per os (ex. pristinamycine, ou selon RCP) pendant 5 à 7 jours.\n\nFURONCULOSE : décontamination des gîtes (mupirocine nasale), hygiène, traitement des facteurs favorisants.",
  conseils_patient:
"Le furoncle est une infection d'un poil par un microbe (staphylocoque). Il forme un bouton rouge, dur et douloureux, qui finit par évacuer du pus.\n\n• Ne pressez pas et ne percez pas le furoncle, surtout sur le visage : cela peut aggraver l'infection.\n• Lavez-vous souvent les mains, utilisez un linge de toilette personnel.\n• Protégez la lésion par un pansement.\n\nConsultez rapidement si : furoncle sur le visage (autour du nez/lèvre) avec fièvre, plusieurs furoncles, fièvre, ou si vous êtes diabétique/immunodéprimé.",
  quand_adresser:["Furoncle médiofacial compliqué → urgence","Furonculose résistante (avis, bilan)","Abcès nécessitant un drainage chirurgical"],
  suivi:["Contrôle de la guérison","Recherche et traitement d'un portage en cas de récidive"],
  source:SRC, source_url:SRC_URL,
  tags:["staphylocoque","bourbillon","furonculose","follicule"]
},
{
  id:"folliculite", nom:"Folliculite", categorie:"Infection cutanée",
  localisations:["tronc","membres","cuir chevelu","plis"],
  symptomes:["pustules","prurit"],
  niveau:0, urgence:"Non urgente",
  definition:"Inflammation superficielle du follicule pileux, le plus souvent infectieuse (staphylocoque), se traduisant par des pustules centrées par un poil.",
  elements_cles:["Pustules folliculaires centrées par un poil","Souvent superficielle et bénigne","Facteurs : rasage, occlusion, transpiration, macération","Penser à la folliculite à Pseudomonas (bains chauds/spa)"],
  terrain:["Rasage, épilation, frottements, occlusion (vêtements serrés)","Transpiration, macération","Bains chauds/jacuzzi (Pseudomonas)"],
  clinique:["Petites pustules superficielles centrées par un poil, sur fond érythémateux","Prurit ou sensibilité modérée","Localisations : zones pileuses, barbe, cuisses, fesses, tronc"],
  gravite:["Évolution vers un furoncle/abcès","Folliculite étendue chez l'immunodéprimé"],
  diagnostics_differentiels:["Acné","Furoncle (plus profond)","Pseudo-folliculite de la barbe (poils incarnés)","Folliculite à Malassezia (dos, tronc)"],
  examens:["Diagnostic clinique","Prélèvement si récidive/résistance ou contexte particulier"],
  traitement_premiere_intention:["Antisepsie locale, hygiène","Éviter le facteur déclenchant (rasage à sec, occlusion)","Antibiotique local si nécessaire"],
  traitement_deuxieme_intention:["Antibiothérapie générale si formes étendues/résistantes","Adapter selon le germe (folliculite à Malassezia : antifongique)"],
  ordonnance_type:
"ANTISEPSIE LOCALE quotidienne.\nÉviter le rasage de la zone, les vêtements occlusifs et la macération.\n\nSi besoin : ANTIBIOTIQUE LOCAL (acide fusidique) 2 fois par jour pendant 5 à 7 jours.\nFormes étendues/résistantes : avis et traitement adapté au germe.",
  conseils_patient:
"La folliculite est une inflammation superficielle des poils, en général bénigne. Elle apparaît souvent après le rasage, la transpiration ou le port de vêtements serrés.\n\n• Évitez de raser la zone touchée le temps de la guérison.\n• Lavez la peau avec un antiseptique doux et portez des vêtements amples.\n• Évitez les bains chauds partagés (jacuzzi) si vous y êtes sensible.\n\nReconsultez si : les boutons deviennent profonds et douloureux (furoncle), s'étendent, ou reviennent souvent.",
  quand_adresser:["Formes étendues/résistantes","Récidives (recherche de cause)","Doute diagnostique"],
  suivi:["Contrôle de la guérison","Correction des facteurs favorisants"],
  source:SRC, source_url:SRC_URL,
  tags:["follicule","rasage","staphylocoque","pustules"]
},
{
  id:"herpes_cutaneomuqueux", nom:"Herpès cutanéo-muqueux", categorie:"Infection cutanée",
  localisations:["bouche/lèvres","visage","organes génitaux"],
  symptomes:["vésicules","vésicules douloureuses","croûtes"],
  niveau:0, urgence:"Non urgente (urgence si formes graves)",
  definition:"Infection virale récurrente à HSV (HSV-1 surtout oro-facial, HSV-2 surtout génital), caractérisée par des vésicules groupées récidivant au même endroit.",
  elements_cles:["Vésicules groupées \"en bouquet\" sur fond érythémateux, récidivant au même site","Prodromes : picotements, brûlure avant l'éruption","Antiviraux (aciclovir/valaciclovir) efficaces surtout si débutés tôt","Formes graves : herpès néonatal, eczéma herpeticum, kérato-conjonctivite, immunodéprimé"],
  terrain:["Primo-infection souvent dans l'enfance (gingivostomatite)","Récurrences déclenchées par : soleil, fièvre, stress, règles, fatigue","Risque accru chez l'immunodéprimé, la femme enceinte (herpès néonatal)"],
  clinique:["Prodromes (picotement, brûlure), puis vésicules groupées → érosions → croûtes","Herpès labial (\"bouton de fièvre\")","Gingivostomatite (primo-infection de l'enfant) : fièvre, érosions buccales douloureuses","Évolution spontanée en 7-10 jours"],
  gravite:["Eczéma herpeticum (sur dermatite atopique) : URGENCE","Herpès oculaire (kératite) → ophtalmologue en urgence","Herpès néonatal, immunodéprimé, méningo-encéphalite herpétique → URGENCE","Érythème polymorphe récidivant post-herpétique"],
  diagnostics_differentiels:["Impétigo (croûtes mélicériques)","Zona (métamérique, unilatéral, douleur)","Aphtose","Syphilis (chancre génital indolore)"],
  examens:["Diagnostic clinique le plus souvent","PCR HSV sur prélèvement si doute, forme grave, ou contexte (grossesse, immunodépression)"],
  traitement_premiere_intention:["Récurrence labiale simple : traitement local (peu efficace) ; antiviral oral si débuté aux prodromes","Antiviral oral (valaciclovir/aciclovir) : primo-infection, formes gênantes, récurrences fréquentes","Antalgiques, soins locaux"],
  traitement_deuxieme_intention:["Récurrences fréquentes (≥ 6/an) : traitement antiviral suppressif au long cours","Formes graves / immunodéprimé : antiviral IV, avis spécialisé"],
  ordonnance_type:
"PRIMO-INFECTION / RÉCURRENCE GÊNANTE\nVALACICLOVIR : 500 mg deux fois par jour pendant 5 jours (à débuter le plus tôt possible, dès les prodromes).\n(Adapter à la fonction rénale.)\n\nANTALGIQUES (paracétamol), soins locaux antiseptiques.\n\nRÉCURRENCES FRÉQUENTES (≥6/an) : traitement suppressif (valaciclovir 500 mg/j) à discuter.",
  conseils_patient:
"L'herpès est une infection virale très fréquente, qui se réveille de temps en temps au même endroit (lèvre, parties génitales). C'est bénin chez la plupart des gens, mais contagieux pendant les poussées.\n\n• Commencez le traitement dès les premiers picotements pour qu'il soit plus efficace.\n• Évitez de toucher les lésions, lavez-vous les mains, ne touchez pas vos yeux.\n• Pendant une poussée d'herpès génital : pas de rapports sexuels ; en cas d'herpès labial, évitez les baisers et le contact avec les bébés.\n\nConsultez rapidement si : herpès près de l'œil, poussée très étendue, fièvre importante, terrain fragile (eczéma, immunodépression, grossesse, nouveau-né).",
  quand_adresser:["Herpès oculaire → ophtalmologue urgent","Eczéma herpeticum, immunodéprimé, nouveau-né → urgence","Herpès génital chez la femme enceinte proche du terme","Récurrences invalidantes"],
  suivi:["Discuter un traitement suppressif si récurrences fréquentes","Éducation sur la contagiosité"],
  source:SRC, source_url:SRC_URL,
  tags:["HSV","bouton de fièvre","vésicules","valaciclovir"]
},
{
  id:"zona", nom:"Zona", categorie:"Infection cutanée",
  localisations:["tronc","visage","membres","paupières"],
  symptomes:["vésicules","vésicules douloureuses","douleur","éruption unilatérale"],
  niveau:1, urgence:"Avis rapide — antiviral < 72 h ; zona ophtalmique = urgence",
  definition:"Réactivation du virus varicelle-zona (VZV) dans un ganglion sensitif, responsable d'une éruption vésiculeuse douloureuse de topographie métamérique unilatérale.",
  elements_cles:["Éruption vésiculeuse unilatérale, métamérique (ne franchit pas la ligne médiane)","Douleur souvent précession de l'éruption","Antiviral à débuter dans les 72 premières heures quand il est indiqué","Zona ophtalmique = attention particulière (avis ophtalmologique)"],
  terrain:["Sujet âgé (> 50 ans) ++, immunodépression","Antécédent de varicelle"],
  clinique:["Douleur/brûlure dans un territoire, puis placards érythémateux et vésicules groupées unilatérales métamériques","Localisations fréquentes : thoracique, ophtalmique (V1)","Évolution : vésicules → croûtes en 1-2 semaines","Douleurs post-zostériennes (surtout sujet âgé)"],
  gravite:["RED FLAGS — ZONA OPHTALMIQUE : atteinte de l'aile du nez (signe de Hutchinson), œdème palpébral, baisse d'acuité visuelle, hyperhémie conjonctivale → AVIS OPHTALMOLOGIQUE URGENT","Zona généralisé ou hémorragique, immunodépression sévère → urgence","Atteinte du nerf facial (zona auriculaire, paralysie faciale)"],
  diagnostics_differentiels:["Herpès (peut être métamérique aussi ; PCR si doute)","Dermite de contact","Érysipèle (placard, fièvre, pas de vésicules groupées métamériques)","Douleur d'autre origine avant l'éruption (coronarienne, abdominale…)"],
  examens:["Diagnostic clinique","PCR VZV si doute ou forme atypique","Pas de sérologie en routine"],
  traitement_premiere_intention:["Antiviral oral (valaciclovir) si indication : âge > 50 ans, zona ophtalmique, douleurs intenses, immunodépression, forme étendue — idéalement < 72 h","Antalgiques adaptés (paracétamol, ± antalgiques des douleurs neuropathiques)","Soins locaux antiseptiques, éviter les topiques gras/antibiotiques sur les vésicules"],
  traitement_deuxieme_intention:["Douleurs post-zostériennes : antalgiques neuropathiques (gabapentine, amitriptyline), avis si rebelles","Formes graves/immunodéprimé : aciclovir IV, hospitalisation","Zona ophtalmique : prise en charge conjointe ophtalmologique"],
  ordonnance_type:
"VALACICLOVIR 1 g\n1 comprimé (1 g) trois fois par jour pendant 7 jours.\nÀ débuter idéalement dans les 72 premières heures de l'éruption si indication (>50 ans, zona ophtalmique, douleurs intenses, immunodépression).\nAdapter à la fonction rénale.\n\nANTALGIQUES adaptés à l'intensité (paracétamol ± traitement des douleurs neuropathiques).\nSoins locaux : antisepsie douce. Éviter AINS et topiques antibiotiques sur les lésions.\n\nZONA OPHTALMIQUE : avis ophtalmologique en urgence.",
  conseils_patient:
"Le zona est dû au réveil du virus de la varicelle, qui était endormi dans un nerf. Il provoque une éruption douloureuse en bande, d'un seul côté du corps. Ce n'est pas dangereux dans la plupart des cas, mais peut laisser des douleurs.\n\n• Prenez le traitement antiviral le plus tôt possible si on vous l'a prescrit.\n• Gérez bien la douleur avec les antalgiques prescrits.\n• Vous pouvez transmettre la varicelle (pas le zona) à une personne non immunisée par contact avec les vésicules : évitez le contact avec les femmes enceintes non immunisées, les nouveau-nés et les personnes fragiles tant que les lésions ne sont pas croûteuses.\n\nConsultez en URGENCE si : zona près de l'œil ou sur le nez, baisse de la vue, œil rouge, ou éruption qui s'étend partout.",
  quand_adresser:["Zona ophtalmique / signes oculaires → ophtalmologue urgent","Zona généralisé, hémorragique, immunodéprimé → urgence","Douleurs post-zostériennes rebelles","Paralysie faciale associée"],
  suivi:["Évaluer la douleur à distance (douleurs post-zostériennes)","Surveillance ophtalmologique si zona V1"],
  source:SRC, source_url:SRC_URL,
  tags:["VZV","métamère","valaciclovir","ophtalmique","72h"]
},
{
  id:"varicelle", nom:"Varicelle", categorie:"Infection cutanée",
  localisations:["tronc","visage","cuir chevelu","diffus","enfant"],
  symptomes:["vésicules","prurit","éruption fébrile","croûtes"],
  niveau:1, urgence:"Avis rapide selon terrain (urgence si complications)",
  definition:"Primo-infection par le virus varicelle-zona (VZV), très contagieuse, bénigne chez l'enfant immunocompétent, caractérisée par une éruption vésiculeuse prurigineuse d'âges différents.",
  elements_cles:["Vésicules d'âges différents (macules, vésicules \"en goutte de rosée\", croûtes coexistent)","Très contagieuse (aérienne et par contact)","Bénigne chez l'enfant sain ; grave chez l'adulte, l'immunodéprimé, la femme enceinte, le nouveau-né","Traitement symptomatique ; antiviral réservé aux formes/terrains à risque"],
  terrain:["Enfant +++ ; formes plus graves chez l'adulte, l'immunodéprimé, la femme enceinte, le nouveau-né"],
  clinique:["Fièvre modérée, malaise, puis éruption","Vésicules prurigineuses sur fond érythémateux, d'âges différents, débutant souvent au tronc/cuir chevelu/visage","Énanthème (vésicules muqueuses)","Évolution en croûtes ; contagiosité jusqu'à la phase croûteuse"],
  gravite:["Surinfection cutanée (staphylocoque/streptocoque), parfois sévère","Pneumopathie varicelleuse (adulte), atteinte neurologique (cérébellite, encéphalite)","Femme enceinte (pneumopathie, varicelle congénitale/néonatale), immunodéprimé → URGENCE","Purpura, AEG, détresse respiratoire → urgence"],
  diagnostics_differentiels:["Impétigo","Prurigo / piqûres d'insectes","Eczéma herpeticum","Autres éruptions vésiculeuses"],
  examens:["Diagnostic clinique","Sérologie/PCR seulement dans des contextes particuliers (grossesse, immunodépression)"],
  traitement_premiere_intention:["Symptomatique : antiseptiques locaux, antihistaminique pour le prurit, paracétamol pour la fièvre","Ongles courts pour éviter les surinfections","NE PAS utiliser d'AINS (risque de surinfection grave) ni d'aspirine (syndrome de Reye)","Éviction des collectivités jusqu'à la phase croûteuse"],
  traitement_deuxieme_intention:["Antiviral (aciclovir/valaciclovir) : adulte, immunodéprimé, formes graves, nouveau-né, femme enceinte selon avis","Antibiothérapie si surinfection bactérienne","Prophylaxie post-exposition chez les sujets à risque (avis spécialisé)"],
  ordonnance_type:
"TRAITEMENT SYMPTOMATIQUE (enfant immunocompétent)\nPARACÉTAMOL pour la fièvre (PAS d'AINS, PAS d'aspirine).\nANTISEPTIE locale (chlorhexidine aqueuse) ; ongles courts.\nANTIHISTAMINIQUE per os si prurit important.\n\nÉviction de la collectivité jusqu'à la phase croûteuse.\n\nFORMES À RISQUE (adulte, immunodéprimé, femme enceinte, nouveau-né) : avis spécialisé / antiviral.",
  conseils_patient:
"La varicelle est une maladie virale très contagieuse, le plus souvent bénigne chez l'enfant. Elle donne des boutons qui se transforment en cloques puis en croûtes, et qui démangent.\n\n• Coupez les ongles courts pour éviter de gratter et de surinfecter les boutons.\n• Donnez du paracétamol en cas de fièvre. NE DONNEZ PAS d'ibuprofène ni d'aspirine.\n• Appliquez un antiseptique sur la peau ; évitez talc et crèmes grasses.\n• Votre enfant est contagieux jusqu'à ce que tous les boutons soient en croûtes : évitez le contact avec les femmes enceintes, nouveau-nés et personnes fragiles.\n\nConsultez en urgence si : fièvre élevée persistante, boutons rouges/chauds et très douloureux (surinfection), gêne respiratoire, somnolence anormale, vomissements, ou troubles de l'équilibre.",
  quand_adresser:["Adulte, immunodéprimé, femme enceinte, nouveau-né","Complications (surinfection sévère, pneumopathie, neurologique) → urgence","Doute diagnostique"],
  suivi:["Surveillance des surinfections","Information sur la contagiosité et l'éviction"],
  source:SRC, source_url:SRC_URL,
  tags:["VZV","enfant","contagieux","pas d'AINS"]
},
{
  id:"gale", nom:"Gale", categorie:"Infection cutanée",
  localisations:["mains","organes génitaux","tronc","plis","enfant"],
  symptomes:["prurit","prurit nocturne","sillons","lésions de grattage"],
  niveau:0, urgence:"Non urgente",
  definition:"Ectoparasitose contagieuse due à l'acarien Sarcoptes scabiei, responsable d'un prurit diffus à recrudescence nocturne, souvent familial.",
  elements_cles:["Prurit diffus à recrudescence nocturne, souvent familial/collectif","Localisations évocatrices : espaces interdigitaux, poignets, ombilic, organes génitaux, aréoles","Traitement simultané du patient, de l'entourage et de l'environnement (linge)","Le prurit peut persister 2-4 semaines après un traitement efficace"],
  terrain:["Contage (famille, collectivité, EHPAD, contacts cutanés)","Toutes conditions ; formes profuses/hyperkératosiques chez l'immunodéprimé/sujet âgé (gale croûteuse très contagieuse)"],
  clinique:["Prurit diffus, recrudescence nocturne, respecte le visage (sauf nourrisson)","Lésions spécifiques : sillons scabieux (interdigitaux, poignets), vésicules perlées, nodules scabieux (organes génitaux)","Lésions de grattage non spécifiques","Caractère familial/collectif"],
  gravite:["Gale hyperkératosique (croûteuse) : très contagieuse, épidémies en collectivité","Surinfection (impétiginisation)","Eczématisation"],
  diagnostics_differentiels:["Eczéma / dermatite atopique","Prurit d'autre cause (cholestase, médicamenteux)","Pédiculose","Prurigo"],
  examens:["Diagnostic clinique (contexte + topographie)","Examen dermatoscopique / parasitologique (recherche du sillon, de l'acarien) si possible"],
  traitement_premiere_intention:["Traitement de TOUT l'entourage et des contacts en même temps","Traitement local (perméthrine) OU oral (ivermectine), selon le contexte ; souvent 2 prises à 7-14 jours d'intervalle","Décontamination du linge et de la literie (lavage 60°C ou isolement 72 h ± acaricide textile)"],
  traitement_deuxieme_intention:["Gale croûteuse / collectivité : association ivermectine orale + traitement local répété, mesures renforcées, avis spécialisé","Traiter une surinfection ou une eczématisation associée"],
  ordonnance_type:
"IVERMECTINE 200 µg/kg en prise unique (à jeun), à RENOUVELER à J7-J14.\n(et/ou) PERMÉTHRINE 5 % crème : application sur tout le corps (cou aux pieds), à laisser poser selon RCP, à renouveler à J7-J14.\n\nTRAITER SIMULTANÉMENT tous les membres du foyer et les contacts proches, même asymptomatiques.\n\nLINGE/LITERIE : lavage à 60 °C, ou mise en sac fermé 72 h (± acaricide textile).\nLe prurit peut persister 2 à 4 semaines après un traitement efficace (ne pas re-traiter à tort).",
  conseils_patient:
"La gale est due à un tout petit parasite de la peau. Ce n'est pas une question d'hygiène : tout le monde peut l'attraper par contact rapproché. Elle gratte beaucoup, surtout la nuit. Elle se soigne bien mais il faut traiter toute la famille et le linge en même temps.\n\n• Traitez TOUTES les personnes du foyer le même jour, même celles qui ne grattent pas.\n• Lavez draps, serviettes et vêtements à 60 °C ; ce qui ne peut pas être lavé : sac fermé 72 h.\n• Les démangeaisons peuvent durer 2 à 4 semaines après le traitement : c'est normal, ne recommencez pas le traitement sans avis.\n\nReconsultez si : les démangeaisons persistent au-delà de 4 semaines, ou si les lésions deviennent jaunes/croûteuses (surinfection).",
  quand_adresser:["Gale croûteuse / épidémie en collectivité","Échec après traitement bien conduit","Doute diagnostique"],
  suivi:["Contrôle à 2-4 semaines","Vérifier le traitement de l'entourage et du linge"],
  source:SRC, source_url:SRC_URL,
  tags:["sarcopte","prurit nocturne","ivermectine","contage"]
},
{
  id:"teigne", nom:"Teigne du cuir chevelu", categorie:"Infection cutanée",
  localisations:["cuir chevelu","enfant"],
  symptomes:["plaques squameuses","alopécie","cheveux cassés"],
  niveau:1, urgence:"Avis rapide — traitement systémique nécessaire",
  definition:"Dermatophytie du cuir chevelu (teigne tondante surtout), fréquente chez l'enfant, responsable de plaques alopéciques squameuses avec cheveux cassés.",
  elements_cles:["Plaques alopéciques squameuses avec cheveux cassés courts","Nécessite un traitement local ET général (antifongique systémique)","Contagieuse : rechercher chez les proches et en collectivité","Prise en charge hospitalière pour les enfants de moins de 10 kg"],
  terrain:["Enfant +++ (contage scolaire/familial, contact animal)","Adulte plus rare"],
  clinique:["Teigne tondante : grandes plaques (microsporique) ou petites plaques multiples (trichophytique), squameuses, alopéciques, cheveux cassés courts","Kérion : placard inflammatoire suppuré (teigne inflammatoire)","Favus (rare)"],
  gravite:["Kérion (forme inflammatoire) pouvant laisser une alopécie cicatricielle","Diffusion en collectivité"],
  diagnostics_differentiels:["Pelade (plaque alopécique sans squames ni cheveux cassés en surface)","Dermatite séborrhéique / psoriasis du cuir chevelu","Alopécie de traction","Trichotillomanie"],
  examens:["Prélèvement mycologique (examen direct + culture) AVANT traitement si possible","Examen en lumière de Wood (certaines espèces fluorescentes)","Recherche d'un contage (proches, animal)"],
  traitement_premiere_intention:["Antifongique systémique (griséofulvine ou terbinafine selon l'espèce et l'AMM) — traitement prolongé (plusieurs semaines)","Antifongique local associé (shampooing/crème) pour limiter la contagiosité","Mesures d'hygiène, traitement des sujets contacts atteints"],
  traitement_deuxieme_intention:["Adapter l'antifongique systémique selon l'espèce identifiée en culture","Kérion : poursuite de l'antifongique, soins locaux ± avis","Traiter un animal contaminant (vétérinaire)"],
  ordonnance_type:
"ANTIFONGIQUE SYSTÉMIQUE (griséofulvine ou terbinafine selon espèce et AMM) pendant plusieurs semaines (durée à adapter).\nANTIFONGIQUE LOCAL (shampooing/crème antifongique) en complément, pour réduire la contagiosité.\n\nPrélèvement mycologique recommandé avant traitement.\nÉviction scolaire selon recommandations locales ; examiner et traiter les proches atteints.\n\nPRUDENCE chez le nourrisson, en cas de grossesse ou d'allaitement. ENFANT < 10 kg : prise en charge hospitalière.",
  conseils_patient:
"La teigne est une infection du cuir chevelu par un champignon. Elle est fréquente chez l'enfant et contagieuse. Elle provoque des plaques où les cheveux tombent ou se cassent. Elle se soigne bien mais nécessite un traitement par la bouche pendant plusieurs semaines.\n\n• Donnez bien le traitement jusqu'au bout, même si ça va mieux.\n• Vérifiez les autres enfants/personnes du foyer et signalez à l'école.\n• Ne partagez pas peignes, bonnets, brosses. Si un animal est en cause, faites-le examiner par un vétérinaire.\n\nReconsultez si : apparition d'une plaque rouge, gonflée et suintante (kérion), ou si les plaques persistent après le traitement.",
  quand_adresser:["Enfant < 10 kg → prise en charge hospitalière","Kérion / forme inflammatoire","Doute diagnostique, échec du traitement","Grossesse/allaitement (adaptation thérapeutique)"],
  suivi:["Contrôle clinique et mycologique en fin de traitement","Repousse des cheveux (plusieurs semaines)"],
  source:SRC, source_url:SRC_URL,
  tags:["dermatophyte","enfant","alopécie","antifongique systémique"]
},
{
  id:"dermatophytie", nom:"Dermatophytie / mycose cutanée", categorie:"Infection cutanée",
  localisations:["tronc","membres","plis","pieds","mains"],
  symptomes:["plaques rouges","squames","prurit","plaques squameuses"],
  niveau:0, urgence:"Non urgente",
  definition:"Infection de la peau glabre par des champignons dermatophytes, donnant des lésions annulaires érythémato-squameuses à bordure active (herpès circiné, intertrigo, atteinte des pieds).",
  elements_cles:["Lésion annulaire à bordure active squameuse et centre plus clair (\"herpès circiné\")","Évolution centrifuge, prurit","Diagnostic confirmé par prélèvement mycologique si doute","Ne pas appliquer de dermocorticoïde seul (aggrave : \"tinea incognito\")"],
  terrain:["Contact animal, chaleur/humidité, sport, macération","Pieds : marche pieds nus en lieux humides (piscine)"],
  clinique:["Peau glabre : plaque annulaire à bordure érythémato-squameuse active, extension centrifuge","Pied (tinea pedis) : intertrigo interorteils macéré, fissuraire ; atteinte plantaire squameuse","Plis (tinea cruris) : placard inguinal à bordure active"],
  gravite:["Surinfection bactérienne","Porte d'entrée d'érysipèle (intertrigo des pieds)","Formes étendues chez l'immunodéprimé"],
  diagnostics_differentiels:["Eczéma","Psoriasis","Pityriasis rosé","Erythrasma (plis, fluorescence rouge corail)","Candidose des plis"],
  examens:["Prélèvement mycologique si doute, échec, ou avant traitement systémique","Lampe de Wood selon contexte"],
  traitement_premiere_intention:["Antifongique local (dérivés azolés, terbinafine) pendant 2 à 4 semaines","Mesures : séchage des plis/pieds, chaussettes en coton, éviter la macération"],
  traitement_deuxieme_intention:["Antifongique systémique (terbinafine) si forme étendue, palmo-plantaire, unguéale associée, ou échec du local","Traiter une source animale"],
  ordonnance_type:
"ANTIFONGIQUE LOCAL (terbinafine ou dérivé azolé) crème\n1 à 2 applications par jour, en débordant légèrement la lésion, pendant 2 à 4 semaines (poursuivre quelques jours après guérison).\n\nMESURES : bien sécher les plis et les espaces entre les orteils, chaussettes en coton, éviter la macération.\n\nFormes étendues/plantaires/résistantes : ANTIFONGIQUE SYSTÉMIQUE (terbinafine) après prélèvement.\nNE PAS appliquer de cortisone seule sur la lésion.",
  conseils_patient:
"La mycose de la peau est une infection due à un champignon. Elle forme une plaque ronde qui s'étend en cercle, avec une bordure plus rouge. C'est bénin mais contagieux et cela peut revenir.\n\n• Appliquez la crème antifongique en débordant un peu autour de la plaque, pendant toute la durée prescrite, même si ça va mieux.\n• Séchez bien la peau, surtout entre les orteils et dans les plis. Portez des chaussettes en coton.\n• Ne partagez pas serviettes et chaussures. Traitez un animal éventuellement en cause.\n\nReconsultez si : la lésion s'étend malgré le traitement, devient suintante, ou si les ongles sont touchés.",
  quand_adresser:["Formes étendues/résistantes nécessitant un traitement oral","Atteinte unguéale associée","Doute diagnostique (prélèvement)"],
  suivi:["Contrôle de la guérison","Correction des facteurs de macération"],
  source:SRC, source_url:SRC_URL,
  tags:["herpès circiné","champignon","intertrigo","terbinafine"]
},
{
  id:"candidose", nom:"Candidose cutanée", categorie:"Infection cutanée",
  localisations:["plis","organes génitaux","bouche/lèvres","ongles"],
  symptomes:["plaques rouges","prurit","fissures"],
  niveau:0, urgence:"Non urgente",
  definition:"Infection cutanéo-muqueuse par des levures du genre Candida (surtout C. albicans), favorisée par la macération, le diabète et l'immunodépression.",
  elements_cles:["Intertrigo des grands plis : placard rouge vernissé, fond du pli fissuraire, pustules satellites","Favorisée par macération, diabète, antibiotiques, immunodépression","Atteintes : plis, muqueuses (buccale, génitale), ongles (péri-onyxis)","Traitement antifongique local + correction des facteurs favorisants"],
  terrain:["Macération, obésité, diabète, antibiothérapie, corticoïdes, immunodépression","Nourrisson (érythème fessier candidosique), sujet âgé"],
  clinique:["Intertrigo : placard érythémateux vernissé du fond du pli, fissure centrale, bordure desquamative, pustules satellites","Muqueuse buccale (muguet) : enduit blanchâtre détachable, érythème","Vulvo-vaginite / balanite : érythème, prurit, leucorrhées blanches","Péri-onyxis (pourtour de l'ongle)"],
  gravite:["Candidose récidivante/profuse → rechercher diabète, immunodépression (VIH)","Candidose œsophagienne, systémique (immunodéprimé) → avis"],
  diagnostics_differentiels:["Dermatophytie des plis (bordure active, fond du pli respecté)","Psoriasis inversé","Erythrasma","Eczéma des plis"],
  examens:["Diagnostic clinique","Prélèvement mycologique si doute/résistance","Glycémie, recherche de facteurs favorisants si récidive"],
  traitement_premiere_intention:["Antifongique local (azolés, ciclopirox) sur les plis ; ovule/crème pour la candidose génitale","Assèchement des plis, correction de la macération","Muguet : antifongique buccal (amphotéricine B, miconazole gel buccal)"],
  traitement_deuxieme_intention:["Antifongique systémique (fluconazole) si formes étendues, récidivantes, muqueuses résistantes","Correction des facteurs favorisants (équilibre du diabète, arrêt si possible des facteurs)"],
  ordonnance_type:
"INTERTRIGO DES PLIS\nANTIFONGIQUE LOCAL (dérivé azolé, ou ciclopirox) : 1 à 2 applications par jour pendant 2 à 4 semaines.\nAssécher les plis (tamponner), éviter la macération.\n\nCANDIDOSE GÉNITALE : ovule/crème antifongique selon protocole ; traiter le/la partenaire si symptomatique.\nMUGUET : antifongique buccal (miconazole gel ou amphotéricine B).\n\nRécidives/formes profuses : rechercher un diabète/une immunodépression ± FLUCONAZOLE per os.",
  conseils_patient:
"La candidose est une infection due à une levure naturellement présente sur la peau, qui prolifère dans les zones chaudes et humides (plis, parties génitales, bouche). C'est bénin et fréquent.\n\n• Gardez les zones touchées au sec : séchez bien les plis, portez des vêtements amples en coton.\n• Appliquez le traitement antifongique pendant toute la durée prescrite.\n• Limitez le sucre si vous êtes diabétique : un bon équilibre aide à guérir.\n\nReconsultez si : la mycose revient souvent, s'étend, ou résiste au traitement (un bilan peut être utile).",
  quand_adresser:["Formes récidivantes/profuses (bilan diabète, immunodépression)","Candidose buccale/œsophagienne chez l'immunodéprimé","Résistance au traitement"],
  suivi:["Contrôle de la guérison","Correction durable des facteurs favorisants"],
  source:SRC, source_url:SRC_URL,
  tags:["candida","plis","macération","diabète"]
},
{
  id:"verrues", nom:"Verrues", categorie:"Infection cutanée",
  localisations:["mains","pieds","membres"],
  symptomes:["lésion rugueuse","hyperkératose"],
  niveau:0, urgence:"Non urgente",
  definition:"Tumeurs cutanées bénignes induites par le papillomavirus humain (HPV), fréquentes, contagieuses, d'évolution souvent spontanément résolutive.",
  elements_cles:["Tumeurs bénignes dues au HPV","La moitié disparaissent spontanément en moins d'un an","En l'absence de douleur ou de complication, l'abstention thérapeutique peut être envisagée","Traitement simple par kératolytiques (acide salicylique) ; prudence avec les traitements destructeurs"],
  terrain:["Enfant et adulte jeune","Contage (piscines, marche pieds nus), micro-traumatismes, immunodépression (formes profuses)"],
  clinique:["Verrue vulgaire : papule kératosique rugueuse (mains, doigts)","Verrue plantaire : lésion enchâssée, douloureuse à la pression, points noirs (capillaires thrombosés)","Verrues planes : petites papules plates (visage, dos des mains)"],
  gravite:["Formes profuses/résistantes chez l'immunodéprimé","Aucune gravité dans les formes communes"],
  diagnostics_differentiels:["Cor / durillon (plantaire ; pas de points noirs, conserve les dermatoglyphes)","Molluscum contagiosum","Kératose actinique / carcinome (sujet âgé, lésion fixe rugueuse → vigilance)"],
  examens:["Diagnostic clinique","Aucun examen en routine"],
  traitement_premiere_intention:["Abstention possible (résolution spontanée fréquente), surtout chez l'enfant","Kératolytique à base d'acide salicylique en application locale ciblée, après protection de la peau péri-lésionnelle","Décaper régulièrement (lime/pierre ponce dédiée)"],
  traitement_deuxieme_intention:["Cryothérapie (azote liquide) sur lésions résistantes (prudence, douleur)","Avis dermatologique : formes profuses, résistantes, immunodéprimé"],
  ordonnance_type:
"TRAITEMENT KÉRATOLYTIQUE À BASE D'ACIDE SALICYLIQUE\nAppliquer UNIQUEMENT sur la verrue, après protection de la peau autour (vernis, vaseline ou pansement découpé).\n1 application par jour selon le produit prescrit.\nPoursuivre plusieurs semaines si bonne tolérance ; décaper régulièrement la kératose.\nARRÊTER en cas de douleur importante, irritation sévère ou plaie.\n\nL'abstention est une option raisonnable (la moitié des verrues disparaissent seules en moins d'un an).",
  conseils_patient:
"Les verrues sont des petites excroissances bénignes de la peau dues à un virus (HPV). Elles ne sont pas dangereuses et disparaissent souvent toutes seules, parfois en plusieurs mois. On peut donc choisir de ne pas les traiter si elles ne gênent pas.\n\n• Si vous traitez : appliquez le produit uniquement sur la verrue, protégez la peau autour pour ne pas l'abîmer, et limez doucement la corne entre les applications.\n• Arrêtez si la zone devient douloureuse, très irritée ou se transforme en plaie.\n• Pour éviter de les transmettre : ne grattez pas, couvrez la verrue à la piscine, ne partagez pas serviettes/chaussures.\n\nReconsultez si : la verrue saigne facilement, change d'aspect rapidement, est très douloureuse, ou chez une personne âgée (vérifier qu'il ne s'agit pas d'autre chose).",
  quand_adresser:["Formes profuses/résistantes, immunodéprimé","Doute diagnostique (lésion suspecte chez le sujet âgé)","Demande de cryothérapie/destruction"],
  suivi:["Réévaluation à quelques semaines","Rappeler la fréquence de la guérison spontanée"],
  source:SRC, source_url:SRC_URL,
  tags:["HPV","acide salicylique","plantaire","abstention"]
},
{
  id:"molluscum", nom:"Molluscum contagiosum", categorie:"Infection cutanée",
  localisations:["tronc","membres","visage","plis","enfant"],
  symptomes:["papules ombiliquées"],
  niveau:0, urgence:"Non urgente",
  definition:"Infection virale cutanée bénigne (poxvirus), fréquente chez l'enfant, caractérisée par des papules perlées ombiliquées, contagieuse et spontanément résolutive.",
  elements_cles:["Papules perlées, rosées, ombiliquées en leur centre","Fréquent chez l'enfant (terrain atopique), contagieux","Évolution spontanément résolutive en plusieurs mois","Abstention possible ; traitements physiques si gêne (curetage)"],
  terrain:["Enfant +++ (surtout atopique)","Adulte : transmission sexuelle possible (région génitale) ; formes profuses si immunodépression"],
  clinique:["Papules hémisphériques perlées, couleur chair/rosée, ombiliquées, 2-5 mm","Localisations : tronc, plis, visage, organes génitaux","Possible eczématisation périlésionnelle"],
  gravite:["Formes profuses chez l'immunodéprimé (rechercher VIH si adulte profus)","Surinfection / inflammation (régression souvent annoncée par une inflammation)"],
  diagnostics_differentiels:["Verrues","Varicelle (vésicules)","Folliculite","Kystes milium"],
  examens:["Diagnostic clinique"],
  traitement_premiere_intention:["Abstention (résolution spontanée), surtout chez l'enfant","Hygiène : éviter le grattage/auto-inoculation, ne pas partager le linge","Traiter un eczéma associé"],
  traitement_deuxieme_intention:["Curetage à la curette (après anesthésie locale) si gêne/nombre limité","Cryothérapie ou autres méthodes physiques (avis selon âge et tolérance)"],
  ordonnance_type:
"Abstention thérapeutique le plus souvent (disparition spontanée en quelques mois à 1-2 ans).\n\nMESURES : éviter le grattage, ne pas partager serviettes/gants, traiter un eczéma associé (émollients ± dermocorticoïde).\n\nSi gêne et lésions peu nombreuses : CURETAGE possible (± anesthésie locale par crème) en consultation.",
  conseils_patient:
"Les molluscums sont de petits boutons perlés dus à un virus, très fréquents chez l'enfant. C'est bénin et cela finit par disparaître tout seul, en général en quelques mois à un an ou deux, sans laisser de cicatrice.\n\n• Évitez que l'enfant gratte les lésions (cela les multiplie).\n• Ne partagez pas serviettes et gants de toilette.\n• La baignade est permise ; couvrez les lésions si possible.\n\nReconsultez si : les boutons deviennent rouges et gonflés (souvent signe que ça va guérir), s'ils sont très nombreux, ou s'ils gênent l'enfant.",
  quand_adresser:["Formes profuses (immunodépression chez l'adulte)","Gêne importante / demande de traitement physique","Doute diagnostique"],
  suivi:["Réassurance, surveillance de la régression"],
  source:SRC, source_url:SRC_URL,
  tags:["poxvirus","enfant","ombiliqué","bénin"]
},
{
  id:"condylomes", nom:"Condylomes anogénitaux", categorie:"Infection cutanée",
  localisations:["organes génitaux"],
  symptomes:["papules","végétations"],
  niveau:1, urgence:"Avis / bilan IST",
  definition:"Lésions cutanéo-muqueuses anogénitales liées aux papillomavirus humains (HPV), sexuellement transmissibles, pouvant être associées à des lésions cervicales ou anales.",
  elements_cles:["Liés aux HPV, IST la plus fréquente","Lésions externes pouvant s'associer à des lésions cervicales/anales → bilan d'extension","Dépistage des autres IST et information du/de la partenaire","Vérifier le statut vaccinal HPV"],
  terrain:["Adulte jeune sexuellement actif","Immunodépression (formes profuses, récidives)"],
  clinique:["Végétations charnues (\"crêtes de coq\"), papules ou lésions planes anogénitales","Localisations : vulve, vagin, col, pénis, marge anale, canal anal","Souvent asymptomatiques (gêne, prurit, saignement possibles)"],
  gravite:["Association à des lésions précancéreuses (col, anus) — d'où le bilan","Formes profuses chez l'immunodéprimé","Condylome géant (rare)"],
  diagnostics_differentiels:["Molluscum contagiosum","Papules perlées physiologiques","Syphilis (condylomata lata)","Lésions néoplasiques (vigilance)"],
  examens:["Examen des organes génitaux externes ; recherche de lésions anales","Anuscopie si nécessaire (lésions anales, immunodépression)","Frottis cervico-utérin selon l'âge et le statut de dépistage","Dépistage des IST associées (VIH, syphilis, hépatites, chlamydia/gonocoque selon contexte)"],
  traitement_premiere_intention:["Traitements locaux selon nombre/localisation : imiquimod (immunomodulateur), ou traitements physiques (cryothérapie, etc.)","Information et examen du/de la partenaire","Vérifier/proposer la vaccination HPV selon recommandations"],
  traitement_deuxieme_intention:["Traitements physiques/chirurgicaux (laser, électrocoagulation) pour les lésions étendues/résistantes (avis spécialisé)","Suivi des lésions cervicales/anales associées"],
  ordonnance_type:
"TRAITEMENT LOCAL selon le nombre et la localisation :\nIMIQUIMOD crème (immunomodulateur) en application selon protocole, OU traitement physique (cryothérapie) en consultation spécialisée.\n\nBILAN : frottis cervico-utérin selon âge/dépistage, examen anal (anuscopie si besoin), DÉPISTAGE DES IST ASSOCIÉES.\nInformation et examen du/de la partenaire. Vérifier la vaccination HPV.\n\nOrientation gynécologue / dermatologue / proctologue selon les cas.",
  conseils_patient:
"Les condylomes (ou \"verrues génitales\") sont dus à un virus (HPV) qui se transmet lors des rapports sexuels. C'est fréquent et bénin, mais il est important de faire un bilan car ce virus peut aussi toucher le col de l'utérus ou l'anus.\n\n• Un dépistage des autres infections sexuellement transmissibles est conseillé.\n• Informez votre partenaire, qui doit aussi être examiné(e).\n• Le préservatif réduit (sans l'annuler) le risque de transmission.\n• La vaccination contre le HPV est recommandée : parlons-en.\n• Pour les femmes : un suivi du col de l'utérus (frottis) est important.\n\nReconsultez si : les lésions reviennent, saignent, ou changent d'aspect.",
  quand_adresser:["Bilan d'extension (gynécologue, proctologue)","Lésions étendues/résistantes (traitement physique)","Immunodépression","Suspicion de lésion néoplasique"],
  suivi:["Suivi des lésions (récidives fréquentes)","Suivi cervical/anal selon contexte"],
  source:SRC, source_url:SRC_URL,
  tags:["HPV","IST","vaccination","partenaire"]
},

/* ============ LÉSIONS PRÉCANCÉREUSES ET CANCERS ============ */
{
  id:"keratose_actinique", nom:"Kératose actinique", categorie:"Lésion précancéreuse / cancer",
  localisations:["visage","cuir chevelu","mains","sujet âgé"],
  symptomes:["lésion rugueuse","squames","hyperkératose"],
  niveau:1, urgence:"Avis dermatologique (rapide si signe de gravité)",
  definition:"Lésion kératosique des zones photo-exposées, considérée comme un carcinome épidermoïde au stade le plus précocement identifiable ; marqueur d'un champ de cancérisation.",
  elements_cles:["À considérer comme un carcinome épidermoïde au stade le plus précoce","Zones photo-exposées du sujet âgé / phototype clair","Notion de champ de cancérisation (lésions multiples)","Surveillance et traitement ; toute lésion suspecte → avis dermatologique"],
  terrain:["Sujet âgé, phototype clair","Antécédents d'exposition solaire cumulée importante","Immunodépression (transplantés : risque majoré)"],
  clinique:["Lésions rugueuses, kératosiques, rosées/brunâtres, mieux palpées que vues (rugosité)","Zones photo-exposées : visage, cuir chevelu dégarni, oreilles, dos des mains, avant-bras","Champ de cancérisation : peau environnante héliodermique avec lésions multiples"],
  gravite:["RED FLAGS (transformation en carcinome épidermoïde) : lésion indurée, douloureuse, ulcérée, saignante, rapidement évolutive ou résistante au traitement → avis dermatologique rapide"],
  diagnostics_differentiels:["Carcinome épidermoïde (induration, ulcération)","Carcinome basocellulaire","Kératose séborrhéique","Psoriasis / dermatite séborrhéique","Lentigo / lésion pigmentée"],
  examens:["Diagnostic clinique/dermatoscopique","Biopsie si doute avec un carcinome (lésion indurée, ulcérée, résistante)"],
  traitement_premiere_intention:["Lésions isolées : cryothérapie","Champ de cancérisation : traitements topiques (5-fluorouracile, imiquimod, etc.) ou photothérapie dynamique — souvent du ressort du dermatologue","Photoprotection stricte au long cours"],
  traitement_deuxieme_intention:["Exérèse/biopsie si suspicion de carcinome","Traitements du champ de cancérisation répétés selon évolution (avis spécialisé)"],
  ordonnance_type:
"PHOTOPROTECTION stricte quotidienne (SPF 50+), vêtements couvrants, éviction solaire.\n\nLÉSIONS ISOLÉES : cryothérapie en consultation.\nCHAMP DE CANCÉRISATION : traitement topique (5-FU, imiquimod…) ou photothérapie dynamique — selon avis dermatologique.\n\nTOUTE lésion indurée, ulcérée, douloureuse, saignante ou résistante → AVIS DERMATOLOGIQUE RAPIDE (biopsie).",
  conseils_patient:
"Les kératoses actiniques sont des petites zones rugueuses de la peau provoquées par le soleil accumulé pendant des années. Ce sont des lésions à surveiller car certaines peuvent évoluer vers un cancer de la peau ; on les traite donc volontiers.\n\n• Protégez-vous du soleil tous les jours : crème SPF 50+, chapeau, vêtements couvrants, évitez les heures les plus ensoleillées.\n• Surveillez votre peau et signalez toute lésion qui devient dure, douloureuse, qui saigne ou grossit vite.\n\nReconsultez rapidement si : une lésion s'épaissit, devient sensible, saigne, s'ulcère ou résiste au traitement.",
  quand_adresser:["Signes de transformation (induration, ulcération, saignement) → avis rapide","Lésions multiples / champ de cancérisation pour traitement spécialisé","Patient immunodéprimé/transplanté (surveillance rapprochée)"],
  suivi:["Surveillance dermatologique régulière","Photoprotection au long cours"],
  source:SRC, source_url:SRC_URL,
  tags:["soleil","précancer","carcinome épidermoïde","champ de cancérisation"]
},
{
  id:"carcinome_basocellulaire", nom:"Carcinome basocellulaire", categorie:"Lésion précancéreuse / cancer",
  localisations:["visage","tronc","membres","sujet âgé"],
  symptomes:["lésion qui saigne","nodule","ulcération"],
  niveau:1, urgence:"Avis dermatologique",
  definition:"Cancer cutané le plus fréquent, de malignité locale (n'évolue quasiment jamais en métastases), survenant sur les zones photo-exposées, d'évolution lente.",
  elements_cles:["Cancer cutané le plus fréquent, à malignité locale (pas de métastase en pratique)","Perle translucide avec télangiectasies, parfois ulcérée","Zones photo-exposées du sujet âgé","Diagnostic et traitement (exérèse) → avis dermatologique"],
  terrain:["Sujet âgé, phototype clair, exposition solaire chronique","Immunodépression"],
  clinique:["Papule/nodule perlé translucide, télangiectasies en surface","Formes : nodulaire, superficielle (plaque érythémato-squameuse du tronc), sclérodermiforme","Ulcération centrale possible (\"ulcus rodens\")","Croissance lente, ne guérit pas spontanément"],
  gravite:["Formes mal limitées/sclérodermiformes, récidivantes, localisations à risque (nez, péri-orificielles) → exérèse délicate","Destruction locale importante si négligé"],
  diagnostics_differentiels:["Carcinome épidermoïde","Kératose actinique","Mélanome (forme pigmentée du basocellulaire)","Naevus, kératose séborrhéique"],
  examens:["Examen clinique + dermatoscopie","Biopsie / exérèse pour confirmation histologique (du ressort du spécialiste)"],
  traitement_premiere_intention:["Exérèse chirurgicale avec contrôle histologique (traitement de référence)","Adresser au dermatologue/chirurgien"],
  traitement_deuxieme_intention:["Alternatives selon forme/localisation : traitements topiques (formes superficielles), cryothérapie, radiothérapie (avis spécialisé)"],
  ordonnance_type:
"PAS d'ordonnance médicamenteuse en première intention.\n\nORIENTATION DERMATOLOGIQUE pour confirmation (dermatoscopie/biopsie) et EXÉRÈSE CHIRURGICALE avec analyse histologique.\n\nPHOTOPROTECTION et surveillance cutanée (risque d'autres cancers cutanés).",
  conseils_patient:
"Le carcinome basocellulaire est le cancer de la peau le plus fréquent. C'est aussi le moins grave : il reste localisé et ne se propage quasiment jamais à distance. Mais il faut le traiter, en général par une petite opération, car il s'étend lentement sur place.\n\n• Le traitement habituel est l'ablation de la lésion par un dermatologue ou un chirurgien.\n• Protégez votre peau du soleil et surveillez l'apparition d'autres lésions.\n\nReconsultez si : la lésion grossit, saigne, ou si vous repérez d'autres boutons qui ne cicatrisent pas.",
  quand_adresser:["Toute lésion évocatrice → dermatologue (exérèse)","Localisations à risque (visage central), formes mal limitées"],
  suivi:["Surveillance cutanée régulière (risque de nouvelles lésions)","Photoprotection"],
  source:SRC, source_url:SRC_URL,
  tags:["perle","photo-exposé","exérèse","cancer cutané"]
},
{
  id:"carcinome_epidermoide", nom:"Carcinome épidermoïde cutané", categorie:"Lésion précancéreuse / cancer",
  localisations:["visage","cuir chevelu","mains","bouche/lèvres","sujet âgé"],
  symptomes:["lésion qui saigne","nodule","ulcération","hyperkératose"],
  niveau:2, urgence:"Avis dermatologique rapide",
  definition:"Cancer cutané pouvant être invasif et métastatique, survenant sur les zones photo-exposées, souvent sur une kératose actinique préexistante.",
  elements_cles:["Potentiel invasif et métastatique (contrairement au basocellulaire)","Lésion bourgeonnante, indurée, ulcérée ou kératosique des zones photo-exposées","Souvent sur kératose actinique / champ de cancérisation","Avis dermatologique RAPIDE → exérèse"],
  terrain:["Sujet âgé, phototype clair, exposition solaire chronique","Immunodépression (transplantés ++), plaies/cicatrices chroniques, lèvre inférieure (tabac)"],
  clinique:["Lésion kératosique, bourgeonnante ou ulcéro-végétante, indurée, parfois saignante","Croissance plus rapide qu'un basocellulaire","Zones photo-exposées, lèvre inférieure, sur cicatrice/ulcère chronique"],
  gravite:["RED FLAGS : induration, ulcération, saignement, croissance rapide, douleur, adénopathie → avis rapide","Formes à haut risque (taille, localisation, immunodépression, récidive) : risque métastatique"],
  diagnostics_differentiels:["Kératose actinique (forme précoce)","Carcinome basocellulaire","Kérato-acanthome","Plaie chronique / ulcère atypique"],
  examens:["Examen clinique + dermatoscopie","Biopsie/exérèse pour confirmation histologique","Bilan d'extension selon le risque (avis spécialisé)"],
  traitement_premiere_intention:["Exérèse chirurgicale avec marges et contrôle histologique","Orientation dermatologique/chirurgicale rapide"],
  traitement_deuxieme_intention:["Selon stade : reprise chirurgicale, radiothérapie, prise en charge oncologique (RCP)"],
  ordonnance_type:
"PAS d'ordonnance médicamenteuse.\n\nAVIS DERMATOLOGIQUE RAPIDE → biopsie/EXÉRÈSE chirurgicale avec analyse histologique, et bilan d'extension selon le risque.\n\nPHOTOPROTECTION et surveillance cutanée. Surveillance rapprochée si immunodépression/transplantation.",
  conseils_patient:
"Le carcinome épidermoïde est un cancer de la peau qui doit être pris en charge sans tarder car, contrairement au carcinome basocellulaire, il peut parfois s'étendre à distance s'il est négligé. Bien traité tôt, il guérit le plus souvent.\n\n• Le traitement repose sur l'ablation chirurgicale de la lésion.\n• Protégez-vous du soleil et surveillez votre peau.\n\nReconsultez rapidement si : une lésion grossit vite, saigne, fait mal, ne cicatrise pas, ou si vous sentez une \"boule\" à proximité (ganglion).",
  quand_adresser:["Toute lésion évocatrice → avis dermatologique RAPIDE","Lésion sur cicatrice/ulcère chronique, lèvre, immunodéprimé"],
  suivi:["Surveillance dermatologique (récidive, nouvelles lésions, ganglions)","Photoprotection au long cours"],
  source:SRC, source_url:SRC_URL,
  tags:["invasif","métastase","soleil","exérèse rapide"]
},
{
  id:"melanome", nom:"Mélanome", categorie:"Lésion précancéreuse / cancer",
  localisations:["tronc","membres","visage","sujet âgé"],
  symptomes:["lésion pigmentée","lésion qui saigne","lésion évolutive"],
  niveau:2, urgence:"Avis dermatologique rapide",
  definition:"Tumeur maligne des mélanocytes, au pronostic lié à la précocité du diagnostic ; suspecté devant une lésion pigmentée évolutive (règle ABCDE, vilain petit canard).",
  elements_cles:["Pronostic dépend de la précocité : tout doute → avis rapide","Règle ABCDE et signe du \"vilain petit canard\"","Une lésion pigmentée nouvelle, changeante, asymétrique ou hétérochrome est suspecte","Ne jamais se rassurer à tort : adresser au moindre doute"],
  terrain:["Phototype clair, expositions solaires intenses/coups de soleil (surtout enfance)","Nombreux naevi / naevi atypiques, antécédents personnels/familiaux de mélanome","Immunodépression"],
  clinique:["ABCDE : Asymétrie, Bords irréguliers, Couleurs multiples, Diamètre > 6 mm, Évolution","Signe du vilain petit canard : naevus différent des autres","Formes : superficiel extensif, nodulaire (croissance rapide), de Dubreuilh (visage du sujet âgé), acral (paumes/plantes/ongles)","Mélanome unguéal : bande pigmentée évolutive, débordant sur le repli (signe de Hutchinson)"],
  gravite:["RED FLAGS : lésion pigmentée asymétrique, bords irréguliers, plusieurs couleurs, évolution rapide, diamètre > 6 mm, saignement, ulcération, nodule, lésion noire nouvelle → avis rapide","Épaisseur (indice de Breslow), ulcération = facteurs pronostiques"],
  diagnostics_differentiels:["Naevus (atypique)","Kératose séborrhéique","Carcinome basocellulaire pigmenté","Angiome thrombosé","Hématome sous-unguéal (mélanome unguéal)"],
  examens:["Examen clinique + dermatoscopie","Exérèse complète pour analyse histologique (JAMAIS de simple destruction)","Bilan d'extension selon Breslow/stade (spécialiste, RCP)"],
  traitement_premiere_intention:["Exérèse chirurgicale complète pour diagnostic, puis reprise avec marges selon Breslow","Orientation dermatologique RAPIDE — ne pas temporiser"],
  traitement_deuxieme_intention:["Prise en charge oncologique spécialisée selon le stade (ganglion sentinelle, traitements adjuvants/systémiques) — RCP"],
  ordonnance_type:
"PAS d'ordonnance médicamenteuse — NE PAS détruire la lésion (cryothérapie/laser interdits sur lésion pigmentée suspecte).\n\nORIENTATION DERMATOLOGIQUE RAPIDE pour dermatoscopie et EXÉRÈSE COMPLÈTE avec analyse histologique.\n\nPHOTOPROTECTION et auto-surveillance ; surveillance de l'ensemble du tégument et des proches (antécédents familiaux).",
  conseils_patient:
"Le mélanome est un cancer de la peau qui se développe à partir d'un grain de beauté ou d'une tache. Détecté tôt, il se guérit très bien : c'est pourquoi il ne faut pas attendre devant une lésion qui change.\n\n• Surveillez vos grains de beauté avec la règle ABCDE : Asymétrie, Bords irréguliers, Couleurs multiples, Diamètre supérieur à 6 mm, Évolution (changement).\n• Méfiez-vous du \"vilain petit canard\" : un grain de beauté qui ne ressemble pas aux autres.\n• Protégez-vous du soleil et évitez les cabines UV.\n\nConsultez rapidement si : une tache ou un grain de beauté change de taille, de forme ou de couleur, saigne, démange, ou si une nouvelle lésion foncée apparaît.",
  quand_adresser:["TOUTE lésion suspecte → dermatologue RAPIDEMENT","Lésion pigmentée évolutive, nodulaire, ulcérée, saignante","Antécédents personnels/familiaux, naevi atypiques multiples"],
  suivi:["Surveillance dermatologique régulière (selon stade)","Auto-examen et photoprotection à vie","Dépistage des apparentés"],
  source:SRC, source_url:SRC_URL,
  tags:["ABCDE","vilain petit canard","breslow","exérèse rapide"]
},
{
  id:"naevus_atypique", nom:"Naevus atypique / lésion pigmentée suspecte", categorie:"Lésion précancéreuse / cancer",
  localisations:["tronc","membres","visage"],
  symptomes:["lésion pigmentée"],
  niveau:1, urgence:"Avis dermatologique selon évolution",
  definition:"Grain de beauté présentant des atypies cliniques (asymétrie, bords ou couleurs irréguliers) sans critère formel de malignité ; marqueur de risque et diagnostic différentiel du mélanome.",
  elements_cles:["Atypies cliniques sans certitude de malignité","Marqueur de risque de mélanome (surtout si naevi atypiques multiples)","Surveillance dermatologique + photographies / dermatoscopie","Tout changement → exérèse pour analyse"],
  terrain:["Phototype clair, naevi nombreux","Antécédents familiaux de mélanome (syndrome des naevi atypiques)"],
  clinique:["Naevus de grande taille, bords flous, plusieurs nuances de brun","Souvent multiples (dos, tronc)","Stable dans le temps (à la différence du mélanome évolutif)"],
  gravite:["Évolution (ABCDE) → suspicion de mélanome → exérèse","Patient à haut risque (naevi atypiques multiples + antécédents familiaux)"],
  diagnostics_differentiels:["Mélanome débutant","Naevus commun","Kératose séborrhéique"],
  examens:["Dermatoscopie","Cartographie / photographies de surveillance","Exérèse pour histologie si doute ou évolution"],
  traitement_premiere_intention:["Surveillance dermatologique régulière (dermatoscopie, photos)","Éducation à l'auto-surveillance (ABCDE)","Exérèse en cas de doute ou de modification"],
  traitement_deuxieme_intention:["Exérèse pour analyse histologique des lésions douteuses/évolutives"],
  ordonnance_type:
"PAS de traitement destructeur (jamais de cryothérapie/laser sur une lésion pigmentée).\n\nSURVEILLANCE DERMATOLOGIQUE avec dermatoscopie ± cartographie photographique.\nEXÉRÈSE pour analyse histologique en cas de doute ou de modification.\n\nÉducation à l'auto-examen (ABCDE), photoprotection.",
  conseils_patient:
"Un grain de beauté \"atypique\" a un aspect un peu particulier, mais cela ne veut pas dire qu'il s'agit d'un cancer. C'est surtout un signal pour surveiller votre peau de plus près.\n\n• Apprenez la règle ABCDE et surveillez vos grains de beauté (des photos peuvent aider).\n• Protégez-vous du soleil.\n• Si vous avez beaucoup de grains de beauté ou des antécédents familiaux, un suivi dermatologique régulier est conseillé.\n\nConsultez si : un grain de beauté change de taille, forme ou couleur, saigne ou démange, ou si une nouvelle lésion différente des autres apparaît.",
  quand_adresser:["Lésion évolutive/douteuse → exérèse","Patient à haut risque pour mise en place d'une surveillance"],
  suivi:["Surveillance régulière, auto-examen","Photoprotection"],
  source:SRC, source_url:SRC_URL,
  tags:["naevus","surveillance","dermatoscopie","ABCDE"]
},

/* ============ SITUATIONS PÉDIATRIQUES ============ */
{
  id:"erytheme_fessier", nom:"Érythème fessier du nourrisson", categorie:"Situation pédiatrique",
  localisations:["plis","organes génitaux","enfant"],
  symptomes:["plaques rouges","érythème"],
  niveau:0, urgence:"Non urgente",
  definition:"Dermite irritative du siège du nourrisson liée à la macération et au contact prolongé avec urines/selles, parfois surinfectée par Candida.",
  elements_cles:["Dermite d'irritation des zones convexes en contact avec la couche","Surinfection candidosique fréquente (fond des plis, pustules satellites)","Traitement : mesures de soin du siège + protecteur cutané","Antifongique local si candidose"],
  terrain:["Nourrisson","Facteurs : diarrhée, changes peu fréquents, macération, poussée dentaire, antibiotiques"],
  clinique:["Forme en \"W\" : érythème des convexités (fesses, cuisses, pubis), respectant le fond des plis","Forme candidosique : atteinte du fond des plis, bordure desquamative, pustules satellites","Sécheresse/desquamation possibles"],
  gravite:["Érosions, surinfection bactérienne","Éruption atypique/résistante → évoquer un autre diagnostic (psoriasis des langes, dermatite atopique, plus rarement une cause générale)"],
  diagnostics_differentiels:["Candidose du siège","Dermatite atopique","Psoriasis des langes","Dermatite séborrhéique"],
  examens:["Diagnostic clinique"],
  traitement_premiere_intention:["Changes fréquents, toilette douce à l'eau, séchage soigneux","Laisser les fesses à l'air quand c'est possible","Pâte protectrice à l'oxyde de zinc à chaque change","Éviter les produits irritants/parfumés et l'excès de lingettes"],
  traitement_deuxieme_intention:["Antifongique local si candidose (azolé)","Dermocorticoïde faible en cure très courte si composante inflammatoire marquée (avis/prudence)"],
  ordonnance_type:
"MESURES DE SOIN DU SIÈGE\nChanges fréquents, toilette à l'eau, séchage doux, fesses à l'air dès que possible.\nPÂTE À L'OXYDE DE ZINC (protecteur cutané) à chaque change.\nÉviter lingettes parfumées et produits irritants.\n\nSI CANDIDOSE (fond des plis atteint, pustules satellites) : ANTIFONGIQUE LOCAL (azolé) 2 fois/jour jusqu'à guérison.",
  conseils_patient:
"L'érythème fessier (\"fesses rouges\") est très fréquent chez le bébé. Il est dû au contact prolongé de la peau avec l'urine et les selles dans la couche. C'est bénin et guérit avec de bons soins du siège.\n\n• Changez la couche souvent, dès qu'elle est souillée.\n• Nettoyez à l'eau, séchez en tamponnant, et laissez les fesses à l'air le plus possible.\n• Appliquez une pâte protectrice (oxyde de zinc) à chaque change.\n• Évitez les lingettes parfumées.\n\nReconsultez si : les rougeurs ne s'améliorent pas en quelques jours, deviennent suintantes, présentent des petits boutons autour (mycose), ou si le bébé est fébrile/inconfortable.",
  quand_adresser:["Forme résistante/atypique ou extensive","Doute diagnostique (dermatose sous-jacente)"],
  suivi:["Contrôle à quelques jours si pas d'amélioration"],
  source:SRC, source_url:SRC_URL,
  tags:["nourrisson","siège","candida","oxyde de zinc"]
},

/* ============ SITUATIONS GÉNITALES ============ */
{
  id:"herpes_genital", nom:"Herpès génital", categorie:"Situation génitale",
  localisations:["organes génitaux"],
  symptomes:["vésicules douloureuses","érosions","douleur"],
  niveau:1, urgence:"Avis selon contexte (grossesse = vigilance)",
  definition:"Infection sexuellement transmissible à HSV (souvent HSV-2), récidivante, caractérisée par des vésicules/érosions génitales douloureuses.",
  elements_cles:["IST récidivante ; vésicules/érosions douloureuses au même site","Primo-infection souvent plus marquée (douleur, fièvre, adénopathies)","Antiviraux d'autant plus efficaces que débutés tôt","Enjeu majeur en fin de grossesse (risque d'herpès néonatal)"],
  terrain:["Adulte sexuellement actif","Risque néonatal si poussée en fin de grossesse / au moment de l'accouchement"],
  clinique:["Primo-infection : vésicules/érosions génitales douloureuses multiples, fièvre, adénopathies inguinales","Récurrences : moins intenses, prodromes (picotements), au même endroit","Évolution spontanée en ~1 semaine"],
  gravite:["Grossesse proche du terme → risque d'herpès néonatal (avis obstétrical)","Immunodépression (formes étendues/chroniques)","Rétention d'urine, atteinte neurologique (rare)"],
  diagnostics_differentiels:["Syphilis (chancre indolore induré)","Aphtose génitale","Candidose","Autres ulcérations génitales (IST)"],
  examens:["Diagnostic souvent clinique ; PCR HSV sur prélèvement si doute","Dépistage des autres IST ; sérologies selon contexte"],
  traitement_premiere_intention:["Antiviral oral (valaciclovir/aciclovir) : primo-infection 5-10 jours ; récurrence dès les prodromes","Antalgiques, soins locaux, antisepsie douce","Information sur la contagiosité, préservatif"],
  traitement_deuxieme_intention:["Récurrences fréquentes (≥6/an) : traitement suppressif au long cours","Grossesse : prophylaxie antivirale en fin de grossesse selon avis obstétrical"],
  ordonnance_type:
"PRIMO-INFECTION\nVALACICLOVIR 500 mg : 2 fois par jour pendant 10 jours (à débuter au plus tôt).\nRÉCURRENCE : VALACICLOVIR 500 mg 2 fois/jour pendant 5 jours, dès les prodromes.\n(Adapter à la fonction rénale.)\n\nANTALGIQUES, soins locaux antiseptiques.\nDÉPISTAGE DES IST associées. Préservatif. Information du/de la partenaire.\nRÉCURRENCES FRÉQUENTES (≥6/an) : traitement suppressif (valaciclovir 500 mg/j).",
  conseils_patient:
"L'herpès génital est une infection sexuellement transmissible due à un virus. Il se réveille de temps en temps, souvent au même endroit, avec des petites cloques ou plaies douloureuses. C'est fréquent et bénin, mais contagieux pendant les poussées.\n\n• Commencez le traitement dès les premiers signes (picotements) pour réduire la poussée.\n• Pendant une poussée : pas de rapports sexuels (très contagieux).\n• Le préservatif réduit le risque de transmission entre les poussées.\n• Si vous êtes enceinte, signalez-le : une surveillance particulière est nécessaire en fin de grossesse.\n\nReconsultez si : poussées fréquentes (un traitement de fond est possible), grossesse, difficultés à uriner, ou poussée très étendue.",
  quand_adresser:["Grossesse (surtout fin de grossesse) → avis obstétrical","Récurrences invalidantes (traitement suppressif)","Immunodépression, formes sévères"],
  suivi:["Discuter le traitement suppressif","Dépistage/suivi des IST"],
  source:SRC, source_url:SRC_URL,
  tags:["HSV","IST","valaciclovir","grossesse"]
},
{
  id:"syphilis", nom:"Syphilis (suspicion)", categorie:"Situation génitale",
  localisations:["organes génitaux","tronc","bouche/lèvres"],
  symptomes:["ulcération","plaques rouges","éruption"],
  niveau:1, urgence:"Avis / dépistage IST",
  definition:"Infection sexuellement transmissible due à Treponema pallidum, dont les manifestations cutanéo-muqueuses varient selon le stade (chancre, roséole, syphilides).",
  elements_cles:["IST en recrudescence ; \"grande simulatrice\"","Syphilis primaire : chancre génital induré INDOLORE","Syphilis secondaire : roséole, syphilides palmo-plantaires","Diagnostic sérologique (TPHA-VDRL/tests tréponémiques) ; traitement par benzathine pénicilline"],
  terrain:["Adulte sexuellement actif","Co-infection VIH fréquente ; HSH, partenaires multiples"],
  clinique:["Primaire : chancre — ulcération unique, indurée, propre, indolore, avec adénopathie","Secondaire (semaines/mois après) : roséole (macules du tronc), syphilides papuleuses palmo-plantaires, plaques muqueuses, alopécie","Latente : asymptomatique (diagnostic sérologique)"],
  gravite:["Atteintes tardives (neurosyphilis, cardiovasculaire)","Syphilis et grossesse (syphilis congénitale)","Co-infections IST/VIH"],
  diagnostics_differentiels:["Herpès génital (vésicules/érosions douloureuses)","Autres ulcérations génitales (chancre mou)","Pityriasis rosé (secondaire)","Toxidermie / autres exanthèmes"],
  examens:["Sérologie : test tréponémique (TPHA/EIA) + test non tréponémique (VDRL/RPR)","Dépistage des autres IST (VIH, hépatites, chlamydia/gonocoque)","Avis spécialisé pour le traitement et le suivi sérologique"],
  traitement_premiere_intention:["Benzathine benzylpénicilline G en IM (schéma selon le stade)","Dépistage et traitement du/des partenaire(s)","Déclaration/dépistage des IST associées"],
  traitement_deuxieme_intention:["Allergie à la pénicilline : alternative selon avis (doxycycline) / désensibilisation si grossesse","Suivi sérologique (VDRL quantitatif)"],
  ordonnance_type:
"NE PAS traiter à l'aveugle sans confirmation et stadification.\n\nBILAN : SÉROLOGIE SYPHILIS (test tréponémique + VDRL), DÉPISTAGE IST (VIH, hépatites B/C, chlamydia/gonocoque).\n\nTRAITEMENT de référence : BENZATHINE PÉNICILLINE G IM (schéma selon le stade) — selon avis spécialisé.\nDépistage et traitement du/des partenaire(s). Suivi sérologique.",
  conseils_patient:
"La syphilis est une infection sexuellement transmissible due à une bactérie. Elle se soigne très bien avec un antibiotique (pénicilline), surtout si elle est traitée tôt. Elle peut prendre des aspects très variés sur la peau.\n\n• Un bilan sanguin confirme le diagnostic ; un dépistage des autres IST (dont le VIH) est recommandé.\n• Votre/vos partenaire(s) doivent être prévenu(e)s, testé(e)s et traité(e)s.\n• Pas de rapports sexuels jusqu'à la fin du traitement et la cicatrisation des lésions.\n\nReconsultez : pour les résultats, le traitement (injection), et le suivi par prises de sang.",
  quand_adresser:["Confirmation et traitement → avis spécialisé (IST/dermatologie/infectiologie)","Grossesse, co-infection VIH, formes tardives/neurologiques"],
  suivi:["Suivi sérologique (VDRL quantitatif)","Dépistage et traitement des partenaires"],
  source:SRC, source_url:SRC_URL,
  tags:["tréponème","chancre","IST","pénicilline"]
},
{
  id:"lichen_sclereux", nom:"Lichen scléreux", categorie:"Situation génitale",
  localisations:["organes génitaux"],
  symptomes:["prurit","plaques blanches","atrophie"],
  niveau:1, urgence:"Avis dermatologique",
  definition:"Dermatose inflammatoire chronique, surtout génitale, caractérisée par des plaques blanches atrophiques prurigineuses, avec risque de complications et (rare) de carcinome.",
  elements_cles:["Plaques blanches nacrées atrophiques, surtout génitales, prurigineuses","Femme ménopausée et fillette ; homme (balanite)","Dermocorticoïdes très forts = traitement de référence","Surveillance au long cours (risque de carcinome épidermoïde, faible mais réel)"],
  terrain:["Femme ménopausée ++, fillette prépubère ; homme (atteinte du gland/prépuce)","Terrain auto-immun parfois associé"],
  clinique:["Plaques blanches porcelainées, atrophiques, brillantes, vulvaires/péri-anales (en \"8\")","Prurit, dyspareunie, douleurs, fissures","Évolution : rétraction, synéchies ; chez l'homme : phimosis"],
  gravite:["Risque de transformation en carcinome épidermoïde (faible mais réel) → surveillance, biopsie des zones suspectes","Complications fonctionnelles (synéchies, phimosis)"],
  diagnostics_differentiels:["Lichen plan érosif","Vitiligo (pas d'atrophie)","Eczéma/psoriasis génital","Carcinome (zone indurée/ulcérée)"],
  examens:["Diagnostic clinique ; biopsie si doute ou zone suspecte (induration, ulcération résistante)"],
  traitement_premiere_intention:["Dermocorticoïde très puissant (clobétasol) en traitement d'attaque puis entretien","Émollients/protecteurs, hygiène douce","Éducation, suivi régulier"],
  traitement_deuxieme_intention:["Inhibiteurs de la calcineurine topiques en alternative/entretien (avis)","Chirurgie des complications (synéchies, phimosis)","Biopsie/exérèse des zones suspectes"],
  ordonnance_type:
"DERMOCORTICOÏDE TRÈS PUISSANT (clobétasol) :\nTraitement d'attaque (1 application/jour plusieurs semaines) puis décroissance et entretien intermittent, selon protocole.\n\nÉMOLLIENT / protecteur, hygiène douce sans savon agressif.\n\nSURVEILLANCE dermatologique régulière. BIOPSIE de toute zone indurée, ulcérée ou résistante (risque de carcinome).",
  conseils_patient:
"Le lichen scléreux est une maladie chronique de la peau, surtout au niveau des parties génitales. Elle provoque des plaques blanches, des démangeaisons et parfois une gêne. Ce n'est pas une infection ni une IST, et ce n'est pas contagieux. Bien traitée et surveillée, elle se contrôle bien.\n\n• Le traitement repose sur une crème à la cortisone puissante : suivez bien le protocole, y compris l'entretien.\n• Utilisez des soins doux, sans savon agressif, et un protecteur.\n• Un suivi régulier est important.\n\nReconsultez si : apparition d'une zone dure, d'une plaie qui ne cicatrise pas, de saignements, ou de difficultés (rapports, miction).",
  quand_adresser:["Confirmation diagnostique et mise en place du traitement","Zones suspectes (biopsie), complications fonctionnelles","Suivi spécialisé au long cours"],
  suivi:["Surveillance régulière (risque néoplasique)","Traitement d'entretien"],
  source:SRC, source_url:SRC_URL,
  tags:["plaques blanches","vulve","clobétasol","surveillance"]
},

/* ============ SITUATIONS URGENTES ============ */
{
  id:"purpura_febrile", nom:"Purpura fébrile", categorie:"Situation urgente",
  localisations:["membres","tronc","diffus"],
  symptomes:["purpura","fièvre","éruption fébrile"],
  niveau:2, urgence:"URGENCE VITALE — SAMU 15",
  definition:"Association d'un purpura (taches rouges/violacées ne s'effaçant pas à la vitropression) et d'une fièvre, devant faire évoquer en urgence un purpura fulminans (méningococcémie).",
  elements_cles:["Purpura + fièvre = éliminer un purpura fulminans → URGENCE VITALE","Purpura = ne s'efface PAS à la vitropression","Élément(s) nécrotique(s)/ecchymotique(s) ≥ 3 mm = signe d'alarme majeur","Antibiothérapie en urgence (avant transfert) et appel du SAMU 15"],
  terrain:["Tout âge, surtout enfant/adolescent/adulte jeune (méningocoque)","Contexte épidémique/contage possible"],
  clinique:["Purpura ne s'effaçant pas à la vitropression","Fièvre, syndrome infectieux","Signes de gravité : éléments nécrotiques/ecchymotiques extensifs, ≥ 3 mm, troubles hémodynamiques, syndrome méningé, marbrures, AEG"],
  gravite:["PURPURA FULMINANS : sepsis méningococcique, choc, CIVD → URGENCE VITALE","Tout purpura fébrile extensif/nécrotique → traiter sans délai"],
  diagnostics_differentiels:["Purpura thrombopénique","Purpura vasculaire (vascularite, purpura rhumatoïde)","Autres causes infectieuses","Endocardite"],
  examens:["NE PAS retarder le traitement pour des examens","Bilan en milieu hospitalier (hémocultures, NFS, coagulation, PL selon contexte)"],
  traitement_premiere_intention:["Devant un purpura fébrile avec éléments nécrotiques/ecchymotiques (≥ 3 mm) : ANTIBIOTHÉRAPIE EN URGENCE (ceftriaxone/céfotaxime IV ou IM) SANS DÉLAI","Appel SAMU 15 pour transfert médicalisé immédiat","Mesures de réanimation symptomatique"],
  traitement_deuxieme_intention:["Prise en charge hospitalière (réanimation), prophylaxie de l'entourage (méningocoque) — par les autorités/hôpital"],
  ordonnance_type:
"⚠️ URGENCE VITALE — PAS d'ordonnance de ville.\n\nDevant un purpura fébrile (surtout avec un élément nécrotique ou ecchymotique ≥ 3 mm) :\n1. ANTIBIOTHÉRAPIE IMMÉDIATE : ceftriaxone (ou céfotaxime) en IV ou à défaut IM, sans attendre.\n2. APPEL SAMU (15) pour transfert médicalisé URGENT.\n3. Surveillance/réanimation symptomatique.\n\nLa prophylaxie de l'entourage et le bilan seront organisés à l'hôpital.",
  conseils_patient:
"(Situation d'urgence — prise en charge immédiate, pas de conseil ambulatoire.)\n\nIl s'agit d'une urgence vitale potentielle : appelez le 15 immédiatement devant des taches rouges/violacées qui ne s'effacent pas quand on appuie dessus, associées à de la fièvre, surtout chez un enfant ou un adolescent.",
  quand_adresser:["TOUJOURS en urgence (SAMU 15)","Antibiothérapie avant transfert si éléments nécrotiques/ecchymotiques"],
  suivi:["Hospitalier","Prophylaxie de l'entourage selon le germe"],
  source:SRC, source_url:SRC_URL,
  tags:["purpura fulminans","méningocoque","vitropression","SAMU"]
},
{
  id:"toxidermie", nom:"Toxidermie (et formes sévères)", categorie:"Situation urgente",
  localisations:["diffus","tronc","membres","bouche/lèvres"],
  symptomes:["éruption","plaques rouges","bulles","éruption fébrile"],
  niveau:2, urgence:"Avis rapide — urgence si signes de gravité",
  definition:"Réaction cutanée à un médicament, allant de l'exanthème bénin aux toxidermies graves (Stevens-Johnson, Lyell, DRESS) menaçant le pronostic vital.",
  elements_cles:["Rechercher un médicament récemment introduit (notion de délai)","Identifier les SIGNES DE GRAVITÉ qui font basculer dans l'urgence","Arrêt du/des médicament(s) suspect(s)","Formes graves (SJS/Lyell, DRESS, PEAG) → hospitalisation en urgence"],
  terrain:["Introduction médicamenteuse récente (antibiotiques, anticonvulsivants, allopurinol, AINS, sulfamides…)","Délai variable selon le type de réaction"],
  clinique:["Exanthème maculo-papuleux (le plus fréquent, souvent bénin)","Urticaire / angio-œdème","Formes graves : décollement cutané (SJS/Lyell), atteinte muqueuse, DRESS (éruption + fièvre + adénopathies + atteinte viscérale + hyperéosinophilie), PEAG (pustules)"],
  gravite:["RED FLAGS : décollement cutané (signe de Nikolsky), bulles, atteinte muqueuse (bouche, yeux, génitale), œdème du visage, fièvre élevée, AEG, adénopathies, atteinte viscérale → URGENCE (SJS/Lyell, DRESS)"],
  diagnostics_differentiels:["Exanthème viral","Urticaire","Maladie de système","Infection (à différencier d'une éruption fébrile)"],
  examens:["Reconstituer la chronologie médicamenteuse (tous les médicaments, dates)","Formes graves : bilan hospitalier (NFS-éosinophiles, bilan hépatique/rénal, etc.)"],
  traitement_premiere_intention:["ARRÊT du/des médicament(s) suspect(s)","Forme bénigne : surveillance, antihistaminique/émollients, antipyrétiques","Éducation : signes devant amener à reconsulter en urgence"],
  traitement_deuxieme_intention:["Formes graves → HOSPITALISATION urgente (réanimation/dermatologie)","Déclaration de pharmacovigilance ; carte d'éviction du médicament"],
  ordonnance_type:
"ARRÊT IMMÉDIAT du/des médicament(s) suspect(s) (et de tout médicament non indispensable).\n\nFORME BÉNIGNE (exanthème simple, sans signe de gravité) :\nÉMOLLIENTS, ANTIHISTAMINIQUE si prurit, antipyrétique. Surveillance rapprochée.\n\n⚠️ SIGNES DE GRAVITÉ (décollement, bulles, atteinte des muqueuses/yeux, œdème du visage, fièvre élevée, AEG) : APPELER LE 15 / HOSPITALISATION URGENTE.\n\nDéclaration de pharmacovigilance ; remettre la liste du/des médicament(s) à éviter.",
  conseils_patient:
"Une toxidermie est une réaction de la peau à un médicament. La plupart sont bénignes et guérissent à l'arrêt du médicament, mais certaines formes sont graves et nécessitent l'hôpital.\n\n• Arrêtez le médicament suspect (selon l'avis du médecin) et notez son nom : il faudra l'éviter à l'avenir.\n• Notez tous les médicaments commencés récemment.\n\nAppelez le 15 / consultez en URGENCE si : la peau se décolle ou fait des cloques, atteinte de la bouche, des yeux ou des parties génitales, fièvre élevée, gonflement du visage, ou état général qui se dégrade.",
  quand_adresser:["TOUTE forme grave (SJS/Lyell, DRESS, PEAG, atteinte muqueuse) → urgence","Doute sur la gravité, terrain fragile"],
  suivi:["Pharmacovigilance, liste d'éviction","Surveillance (DRESS : atteinte viscérale parfois retardée)"],
  source:SRC, source_url:SRC_URL,
  tags:["médicament","Stevens-Johnson","Lyell","DRESS","Nikolsky"]
},
{
  id:"sjs_lyell", nom:"Syndrome de Stevens-Johnson / Lyell", categorie:"Situation urgente",
  localisations:["diffus","bouche/lèvres","paupières","organes génitaux"],
  symptomes:["bulles","décollement cutané","éruption fébrile","atteinte muqueuse"],
  niveau:2, urgence:"URGENCE VITALE — hospitalisation",
  definition:"Toxidermies bulleuses graves avec nécrose épidermique et décollement cutané, mettant en jeu le pronostic vital (SJS < 10 % de surface, Lyell > 30 %).",
  elements_cles:["Décollement cutané + atteinte muqueuse pluri-orificielle = urgence vitale","Origine médicamenteuse quasi constante (arrêt immédiat)","Signe de Nikolsky positif (décollement à la pression)","Hospitalisation urgente (réanimation / centre spécialisé brûlés)"],
  terrain:["Médicaments à risque : anticonvulsivants, allopurinol, sulfamides, certains antibiotiques, AINS","Délai habituel 1 à 3 semaines après introduction"],
  clinique:["Prodromes pseudo-grippaux, fièvre","Éruption douloureuse, macules \"en cocarde\" atypiques, puis bulles et décollement (\"linge mouillé\")","Atteinte muqueuse pluri-orificielle (bouche, yeux, génitale) sévère","Signe de Nikolsky positif"],
  gravite:["Pronostic vital engagé (pertes hydro-électrolytiques, infections, atteinte viscérale)","Séquelles oculaires graves possibles"],
  diagnostics_differentiels:["Érythème polymorphe majeur (post-infectieux)","Épidermolyse staphylococcique (SSSS, enfant ; pas d'atteinte muqueuse)","Pemphigus/pemphigoïde","Autres toxidermies graves (DRESS, PEAG)"],
  examens:["NE PAS retarder l'hospitalisation","Bilan et prise en charge spécialisés (réanimation)"],
  traitement_premiere_intention:["ARRÊT IMMÉDIAT du médicament responsable","HOSPITALISATION EN URGENCE (réanimation / unité spécialisée)","Mesures symptomatiques (équilibre hydro-électrolytique, soins type \"grand brûlé\", prise en charge oculaire)"],
  traitement_deuxieme_intention:["Traitements spécifiques discutés en milieu spécialisé","Suivi des séquelles (ophtalmologiques notamment), pharmacovigilance, carte d'éviction"],
  ordonnance_type:
"⚠️ URGENCE VITALE — PAS de prise en charge ambulatoire.\n\n1. ARRÊT IMMÉDIAT du/des médicament(s) suspect(s).\n2. APPEL SAMU (15) / HOSPITALISATION URGENTE (réanimation ou centre spécialisé).\n3. Soins symptomatiques en attendant le transfert.\n\nPharmacovigilance et carte d'éviction du médicament à organiser.",
  conseils_patient:
"(Urgence vitale — prise en charge hospitalière immédiate.)\n\nIl s'agit d'une réaction grave à un médicament : la peau se décolle comme une brûlure et les muqueuses (bouche, yeux, parties génitales) sont touchées. Appelez le 15 immédiatement. Le médicament responsable devra être définitivement évité (une carte d'éviction vous sera remise).",
  quand_adresser:["TOUJOURS — urgence vitale (SAMU 15, hospitalisation)"],
  suivi:["Spécialisé (séquelles oculaires/cutanées)","Pharmacovigilance, éviction médicamenteuse à vie"],
  source:SRC, source_url:SRC_URL,
  tags:["Nikolsky","décollement","muqueuses","urgence vitale"]
},
{
  id:"fasciite_necrosante", nom:"Fasciite nécrosante", categorie:"Situation urgente",
  localisations:["membres","organes génitaux","tronc"],
  symptomes:["plaques rouges","douleur","nécrose","fièvre"],
  niveau:2, urgence:"URGENCE CHIRURGICALE VITALE — SAMU 15",
  definition:"Dermohypodermite bactérienne nécrosante, infection grave et rapidement extensive des tissus mous, engageant le pronostic vital, nécessitant une chirurgie en urgence.",
  elements_cles:["Douleur INTENSE disproportionnée par rapport aux signes locaux","Évolution rapide, signes de sepsis","Nécrose, bulles hémorragiques, lividités, crépitation, zones d'hypoesthésie","URGENCE CHIRURGICALE (débridement) + antibiothérapie — SAMU 15"],
  terrain:["Diabète, immunodépression, artériopathie, AINS (facteur aggravant suspecté), toxicomanie IV","Porte d'entrée (plaie, chirurgie, varicelle)"],
  clinique:["Placard inflammatoire rapidement extensif","Douleur majeure, puis paradoxalement zones d'hypoesthésie","Signes locaux de nécrose : teinte violacée/grisâtre, bulles hémorragiques, crépitation neigeuse","Sepsis sévère, AEG"],
  gravite:["Pronostic vital engagé ; mortalité élevée si retard","Choc septique, défaillance multiviscérale"],
  diagnostics_differentiels:["Érysipèle (dermohypodermite non nécrosante)","Abcès profond","Gangrène gazeuse"],
  examens:["NE PAS retarder la chirurgie pour des examens","Bilan/imagerie en milieu hospitalier sans différer la prise en charge"],
  traitement_premiere_intention:["APPEL SAMU 15 — transfert chirurgical en urgence","Débridement chirurgical URGENT (geste salvateur)","Antibiothérapie IV à large spectre, réanimation"],
  traitement_deuxieme_intention:["Reprises chirurgicales, réanimation, prise en charge spécialisée"],
  ordonnance_type:
"⚠️ URGENCE CHIRURGICALE VITALE — PAS de traitement ambulatoire.\n\n1. APPEL SAMU (15) immédiat.\n2. Transfert pour CHIRURGIE EN URGENCE (débridement) + antibiothérapie IV à large spectre + réanimation.\n\nNe pas retarder la prise en charge par des examens. Éviter les AINS.",
  conseils_patient:
"(Urgence vitale — prise en charge hospitalière et chirurgicale immédiate.)\n\nIl s'agit d'une infection grave et rapide des tissus sous la peau. Le signe d'alerte est une douleur très intense, qui paraît disproportionnée, avec une peau qui change de couleur et un état général qui se dégrade vite. Appelez le 15 sans attendre.",
  quand_adresser:["TOUJOURS — urgence chirurgicale (SAMU 15)"],
  suivi:["Hospitalier (réanimation, chirurgie, soins)"],
  source:SRC, source_url:SRC_URL,
  tags:["nécrose","douleur disproportionnée","chirurgie","sepsis"]
},
{
  id:"pemphigoide_bulleuse", nom:"Pemphigoïde bulleuse", categorie:"Situation urgente",
  localisations:["tronc","membres","plis","sujet âgé"],
  symptomes:["bulles","prurit","plaques rouges"],
  niveau:1, urgence:"Avis dermatologique (rapide)",
  definition:"Dermatose bulleuse auto-immune sous-épidermique, la plus fréquente, touchant le sujet âgé, caractérisée par des bulles tendues sur base érythémateuse, très prurigineuses.",
  elements_cles:["Sujet âgé, prurit intense souvent inaugural","Bulles TENDUES sur peau érythémateuse/urticarienne, muqueuses peu/pas touchées","Diagnostic : biopsie + immunofluorescence","Avis dermatologique ; corticothérapie (souvent locale très puissante)"],
  terrain:["Sujet âgé +++","Parfois associée à des médicaments, des pathologies neurologiques"],
  clinique:["Phase prébulleuse : prurit, plaques eczématiformes/urticariennes","Bulles tendues, à contenu clair, sur base érythémateuse, des plis et de la face de flexion des membres","Atteinte muqueuse rare/discrète"],
  gravite:["Formes étendues : surinfection, déshydratation, retentissement chez le sujet âgé fragile","Diagnostic différentiel avec d'autres dermatoses bulleuses graves"],
  diagnostics_differentiels:["Toxidermie bulleuse (SJS/Lyell : atteinte muqueuse, Nikolsky+, contexte médicamenteux aigu)","Pemphigus (bulles flasques, atteinte muqueuse)","Érythème polymorphe bulleux","Dermatose à IgA linéaire"],
  examens:["Biopsie cutanée (histologie + immunofluorescence directe)","Sérologie (anticorps anti-membrane basale) — avis spécialisé"],
  traitement_premiere_intention:["Avis dermatologique","Dermocorticoïde très puissant (clobétasol) sur l'ensemble du corps = traitement de référence des formes localisées à étendues","Soins locaux des bulles, antisepsie"],
  traitement_deuxieme_intention:["Corticothérapie générale et/ou immunosuppresseurs dans certaines formes (avis spécialisé)","Prise en charge des complications (surinfection, dénutrition)"],
  ordonnance_type:
"AVIS DERMATOLOGIQUE pour confirmation (biopsie + immunofluorescence).\n\nTraitement de référence (souvent) : DERMOCORTICOÏDE TRÈS PUISSANT (clobétasol) sur tout le tégument, selon protocole spécialisé.\n\nSoins locaux : percer les bulles tendues en gardant le toit, antisepsie. Surveillance (surinfection, état général du sujet âgé).",
  conseils_patient:
"La pemphigoïde bulleuse est une maladie de la peau qui survient surtout chez les personnes âgées. Le système immunitaire attaque la peau et provoque de grosses cloques qui démangent. Ce n'est pas contagieux et cela se traite bien, surtout avec des crèmes à la cortisone puissantes.\n\n• Suivez bien le traitement prescrit (souvent une crème à appliquer largement).\n• Protégez les cloques et la peau fragilisée ; signalez toute surinfection.\n\nReconsultez si : les cloques se multiplient, deviennent jaunes/douloureuses (surinfection), ou en cas de fièvre et d'altération de l'état général.",
  quand_adresser:["Confirmation diagnostique (biopsie/IFD) et mise en route du traitement → dermatologue","Formes étendues, sujet fragile"],
  suivi:["Suivi dermatologique (décroissance du traitement)","Surveillance des complications"],
  source:SRC, source_url:SRC_URL,
  tags:["auto-immune","bulles tendues","sujet âgé","clobétasol"]
},

/* ============ ACNÉ ============ */
{
  id:"acne", nom:"Acné", categorie:"Dermatose inflammatoire",
  localisations:["visage","tronc"],
  symptomes:["comédons","pustules","papules"],
  niveau:0, urgence:"Non urgente",
  definition:"Dermatose inflammatoire chronique du follicule pilo-sébacé, très fréquente à l'adolescence, associant lésions rétentionnelles (comédons) et inflammatoires (papules, pustules).",
  elements_cles:["Comédons (points noirs/blancs) = lésions rétentionnelles caractéristiques","Lésions inflammatoires : papules, pustules, nodules","Traitement adapté à la sévérité ; isotrétinoïne réservée aux formes sévères/résistantes (spécialiste)","Pas de corticoïdes locaux ; attention aux cosmétiques comédogènes"],
  terrain:["Adolescent/adulte jeune ; persistance possible chez la femme adulte","Facteurs hormonaux ; certains médicaments ; cosmétiques occlusifs"],
  clinique:["Lésions rétentionnelles : comédons ouverts (points noirs) et fermés (microkystes)","Lésions inflammatoires : papules, pustules ; formes sévères : nodules, kystes, cicatrices","Zones séborrhéiques : visage, dos, thorax"],
  gravite:["Acné nodulaire/conglobata, cicatricielle → avis spécialisé (isotrétinoïne)","Retentissement psychologique","Acné fulminans (rare, fébrile) → urgence"],
  diagnostics_differentiels:["Rosacée (pas de comédons, sujet plus âgé, flushs)","Folliculite","Dermite péri-orale","Acné cortico-induite/médicamenteuse"],
  examens:["Diagnostic clinique","Bilan hormonal seulement si signes d'hyperandrogénie (femme : hirsutisme, troubles du cycle)"],
  traitement_premiere_intention:["Acné légère à modérée : traitements locaux — rétinoïdes topiques et/ou peroxyde de benzoyle, ± antibiotique local (en association, jamais en monothérapie prolongée)","Soins doux non comédogènes, photoprotection (rétinoïdes)","Éducation : observance, délai d'efficacité (6-8 semaines)"],
  traitement_deuxieme_intention:["Acné modérée à sévère : antibiothérapie orale (cyclines) en cure limitée + traitement local","Femme : traitement hormonal possible (avis)","Formes sévères/résistantes/cicatricielles : isotrétinoïne orale (prescription spécialisée encadrée, contraception/CI grossesse)"],
  ordonnance_type:
"ACNÉ LÉGÈRE À MODÉRÉE\nRÉTINOÏDE TOPIQUE (adapalène) le soir + PEROXYDE DE BENZOYLE le matin (ou association fixe), application en couche fine.\nNettoyant doux non comédogène, photoprotection.\nDélai d'efficacité 6 à 8 semaines ; irritation initiale possible (espacer si besoin).\n\nACNÉ INFLAMMATOIRE MODÉRÉE/ÉTENDUE\nDOXYCYCLINE per os (cure limitée, ex. 3 mois) en ASSOCIATION au traitement local (jamais d'antibiotique seul au long cours).\n\nFormes sévères/résistantes/cicatricielles : avis dermatologique (isotrétinoïne).",
  conseils_patient:
"L'acné est une maladie très fréquente de la peau, surtout à l'adolescence. Elle n'est pas due à un manque d'hygiène. Les traitements sont efficaces mais demandent de la patience : il faut souvent 6 à 8 semaines pour voir un résultat.\n\n• Appliquez les traitements régulièrement, sur tout le visage (pas seulement sur les boutons), en couche fine.\n• Au début, la peau peut être un peu irritée : espacez les applications si besoin, n'arrêtez pas tout.\n• Évitez de presser les boutons (risque de cicatrices). Utilisez des produits \"non comédogènes\".\n• Si vous utilisez un rétinoïde : protégez-vous du soleil.\n\nReconsultez si : acné très inflammatoire, nodules/kystes, cicatrices, ou retentissement moral important.",
  quand_adresser:["Formes sévères, nodulaires, cicatricielles ou résistantes (isotrétinoïne)","Suspicion d'hyperandrogénie chez la femme","Retentissement psychologique important"],
  suivi:["Réévaluation à 8-12 semaines","Adapter le traitement, prévenir les cicatrices"],
  source:SRC, source_url:SRC_URL,
  tags:["comédons","rétinoïde","peroxyde de benzoyle","isotrétinoïne"]
}
];

/* ---------------------------------------------------------------------
   NAVIGATION PAR SYMPTÔME
   --------------------------------------------------------------------- */
const SYMPTOMES = [
  { nom:"Prurit", icon:"🌀", dx:["gale","urticaire aiguë","dermatite atopique","eczéma de contact","mycose","cholestase","hémopathie"], ids:["gale","urticaire_aigue","dermatite_atopique","eczema_contact","dermatophytie"] },
  { nom:"Plaques rouges squameuses", icon:"🟥", dx:["psoriasis","dermatite séborrhéique","eczéma","mycose","lupus"], ids:["psoriasis","dermatite_seborrheique","eczema_contact","dermatophytie"] },
  { nom:"Vésicules", icon:"💧", dx:["varicelle","zona","herpès","eczéma aigu","dyshidrose"], ids:["varicelle","zona","herpes_cutaneomuqueux","eczema_contact","dyshidrose"] },
  { nom:"Bulles", icon:"🫧", dx:["pemphigoïde bulleuse","toxidermie","brûlure","impétigo bulleux"], ids:["pemphigoide_bulleuse","toxidermie","sjs_lyell","impetigo"] },
  { nom:"Croûtes jaunâtres", icon:"🟡", dx:["impétigo","surinfection d'eczéma","herpès impétiginisé"], ids:["impetigo","dermatite_atopique","herpes_cutaneomuqueux"] },
  { nom:"Lésion pigmentée", icon:"🟤", dx:["naevus","mélanome","lentigo","kératose séborrhéique"], ids:["naevus_atypique","melanome"] },
  { nom:"Lésion qui saigne", icon:"🩸", dx:["carcinome basocellulaire","carcinome épidermoïde","mélanome"], ids:["carcinome_basocellulaire","carcinome_epidermoide","melanome"] },
  { nom:"Ulcération", icon:"🕳️", dx:["cancer cutané","infection","vascularite","plaie chronique"], ids:["carcinome_epidermoide","carcinome_basocellulaire","syphilis"] },
  { nom:"Éruption fébrile", icon:"🌡️", dx:["varicelle","rougeole","scarlatine","toxidermie","méningococcémie (purpura fébrile)"], ids:["varicelle","toxidermie","purpura_febrile"] },
  { nom:"Pustules", icon:"⚪", dx:["acné","folliculite","impétigo","rosacée pustuleuse"], ids:["acne","folliculite","impetigo","rosacee"] },
  { nom:"Alopécie", icon:"💇", dx:["pelade","teigne","effluvium télogène","alopécie androgénétique"], ids:["teigne"] }
];

/* ---------------------------------------------------------------------
   NAVIGATION PAR LOCALISATION
   --------------------------------------------------------------------- */
const LOCALISATIONS = [
  { nom:"Cuir chevelu", icon:"🧑‍🦲", dx:["dermatite séborrhéique","psoriasis","teigne","pelade","folliculite"], ids:["dermatite_seborrheique","psoriasis","teigne","folliculite"] },
  { nom:"Visage", icon:"🙂", dx:["acné","rosacée","dermatite séborrhéique","lupus","impétigo","herpès"], ids:["acne","rosacee","dermatite_seborrheique","impetigo","herpes_cutaneomuqueux"] },
  { nom:"Paupières", icon:"👁️", dx:["eczéma de contact","blépharite","rosacée","zona ophtalmique"], ids:["eczema_contact","rosacee","zona"] },
  { nom:"Bouche / lèvres", icon:"👄", dx:["herpès","perlèche","aphtes","candidose","carcinome"], ids:["herpes_cutaneomuqueux","candidose","carcinome_epidermoide"] },
  { nom:"Tronc", icon:"👕", dx:["pityriasis rosé","zona","varicelle","psoriasis","mycose"], ids:["pityriasis_rose","zona","varicelle","psoriasis","dermatophytie"] },
  { nom:"Plis", icon:"🔀", dx:["candidose","intertrigo","psoriasis inversé","erythrasma"], ids:["candidose","dermatophytie","psoriasis"] },
  { nom:"Mains", icon:"🤲", dx:["eczéma","dyshidrose","gale","verrues","psoriasis"], ids:["eczema_contact","dyshidrose","gale","verrues","psoriasis"] },
  { nom:"Pieds", icon:"🦶", dx:["mycose","verrues plantaires","dyshidrose","intertrigo"], ids:["dermatophytie","verrues","dyshidrose"] },
  { nom:"Ongles", icon:"💅", dx:["mycose","psoriasis","mélanonychie","panaris"], ids:["dermatophytie","psoriasis","melanome"] },
  { nom:"Organes génitaux", icon:"⚧️", dx:["herpès","condylomes","syphilis","mycose","lichen scléreux"], ids:["herpes_genital","condylomes","syphilis","candidose","lichen_sclereux"] },
  { nom:"Enfant", icon:"🧒", dx:["dermatite atopique","impétigo","varicelle","molluscum","gale","teigne","érythème fessier"], ids:["dermatite_atopique","impetigo","varicelle","molluscum","gale","teigne","erytheme_fessier"] },
  { nom:"Sujet âgé", icon:"🧓", dx:["kératose actinique","carcinomes","pemphigoïde bulleuse","prurit sénile"], ids:["keratose_actinique","carcinome_basocellulaire","carcinome_epidermoide","pemphigoide_bulleuse"] }
];

/* ---------------------------------------------------------------------
   URGENCES / RED FLAGS
   --------------------------------------------------------------------- */
const URGENCES = {
  absolues: {
    titre:"Urgences absolues — appel SAMU / 15",
    intro:"Appel SAMU / urgences (15) immédiat si :",
    items:[
      { txt:"Purpura fébrile (taches ne s'effaçant pas à la vitropression + fièvre)", id:"purpura_febrile" },
      { txt:"Altération de l'état général avec éruption extensive", id:"toxidermie" },
      { txt:"Décollement cutané / signe de Nikolsky", id:"sjs_lyell" },
      { txt:"Bulles diffuses", id:"sjs_lyell" },
      { txt:"Atteinte muqueuse sévère (bouche, yeux, génitale)", id:"sjs_lyell" },
      { txt:"Suspicion de Stevens-Johnson / Lyell", id:"sjs_lyell" },
      { txt:"Fasciite nécrosante (douleur intense disproportionnée, nécrose)", id:"fasciite_necrosante" },
      { txt:"Érysipèle avec sepsis", id:"erysipele" },
      { txt:"Infection cutanée chez immunodéprimé sévère", id:"erysipele" },
      { txt:"Zona ophtalmique compliqué", id:"zona" },
      { txt:"Réaction allergique avec dyspnée ou œdème de Quincke", id:"urticaire_aigue" }
    ]
  },
  relatives: {
    titre:"Urgences relatives — avis dermatologique rapide",
    intro:"Avis dermatologique rapide si :",
    items:[
      { txt:"Suspicion de mélanome", id:"melanome" },
      { txt:"Lésion pigmentée évolutive", id:"melanome" },
      { txt:"Carcinome suspect", id:"carcinome_epidermoide" },
      { txt:"Plaie chronique atypique", id:"carcinome_epidermoide" },
      { txt:"Kératose actinique hypertrophique ou douloureuse", id:"keratose_actinique" },
      { txt:"Dermatose résistante au traitement bien conduit", id:null },
      { txt:"Éruption médicamenteuse extensive", id:"toxidermie" },
      { txt:"Prurit généralisé inexpliqué persistant", id:null },
      { txt:"Dermatose de l'enfant fébrile ou avec altération de l'état général", id:null }
    ]
  }
};

/* ---------------------------------------------------------------------
   DIAGNOSTIC DIFFÉRENTIEL INTELLIGENT (tableaux comparatifs)
   --------------------------------------------------------------------- */
const DIFFERENTIELS = [
  {
    titre:"Plaques squameuses du visage",
    colonnes:["Diagnostic","Arguments pour","Arguments contre","Orientation"],
    lignes:[
      ["Dermatite séborrhéique","Sillons nasogéniens, sourcils, squames grasses","Pas de plaques épaisses argentées","Traitement antifongique local"],
      ["Psoriasis","Plaques épaisses, coudes/genoux, cuir chevelu","Atteinte isolée du visage moins typique","Dermocorticoïde adapté / avis si doute"],
      ["Rosacée","Érythème centrofacial, flushs, papulo-pustules","Squames peu marquées","Traitement de la rosacée"],
      ["Lupus","Photosensibilité, lésions persistantes","Récidives grasses typiques absentes","Bilan / avis spécialisé"]
    ]
  },
  {
    titre:"Éruption vésiculeuse",
    colonnes:["Diagnostic","Arguments pour","Arguments contre","Orientation"],
    lignes:[
      ["Zona","Unilatéral, métamérique, douleur","Bilatéral / diffus","Antiviral < 72 h si indiqué ; avis si ophtalmique"],
      ["Herpès","Vésicules groupées récidivant au même site","Première poussée extensive","Antiviral oral, soins locaux"],
      ["Varicelle","Lésions d'âges différents, diffus, fébrile","Lésion localisée unique","Symptomatique (pas d'AINS)"],
      ["Dyshidrose","Faces latérales des doigts, prurit, poussées","Fièvre, atteinte métamérique","Dermocorticoïde fort"]
    ]
  },
  {
    titre:"Lésion pigmentée",
    colonnes:["Diagnostic","Arguments pour","Arguments contre","Orientation"],
    lignes:[
      ["Mélanome","ABCDE+, évolution, vilain petit canard","Stable depuis des années, symétrique","Exérèse + histologie RAPIDE"],
      ["Naevus atypique","Atypies mais stable","Modification récente","Surveillance dermatoscopique"],
      ["Kératose séborrhéique","Aspect \"posé\", verruqueux, bien limité","Asymétrie, polychromie évolutive","Bénin ; avis si doute"],
      ["CBC pigmenté","Perle, télangiectasies","Pigmentation très hétérogène évolutive","Avis dermatologique"]
    ]
  },
  {
    titre:"Intertrigo des plis",
    colonnes:["Diagnostic","Arguments pour","Arguments contre","Orientation"],
    lignes:[
      ["Candidose","Fond du pli rouge vernissé, pustules satellites","Bordure active nette périphérique","Antifongique local + assèchement"],
      ["Dermatophytie","Bordure active, centre plus clair","Fond du pli très atteint","Antifongique local ± oral"],
      ["Psoriasis inversé","Plaques bien limitées, autres localisations","Pustules satellites","Dermocorticoïde adapté"],
      ["Erythrasma","Placard brun chamois, fluorescence rouge corail (Wood)","Évolution annulaire active","Antibiotique local / avis"]
    ]
  }
];

/* ---------------------------------------------------------------------
   BASE MÉDICAMENTEUSE (classes thérapeutiques — médecine générale)
   --------------------------------------------------------------------- */
const MEDICAMENTS = [
  {
    classe:"Dermocorticoïdes", icon:"🧴",
    indications:["Eczéma / dermatite atopique","Psoriasis localisé","Lichen, eczéma de contact","Dermatoses inflammatoires"],
    ci:["Infection cutanée non traitée (bactérienne, virale, fongique)","Rosacée, dermite péri-orale (visage)","Acné"],
    grossesse:"Utilisables ponctuellement (préférer activité modérée, surfaces limitées) — vérifier CRAT.",
    ei:["Atrophie cutanée, vergetures (usage prolongé)","Télangiectasies","Rebond à l'arrêt brutal","Aggravation d'une infection méconnue"],
    duree:"Cures jusqu'à disparition des lésions ; éviter l'usage prolongé non encadré sur le visage/plis.",
    erreurs:["Sous-dosage par peur de la cortisone (quantité insuffisante)","Application sur peau saine","Usage prolongé sur le visage","Application sur une lésion infectée non traitée"],
    application:"Règle de la phalangette pour doser. 1 application/jour le plus souvent. Choisir l'activité selon la zone (faible : visage/plis ; forte : corps/paumes)."
  },
  {
    classe:"Émollients", icon:"💧",
    indications:["Xérose","Dermatite atopique (entretien)","Adjuvant de toute dermatose sèche"],
    ci:["Allergie à un composant (rare)"],
    grossesse:"Sans restriction.",
    ei:["Picotements sur peau lésée","Réactions de contact (rares, parfums)"],
    duree:"Quotidien, au long cours.",
    erreurs:["Arrêt en dehors des poussées (à poursuivre)","Quantité insuffisante"],
    application:"Application généreuse 1 à 2 fois/jour, idéalement après la douche sur peau légèrement humide. Éviter parfums sur peau lésée."
  },
  {
    classe:"Antifongiques locaux", icon:"🍄",
    indications:["Dermatophyties","Candidoses cutanées","Dermatite séborrhéique (kétoconazole)","Pityriasis versicolor"],
    ci:["Allergie au produit"],
    grossesse:"Plusieurs utilisables localement — vérifier CRAT au cas par cas.",
    ei:["Irritation locale, sensation de brûlure"],
    duree:"2 à 4 semaines en général (poursuivre quelques jours après guérison).",
    erreurs:["Arrêt trop précoce (rechute)","Association à un dermocorticoïde seul masquant la mycose"],
    application:"Déborder légèrement la lésion. 1 à 2 applications/jour selon le produit."
  },
  {
    classe:"Antifongiques systémiques", icon:"💊",
    indications:["Teigne (traitement systémique indispensable)","Onychomycose","Mycoses étendues / résistantes"],
    ci:["Insuffisance hépatique","Interactions médicamenteuses (terbinafine, azolés)","Grossesse (selon molécule)"],
    grossesse:"Souvent à éviter — vérifier CRAT/RCP ; avis avant prescription.",
    ei:["Troubles digestifs","Hépatotoxicité (surveillance)","Interactions (azolés ++)"],
    duree:"Plusieurs semaines (variable selon indication).",
    erreurs:["Prescrire sans prélèvement mycologique","Oublier les interactions médicamenteuses"],
    application:"Vérifier interactions et fonction hépatique. Teigne de l'enfant < 10 kg : prise en charge hospitalière."
  },
  {
    classe:"Antibiotiques locaux", icon:"🧫",
    indications:["Impétigo peu étendu (mupirocine, acide fusidique)","Surinfections localisées"],
    ci:["Allergie ; surfaces étendues (préférer voie générale)"],
    grossesse:"Possibles localement — vérifier CRAT.",
    ei:["Résistances bactériennes (usage prolongé)","Irritation, sensibilisation (acide fusidique)"],
    duree:"5 à 7 jours.",
    erreurs:["Usage prolongé/répété (résistances)","Traitement local d'une infection étendue"],
    application:"Sur lésions limitées, après nettoyage/ramollissement des croûtes."
  },
  {
    classe:"Antibiotiques per os", icon:"💊",
    indications:["Érysipèle (amoxicilline)","Impétigo étendu","Acné inflammatoire (cyclines, en association)","Furoncle compliqué"],
    ci:["Allergie","Cyclines : grossesse, allaitement, enfant < 8 ans (coloration dentaire)"],
    grossesse:"Amoxicilline utilisable ; cyclines contre-indiquées — vérifier CRAT.",
    ei:["Digestifs","Cyclines : photosensibilité","Allergies"],
    duree:"Selon indication (érysipèle 7 j ; acné : cure limitée ~3 mois).",
    erreurs:["Antibiotique seul et prolongé dans l'acné (résistances)","AINS associés dans l'érysipèle (à éviter)"],
    application:"Respecter la durée ; cyclines à distance des repas/produits laitiers, photoprotection."
  },
  {
    classe:"Antiviraux", icon:"🦠",
    indications:["Herpès (valaciclovir/aciclovir)","Zona (idéalement < 72 h)","Varicelle des terrains à risque"],
    ci:["Allergie ; adapter à la fonction rénale"],
    grossesse:"Aciclovir/valaciclovir utilisables si besoin — vérifier CRAT.",
    ei:["Digestifs, céphalées","Adapter en cas d'insuffisance rénale (neurotoxicité)"],
    duree:"Herpès 5 j ; zona 7 j.",
    erreurs:["Débuter trop tard (zona > 72 h : bénéfice moindre)","Ne pas adapter à la fonction rénale"],
    application:"Débuter le plus tôt possible (dès les prodromes). Hydratation, adaptation rénale."
  },
  {
    classe:"Antihistaminiques", icon:"🤧",
    indications:["Urticaire (2e génération)","Prurit","Adjuvant (atopie, varicelle)"],
    ci:["Allergie ; 1re génération : prudence (sédation, conduite, sujet âgé)"],
    grossesse:"Certains utilisables (ex. cétirizine, loratadine) — vérifier CRAT.",
    ei:["Somnolence (surtout 1re génération)","Effets anticholinergiques (1re génération)"],
    duree:"Selon indication ; urticaire chronique : au long cours.",
    erreurs:["Préférer la 1re génération (plus sédative) en 1re intention","Sous-dosage dans l'urticaire chronique"],
    application:"Privilégier la 2e génération (non sédative). Posologie majorable dans l'urticaire chronique (avis)."
  },
  {
    classe:"Kératolytiques", icon:"🧪",
    indications:["Verrues (acide salicylique)","Hyperkératoses","Adjuvant (psoriasis du cuir chevelu)"],
    ci:["Application sur peau saine/lésée étendue","Prudence chez le diabétique/artéritique (pieds)"],
    grossesse:"Surfaces limitées — prudence, vérifier CRAT.",
    ei:["Irritation, brûlure, plaie péri-lésionnelle"],
    duree:"Plusieurs semaines (verrues).",
    erreurs:["Ne pas protéger la peau autour","Poursuivre malgré une plaie/douleur"],
    application:"Sur la lésion uniquement, protéger la peau péri-lésionnelle. Arrêt si douleur/irritation."
  },
  {
    classe:"Traitements anti-acnéiques", icon:"🧼",
    indications:["Acné (rétinoïdes topiques, peroxyde de benzoyle, ± antibiotique local)"],
    ci:["Rétinoïdes : grossesse (topiques : prudence) — isotrétinoïne orale strictement encadrée","Irritation"],
    grossesse:"Isotrétinoïne CONTRE-INDIQUÉE (tératogène, contraception obligatoire) ; rétinoïdes topiques à éviter — vérifier CRAT.",
    ei:["Irritation, sécheresse, photosensibilité (rétinoïdes)","Peroxyde de benzoyle : décoloration des textiles"],
    duree:"Délai d'efficacité 6 à 8 semaines ; traitement prolongé.",
    erreurs:["Arrêt précoce (avant 6-8 semaines)","Application uniquement sur les boutons (traiter toute la zone)"],
    application:"Couche fine sur l'ensemble de la zone. Rétinoïde le soir, photoprotection. Espacer si irritation."
  },
  {
    classe:"Antiseptiques", icon:"🧷",
    indications:["Soins locaux (impétigo, varicelle, plaies)","Antisepsie cutanée"],
    ci:["Allergie ; muqueuses/yeux selon produit"],
    grossesse:"Chlorhexidine utilisable — vérifier produit/zone.",
    ei:["Irritation, sensibilisation"],
    duree:"Ponctuel.",
    erreurs:["Mélange d'antiseptiques (inactivation)","Usage prolongé non justifié"],
    application:"Antisepsie douce ; ne pas associer plusieurs antiseptiques différents."
  },
  {
    classe:"Soins de plaies", icon:"🩹",
    indications:["Plaies aiguës/chroniques","Ulcères, érosions post-bulleuses"],
    ci:["Selon le type de pansement et la plaie"],
    grossesse:"Selon produit.",
    ei:["Macération, allergie de contact"],
    duree:"Selon évolution.",
    erreurs:["Pansement inadapté au stade de la plaie","Négliger la cause (artérielle/veineuse)"],
    application:"Nettoyage, choix du pansement selon l'exsudat/le stade, traiter la cause sous-jacente."
  },
  {
    classe:"Photoprotection", icon:"🌞",
    indications:["Prévention des cancers cutanés / kératoses actiniques","Rosacée, lupus, photosensibilité, post-laser"],
    ci:["Allergie à un filtre (rare)"],
    grossesse:"Recommandée (mélasma).",
    ei:["Réaction de contact (rare)"],
    duree:"Au long cours, quotidien en cas de risque.",
    erreurs:["Quantité insuffisante / renouvellement oublié","Se fier à l'écran seul (vêtements/ombre aussi)"],
    application:"SPF 50+ sur les zones exposées, à renouveler ; associer vêtements couvrants et éviction des heures chaudes."
  }
];

/* ---------------------------------------------------------------------
   ALERTES TERRAIN (grossesse / allaitement / enfant / ID / IR / allergie)
   --------------------------------------------------------------------- */
const TERRAINS = [
  { id:"grossesse", label:"Grossesse", icon:"🤰",
    msg:"Adapter les traitements systémiques à la grossesse. Vérifier systématiquement le CRAT et le RCP avant prescription.",
    detail:["Éviter : isotrétinoïne (tératogène), cyclines (2e-3e trimestre), nombreux antifongiques systémiques.","Antiviraux (aciclovir/valaciclovir) utilisables si besoin.","Dermocorticoïdes : ponctuels, surfaces limitées, activité modérée de préférence.","Herpès génital / varicelle : enjeu materno-fœtal → avis obstétrical."] },
  { id:"allaitement", label:"Allaitement", icon:"🍼",
    msg:"Vérifier la compatibilité avec l'allaitement (CRAT). Éviter l'application sur le sein/zone de contact avec l'enfant.",
    detail:["Privilégier les traitements locaux à faible passage systémique.","Vérifier chaque molécule systémique sur le CRAT."] },
  { id:"nourrisson", label:"Nourrisson", icon:"👶",
    msg:"Adapter les posologies au poids. Certaines situations nécessitent un avis pédiatrique/dermatologique (ex. teigne < 10 kg : hospitalisation).",
    detail:["Dermocorticoïdes : activité adaptée, durée limitée, surfaces limitées.","Pas d'AINS dans la varicelle ; pas d'aspirine (Reye).","Éruption fébrile du nourrisson : vigilance, éliminer une urgence."] },
  { id:"enfant", label:"Enfant", icon:"🧒",
    msg:"Adapter les posologies au poids et rechercher les situations nécessitant un avis pédiatrique ou dermatologique.",
    detail:["Cyclines contre-indiquées avant 8 ans.","Varicelle : pas d'AINS ni d'aspirine.","Teigne : traitement systémique, hospitalisation si < 10 kg."] },
  { id:"immunodepression", label:"Immunodépression", icon:"🛡️",
    msg:"Risque de formes graves/atypiques et de surinfection. Seuil d'alerte et d'adressage abaissé.",
    detail:["Zona, varicelle, herpès : formes graves possibles → antiviraux, avis.","Infections cutanées : risque de diffusion.","Risque accru de cancers cutanés (surveillance rapprochée, transplantés)."] },
  { id:"insuffisance_renale", label:"Insuffisance rénale", icon:"🫘",
    msg:"Adapter les antiviraux (aciclovir/valaciclovir) et certains médicaments à la fonction rénale (risque de neurotoxicité).",
    detail:["Réduire la posologie/espacer selon la clairance.","Bonne hydratation."] },
  { id:"allergie", label:"Allergie médicamenteuse", icon:"⚠️",
    msg:"Vérifier les antécédents allergiques avant toute prescription (pénicillines, sulfamides, AINS…). Noter et tracer toute toxidermie.",
    detail:["Allergie aux pénicillines : alternatives (pristinamycine, macrolides selon indication).","Antécédent de toxidermie grave : éviction stricte, carte d'éviction."] }
];

/* ---------------------------------------------------------------------
   MODE APPRENTISSAGE — Cas cliniques
   --------------------------------------------------------------------- */
const CAS_CLINIQUES = [
  { id:"cas1", titre:"Enfant avec plaques croûteuses autour du nez", pathoId:"impetigo",
    enonce:"Enfant de 5 ans, en collectivité, présentant depuis quelques jours des lésions péri-narinaires avec des croûtes jaunâtres, sans fièvre.",
    qr:[
      ["Description dermatologique","Vésiculo-pustules superficielles péri-orificielles évoluant vers des croûtes jaunâtres (mélicériques), non fébriles."],
      ["Diagnostic probable","Impétigo (forme croûteuse)."],
      ["Diagnostics différentiels","Herpès, eczéma surinfecté, dermatophytie, varicelle."],
      ["Conduite à tenir","Antisepsie + antibiotique local si peu étendu (mupirocine/acide fusidique) ; antibiothérapie orale si étendu. Mesures d'hygiène, éviction scolaire."],
      ["Ordonnance éventuelle","Antibiotique local 2-3/j, 5-7 j après ramollissement des croûtes ; hygiène, linge personnel."],
      ["Red flags","Extension, fièvre/AEG, suspicion de SSSS chez le nourrisson, urines foncées (post-strepto)."],
      ["Conseil patient","Très contagieux : lavage des mains, ongles courts, éviction jusqu'à guérison (ou 48-72 h de traitement)."]
    ] },
  { id:"cas2", titre:"Douleur brûlante thoracique et vésicules unilatérales", pathoId:"zona",
    enonce:"Homme de 65 ans, douleur en hémi-ceinture thoracique depuis 3 jours, puis éruption vésiculeuse unilatérale ne dépassant pas la ligne médiane.",
    qr:[
      ["Description dermatologique","Vésicules groupées sur fond érythémateux, distribution métamérique unilatérale (un dermatome)."],
      ["Diagnostic probable","Zona (intercostal)."],
      ["Diagnostics différentiels","Herpès, dermite de contact, érysipèle ; avant l'éruption : douleur d'autre origine."],
      ["Conduite à tenir","Antiviral si indiqué (>50 ans, douleurs intenses) idéalement < 72 h ; antalgie adaptée ; soins locaux."],
      ["Ordonnance éventuelle","Valaciclovir 1 g x3/j, 7 j (adapter fonction rénale) + antalgiques."],
      ["Red flags","Zona ophtalmique (aile du nez, œil), forme généralisée/hémorragique, immunodépression."],
      ["Conseil patient","Contagiosité (varicelle) jusqu'à la phase croûteuse ; surveiller la douleur post-zostérienne."]
    ] },
  { id:"cas3", titre:"Homme de 70 ans, lésion rugueuse du front", pathoId:"keratose_actinique",
    enonce:"Patient de 70 ans, agriculteur retraité, phototype clair, plusieurs lésions rugueuses rosées du front et du cuir chevelu dégarni.",
    qr:[
      ["Description dermatologique","Lésions kératosiques rugueuses, mieux palpées que vues, sur peau héliodermique (champ de cancérisation)."],
      ["Diagnostic probable","Kératoses actiniques."],
      ["Diagnostics différentiels","Carcinome épidermoïde, carcinome basocellulaire, kératose séborrhéique, psoriasis/DS."],
      ["Conduite à tenir","Cryothérapie des lésions isolées / traitement de champ ; photoprotection ; avis si lésion suspecte."],
      ["Ordonnance éventuelle","Photoprotection SPF 50+ ; traitement topique de champ selon avis dermatologique."],
      ["Red flags","Lésion indurée, douloureuse, ulcérée, saignante, résistante → avis dermatologique rapide (carcinome épidermoïde)."],
      ["Conseil patient","Protection solaire quotidienne ; auto-surveillance des lésions qui changent."]
    ] },
  { id:"cas4", titre:"Femme avec plaques rouges des sillons nasogéniens", pathoId:"dermatite_seborrheique",
    enonce:"Femme de 35 ans, érythème et squames grasses des sillons nasogéniens et des sourcils, aggravés par la fatigue.",
    qr:[
      ["Description dermatologique","Plaques érythémateuses à squames grasses jaunâtres des zones séborrhéiques."],
      ["Diagnostic probable","Dermatite séborrhéique."],
      ["Diagnostics différentiels","Psoriasis, rosacée, lupus, dermatite atopique."],
      ["Conduite à tenir","Antifongique local (kétoconazole) ± dermocorticoïde modéré en cure courte ; entretien."],
      ["Ordonnance éventuelle","Kétoconazole 2 % 1/j 2-4 semaines puis entretien ; shampooing antifongique si cuir chevelu."],
      ["Red flags","Forme profuse/résistante → envisager une sérologie VIH."],
      ["Conseil patient","Maladie chronique récidivante ; traitement d'entretien ; le soleil améliore souvent."]
    ] },
  { id:"cas5", titre:"Enfant avec prurit familial nocturne", pathoId:"gale",
    enonce:"Enfant de 8 ans, prurit intense à recrudescence nocturne depuis 3 semaines ; la mère et un frère se grattent aussi.",
    qr:[
      ["Description dermatologique","Lésions de grattage diffuses ; sillons et vésicules perlées des espaces interdigitaux/poignets ; caractère familial."],
      ["Diagnostic probable","Gale."],
      ["Diagnostics différentiels","Eczéma, prurigo, autres causes de prurit."],
      ["Conduite à tenir","Traiter le patient ET tout le foyer simultanément ; décontamination du linge."],
      ["Ordonnance éventuelle","Ivermectine 200 µg/kg J1 et J7-14 (± perméthrine), traitement de toute la famille, linge à 60 °C."],
      ["Red flags","Gale croûteuse (immunodéprimé), surinfection."],
      ["Conseil patient","Le prurit peut durer 2-4 semaines après un traitement efficace ; traiter le linge et l'entourage."]
    ] },
  { id:"cas6", titre:"Lésion pigmentée changeante du dos", pathoId:"melanome",
    enonce:"Femme de 45 ans, phototype clair ; un grain de beauté du dos a changé de taille et de couleur ces derniers mois, avec des bords irréguliers.",
    qr:[
      ["Description dermatologique","Lésion pigmentée asymétrique, bords irréguliers, polychrome, en évolution (ABCDE+)."],
      ["Diagnostic probable","Mélanome à éliminer en priorité."],
      ["Diagnostics différentiels","Naevus atypique, kératose séborrhéique, CBC pigmenté."],
      ["Conduite à tenir","Adresser RAPIDEMENT au dermatologue ; exérèse complète pour histologie (jamais de destruction)."],
      ["Ordonnance éventuelle","Aucune destruction ; orientation dermatologique rapide."],
      ["Red flags","Asymétrie, bords irréguliers, plusieurs couleurs, diamètre > 6 mm, évolution, saignement, nodule."],
      ["Conseil patient","Auto-surveillance ABCDE, photoprotection, dépistage des proches."]
    ] },
  { id:"cas7", titre:"Plaques squameuses coudes/genoux/cuir chevelu", pathoId:"psoriasis",
    enonce:"Homme de 30 ans, plaques épaisses bien limitées à squames argentées des coudes, genoux et cuir chevelu, évoluant par poussées.",
    qr:[
      ["Description dermatologique","Plaques érythémato-squameuses bien limitées, squames blanches épaisses, faces d'extension."],
      ["Diagnostic probable","Psoriasis en plaques."],
      ["Diagnostics différentiels","Dermatite séborrhéique, eczéma, mycose, pityriasis rosé."],
      ["Conduite à tenir","Dermocorticoïde ± analogue vitamine D ; émollients ; rechercher une atteinte articulaire."],
      ["Ordonnance éventuelle","Association calcipotriol/bétaméthasone 1/j 4 semaines ; émollient ; traitement du cuir chevelu."],
      ["Red flags","Érythrodermie, forme pustuleuse généralisée, rhumatisme psoriasique."],
      ["Conseil patient","Maladie chronique non contagieuse ; éviter de gratter (Koebner) ; arrêt tabac/alcool."]
    ] },
  { id:"cas8", titre:"Éruption fébrile vésiculeuse chez un enfant", pathoId:"varicelle",
    enonce:"Enfant de 4 ans, fièvre modérée puis éruption de vésicules prurigineuses d'âges différents sur le tronc, le visage et le cuir chevelu.",
    qr:[
      ["Description dermatologique","Vésicules sur fond érythémateux, d'âges différents (macules, vésicules, croûtes coexistantes), prurigineuses."],
      ["Diagnostic probable","Varicelle."],
      ["Diagnostics différentiels","Impétigo, prurigo, eczéma herpeticum."],
      ["Conduite à tenir","Symptomatique : antiseptie, antihistaminique, paracétamol ; PAS d'AINS ni d'aspirine ; éviction."],
      ["Ordonnance éventuelle","Paracétamol, chlorhexidine aqueuse, antihistaminique si prurit ; ongles courts."],
      ["Red flags","Surinfection (boutons rouges/douloureux), gêne respiratoire, somnolence, adulte/immunodéprimé/grossesse."],
      ["Conseil patient","Contagieux jusqu'à la phase croûteuse ; éviter les personnes fragiles ; pas d'ibuprofène/aspirine."]
    ] }
];

/* ---------------------------------------------------------------------
   QCM
   --------------------------------------------------------------------- */
const QCM = [
  { q:"Quel est le traitement de référence des poussées de dermatite atopique ?", options:["Antibiotiques oraux","Dermocorticoïdes","Antihistaminiques seuls","Antifongiques"], bonne:1,
    expl:"Les dermocorticoïdes sont le traitement de référence des poussées ; les émollients sont indispensables en entretien. Les explorations allergologiques sont le plus souvent inutiles." },
  { q:"Devant un zona, dans quel délai l'antiviral doit-il idéalement être débuté quand il est indiqué ?", options:["Dans les 72 premières heures","Au-delà de 7 jours","Uniquement après cicatrisation","Indifférent"], bonne:0,
    expl:"L'antiviral est d'autant plus efficace qu'il est débuté tôt, idéalement dans les 72 premières heures de l'éruption." },
  { q:"Quelle proposition est vraie concernant les verrues ?", options:["Elles nécessitent toujours un traitement destructeur","La moitié disparaissent spontanément en moins d'un an","Elles sont toujours douloureuses","Elles sont d'origine bactérienne"], bonne:1,
    expl:"Les verrues sont dues au HPV ; environ la moitié régressent spontanément en moins d'un an. L'abstention est une option raisonnable." },
  { q:"La kératose actinique doit être considérée comme :", options:["Une lésion strictement bénigne sans risque","Un carcinome épidermoïde au stade le plus précoce","Une mycose","Un naevus"], bonne:1,
    expl:"Elle est considérée comme un carcinome épidermoïde au stade le plus précocement identifiable ; surveillance et photoprotection." },
  { q:"Quel signe impose un avis ophtalmologique urgent au cours d'un zona ?", options:["Atteinte de l'aile du nez","Vésicules thoraciques","Prurit","Fièvre isolée"], bonne:0,
    expl:"L'atteinte de l'aile du nez (signe de Hutchinson), un œdème palpébral, une baisse d'acuité visuelle ou une hyperhémie conjonctivale imposent un avis ophtalmologique urgent." },
  { q:"Devant un purpura fébrile avec un élément nécrotique, la priorité est :", options:["Faire un bilan sanguin avant tout traitement","Antibiothérapie immédiate + appel du 15","Prescrire un antihistaminique","Surveiller à domicile 24 h"], bonne:1,
    expl:"Purpura fébrile = éliminer un purpura fulminans : antibiothérapie en urgence (ceftriaxone/céfotaxime) sans délai et appel du SAMU 15." },
  { q:"Dans la gale, quelle mesure est indispensable ?", options:["Traiter uniquement le patient symptomatique","Traiter simultanément l'entourage et le linge","Attendre la fin du prurit pour traiter","Prescrire un antibiotique oral"], bonne:1,
    expl:"Il faut traiter simultanément le patient, l'entourage et l'environnement (linge à 60 °C). Le prurit peut persister 2-4 semaines après guérison." },
  { q:"Quel élément distingue la rosacée de l'acné ?", options:["Présence de comédons dans la rosacée","Absence de comédons dans la rosacée","La rosacée touche surtout les adolescents","La rosacée n'a jamais de pustules"], bonne:1,
    expl:"La rosacée ne comporte pas de comédons (contrairement à l'acné) et touche l'adulte ; les dermocorticoïdes l'aggravent." },
  { q:"Quelle affirmation est vraie pour l'impétigo ?", options:["Il n'est pas contagieux","Les croûtes mélicériques (jaunâtres) sont caractéristiques","Il nécessite toujours une hospitalisation","C'est une infection virale"], bonne:1,
    expl:"L'impétigo est une infection bactérienne très contagieuse ; les croûtes jaunâtres (mélicériques) sont évocatrices. Forme localisée : antibiotique local." },
  { q:"Devant une lésion pigmentée suspecte de mélanome, il faut :", options:["La détruire par cryothérapie","Réaliser/adresser pour une exérèse complète avec histologie","Surveiller 1 an avant d'agir","Appliquer un dermocorticoïde"], bonne:1,
    expl:"On ne détruit JAMAIS une lésion pigmentée suspecte : exérèse complète avec analyse histologique, en orientant rapidement." },
  { q:"Dans la varicelle de l'enfant, quels traitements sont à éviter ?", options:["Le paracétamol","Les AINS et l'aspirine","Les antiseptiques locaux","Les antihistaminiques"], bonne:1,
    expl:"Les AINS (risque de surinfection grave) et l'aspirine (syndrome de Reye) sont à éviter ; le paracétamol est recommandé pour la fièvre." },
  { q:"La teigne du cuir chevelu nécessite :", options:["Un traitement local seul","Un traitement local ET systémique","Aucun traitement","Une simple antisepsie"], bonne:1,
    expl:"La teigne nécessite un antifongique systémique associé à un traitement local ; enfant < 10 kg : prise en charge hospitalière." }
];

/* ---------------------------------------------------------------------
   FLASHCARDS
   --------------------------------------------------------------------- */
const FLASHCARDS = [
  { recto:"Traitement de référence des poussées de dermatite atopique ?", verso:"Dermocorticoïdes (+ émollients quotidiens en entretien). Allergologie le plus souvent inutile." },
  { recto:"Délai idéal de l'antiviral dans le zona ?", verso:"Dans les 72 premières heures de l'éruption, quand il est indiqué." },
  { recto:"Red flag du zona imposant un avis ophtalmologique urgent ?", verso:"Atteinte de l'aile du nez (Hutchinson), œdème palpébral, baisse d'acuité visuelle, hyperhémie conjonctivale." },
  { recto:"Évolution spontanée des verrues ?", verso:"≈ 50 % disparaissent en moins d'un an → abstention possible si pas de gêne." },
  { recto:"Statut de la kératose actinique ?", verso:"Carcinome épidermoïde au stade le plus précoce. Photoprotection + surveillance." },
  { recto:"Purpura fébrile : conduite ?", verso:"Éliminer un purpura fulminans : antibiothérapie immédiate (ceftriaxone/céfotaxime) + SAMU 15." },
  { recto:"Croûtes mélicériques (jaune miel) ?", verso:"Impétigo (infection bactérienne contagieuse)." },
  { recto:"Règle ABCDE du mélanome ?", verso:"Asymétrie, Bords irréguliers, Couleurs multiples, Diamètre > 6 mm, Évolution." },
  { recto:"Gale : règle de traitement ?", verso:"Traiter le patient + l'entourage + le linge simultanément. Prurit possible 2-4 sem après guérison." },
  { recto:"Différence acné / rosacée ?", verso:"Comédons présents dans l'acné, absents dans la rosacée. Rosacée = adulte, flushs ; pas de dermocorticoïdes." },
  { recto:"Teigne du cuir chevelu : traitement ?", verso:"Antifongique systémique + local. Enfant < 10 kg : hospitalisation." },
  { recto:"Érysipèle : antibiotique de 1re intention et antalgique à éviter ?", verso:"Amoxicilline en 1re intention ; éviter les AINS. Réévaluer à 48-72 h." },
  { recto:"Signe de Nikolsky positif ?", verso:"Décollement cutané à la pression → toxidermie grave (SJS/Lyell) : urgence." },
  { recto:"Varicelle : médicaments à éviter ?", verso:"AINS (surinfection) et aspirine (Reye)." },
  { recto:"Condylomes : bilan associé ?", verso:"Frottis cervical selon âge, examen anal/anuscopie si besoin, dépistage IST, partenaire, vaccination HPV." }
];

/* ---------------------------------------------------------------------
   DERMATOSCOPIE MG
   --------------------------------------------------------------------- */
const DERMATOSCOPIE = {
  intro:"Module court d'aide pour le médecin généraliste équipé d'un dermatoscope. Outil d'orientation : ne remplace pas l'avis dermatologique.",
  blocs:[
    { titre:"Règle ABCDE", items:["A — Asymétrie","B — Bords irréguliers","C — Couleurs multiples (≥ 2-3)","D — Diamètre > 6 mm","E — Évolution (taille, forme, couleur, symptômes)"] },
    { titre:"Signe du vilain petit canard", items:["Un naevus qui se distingue nettement des autres naevi du patient est suspect, même s'il ne coche pas tous les critères ABCDE."] },
    { titre:"Critères d'alerte — mélanome", items:["Réseau pigmenté atypique","Voile bleu-blanc","Stries/pseudopodes irréguliers en périphérie","Points/globules irréguliers","Régression, polychromie"] },
    { titre:"Critères d'alerte — carcinome basocellulaire", items:["Télangiectasies arborescentes","Structures bleu-gris (nids ovoïdes, globules)","Ulcération","Aspect perlé translucide","Absence de réseau pigmenté typique"] },
    { titre:"Critères d'alerte — carcinome épidermoïde", items:["Masses kératosiques","Vaisseaux glomérulaires/en épingle","Points blancs, halos blancs périfolliculaires","Ulcération, saignement"] },
    { titre:"Quand téléexpertiser / adresser", items:["Doute diagnostique persistant","Lésion à critères d'alerte mais accessibilité dermatologique différée → téléexpertise","Patient à haut risque (antécédents, naevi atypiques)"] },
    { titre:"Quand adresser rapidement / biopsier-exciser", items:["Lésion pigmentée évolutive, asymétrique, polychrome","Lésion nodulaire, ulcérée, saignante","Discordance clinico-dermatoscopique","NE JAMAIS détruire une lésion pigmentée suspecte : exérèse pour histologie"] }
  ],
  securite:"Message de sécurité : toute lésion pigmentée évolutive, nodulaire, ulcérée, saignante ou cliniquement discordante doit être adressée rapidement en dermatologie, même si l'algorithme semble rassurant."
};

/* ---------------------------------------------------------------------
   AIDE IA / LECTURE D'IMAGE (grille d'analyse structurée — pas d'IA réelle)
   --------------------------------------------------------------------- */
const ANALYSE_IMAGE = {
  avertissement:"Outil d'aide à l'analyse structurée d'une image dermatologique. Il NE pose JAMAIS de diagnostic définitif. L'examen clinique, la palpation et la dermatoscopie restent indispensables. En cas de doute : avis spécialisé.",
  grille:["Localisation","Nombre de lésions","Couleur","Forme","Bordures","Relief","Squames / croûtes / vésicules / bulles","Ulcération / saignement","Évolution selon le patient","Hypothèses compatibles","Diagnostics à ne pas manquer","Conduite à tenir"],
  redflags:["Lésion pigmentée asymétrique","Bords irréguliers","Plusieurs couleurs","Évolution rapide","Diamètre > 6 mm","Saignement spontané","Ulcération","Nodule pigmenté","Lésion noire nouvelle","Lésion chez immunodéprimé","Plaie chronique non cicatrisante"]
};

/* ---------------------------------------------------------------------
   SOURCES
   --------------------------------------------------------------------- */
const SOURCES = {
  principale:{ nom:"Dermatoclic — Aide thérapeutique en dermatologie pour les médecins généralistes", url:"https://www.dermatoclic.com",
    desc:"Outil indépendant d'aide thérapeutique en dermatologie destiné aux médecins généralistes pendant la consultation : pathologies fréquentes sous forme d'arbres décisionnels, avec des références issues de recommandations nationales, internationales ou de sociétés savantes." },
  note:"Les contenus de cette application sont REFORMULÉS à partir des recommandations et des arbres décisionnels disponibles sur Dermatoclic, ainsi que des recommandations en vigueur (HAS, sociétés savantes). Ils doivent être régulièrement vérifiés et mis à jour. Aucun texte protégé n'est reproduit intégralement ; aucune image source protégée n'est copiée.",
  autres:[
    "HAS — Haute Autorité de Santé (recommandations)",
    "CRAT — Centre de Référence sur les Agents Tératogènes (grossesse/allaitement)",
    "Sociétés savantes de dermatologie (recommandations nationales et internationales)",
    "RCP / Vidal des médicaments cités"
  ]
};

/* ---------------------------------------------------------------------
   AIDE VISUELLE — Lésions élémentaires (schémas originaux pédagogiques)
   Les schémas (SVG) sont générés dans app.js, sans reproduction d'images
   protégées. Vue de la peau en coupe.
   --------------------------------------------------------------------- */
const LESIONS_ELEMENTAIRES = [
  { id:"macule", svg:"macule", nom:"Macule", groupe:"Lésion primitive",
    definition:"Tache plane, visible mais NON palpable, de couleur différente de la peau normale (sans relief ni infiltration).",
    exemples:["Vitiligo (achromique)","Lentigo / éphélides","Purpura","Exanthème maculeux viral"] },
  { id:"papule", svg:"papule", nom:"Papule", groupe:"Lésion primitive",
    definition:"Élevure solide, circonscrite, palpable, de petite taille (< 1 cm), ressortant au-dessus du plan cutané.",
    exemples:["Lichen plan","Acné (papule inflammatoire)","Verrue plane","Prurigo"] },
  { id:"plaque", svg:"plaque", nom:"Plaque", groupe:"Lésion primitive",
    definition:"Lésion en relief à surface plane et étendue (> 1 cm), souvent formée par la confluence de papules.",
    exemples:["Psoriasis en plaques","Eczéma","Mycosis fongoïde"] },
  { id:"nodule", svg:"nodule", nom:"Nodule", groupe:"Lésion primitive",
    definition:"Lésion solide, palpable, plus profonde (dermique ou hypodermique), de taille > 1 cm.",
    exemples:["Érythème noueux","Kyste / lipome","Carcinome nodulaire"] },
  { id:"vesicule", svg:"vesicule", nom:"Vésicule", groupe:"Lésion primitive",
    definition:"Soulèvement circonscrit de l'épiderme contenant un liquide clair, de petite taille (< 5 mm).",
    exemples:["Herpès","Varicelle / zona","Eczéma aigu","Dyshidrose"] },
  { id:"bulle", svg:"bulle", nom:"Bulle", groupe:"Lésion primitive",
    definition:"Collection liquidienne intra- ou sous-épidermique de grande taille (> 5 mm).",
    exemples:["Pemphigoïde bulleuse","Brûlure","Impétigo bulleux","Toxidermie bulleuse"] },
  { id:"pustule", svg:"pustule", nom:"Pustule", groupe:"Lésion primitive",
    definition:"Soulèvement épidermique contenant un liquide purulent (pus), blanc-jaunâtre.",
    exemples:["Acné","Folliculite","Psoriasis pustuleux"] },
  { id:"papule_oedemateuse", svg:"oedeme", nom:"Papule œdémateuse (urticaire)", groupe:"Lésion primitive",
    definition:"Papule ou plaque œdémateuse, rosée à bord net, FUGACE et migratrice (< 24 h au même endroit).",
    exemples:["Urticaire aiguë / chronique"] },
  { id:"squame", svg:"squame", nom:"Squame", groupe:"Lésion secondaire",
    definition:"Lamelle de couche cornée se détachant de la surface de la peau (desquamation).",
    exemples:["Psoriasis","Dermatite séborrhéique","Pityriasis","Dermatophytie"] },
  { id:"croute", svg:"croute", nom:"Croûte", groupe:"Lésion secondaire",
    definition:"Concrétion due au dessèchement d'une sérosité, de pus ou de sang à la surface de la peau.",
    exemples:["Impétigo (croûtes mélicériques)","Herpès","Eczéma surinfecté"] },
  { id:"erosion", svg:"erosion", nom:"Érosion", groupe:"Lésion secondaire",
    definition:"Perte de substance SUPERFICIELLE (épiderme), cicatrisant SANS séquelle.",
    exemples:["Aphte","Post-vésicule / post-bulle","Érosion muqueuse"] },
  { id:"ulceration", svg:"ulceration", nom:"Ulcération", groupe:"Lésion secondaire",
    definition:"Perte de substance PROFONDE (derme ± hypoderme), cicatrisant AVEC cicatrice.",
    exemples:["Ulcère de jambe","Carcinome ulcéré","Chancre"] },
  { id:"atrophie", svg:"atrophie", nom:"Atrophie", groupe:"Lésion secondaire",
    definition:"Amincissement de la peau qui devient fine, lisse, plissée et translucide.",
    exemples:["Vieillissement cutané","Corticothérapie locale prolongée","Lichen scléreux"] },
  { id:"lichenification", svg:"lichen", nom:"Lichénification", groupe:"Lésion secondaire",
    definition:"Épaississement de la peau avec accentuation du quadrillage normal, secondaire au grattage chronique.",
    exemples:["Eczéma chronique","Prurigo","Névrodermite"] },
  { id:"fissure", svg:"fissure", nom:"Fissure", groupe:"Lésion secondaire",
    definition:"Perte de substance linéaire (crevasse) traversant l'épiderme, souvent douloureuse.",
    exemples:["Eczéma des mains","Intertrigo","Perlèche"] }
];

/* ---------------------------------------------------------------------
   AIDE VISUELLE — Structures dermatoscopiques (schémas originaux)
   Vue de la lésion au dermatoscope (champ circulaire).
   --------------------------------------------------------------------- */
const LESIONS_DERMATO = [
  { id:"reseau_typique", svg:"reseau_typique", nom:"Réseau pigmenté typique", alerte:0,
    definition:"Mailles fines, régulières et homogènes, à espacement régulier, s'estompant en périphérie. En faveur d'une lésion mélanocytaire bénigne.",
    exemples:["Naevus commun"] },
  { id:"reseau_atypique", svg:"reseau_atypique", nom:"Réseau pigmenté atypique", alerte:2,
    definition:"Mailles épaisses, irrégulières, de couleur et d'espacement variables, interrompues brutalement. Critère de suspicion de mélanome.",
    exemples:["Mélanome","Naevus atypique"] },
  { id:"points_globules", svg:"points_globules", nom:"Points et globules", alerte:1,
    definition:"Amas pigmentés ronds (globules) ou punctiformes (points). Réguliers et centraux = rassurant ; irréguliers et périphériques = suspect.",
    exemples:["Naevus","Mélanome (si irréguliers)"] },
  { id:"stries", svg:"stries", nom:"Stries radiaires / pseudopodes", alerte:2,
    definition:"Projections pigmentées linéaires (stries) ou bulbeuses (pseudopodes) à la périphérie. Irrégulières et asymétriques = mélanome.",
    exemples:["Mélanome à extension superficielle","Naevus de Spitz"] },
  { id:"voile_bleu_blanc", svg:"voile", nom:"Voile bleu-blanc", alerte:2,
    definition:"Plage bleutée translucide, irrégulière, recouvrant la lésion. Critère fort de mélanome (pigment profond).",
    exemples:["Mélanome"] },
  { id:"regression", svg:"regression", nom:"Zones de régression", alerte:2,
    definition:"Plages blanches cicatricielles associées à un granité gris-bleu (« poivre »). Témoignent d'une régression : à surveiller.",
    exemples:["Mélanome en régression"] },
  { id:"telangiectasies", svg:"telangiectasies", nom:"Télangiectasies arborescentes", alerte:1,
    definition:"Vaisseaux rouges ramifiés, nets, à branches qui se divisent. Très évocateur de carcinome basocellulaire.",
    exemples:["Carcinome basocellulaire"] },
  { id:"nids_bleu_gris", svg:"nids", nom:"Nids ovoïdes bleu-gris / feuilles d'érable", alerte:1,
    definition:"Structures bleu-gris en nids ovoïdes ou en « feuilles d'érable » à la périphérie. Évocateur de carcinome basocellulaire pigmenté.",
    exemples:["Carcinome basocellulaire pigmenté"] },
  { id:"vaisseaux_glomerulaires", svg:"glomerulaires", nom:"Vaisseaux glomérulaires", alerte:1,
    definition:"Vaisseaux groupés « en pelote » (glomérule). Évocateurs de carcinome épidermoïde in situ (maladie de Bowen).",
    exemples:["Maladie de Bowen","Carcinome épidermoïde"] },
  { id:"comedons_milia", svg:"comedons", nom:"Comédons et kystes milia", alerte:0,
    definition:"Bouchons cornés (pseudo-comédons, points bruns/noirs) et kystes milia (globules blanc-jaune). Aspect bénin de kératose séborrhéique.",
    exemples:["Kératose séborrhéique"] }
];

const AIDE_VISUELLE_NOTE = "Schémas originaux et illustrations à visée pédagogique (images générées, et non des photographies de patients réels) — ils ne remplacent pas l'observation de lésions réelles ni la dermatoscopie. En cas de doute : avis dermatologique.";

/* Expose global */
const DERMATO_DB = {
  NIVEAUX, PATHOLOGIES, SYMPTOMES, LOCALISATIONS, URGENCES, DIFFERENTIELS,
  MEDICAMENTS, TERRAINS, CAS_CLINIQUES, QCM, FLASHCARDS, DERMATOSCOPIE,
  ANALYSE_IMAGE, SOURCES, SRC, SRC_URL,
  LESIONS_ELEMENTAIRES, LESIONS_DERMATO, AIDE_VISUELLE_NOTE
};
if (typeof window !== "undefined") window.DERMATO_DB = DERMATO_DB;
