<template>
  <div class="admin">
    <div class="admin-header">
      <h2>📚 Gestion des Livres</h2>
      <button class="add-btn" @click="goToAdd">➕ Ajouter un Livre</button>
    </div>

    <table class="books-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Titre</th>
        <th>Éditeur</th>
        <th>Année</th>
        <th>Auteur</th>
        <th>Image</th>
        <th>Résumé</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="book in booksStore.books" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.editor }}</td>
        <td>{{ book.year }}</td>
        <td>{{ book.author?.prenom || '' }} {{ book.author?.nom || '' }}</td>
        <td><img :src="book.image" class="img" @error="onImgError" /></td>
        <td class="summary">{{ book.summary ? book.summary.substring(0, 50) + '...' : 'Aucun résumé' }}</td>
        <td>
          <button class="edit-btn" @click="goToEdit(book.id)">✏️ Modifier</button>
          <button class="delete-btn" @click="deleteBook(book.id)">🗑️ Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '../../stores/books'

const booksStore = useBooksStore()
const router = useRouter()

onMounted(async () => {
  await booksStore.getAllBooks()
  await booksStore.getAllAuthors()
})

const goToAdd = () => router.push('/admin/books/add')
const goToEdit = (id) => router.push(`/admin/books/edit/${id}`)

const deleteBook = async (id) => {
  if (confirm('Supprimer ce livre ?')) {
    await booksStore.deleteBook(id)
  }
}

const onImgError = (e) => {
  e.target.src = 'https://via.placeholder.com/50x70'
}
</script>

<style scoped>
.admin {
  padding: 40px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.admin-header h2 {
  color: #1a3a5c;
  font-size: 1.8rem;
  font-family: 'Georgia', serif;
}

.add-btn {
  background: linear-gradient(135deg, #2e6da4, #1a3a5c);
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(46,109,164,0.3);
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(46,109,164,0.4);
}

.books-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  border-radius: 15px;
  overflow: hidden;
}

.books-table th {
  background: linear-gradient(135deg, #1a3a5c, #2e6da4);
  color: white;
  padding: 15px;
  text-align: left;
  font-size: 0.95rem;
}

.books-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
  color: #333;
}

.books-table tr:hover {
  background: #f0f7ff;
}

.img {
  width: 45px;
  height: 65px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.summary {
  max-width: 150px;
  color: #666;
  font-size: 0.85rem;
  font-style: italic;
}

.edit-btn {
  background: linear-gradient(135deg, #f0ad4e, #e09940);
  color: white;
  border: none;
  padding: 7px 14px;
  border-radius: 7px;
  cursor: pointer;
  margin-right: 5px;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.edit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(240,173,78,0.4);
}

.delete-btn {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  border: none;
  padding: 7px 14px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.delete-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(220,53,69,0.4);
}
</style>