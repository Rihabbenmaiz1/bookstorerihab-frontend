<template>
  <div class="form-page">
    <div class="form-card">
      <h2>{{ isEdit ? '✏️ Modifier le Livre' : '➕ Ajouter un Livre' }}</h2>

      <div class="form-group">
        <label>Titre *</label>
        <input v-model="form.title" placeholder="Titre du livre" />
      </div>

      <div class="form-group">
        <label>URL de l'image</label>
        <input v-model="form.image" placeholder="https://..." />
        <img v-if="form.image" :src="form.image" class="preview" @error="onImgError" />
      </div>

      <div class="form-group">
        <label>Éditeur</label>
        <input v-model="form.editor" placeholder="Nom de l'éditeur" />
      </div>

      <div class="form-group">
        <label>Année</label>
        <input v-model="form.year" type="number" placeholder="2024" />
      </div>

      <div class="form-group">
        <label>Résumé</label>
        <textarea v-model="form.summary" placeholder="Écrivez une courte description..." rows="4"></textarea>
      </div>

      <div class="form-group">
        <label>Auteur *</label>
        <select v-model="form.authorId">
          <option disabled value="">-- Choisir un Auteur --</option>
          <option v-for="a in booksStore.authors" :key="a.id" :value="a.id">
            {{ a.prenom }} {{ a.nom }}
          </option>
        </select>
      </div>

      <div class="form-actions">
        <button class="cancel-btn" @click="router.push('/admin/books')">
          ❌ Annuler
        </button>
        <button class="save-btn" @click="saveBook">
          {{ isEdit ? '✏️ Modifier' : '💾 Enregistrer' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBooksStore } from '../../stores/books'

const booksStore = useBooksStore()
const router = useRouter()
const route = useRoute()

const isEdit = computed(() => !!route.params.id)

const form = ref({
  title: '',
  image: '',
  editor: '',
  year: 2024,
  summary: '',
  authorId: ''
})

onMounted(async () => {
  await booksStore.getAllAuthors()
  await booksStore.getAllBooks()

  if (isEdit.value) {
    const book = booksStore.books.find(b => b.id == route.params.id)
    if (book) {
      form.value = {
        title: book.title,
        image: book.image,
        editor: book.editor,
        year: book.year,
        summary: book.summary || '',
        authorId: book.author?.id || ''
      }
    }
  }
})

const saveBook = async () => {
  if (!form.value.title || !form.value.authorId) {
    alert('Le titre et l\'auteur sont obligatoires !')
    return
  }

  const bookData = {
    title: form.value.title,
    image: form.value.image,
    editor: form.value.editor,
    year: Number(form.value.year),
    summary: form.value.summary,
    author: { id: form.value.authorId }
  }

  if (isEdit.value) {
    await booksStore.updateBook(route.params.id, bookData)
  } else {
    await booksStore.addBook(bookData)
  }

  router.push('/admin/books')
}

const onImgError = (e) => {
  e.target.src = 'https://via.placeholder.com/150x200?text=No+Image'
}
</script>

<style scoped>
.form-page {
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1400');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.form-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 550px;
  backdrop-filter: blur(10px);
}

.form-card h2 {
  color: #1a3a5c;
  margin-bottom: 30px;
  font-size: 1.8rem;
  text-align: center;
  font-family: 'Georgia', serif;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2e6da4;
  box-shadow: 0 0 0 3px rgba(46,109,164,0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.preview {
  width: 100px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
  border: 2px solid #ddd;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

.cancel-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.cancel-btn:hover {
  background: #5a6268;
}

.save-btn {
  background: linear-gradient(135deg, #2e6da4, #1a3a5c);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(46,109,164,0.4);
}
</style>