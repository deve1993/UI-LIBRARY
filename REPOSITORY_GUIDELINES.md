# Repository Guidelines

Linee guida per mantenere una corretta separazione tra le repository e prevenire problemi futuri.

## 🎯 Obiettivo

Questo documento fornisce best practices per:
- Mantenere repository separate e ben organizzate
- Prevenire la mescolanza accidentale di progetti
- Garantire un workflow Git pulito e chiaro

---

## 📁 Struttura Directory Raccomandata

```
c:\VSC\
├── UI library/                    # Repository: https://github.com/deve1993/UI-LIBRARY
│   ├── .git/                      # Git repository per component-vault
│   ├── .gitignore                 # Ignora frontend-web-app-quickfy/
│   ├── component-vault/           # Libreria NPM @deve1993/ui-library
│   └── README.md                  # Documentazione root
│
└── frontend-web-app-quickfy/      # Repository: https://github.com/deve1993/frontend-web-app-quickfy
    ├── .git/                      # Git repository separato
    ├── src/
    ├── package.json
    └── README.md
```

### ✅ Regola Fondamentale

**UN PROGETTO = UNA DIRECTORY = UNA REPOSITORY GIT**

- `UI library/` contiene SOLO component-vault
- `frontend-web-app-quickfy/` ha la sua directory separata
- MAI mescolare progetti in una singola directory parent

---

## 🚫 Errori da Evitare

### ❌ SBAGLIATO: Progetti nella stessa directory parent con un'unica Git

```
UI library/
├── .git/                          # ❌ Singola repo per entrambi
├── component-vault/
└── frontend-web-app-quickfy/      # ❌ Stesso repository!
```

**Problema:** Tutti i commit mescolano modifiche di entrambi i progetti.

### ✅ CORRETTO: Progetti in directory separate con Git separate

```
c:\VSC\
├── UI library/
│   ├── .git/                      # ✅ Repo per component-vault
│   └── component-vault/
│
└── frontend-web-app-quickfy/
    └── .git/                      # ✅ Repo separata
```

---

## 📋 Checklist Prima di Creare un Nuovo Progetto

Prima di iniziare un nuovo progetto correlato a UI library:

### 1. Decidi: Fa parte della libreria o è un'applicazione separata?

**Libreria/Componente:**
- ✅ È riutilizzabile in multipli progetti
- ✅ Verrà pubblicato su NPM
- ✅ Altri sviluppatori lo useranno
- 👉 **Mettilo in `UI library/component-vault/components/`**

**Applicazione:**
- ✅ È un progetto completo standalone
- ✅ Ha il suo package.json, routing, pages
- ✅ Usa componenti ma non è un componente
- 👉 **Crealo in una directory separata fuori da `UI library/`**

### 2. Setup Directory

```bash
# Per nuove applicazioni
cd c:\VSC\
mkdir new-app
cd new-app
git init
git remote add origin https://github.com/deve1993/new-app.git

# Per nuovi componenti
cd "c:\VSC\UI library\component-vault\components\"
mkdir NewComponent
# (nessun git init - usa la repo esistente)
```

### 3. Verifica .gitignore

In `UI library/.gitignore`, assicurati di ignorare altre app:

```gitignore
# Ignore other projects
frontend-web-app-quickfy/
any-other-app/

# Node modules
node_modules/
```

---

## 🔍 Come Verificare la Struttura Git

### Comando 1: Verifica quante repository ci sono

```bash
# Nella directory principale
cd "c:\VSC\UI library"
find . -name ".git" -type d
```

**Output corretto:**
```
./.git                          # ✅ Una sola repo in UI library
```

**Output sbagliato:**
```
./.git
./component-vault/.git          # ❌ Repo annidata (nested)
./frontend-web-app-quickfy/.git # ❌ Progetto nell'altra repo
```

### Comando 2: Verifica remote configurati

```bash
cd "c:\VSC\UI library"
git remote -v
# Output: origin https://github.com/deve1993/UI-LIBRARY.git

cd "c:\VSC\frontend-web-app-quickfy"
git remote -v
# Output: origin https://github.com/deve1993/frontend-web-app-quickfy.git
```

### Comando 3: Verifica cosa sta tracciando Git

```bash
cd "c:\VSC\UI library"
git status

# Verifica che NON compaia:
# - frontend-web-app-quickfy/ (dovrebbe essere in .gitignore)
# - File di altri progetti
```

---

## 🛠️ Workflow Corretto

