# Modèle de données

## 1. Format d'une fiche (base de connaissances)

Chaque symptôme est un objet de `window.KB` (fichier `data/knowledge-base.js`).
Format effectivement utilisé par le moteur :

```jsonc
{
  "id": "acouphene",
  "symptome": "Acouphène (bruit dans l'oreille)",
  "specialite": ["ORL", "Neurologie"],

  "questions": [
    {
      "id": "ac_cote",
      "label": "Latéralité",          // libellé court pour le récapitulatif médecin
      "type": "single_choice",         // boolean | single_choice | multi_choice | scale | text | duration
      "question": "Le bruit est-il dans une seule oreille ou dans les deux ?",
      "options": ["Une seule oreille", "Les deux oreilles", "Je ne sais pas"],
      "showIf": { "q": "autre_question", "eq": true }   // (optionnel) affichage conditionnel
    }
  ],

  "red_flags": [
    {
      "id": "ac_rf_pulsatile",
      "niveau": 2,                     // 1 non urgent · 2 avis rapide · 3 urgence
      "when": { "all": [ { "q": "ac_pulsatile", "eq": true },
                         { "q": "ac_cote", "eq": "Une seule oreille" } ] },
      "message_medecin": "Acouphène pulsatile unilatéral : cause vasculaire/tumorale à éliminer…",
      "message_patient": "La nature du bruit décrit nécessite un avis médical rapide."
    }
  ],

  "diagnostics_differentiels": [
    {
      "id": "ac_vasc",
      "diagnostic": "Cause vasculaire (acouphène pulsatile)",
      "arguments": [
        { "label": "synchrone du pouls", "w": 3, "when": { "q": "ac_pulsatile", "eq": true } },
        { "label": "unilatéral",        "w": 1, "when": { "q": "ac_cote", "eq": "Une seule oreille" } }
      ],
      "examens_a_discuter": ["Auscultation cervicale", "Imagerie vasculaire", "Avis ORL"]
    }
  ],

  "examens_clinique": ["Otoscopie", "Acoumétrie (Weber/Rinne)", "..."]
}
```

### Grammaire des prédicats (`when`, `showIf`)

| Forme | Sens |
|-------|------|
| `{ "q": "id", "eq": v }` | réponse `id` égale à `v` |
| `{ "q": "id", "in": [..] }` | réponse parmi la liste |
| `{ "q": "id", "truthy": true }` | réponse vraie/non vide |
| `{ "ctx": "age", "gte": 50 }` | contexte ≥ 50 (`gte`/`lte`) |
| `{ "ctx": "sexe", "eq": "Femme" }` | champ de contexte |
| `{ "ctx": "antecedents", "has": "diabète" }` | présent dans un tableau |
| `{ "all": [..] }` | ET logique |
| `{ "any": [..] }` | OU logique |
| `{ "not": pred }` | négation |

Le **score** d'une hypothèse = somme des `w` des arguments dont le `when` est vrai.
Les hypothèses de score 0 sont écartées ; les autres sont triées par score.

## 2. Contexte patient (`session.ctx`)

```jsonc
{
  "age": 28,
  "sexe": "Femme",
  "grossessePossible": true,
  "ageProcreer": true,          // dérivé : Femme & 12 ≤ age ≤ 51
  "antecedents": ["diabète", "sous anticoagulant"]
}
```

## 3. Réponses (`session.answers`)

Dictionnaire `{ questionId: valeur }`. `valeur` ∈ `true|false|"unknown"` (boolean),
chaîne (single_choice), tableau (multi_choice), nombre (scale), texte (text).

## 4. Schéma relationnel cible (backend V1)

Tables principales (PostgreSQL / Supabase) :

```sql
symptoms(id, slug, label, specialties[], version, validated_by, updated_at)
questions(id, symptom_id FK, code, label, patient_text, type, options jsonb,
          show_if jsonb, order_index)
red_flags(id, symptom_id FK, code, level, when_expr jsonb,
          message_doctor, message_patient)
diagnostic_hypotheses(id, symptom_id FK, label, exams jsonb)
hypothesis_arguments(id, hypothesis_id FK, label, weight, when_expr jsonb)
decision_rules(id, rule_id, symptom_id FK, condition jsonb, result jsonb)  -- règles transverses
clinical_exam_points(id, symptom_id FK, label, order_index)

consultations(id, patient_id FK?, symptom_id FK, context jsonb, answers jsonb,
              result jsonb, created_at, doctor_id FK)
doctor_notes(id, consultation_id FK, content, conclusion, orientation, created_at)
patients(id, external_ref, created_at)          -- minimisation : pas d'identité directe si évitable
audit_log(id, actor, action, entity, entity_id, at)   -- journalisation des accès
```

Exemple de **règle transverse** (`decision_rules`) telle que spécifiée :

```json
{
  "rule_id": "ADP_URG_001",
  "symptom": "Adénopathie superficielle",
  "condition": { "location": "sus-claviculaire" },
  "result": {
    "urgency_level": 2,
    "message_doctor": "Adénopathie sus-claviculaire : localisation toujours suspecte…",
    "message_patient": "La localisation décrite nécessite un avis médical rapide."
  }
}
```

Dans le prototype, ces règles sont portées par le tableau `red_flags` de chaque
fiche (même sémantique : `when` → `condition`, `niveau` → `urgency_level`).

## 5. Niveaux d'urgence

| Niveau | Libellé | Orientation |
|:------:|---------|-------------|
| 1 | Non urgent a priori | Consultation programmée, réévaluation. |
| 2 | Avis médical rapide | Avis non différable (jours), examen ciblé. |
| 3 | Urgence — avis immédiat | Évaluation immédiate / orientation urgences. |

Critères de niveau 3 (exemples transverses) : douleur thoracique constrictive,
dyspnée sévère, déficit neurologique brutal, céphalée en coup de tonnerre,
douleur abdominale avec défense, grossesse + douleur pelvienne + métrorragies,
fièvre + purpura, altération de conscience.
