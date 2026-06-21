/* ============================================================
   MODÈLES DE COURRIERS (16) + champs du générateur
   urgence : prog | urg | samu  ->  pastille
   ============================================================ */

window.COURRIERS = {
 "neuro_standard":{titre:"Neurologue (consultation standard)", dest:"Cher Confrère, chère Consœur (Neurologie)", urgence:"prog",
   objet:"Demande d'avis neurologique", motifAvis:"Je vous adresse ce patient pour avis diagnostique et thérapeutique."},
 "neuro_urgent":{titre:"Neurologue (avis urgent)", dest:"Cher Confrère, chère Consœur (Neurologie)", urgence:"urg",
   objet:"Demande d'avis neurologique URGENT", motifAvis:"Je vous adresse ce patient pour avis neurologique rapide compte tenu des éléments ci-dessous."},
 "urgences_avc":{titre:"Urgences neurovasculaires (UNV)", dest:"Service des Urgences / Unité Neuro-Vasculaire", urgence:"samu",
   objet:"Suspicion d'AVC / AIT — transfert en urgence", motifAvis:"Patient présentant un déficit neurologique d'apparition brutale. Transfert régulé par le 15 pour prise en charge en urgence (fenêtre thérapeutique)."},
 "imagerie":{titre:"Imagerie cérébrale (TDM/IRM)", dest:"Service d'Imagerie médicale", urgence:"urg",
   objet:"Demande d'imagerie cérébrale", motifAvis:"Merci de réaliser l'examen d'imagerie ci-dessous précisé, dans le cadre du bilan exposé."},
 "irm_medullaire":{titre:"IRM médullaire", dest:"Service d'Imagerie médicale", urgence:"urg",
   objet:"Demande d'IRM médullaire", motifAvis:"Merci de réaliser une IRM médullaire pour le bilan d'un syndrome médullaire/radiculaire."},
 "eeg":{titre:"EEG / Neurophysiologie", dest:"Service de Neurophysiologie clinique", urgence:"prog",
   objet:"Demande d'électroencéphalogramme", motifAvis:"Merci de réaliser un EEG dans le cadre du bilan exposé ci-dessous."},
 "enmg":{titre:"ENMG / Électromyographie", dest:"Service de Neurophysiologie clinique", urgence:"prog",
   objet:"Demande d'ENMG", motifAvis:"Merci de réaliser un examen électroneuromyographique pour caractériser l'atteinte ci-dessous."},
 "sommeil":{titre:"Centre du sommeil", dest:"Centre d'exploration des troubles du sommeil", urgence:"prog",
   objet:"Demande d'exploration du sommeil", motifAvis:"Je vous adresse ce patient pour exploration d'un trouble du sommeil (cf. questionnaires ci-dessous)."},
 "orl_vestibulaire":{titre:"ORL / bilan vestibulaire", dest:"Cher Confrère, chère Consœur (ORL)", urgence:"prog",
   objet:"Demande d'avis ORL / vestibulaire", motifAvis:"Je vous adresse ce patient pour bilan d'un vertige / de signes cochléo-vestibulaires."},
 "neurochirurgie":{titre:"Neurochirurgie", dest:"Service de Neurochirurgie", urgence:"urg",
   objet:"Demande d'avis neurochirurgical", motifAvis:"Je vous adresse ce patient pour avis neurochirurgical (cf. éléments ci-dessous)."},
 "kine_vestibulaire":{titre:"Kiné vestibulaire", dest:"Cher Confrère, chère Consœur (Masso-kinésithérapie)", urgence:"prog",
   objet:"Demande de rééducation vestibulaire", motifAvis:"Merci de prendre en charge ce patient pour rééducation vestibulaire (manœuvres et exercices d'habituation)."},
 "kine_neuro":{titre:"Kiné neurologique", dest:"Cher Confrère, chère Consœur (Masso-kinésithérapie)", urgence:"prog",
   objet:"Demande de rééducation neurologique", motifAvis:"Merci de prendre en charge ce patient pour rééducation neuro-motrice et de l'équilibre."},
 "parkinson":{titre:"Parkinson / mouvements anormaux", dest:"Cher Confrère, chère Consœur (Neurologie — mouvements anormaux)", urgence:"prog",
   objet:"Avis pour syndrome parkinsonien / mouvement anormal", motifAvis:"Je vous adresse ce patient pour avis diagnostique et thérapeutique sur un syndrome parkinsonien / un mouvement anormal."},
 "cephalees":{titre:"Céphalées chroniques", dest:"Consultation Céphalées / Neurologie", urgence:"prog",
   objet:"Avis pour céphalées chroniques", motifAvis:"Je vous adresse ce patient pour prise en charge de céphalées chroniques (cf. agenda et traitements essayés)."},
 "sep":{titre:"Suspicion SEP", dest:"Consultation Neurologie / Centre SEP", urgence:"urg",
   objet:"Suspicion de sclérose en plaques / poussée", motifAvis:"Je vous adresse ce patient pour suspicion de pathologie démyélinisante / poussée (cf. tableau ci-dessous)."},
 "queue_cheval":{titre:"Queue de cheval / urgences", dest:"Urgences / Neurochirurgie", urgence:"samu",
   objet:"Suspicion de syndrome de la queue de cheval — URGENCE", motifAvis:"Suspicion de syndrome de la queue de cheval. Transfert en urgence pour IRM et avis neurochirurgical sans délai."},
 "cardio_syncope":{titre:"Cardiologue (syncope)", dest:"Cher Confrère, chère Consœur (Cardiologie)", urgence:"urg",
   objet:"Bilan de syncope", motifAvis:"Je vous adresse ce patient pour bilan d'une syncope (cf. ECG et éléments de gravité ci-dessous)."}
};