### Scenario 1: Modifichi Component-Vault

```bash
# 1. Vai in UI library
cd "c:\VSC\UI library\component-vault"

# 2. Modifica componenti
# ... fai modifiche ...

# 3. Test
npm run test
npm run build

# 4. Commit (nella repo UI-LIBRARY)
cd ..  # Torna a UI library/
git add component-vault/
git commit -m "feat: add new component"
git push origin master
```

### Scenario 2: Modifichi Frontend-Web-App-Quickfy

```bash
# 1. Vai nel progetto frontend
cd "c:\VSC\frontend-web-app-quickfy"

# 2. Modifica app
# ... fai modifiche ...

# 3. Test
npm run dev
npm run test

# 4. Commit (nella repo frontend-web-app-quickfy)
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Scenario 3: Modifichi Entrambi

**MAI commitare insieme!** Fai commit separati:

```bash
# Prima: Commit in component-vault
cd "c:\VSC\UI library"
git add component-vault/
git commit -m "feat: update Button component"
git push origin master

# Poi: Commit in frontend
cd "c:\VSC\frontend-web-app-quickfy"
git add .
git commit -m "feat: use new Button version"
git push origin main
```

---

## 🔐 Regole Git da Seguire

### Regola 1: Mai `git add .` alla cieca

```bash
# ❌ SBAGLIATO
cd "c:\VSC\UI library"
git add .                          # Potrebbe aggiungere file non voluti!

# ✅ CORRETTO
git add component-vault/           # Solo la libreria
git status                         # Verifica cosa stai committando
```

### Regola 2: Controlla sempre git status prima di commit

```bash
git status

# Assicurati che compaia SOLO:
# - File di component-vault/
# - File root (README.md, .gitignore)

# NON deve comparire:
# - frontend-web-app-quickfy/
# - Altri progetti
```

### Regola 3: Usa .gitignore per sicurezza

In `UI library/.gitignore`:

```gitignore
# Altri progetti (per sicurezza)
frontend-web-app-quickfy/
*-app/
*-project/

# Build output
node_modules/
dist/
.next/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

---

## 🚨 Cosa Fare se Mescoli Accidentalmente

### Scenario: Hai committato frontend in UI-LIBRARY

```bash
# 1. NON fare push!

# 2. Annulla ultimo commit (mantieni modifiche)
git reset --soft HEAD~1

# 3. Rimuovi file sbagliati dallo staging
git reset frontend-web-app-quickfy/

# 4. Aggiungi al .gitignore
echo "frontend-web-app-quickfy/" >> .gitignore
git add .gitignore

# 5. Commit corretto
git add component-vault/
git commit -m "feat: correct commit message"
```

### Scenario: Hai già fatto push

**Contatta il team!** Potrebbe servire una pulizia della history.

```bash
# Opzione 1: Revert commit
git revert <commit-hash>
git push origin master

# Opzione 2: Force push (SOLO se sei sicuro)
git reset --hard <commit-buono>
git push --force origin master
```

---

## 📚 Riferimenti Rapidi

### Link Repository

- **UI-LIBRARY:** https://github.com/deve1993/UI-LIBRARY
- **frontend-web-app-quickfy:** https://github.com/deve1993/frontend-web-app-quickfy

### Comandi Utili

```bash
# Verifica remote
git remote -v

# Verifica branch
git branch -a

# Verifica status
git status

# Verifica .git directories
find . -name ".git" -type d

# Verifica .gitignore
cat .gitignore
```

### Struttura File Corretta

```
UI library/
├── .git/
├── .gitignore                  # Ignora altri progetti
├── README.md                   # Documentazione root
├── REPOSITORY_GUIDELINES.md    # Questo file
└── component-vault/
    ├── components/
    ├── package.json
    └── README.md
```

---

## ✅ Checklist Finale

Prima di ogni commit, verifica:

- [ ] Sono nella directory corretta?
- [ ] `git status` mostra solo file del progetto corrente?
- [ ] `.gitignore` è configurato correttamente?
- [ ] Non sto per committare file di altri progetti?
- [ ] Il commit message è chiaro e specifico?
- [ ] Ho testato le modifiche?

---

## 🆘 Supporto

In caso di dubbi:

1. Consulta questo documento
2. Verifica con `git status` e `git remote -v`
3. Controlla i README dei singoli progetti
4. Se non sei sicuro, **chiedi prima di fare push**!

---

**Ricorda:** Repository separate = progetti indipendenti = nessuna confusione! 🎯
