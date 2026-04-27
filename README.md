# 📚 BookStore  - Frontend

Application web développée avec **Vue 3 + Vite** permettant la gestion d’une bibliothèque en ligne avec authentification, gestion des rôles et système de favoris.

---

## 🚀 Fonctionnalités principales

### 👤 Utilisateur

* Consulter tous les livres
* Voir les détails d’un livre
* Ajouter / retirer des livres en favoris
* Filtrer les livres (titre, année)
* Interface intuitive et responsive

### 👑 Administrateur

* Gestion complète des livres (CRUD)

  * Ajouter un livre
  * Modifier un livre
  * Supprimer un livre
* Gestion des auteurs

  * Ajouter des auteurs
  * Consulter la liste des auteurs

### 🔐 Authentification

* Login / Register
* Gestion des rôles (USER / ADMIN)
* Protection des routes avec Vue Router

---

## 🧠 Technologies utilisées

* ⚡ Vue 3 (Composition API)
* ⚡ Vite
* 📦 Pinia (gestion d’état)
* 🌐 Axios (API REST)
* 🧭 Vue Router
* 🎨 CSS moderne (UI personnalisée)

---

## 🗂️ Structure du projet

```
src/
│── components/       # Composants réutilisables
│── views/            # Pages principales
│── views/admin/      # Pages admin
│── stores/           # Pinia stores (auth, books, favourites)
│── services/         # Appels API
│── router/           # Configuration des routes
```

---

## ⚙️ Installation du projet

```bash
npm install
```

---

## ▶️ Lancer le projet

```bash
npm run dev
```

Accès : http://localhost:5173

---

## 🏗️ Build production

```bash
npm run build
```

---

## 🔒 Sécurité & logique

* Routes protégées avec guards
* Accès admin sécurisé
* Données utilisateur isolées (favoris par utilisateur)
* Redirection automatique si non connecté

---

## ✨ Améliorations réalisées

* UI moderne et responsive
* Gestion des rôles dynamique
* Système de favoris avec localStorage
* Optimisation des composants Vue
* Expérience utilisateur améliorée

---

## 📌 Remarques

* Backend requis pour fonctionnement complet (API REST)
* Projet réalisé dans le cadre d’un mini-projet Vue.js

---

## 👩‍💻 Auteur

**Rihab Ben Maiz**

**Ahmed Maaoui**

---

## 📎 Licence

Projet académique – usage éducatif

