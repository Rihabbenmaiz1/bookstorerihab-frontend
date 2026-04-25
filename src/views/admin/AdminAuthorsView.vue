<template>
  <div class="admin-page">

    <!-- HEADER -->
    <div class="page-header">
      <h2>✍️ Gestion des Auteurs</h2>
      <p>Gérez la liste des auteurs disponibles dans la bibliothèque</p>
    </div>

    <!-- CONTENU -->
    <div class="content">

      <!-- FORMULAIRE -->
      <div class="form-card">
        <h3>➕ Ajouter un Auteur</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Prénom *</label>
            <input v-model="prenom" placeholder="ex: Victor" />
          </div>
          <div class="form-group">
            <label>Nom *</label>
            <input v-model="nom" placeholder="ex: Hugo" />
          </div>
        </div>
        <button class="add-btn" @click="addAuthor">➕ Ajouter l'auteur</button>
      </div>

      <!-- TABLEAU -->
      <div class="table-card">
        <h3>📋 Liste des Auteurs ({{ booksStore.authors.length }})</h3>
        <table class="authors-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Nom complet</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="author in booksStore.authors" :key="author.id">
            <td><span class="badge">{{ author.id }}</span></td>
            <td>{{ author.prenom }}</td>
            <td>{{ author.nom }}</td>
            <td><strong>{{ author.prenom }} {{ author.nom }}</strong></td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBooksStore } from '../../stores/books'

const booksStore = useBooksStore()
const prenom = ref('')
const nom = ref('')

onMounted(async () => {
  await booksStore.getAllAuthors()
})

const addAuthor = async () => {
  if (!prenom.value || !nom.value) {
    alert('Prénom et Nom sont obligatoires !')
    return
  }
  await booksStore.addAuthor({
    prenom: prenom.value,
    nom: nom.value
  })
  prenom.value = ''
  nom.value = ''
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #f0f4f8;
  padding-bottom: 60px;
}

/* HEADER */
.page-header {
  background: linear-gradient(135deg, #1a3a5c, #2e6da4);
  color: white;
  text-align: center;
  padding: 50px 20px;
  margin-bottom: 40px;
}

.page-header h2 {
  font-size: 2rem;
  font-family: 'Georgia', serif;
  margin-bottom: 10px;
}

.page-header p {
  opacity: 0.85;
  font-size: 1rem;
}

/* CONTENU */
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* FORM CARD */
.form-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 5px 25px rgba(0,0,0,0.08);
}

.form-card h3 {
  color: #1a3a5c;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-family: 'Georgia', serif;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #555;
  font-size: 0.9rem;
}

.form-group input {
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #2e6da4;
  box-shadow: 0 0 0 3px rgba(46,109,164,0.1);
}

.add-btn {
  background: linear-gradient(135deg, #2e6da4, #1a3a5c);
  color: white;
  border: none;
  padding: 13px 30px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(46,109,164,0.3);
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(46,109,164,0.4);
}

/* TABLE CARD */
.table-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 5px 25px rgba(0,0,0,0.08);
}

.table-card h3 {
  color: #1a3a5c;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-family: 'Georgia', serif;
}

.authors-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
}

.authors-table th {
  background: linear-gradient(135deg, #1a3a5c, #2e6da4);
  color: white;
  padding: 14px 18px;
  text-align: left;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.authors-table td {
  padding: 14px 18px;
  border-bottom: 1px solid #f0f0f0;
  color: #444;
}

.authors-table tr:last-child td {
  border-bottom: none;
}

.authors-table tr:hover td {
  background: #f0f7ff;
}

.badge {
  background: #e8f0fe;
  color: #2e6da4;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
}
</style>